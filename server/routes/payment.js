const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: 'rzp_test_SorQbuRg24Cbkt',
    key_secret: 'TxnZuaR2PJi5vldCA20nMiVF'
});

// Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;

        const options = {
            amount: amount * 100,        // paise mein convert
            currency: currency,
            receipt: "receipt_" + Date.now(),
        };

        const order = await razorpay.orders.create(options);

        res.json({
            success: true,
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Verify Payment
router.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const crypto = require('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', 'TxnZuaR2PJi5vldCA20nMiVF')
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            // Payment successful - yahan database mein order save kar sakte ho
            res.json({ success: true, message: "Payment Verified Successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid Signature" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;