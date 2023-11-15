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
        if (customerFound.active) {
            let token = jwt.sign({ _id: customerFound._id }, SECRET_KEY,{ expiresIn: '3d' });
            let refreshToken = jwt.sign({ _id: customerFound._id }, SECRET_KEY,{ expiresIn: '12d' });
            res.status(200).json({ "access_token": token , "refreshtoken" : refreshToken,"status" : 200, "customer": customerFound});
        } else {
            res.status(401).json('Account is not active');
        }
    } else {
        res.status(401).json('Invalid email or password');
    }
}


const addCustomer = async (req, res) => {
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

            const link = "http://localhost:3001/customers/validate"

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'amineelbouzidi36@gmail.com',
                pass: 'pyeo ktfq qefd qahk'
                }
            });

            var mailOptions = {
                from: 'Prestigious',
                to: email,
                subject: 'Account Verification',
                html: `
                <div style="background-image: url('https://www.canva.com/design/DAFyMVbE2wY/view')"></div>
                <p>Dear ${newCustomer.first_name},

                Thank you for registering with Prestigious. We're excited to have you join our community! To ensure the security and authenticity of our members, please click the link below to verify your email address.
                <br>
                <div style="text-align: center; background-color: light-green">
                <button ><a href="${link}">Click here to verify</a></button>
                </div>
                <br>
                If you have any issues or questions, don't hesitate to reach out to our support team.
                
                Warm regards,
                
                Prestigious Team</p> `
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
              console.log(newImage)
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
              res.status(404).json("Customer not found");
              console.log(error);
            }
        
    };
    

    
    
    const validateCustomerEmail = async (req, res) => {
        const token = req.header('Authorization');
            if (!token) {
                res.status(404).json("Not Autorized");
            }
            //const tokenaccess = token.startsWith('Bearer ').slice(7) ;
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
        

    //     const link = "http://localhost:3001/customers/validate"

    //     let transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //         user: 'p27895102@gmail.com',
    //         pass: 'medw imoh xvzw lmol'
    //         }
    //     });

    //     var mailOptions = {
    //         from: 'Prestigious',
    //         to: req.body.email,
    //         subject: 'Email Verification',
    //         text: 'Hi you can verify your account by clicking the button bellow',
    //         html: `<button><a href="${link}">Click here to verify</a></button>`
    //     };
    //     try {
    //         const customer = await Customer.findOne({ _id: req.params.id });

    //         if (!customer) {
    //             return res.status(400).json("Customer not found");
    //         }

    //         if (customer.active) {
    //             return res.status(400).json("Email Already verified");
    //         }

        
    //         if(transporter.sendMail(mailOptions)){
    //             await Customer.findOneAndUpdate({ email: req.body.email }, { active: true });

    //             return res.status(200).json("Email successfully verified!");
    //         }else {

    //             res.status(400).json("Error sending verification");
    //         }
        
    // } catch (error) {
    //     console.error('Error validating customer email:', error);
    //     return res.status(500).json("Internal Server Error");
    // }
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