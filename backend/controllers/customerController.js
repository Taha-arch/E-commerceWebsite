const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const Customer = require('../models/Customer');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const SECRET_KEY = process.env.JWT_SECRET;

// const generateJwt = ((id,time) => {
//     return jwt.sign({id}, SECRET_KEY, {expiresIn: time+'d'});
// });


const authCustomer = async (req, res) => {
    const { email, password } = req.body;
    const customerFound = await Customer.findOne({ email });

    if (customerFound && (await bcrypt.compareSync(password, customerFound.password))) {
        let token = jwt.sign({ _id: customerFound._id }, SECRET_KEY,{ expiresIn: '3d' });
        let refreshToken = jwt.sign({ _id: customerFound._id }, SECRET_KEY,{ expiresIn: '12d' });
        res.status(200).json({ "access_token": token , "refreshtoken" : refreshToken,"status" : 200, "customer": customerFound});
    } else {
        res.status(401).json({message: "Invalid email or password"});
    }
}


const addCustomer = async (req, res) => {
  try {
    
 
    let {first_name, last_name, email, password, confirm_password} = req.body;
    if (password === confirm_password){

        
    let hash_password = await bcrypt.hashSync(password, 10);
    const Avatar = 'https://res.cloudinary.com/dfin3vmgz/image/upload/v1699881455/users_images/istockphoto-1300845620-612x612_arm4t8.jpg';
    const newCustomer = await new Customer({
        first_name : first_name,
        last_name : last_name,
        email : email,
        password : hash_password,
        customer_image: Avatar,
    });

        newCustomer.save()
        .then((newCustomer) => {

            const link = "https://prestigious-five.vercel.app/login"

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
                to: email,
                subject: 'Account Verification',
                html: `
                <!DOCTYPE html>
<html lang="en">
<head>
  <title>Thanks for your order!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    
    img {
      width: 100%;
      height: auto;
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
      margin: 20px 0;
    }
    
    a {
      color: white;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      overflow: hidden;
    }
    
    .email-content {
      padding: 20px;
      text-align: left;
    }
    
    .verify-button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #2F5951;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    
    .verify-button:hover {
      background-color: #2A5951;
    }
    
    .footer {
      margin-top: 20px;
      font-style: italic;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <img src="https://res.cloudinary.com/dfin3vmgz/image/upload/product_images/undefined-1698783203837" alt="PRESTIGIOUS" />
    <div class="email-content">

      <p>Dear ${newCustomer.first_name},</p>
      <p>Thank you for registering with Prestigious. We're excited to have you join our community! To ensure the security and authenticity of our members.</p>
      <div style="text-align: center; margin-top: 20px;">
        <a class="verify-button" href="${link}">Click here to go back</a>
      </div>
      <p>If you have any issues or questions, don't hesitate to reach out to our support team.</p>
      <p class="footer">Warm regards,<br/><strong>Prestigious Team</strong></p>
    </div>
  </div>
</body>
</html>

`
            };

            if(transporter.sendMail(mailOptions)){
                res.status(200).json("Customer successfully added !");
            }else {
                res.status(400).json("Error sending Email");
            }

            
        })
    }else{
        res.status(400).json({ message: "Error passwords are not matching"});  
    }
  } catch (error) {
    res.status(500).json('error', error)
  }
}


    
    const getAllCustomers = async (req, res) => {
        const page = parseInt(req.query.page) || 1; 
        const perPage = 10; 
    
        try {
          const customers = await Customer.find({}).sort({ first_name: -1 }).skip((page - 1) * perPage);
    
        if (customers.length === 0) {
            res.json([]);
        } else {
            res.json(customers);
        }

        } catch (error) {
        console.error('Error retrieving customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    const searchCustomer = async (req, res) => {
        try {
        const queryObject = req.query;

        if (!queryObject.first_name) {
            res.status(400).json('Missing first_name parameter');
            return;
        }
        const customer = await Customer.find({first_name: { $regex: new RegExp(queryObject.first_name , 'i')}})
        .sort({ first_name: -1 })
        .exec()
        

        if (customer.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        
        res.status(200).json({status:200, data : customer});
        
        } catch (error) {
            console.error('Error searching for a customer by first_name:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            }
    };

    const getCustomer = async (req, res) => {
        let idCustomer = req.params.id;
        
        await Customer.findById(idCustomer)
        .then((customer) => {
    
            res.status(203).json(customer);
        })
        .catch((error) => {
    
        res.status(404).json('customer not Found');
        });
    }
    

    const deleteCustomer = async (req, res) => {
        let idCustomer = req.params.id;
        Customer.findByIdAndDelete(idCustomer)
        .then((customer) => {
            res.status(200).json("customer deleted successfully");
        })
        .catch((error) => {
            res.status(404).json("invalid customer id");
        })
    }

   
  const updateCustomer = async (req, res) => {

            try {
               
            const idCustomer = req.params.id;
            const customerUpdate = req.body;
            
            const timeInMss = Date.now();
            customerUpdate.last_update = timeInMss;
             // Current User
            const currentUser = await Customer.findById(idCustomer)
            
          //Error handling
            const emailExist = await Customer.findOne({
                _id: { $ne: idCustomer }, // Exclude the user being updated
                email: customerUpdate.email
            });
    
            if(emailExist) return res.status(400).json({message : `Email already exist`});
            
            if(customerUpdate.customer_image !== ''){
              const image = currentUser.customer_image;
              if(image){
                 await cloudinary.uploader.destroy(image)
              }
              const newImage = await cloudinary.uploader.upload(customerUpdate.customer_image, {
                folder:'customers/images/' + timeInMss  ,
                width: 1000,
                crop: "scale"
              });
              
              customerUpdate.customer_image=newImage.secure_url;
              }
            
    
            const doc = await Customer.findByIdAndUpdate(idCustomer, customerUpdate, {new: true})
    
            res.status(200).json({
              success: true,
              doc,
              status:200,
              message:"customer updated successfully"
            })
            } catch (error) {
            //   res.status(404).json("Customer not found");
            res.status(500).json(error.message)
              console.log(error.message);
            }
        
    };
    

    
    
    const validateCustomerEmail = async (req, res) => {
        const token = req.header('Authorization');
            if (!token) {
                res.status(404).json("Not Autorized");
            }
            if (token.startsWith('Bearer ')) {
                return token.slice(7);
              }
        const data = jwt.verify(token, SECRET_KEY);
        if (data && data.active === false){
            const customerId = data.id;
            await Customer.findOneAndUpdate({ id: customerId }, { active: true });
            res.status(200).json("Email successfully verified!");
        }else{
            res.status(400).json("Error");
        }
        

    };

// const getCustomerProfile = async (req, res) => {
    
//         const decodedToken = jwt.verify(TokenCookie, SECRET_KEY); 
//         const customerId = decodedToken._id;
//         console.log(customerId);
//         await Customer.find(customerId)
//         .then((customer) => {

//             res.status(203).json(customer);
//         })
//         .catch((error) => {

//             res.status(404).json('customer not Found');
//         });
//     }


// const updateCustomerProfile = async (req, res) => {

//         const customerUpdate = req.body;
//         const decodedToken = jwt.verify(TokenCookie, SECRET_KEY); 
//         const customerId = decodedToken._id;
//         try {
//         const doc = await Customer.findByIdAndUpdate(customerId, customerUpdate);
//         if (doc) {
//             res.status(200).json("Customer updated");
//         } else {
//             res.status(401).json("Customer not found");
//         }
//         } catch (error) {
//         res.status(404).json("Customer not found");
//         }
// }
module.exports = {authCustomer, addCustomer, getAllCustomers, searchCustomer, getCustomer, deleteCustomer, updateCustomer, validateCustomerEmail }