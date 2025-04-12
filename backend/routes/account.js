import express from 'express';
import { authMiddleware } from '../middleware.js';
import { Account } from '../db.js';
import mongoose from 'mongoose';


const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {

   

    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        return res.status(404).json({ error: 'Account not found' });
    }

    res.json({
        balance: account.balance
    });
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
        const { amount, to } = req.body;

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Insufficient balance' });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ error: 'Account not found / Invalid account' });
        }

        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } },
            { session }
        );

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();
        console.log("Transfer successful:", { from: req.userId, to, amount });
        return res.json({ message: 'Transfer successful' });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transaction Error:", error);
        return res.status(500).json({ error: 'Transaction failed' });
    }
});

export { router };