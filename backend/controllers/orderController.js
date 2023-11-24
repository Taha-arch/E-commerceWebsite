const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Product = require('../models/Product');
const dotenv = require('dotenv').config();


const addOrder = async (req, res) => {
    
    let {customer_id, order_items, order_date, cart_total_price, status} = req.body;

    order_items = order_items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
      }));

    try{
    const newOrder = await new Order({
        customer_id : customer_id,
        order_items : order_items,
        order_date : order_date,
        cart_total_price : cart_total_price,
        status : status
    });
    
        newOrder.save()
        .then((newOrder) => {
                res.status(200).json("Order successfully added !");
        }
        );
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}

const getAllOrders = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    try {
        const orders = await Order.find()
            .populate({path: 'customer_id', select: 'first_name last_name'}) // Use 'customer_id' as the field to populate
            .skip((page - 1) * perPage)
            .exec();

        const totalOrdersCount = await Order.countDocuments();
        if (orders.length === 0) {
            res.json({ orders: [], count: 0 });
        } else {
            // Process order_items to convert it into an array of objects
            const processedOrders = orders.map(order => {
                const processedOrder = { ...order.toObject() };
                processedOrder.order_items = Object.entries(order.order_items).map(([product_id, quantity]) => ({
                    product_id,
                    quantity
                }));
                return processedOrder;
            });
            res.status(200).json({ orders: processedOrders, "Number of Orders": totalOrdersCount});
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrder = async (req, res) => {
  try {
    let idOrder = req.params.id;
    const order = await Order.findById(idOrder)
      .populate({ path: 'customer_id', select: 'first_name last_name' })
      .exec();

    if (!order) {
      res.status(404).json("No order found with the provided ID");
    } else {
      const processedOrder = { ...order.toObject() };
      
      // Assuming order_items is an array of objects [{ product_id, quantity }]
      processedOrder.order_items = processedOrder.order_items.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
      }));

      res.json({ order: processedOrder });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}




const UpdateOrder = async (req, res) => {
    const idOrder = req.params.id;
    const orderUpdate = req.body;

    try {
        const doc = await Order.findByIdAndUpdate(idOrder, orderUpdate);

        if (doc) {
            return res.status(200).json({ message: "Order updated" });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    }catch (error) {
        
        console.error("Error updating order:", error);

        
        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid order ID format" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = {addOrder, getAllOrders, getOrder, UpdateOrder};