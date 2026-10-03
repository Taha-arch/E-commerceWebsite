# E-commerce Website

An e-commerce platform with a customer storefront, an administration dashboard, an Express/MongoDB API, Stripe checkout, Cloudinary image uploads, and a FastAPI scraping and product-ranking service.

## Architecture

| Application | Location | Purpose | Default URL/port |
| --- | --- | --- | --- |
| Customer storefront | `customer/` | Browse products, manage a cart and favorites, place orders, and manage a profile | `http://localhost:3000` |
| Admin dashboard | `client/my-app/` | Manage the catalog, customers, users, orders, categories, and scraping workflows | `http://localhost:3001` |
| Express API | `backend/` | Authentication, catalog, order, payment, media, settings, and scraper integration APIs | `http://localhost:3001` |
| Python service | `python-service/` | Selenium scraping and TensorFlow product ranking | `http://localhost:8000` |

The two React applications use Create React App. Run them on different ports when they are used at the same time. The repository does not currently include a root-level start script or workspace package manager configuration.

## Features

### Customer storefront

- Landing page and product discovery
- Product listing, search, price sorting, categories, subcategories, and collections
- Product detail pages with product images and quantity selection
- Persistent cart and favorites
- Customer registration, login, email validation, and profile editing
- Profile image uploads
- Checkout address validation
- Cash on delivery orders
- Card payments through Stripe Checkout
- Customer order history and order status display
- Toasts, alerts, loading states, animations, image lightbox, and responsive layouts

### Admin dashboard

- Admin login and profile management
- Dashboard statistics, popular products, transaction charts, and recent orders
- Product listing, pagination, creation, editing, image management, and deletion
- Customer listing, search, profile viewing, editing, and deletion
- User listing, creation, editing, profile viewing, and deletion
- Order listing, detail viewing, and status editing
- Category and subcategory management
- Product data scraper with progress tracking
- Scraped product review and selection before importing into MongoDB
- Scraping history and AI model settings screens

### Backend and integrations

- Express and Mongoose API backed by MongoDB
- JWT-based authentication middleware and bcrypt password hashing
- Product and profile image uploads through Multer and Cloudinary
- Product search, pagination, category/subcategory population, and price sorting
- Order creation, customer-specific order history, order updates, and email support through Nodemailer
- Stripe Checkout session creation with Moroccan dirham (`mad`) pricing
- CORS, Helmet, request validation, cookies, logging, and error middleware dependencies

### Scraping and product ranking

The admin scraper workflow uses the Python service in three stages:

1. Scrape a collection URL with Selenium and save products to `python-service/data/mejuri_rings.json`.
2. Process the scraped products with feature engineering and a TensorFlow classifier.
3. Review the ranked products and import selected items into the Express API and MongoDB.

The ranking pipeline considers price, discount rate, rating, review count, quality score, product age, and image count. It writes the ranked output to `python-service/data/top_5_products.json` and returns bestseller probabilities.

## API overview

The Express server mounts routes without a common API prefix:

| Area | Endpoints |
| --- | --- |
| Authentication | `POST /login`, `POST /user`, `POST /customers/login`, `POST /customers` |
| Users | `GET/PUT/DELETE /users`, `GET /users/:id`, `GET /users/search` |
| Customers | `GET /customers`, `GET /customers/:id`, `GET /customers/search`, `PUT /customers/:id`, `PUT /customers/validate`, `DELETE /customers/delete/:id` |
| Products | `GET /products`, `GET /products/:id`, `GET /product`, `POST /products`, `PATCH /products/:id`, `DELETE /products/:id` |
| Categories | `GET/POST /categories`, `GET /categories/:id`, `GET /categories/search/`, `PUT/DELETE /categories/:id` |
| Subcategories | `GET/POST /subcategories`, `GET /subcategories/:id`, `GET /subcategories/search/`, `PUT/DELETE /subcategories/:id` |
| Orders | `POST /orders`, `GET /orders`, `GET /orders/:id`, `GET /customer/orders/:id`, `PUT /orders/:id` |
| Payments | `POST /stripe/create-checkout-session` |
| Scraper proxy | `/api/scraper/scrape`, `/api/scraper/process`, `/api/scraper/add-scraped`, `/api/scraper/scraping-history` |
| Settings | `GET/POST /api/settings` |

The Python service exposes `POST /scrape`, `GET /scrape-progress`, `GET /scraped-products`, `GET /process`, `GET /process-progress`, and `GET /processed-products`.

## Requirements

- Node.js and npm
- Python 3.10 or newer recommended
- MongoDB instance
- Google Chrome and network access for Selenium/ChromeDriver
- Cloudinary account for image uploads
- Stripe account for card checkout

## Configuration

Create local environment files. Do not commit real credentials.

### `backend/.env`

```env
PORT=3001
MONGO_URL=mongodb://localhost:27017/ecommerce
JWT_SECRET=replace-me
REFRESH_TOKEN_SECRET=replace-me
CLOUD_NAME=replace-me
API_KEY=replace-me
API_SECRET=replace-me
STRIPE_KEY=replace-me
FASTAPI_URL=http://localhost:8000
```

The backend also reads database, mail, and payment configuration from environment variables used by the controllers. Inspect `backend/config/` and the relevant controller before deploying to supply the values required by your environment.

### `customer/.env`

```env
REACT_APP_URL=http://localhost:3001
```

### `client/my-app/.env`

```env
REACT_APP_BASEURL=http://localhost:3001
```

## Installation and development

Install each application independently:

```powershell
cd backend
npm install

cd ..\customer
npm install

cd ..\client\my-app
npm install

cd ..\..\python-service
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Start the services in separate terminals:

```powershell
# Terminal 1: API
cd backend
npm start

# Terminal 2: Python scraper/ranking service
cd python-service
python app.py

# Terminal 3: Customer storefront
cd customer
npm start

# Terminal 4: Admin dashboard
cd client\my-app
$env:PORT=3001
npm start
```

Because the API also defaults to port `3001`, choose another admin port or change the backend port if both need to run simultaneously. Update the frontend environment variables to match the selected API port.

## Production builds

Build either React application from its own directory:

```powershell
cd customer
npm run build

cd ..\client\my-app
npm run build
```

The backend package currently starts with `nodemon server.js`, which is useful for development. Use a production process manager and a production-safe start command when deploying.

## Important operational notes

- Scraping clears the Python service `data/` directory before starting a new scrape.
- Scraped and processed products are held in Python memory until they are explicitly imported into MongoDB.
- The Python service uses background tasks, so clients should poll the progress endpoints before requesting results.
- The current Stripe controller contains a hard-coded test key and localhost redirect URLs. Move the key to an environment variable and configure public success/cancel URLs before deployment.
- Verify scraper history routes and logging end to end before relying on them in production; the Python callback and the Express route registration currently use different paths.
- Review authentication guards on scraper/settings routes and rotate any credentials that may have existed in local environment files.

## Push checklist

Before pushing this repository:

1. Run `git status` and review every staged file.
2. Confirm that `.env` files, credentials, `node_modules`, build output, and generated scraper data are not staged.
3. Rotate any credentials that were ever committed or shared.
4. Set production MongoDB, Cloudinary, JWT, mail, Stripe, and service URL values through deployment secrets.
5. Run the frontend builds and smoke-test login, product browsing, checkout, admin CRUD, and scraping in the target environment.

## Project structure

```text
backend/          Express API, controllers, models, routes, and middleware
client/my-app/    Admin React dashboard
customer/         Customer React storefront
python-service/   FastAPI scraper, ranking model, and generated data
```