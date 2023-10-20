const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');
const SECRET_KEY = process.env.JWT_SECRET;

const generateJwt = ((id,time) => {
    return jwt.sign({id}, SECRET_KEY, {expiresIn: time+'d'});
});


const authCustomer = async (req, res) => {
    const { email, password } = req.body;
    const customerFound = await Customer.findOne({ email });

    if (customerFound && (await bcrypt.compareSync(password, customerFound.password))) {
        if (customerFound.active) {
            let token = generateJwt(customerFound._id,3);
            let refreshToken = generateJwt(customerFound._id,12);
            console.log(token);
            res.status(200).json({ "access_token": token , "refreshtoken" : refreshToken});
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

    const newCustomer = await new Customer({
        first_name : first_name,
        last_name : last_name,
        email : email,
        password : hash_password,
    });

        newCustomer.save()
        .then((newCustomer) => {

            const link = "www.youtube.com"

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'p27895102@gmail.com',
                pass: 'medw imoh xvzw lmol'
                }
            });

            var mailOptions = {
                from: 'Prestigious',
                to: email,
                subject: 'Account Verification',
                text: 'Hi you can verify your account by clicking the button bellow',
                html: `<button><a href="${link}">Click here to verify</a></button>`
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
        const user = req.query;
        console.log(Customer);
        const customers = await Customer.find({ first_name: user.first_name }).sort({ first_name: -1 });
        
        if (customers.length === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        
        res.json(customers);
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
        let idCostumer = req.params.id;
        Customer.findByIdAndDelete(idCostumer)
        .then((customer) => {
            res.status(200).json("customer deleted successfully");
        })
        .catch((error) => {
            res.status(404).json("invalid customer id");
        })
    }

    const updateCustomer = async (req, res) => {
        const idCustomer = req.params.id;
        const customerUpdate = req.body;
    
        try {
        const doc = await Customer.findByIdAndUpdate(idCustomer, customerUpdate);
        if (doc) {
            res.status(200).json("Customer updated");
        } else {
            res.status(404).json("Customer not found");
        }
        } catch (error) {
        console.error('Error updating customer:', error);
        res.status(404).json("Customer not found");
        }
    };

    // const getCustomerProfile = async (req, res) => {
    //     const TokenCookie = req.cookies.token; 
    //     console.log(TokenCookie);
    //     if (!TokenCookie) {
    //         return res.status(401).json({ error: 'You must login' });
    //     }
    //     const decodedToken = jwt.verify(TokenCookie, SECRET_KEY); 
    //     const customerId = decodedToken._id;
    //     console.log(customerId);
    //     await Customer.find(customerId)
    //     .then((customer) => {
    
    //         res.status(203).json(customer);
    //     })
    //     .catch((error) => {
    
    //         res.status(404).json('customer not Found');
    //     });
    // }
    
module.exports = {authCustomer, addCustomer, getAllCustomers, searchCustomer, getCustomer, deleteCustomer, updateCustomer}