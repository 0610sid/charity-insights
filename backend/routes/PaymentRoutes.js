if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const Razorpay = require('razorpay');

const router = express.Router()

const razorpay = new Razorpay({
    key_id: process.env.RZP_ID,
    key_secret: process.env.RZP_SECRET,
  });

router.post('/create/order', async (req, res) => {
    try {

        const order = await razorpay.orders.create(
            {
                amount : req.body.amount + '00',
                currency : 'INR'
            }
        );
        res.json({ order_id: order.id });
        
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

module.exports = router