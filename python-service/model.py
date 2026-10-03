import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import warnings
import os
warnings.filterwarnings('ignore')

def process_products(input_file):
    print("Loading dataset...")
    df = pd.read_json(input_file)
    print(f"Original dataset shape: {df.shape}")

    # Data cleaning
    df = df[df['price'].notnull()]
    print(f"Dataset shape after removing null prices: {df.shape}")

    try:
        df['creation_date'] = pd.to_datetime(df['creation_date'])
    except:
        print("Warning: Could not convert creation_date to datetime")
        df['creation_date'] = pd.Timestamp.now()

    current_date = pd.Timestamp.now()
    try:
        df['product_age_days'] = (current_date - df['creation_date']).dt.days
    except:
        print("Warning: Could not calculate product age")
        df['product_age_days'] = 0

    df['discount_price'] = df['discount_price'].fillna(df['price'])
    df['rating'] = df['rating'].fillna(0)
    df['review_count'] = df['review_count'].fillna(0)

    # Feature engineering
    df['discount_rate'] = (df['price'] - df['discount_price']) / df['price']
    df['discount_rate'] = df['discount_rate'].fillna(0)
    df['quality_score'] = df['rating'] * np.log1p(df['review_count'])
    df['image_count'] = df['product_image'].apply(lambda x: len(x) if isinstance(x, list) else 0)

    # Create target label
    rating_threshold = np.percentile(df['rating'].replace(0, np.nan).dropna(), 75)
    review_threshold = np.percentile(df['review_count'].replace(0, np.nan).dropna(), 75)
    print(f"Using rating threshold: {rating_threshold:.2f}")
    print(f"Using review threshold: {review_threshold:.2f}")

    df['bestseller'] = ((df['rating'] >= rating_threshold) &
                       (df['review_count'] >= review_threshold)).astype(int)

    bestseller_counts = df['bestseller'].value_counts()
    print(f"Class distribution: {bestseller_counts.to_dict()}")

    min_positive_examples = 5
    if bestseller_counts.get(1, 0) < min_positive_examples:
        print(f"Warning: Not enough positive examples. Adjusting bestseller criteria...")
        quality_threshold = np.percentile(df['quality_score'].replace(0, np.nan).dropna(), 80)
        df['bestseller'] = (df['quality_score'] >= quality_threshold).astype(int)
        print(f"New class distribution: {df['bestseller'].value_counts().to_dict()}")

    # Select features and target
    features = df[[
        'price', 'discount_rate', 'rating', 'review_count',
        'quality_score', 'product_age_days', 'image_count'
    ]]
    target = df['bestseller']

    # Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        features, target, test_size=0.2, random_state=42, stratify=target
    )

    # Feature scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Build model
    tf.random.set_seed(42)
    model = tf.keras.Sequential([
        tf.keras.layers.Dense(32, activation='relu',
                             input_shape=(X_train_scaled.shape[1],),
                             kernel_regularizer=tf.keras.regularizers.l2(0.01)),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dropout(0.3),
        tf.keras.layers.Dense(16, activation='relu',
                             kernel_regularizer=tf.keras.regularizers.l2(0.01)),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(1, activation='sigmoid')
    ])

    # Compile with class weights
    class_counts = y_train.value_counts()
    total_samples = len(y_train)
    class_weight = {
        0: total_samples / (2 * class_counts.get(0, 1)),
        1: total_samples / (2 * class_counts.get(1, 1))
    }

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
        loss='binary_crossentropy',
        metrics=['accuracy', tf.keras.metrics.AUC(), tf.keras.metrics.Precision(), tf.keras.metrics.Recall()]
    )

    # Train
    model.fit(
        X_train_scaled, y_train,
        epochs=100,
        batch_size=16,
        validation_split=0.2,
        class_weight=class_weight,
        callbacks=[
            tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True),
            tf.keras.callbacks.ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=5)
        ],
        verbose=1
    )

    # Predict
    all_products_scaled = scaler.transform(features)
    try:
        raw_predictions = model.predict(all_products_scaled)
        predictions = raw_predictions.flatten()
        if np.isnan(predictions).any():
            print("Warning: NaN values in predictions. Replacing with 0...")
            predictions = np.nan_to_num(predictions)
        df['bestseller_probability'] = predictions
    except Exception as e:
        print(f"Error during prediction: {e}")
        df['bestseller_probability'] = df['quality_score'] / df['quality_score'].max()

    null_probs = df['bestseller_probability'].isna().sum()
    if null_probs > 0:
        print(f"Warning: Found {null_probs} null probabilities. Fixing...")
        df['bestseller_probability'] = df['bestseller_probability'].fillna(0)

    # Select top 5
    top_products = df.sort_values('bestseller_probability', ascending=False).head(5)
    output_fields = [
        'sku', 'product_name', 'price', 'discount_price', 'rating',
        'review_count', 'bestseller_probability', 'product_image',
        'short_description', 'long_description', 'quantity',
        'creation_date', 'active'
    ]
    top_products = top_products[output_fields]

    # Convert creation_date (Timestamp) to ISO string
    top_products['creation_date'] = top_products['creation_date'].apply(
        lambda x: x.isoformat() if isinstance(x, (pd.Timestamp, pd.Timestamp)) else x
    )

    return top_products.to_dict(orient='records')