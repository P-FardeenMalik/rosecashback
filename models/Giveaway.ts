import mongoose, { Schema, Model } from 'mongoose';

export interface IGiveaway {
    _id: mongoose.Types.ObjectId;
    title: string;
    description: string;
    icon: string;
    targetType: 'volume' | 'referral' | 'exchange' | 'custom';
    targetValue: number;
    reward: string;
    rewardAmount?: number;
    deadline: Date;
    featured: boolean;
    status: 'active' | 'completed' | 'expired';
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserGiveaway {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    giveawayId: mongoose.Types.ObjectId;
    progress: number;
    status: 'active' | 'completed' | 'claimed';
    completedAt?: Date;
    claimedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const GiveawaySchema = new Schema<IGiveaway>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            default: '🎁',
        },
        targetType: {
            type: String,
            enum: ['volume', 'referral', 'exchange', 'custom'],
            required: true,
        },
        targetValue: {
            type: Number,
            required: true,
        },
        reward: {
            type: String,
            required: true,
        },
        rewardAmount: {
            type: Number,
        },
        deadline: {
            type: Date,
            required: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'expired'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    }
);

const UserGiveawaySchema = new Schema<IUserGiveaway>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        giveawayId: {
            type: Schema.Types.ObjectId,
            ref: 'Giveaway',
            required: true,
        },
        progress: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'claimed'],
            default: 'active',
        },
        completedAt: {
            type: Date,
        },
        claimedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export const Giveaway = (mongoose.models.Giveaway as Model<IGiveaway>) || mongoose.model<IGiveaway>('Giveaway', GiveawaySchema);
export const UserGiveaway = (mongoose.models.UserGiveaway as Model<IUserGiveaway>) || mongoose.model<IUserGiveaway>('UserGiveaway', UserGiveawaySchema);
