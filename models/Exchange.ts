import mongoose, { Schema, Model } from 'mongoose';

export interface IExchange {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    exchangeName: string;
    uid: string;
    tradingVolume: number;
    cashbackRate: number;
    totalEarned: number;
    status: 'connected' | 'disconnected';
    createdAt: Date;
    updatedAt: Date;
}

const ExchangeSchema = new Schema<IExchange>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        exchangeName: {
            type: String,
            required: true,
            enum: ['Bybit', 'OKX', 'MEXC', 'BingX', 'Bitget', 'LBank'],
        },
        uid: {
            type: String,
            required: true,
        },
        tradingVolume: {
            type: Number,
            default: 0,
        },
        cashbackRate: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        totalEarned: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['connected', 'disconnected'],
            default: 'connected',
        },
    },
    {
        timestamps: true,
    }
);

export default (mongoose.models.Exchange as Model<IExchange>) || mongoose.model<IExchange>('Exchange', ExchangeSchema);
