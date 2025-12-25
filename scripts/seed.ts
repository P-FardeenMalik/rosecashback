import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dbConnect from '../lib/mongodb';
import User from '../models/User';
import Exchange from '../models/Exchange';
import Cashback from '../models/Cashback';
import { Giveaway, UserGiveaway } from '../models/Giveaway';

async function seed() {
    try {
        await dbConnect();
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Exchange.deleteMany({});
        await Cashback.deleteMany({});
        await Giveaway.deleteMany({});
        await UserGiveaway.deleteMany({});
        console.log('Cleared existing data');

        // Create test user
        const hashedPassword = await bcrypt.hash('test', 10);
        const user = await User.create({
            telegramId: 'test',
            password: hashedPassword,
            name: 'Test User',
            email: 'test@rosecashback.com',
            role: 'user',
        });
        console.log('Created test user');

        // Create exchanges
        const exchanges = await Exchange.create([
            {
                userId: user._id,
                exchangeName: 'Bybit',
                uid: 'BYBIT123456',
                tradingVolume: 850000,
                cashbackRate: 50,
                totalEarned: 4250,
                status: 'connected',
            },
            {
                userId: user._id,
                exchangeName: 'OKX',
                uid: 'OKX789012',
                tradingVolume: 620000,
                cashbackRate: 45,
                totalEarned: 2790,
                status: 'connected',
            },
            {
                userId: user._id,
                exchangeName: 'MEXC',
                uid: 'MEXC345678',
                tradingVolume: 450000,
                cashbackRate: 40,
                totalEarned: 1800,
                status: 'connected',
            },
            {
                userId: user._id,
                exchangeName: 'BingX',
                uid: 'BINGX901234',
                tradingVolume: 320000,
                cashbackRate: 45,
                totalEarned: 1440,
                status: 'connected',
            },
            {
                userId: user._id,
                exchangeName: 'Bitget',
                uid: 'BITGET567890',
                tradingVolume: 280000,
                cashbackRate: 42,
                totalEarned: 1176,
                status: 'connected',
            },
            {
                userId: user._id,
                exchangeName: 'LBank',
                uid: 'LBANK123456',
                tradingVolume: 180000,
                cashbackRate: 38,
                totalEarned: 684,
                status: 'connected',
            },
        ]);
        console.log('Created exchanges');

        // Create cashback history
        const cashbackHistory = [];
        const dates = [
            new Date('2025-12-20'),
            new Date('2025-12-15'),
            new Date('2025-12-10'),
            new Date('2025-12-05'),
            new Date('2025-12-01'),
            new Date('2025-11-28'),
            new Date('2025-11-25'),
            new Date('2025-11-20'),
        ];

        exchanges.forEach((exchange, index) => {
            if (index < dates.length) {
                cashbackHistory.push({
                    userId: user._id,
                    exchangeId: exchange._id,
                    exchangeName: exchange.exchangeName,
                    tradingVolume: 50000 - index * 5000,
                    cashbackRate: exchange.cashbackRate,
                    amount: Math.floor((50000 - index * 5000) * (exchange.cashbackRate / 100) * 0.01),
                    status: 'paid',
                    paidAt: dates[index],
                    createdAt: dates[index],
                });
            }
        });

        await Cashback.create(cashbackHistory);
        console.log('Created cashback history');

        // Create giveaways
        const giveaways = await Giveaway.create([
            {
                title: '$1000 Trading Competition',
                description: 'Trade $100,000 in volume across all exchanges to win a share of $1000 prize pool',
                icon: '🎁',
                targetType: 'volume',
                targetValue: 100000,
                reward: '$1000 Prize Pool',
                rewardAmount: 1000,
                deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                featured: true,
                status: 'active',
            },
            {
                title: 'Referral Challenge',
                description: 'Refer 5 new users who complete KYC and make their first trade',
                icon: '🏆',
                targetType: 'referral',
                targetValue: 5,
                reward: '$200 Bonus',
                rewardAmount: 200,
                deadline: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
                featured: false,
                status: 'active',
            },
            {
                title: 'Multi-Exchange Trader',
                description: 'Trade on at least 4 different exchanges in the same month',
                icon: '⚡',
                targetType: 'exchange',
                targetValue: 4,
                reward: '$100 Bonus',
                rewardAmount: 100,
                deadline: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
                featured: false,
                status: 'active',
            },
            {
                title: 'Diamond Trader Status',
                description: 'Maintain $500,000+ monthly volume for 3 consecutive months',
                icon: '💎',
                targetType: 'custom',
                targetValue: 3,
                reward: 'VIP Status + 5% Bonus Rate',
                deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                featured: false,
                status: 'active',
            },
        ]);
        console.log('Created giveaways');

        // Create user giveaway progress
        await UserGiveaway.create([
            {
                userId: user._id,
                giveawayId: giveaways[0]._id,
                progress: 65000,
                status: 'active',
            },
            {
                userId: user._id,
                giveawayId: giveaways[1]._id,
                progress: 2,
                status: 'active',
            },
            {
                userId: user._id,
                giveawayId: giveaways[2]._id,
                progress: 6,
                status: 'completed',
                completedAt: new Date(),
            },
            {
                userId: user._id,
                giveawayId: giveaways[3]._id,
                progress: 1,
                status: 'active',
            },
        ]);
        console.log('Created user giveaway progress');

        console.log('\n✅ Database seeded successfully!');
        console.log('\nTest credentials:');
        console.log('Telegram ID: test');
        console.log('Password: test');

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
