import mongoose, { Schema, Model } from 'mongoose';

export interface ICashback {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    exchangeId: mongoose.Types.ObjectId;
    exchangeName: string;
    tradingVolume: number;
    cashbackRate: number;
    amount: number;
    status: 'pending' | 'paid' | 'cancelled';
    paidAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const CashbackSchema = new Schema<ICashback>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        exchangeId: {
            type: Schema.Types.ObjectId,
            ref: 'Exchange',
            required: true,
        },
        exchangeName: {
            type: String,
            required: true,
        },
        tradingVolume: {
            type: Number,
            required: true,
        },
        cashbackRate: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'cancelled'],
            default: 'pending',
        },
        paidAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.Cashback as Model<ICashback>) || mongoose.model<ICashback>('Cashback', CashbackSchema);
