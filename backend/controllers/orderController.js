const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Product = require('../models/Product');
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");

const addOrder = async (req, res) => {
    
    let {customer_id, order_items, order_date, address,city, postal_code, cart_total_price, status, email, PaymentMethod} = req.body;

    try{
    const newOrder = await new Order({
        customer_id : customer_id,
        order_items : order_items,
        address : address,
        city : city,
        postal_code: postal_code,
        order_date : order_date,
        PaymentMethod: PaymentMethod,
        cart_total_price : cart_total_price,
        status : status
    });
    
        newOrder.save()
        .then((newOrder) => {
         
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                service: "gmail",
                port: 587,
                secure: false,
                auth: {
                  user: process.env.user,
                  pass: process.env.password,
                },
              });
          
          
              let mailOptions = {
                from: `"PRESTIGIOUS" <${process.env.user}>`,
                to: email,
                subject: "Order placed successfully",
                html: `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <title>Thanks for your order!</title>
                    <style>
                      body {
                        font-family: Arial, sans-serif;
                        text-align: center;
                        margin: 0;
                        padding: 0;
                      }
                      
                      img {
                        width: 100%;
                        height: auto;
                        margin-bottom: 20px;
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                      }
                      
                      h1 {
                        color: #333;
                      }
                      
                      p {
                        color: #666;
                        font-size: 18px;
                        line-height: 1.6;
                      }
                      
                      a {
                        color: #007bff;
                        text-decoration: none;
                      }
                      
                      a:hover {
                        text-decoration: underline;
                      }
                    </style>
                  </head>
                  <body>
                    <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 37.5em;">
                      <tr style="width: 100%;">
                        <td>
                          <table style="padding: 30px 20px;" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"></table>
                          <table style="border: 1px solid rgba(0, 0, 0, 0.1); border-radius: 3px; overflow: hidden;" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            <tbody>
                              <tr>
                                <td>
                                  <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/v1702142894/images/Brown_Neutral_Minimalist_Simple_Beautiful_Fashion_New_Arrivals_Email_Header_2_whbynn.png" alt="PRESTIGIOUS" width="100%" />
                                  <table width="100%" style="padding: 20px 40px; padding-bottom: 0;" align="center" role="presentation" cellspacing="0" cellpadding="0" border="0">
                                    <tbody style="width: 100%;">
                                      <tr style="width: 100%;">
                                        <td>
                                          <h1 style="font-size: 32px; font-weight: bold; text-align: center; color: #2F5951;">Thanks for your order!</h1>
                                          <p style="font-size: 16px; line-height: 24px; margin: 16px 0;"> Your Order :</p>
                                          <ul style="list-style-type: none; padding-left: 0;">
                                                            ${order_items.map(item => `<li style="font-size: 16px; line-height: 24px; margin: 8px 0;"><strong>Product: </strong> ${item.product_name} <br><strong>Quantity: </strong> ${item.quantity} <br> <strong>Cart total price: </strong>${cart_total_price} DH</li>`).join('')}
                                                        </ul>
                                          <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">
                                            We appreciate your business! If you have any questions, please email <a href="mailto:p27895102@gmail.com">p27895102@gmail.com</a>.
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </body>
                </html>                
                      `,
              };
          
              if (transporter.sendMail(mailOptions)) {
                res.status(200).json("Order successfully added !");
              } else {
                res.status(400).json("Error sending email");
              }

        });
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
            .sort({order_date:-1})
            .exec();

        const totalOrdersCount = await Order.countDocuments();
        if (orders.length === 0) {
            res.json({ orders: [], count: 0 });
        } else {
            // Process order_items to convert it into an array of objects
            // const processedOrders = orders.map(order => {
            //     const processedOrder = { ...order.toObject() };
            //     processedOrder.order_items = Object.entries(order.order_items).map(([product_id, quantity]) => ({
            //         product_id,
            //         quantity
            //     }));
            //     return processedOrder;
            // });
            res.status(200).json({ orders: orders, "Number of Orders": totalOrdersCount});
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
      

      res.json({ order: processedOrder });
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
const getCustomerOrders = async (req, res) => {
  try {
     let idCustomer = req.params.id;
     const orders = await Order.find({customer_id: idCustomer})
       .sort({order_date:-1})
       .populate({ path: 'customer_id', select: 'first_name last_name' })
       .populate({ path: 'order_items.product_id', model: 'Product', select: 'product_image' })
       .exec();
 
     if (orders.length === 0) {
       return res.status(404).json("No order found with the provided ID");
     }
 
     const processedOrders = orders.map(order => {
         const processedOrderItems = order.order_items.map(item => {
             if (!item.product_id || !item.product_id._id) {
                 return {
                     product_id: null,
                     product_name: item.product_name,
                     productImage: null,
                     quantity: item.quantity
                 };
             }
 
             return {
                 product_id: item.product_id._id,
                 product_name: item.product_name,
                 productImage: item.product_id.product_image,
                 quantity: item.quantity
             };
         });
 
         return {
             ...order.toObject(),
             order_items: processedOrderItems
         };
     });
 
     return res.status(200).json({ orders: processedOrders });
     
  } catch (error) {
     return res.status(500).json({error: error.message});
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



module.exports = {addOrder, getAllOrders, getOrder, getCustomerOrders, UpdateOrder};