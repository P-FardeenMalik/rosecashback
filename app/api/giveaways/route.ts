import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    // Calculate deadline dates
    const now = new Date();
    const deadline1 = new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000); // 15 days
    const deadline2 = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000); // 8 days
    const deadline3 = new Date(now.getTime() + 22 * 24 * 60 * 60 * 1000); // 22 days
    const deadline4 = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days

    // Return static giveaway data
    const giveaways = [
        {
            _id: '1',
            title: '$1000 Trading Competition',
            description: 'Trade $100,000 in volume across all exchanges to win a share of $1000 prize pool',
            icon: '🎁',
            targetType: 'volume',
            targetValue: 100000,
            reward: '$1000 Prize Pool',
            rewardAmount: 1000,
            deadline: deadline1.toISOString(),
            featured: true,
            status: 'active',
            userProgress: 65000,
            userStatus: 'active',
        },
        {
            _id: '2',
            title: 'Referral Challenge',
            description: 'Refer 5 new users who complete KYC and make their first trade',
            icon: '🏆',
            targetType: 'referral',
            targetValue: 5,
            reward: '$200 Bonus',
            rewardAmount: 200,
            deadline: deadline2.toISOString(),
            featured: false,
            status: 'active',
            userProgress: 2,
            userStatus: 'active',
        },
        {
            _id: '3',
            title: 'Multi-Exchange Trader',
            description: 'Trade on at least 4 different exchanges in the same month',
            icon: '⚡',
            targetType: 'exchange',
            targetValue: 4,
            reward: '$100 Bonus',
            rewardAmount: 100,
            deadline: deadline3.toISOString(),
            featured: false,
            status: 'active',
            userProgress: 6,
            userStatus: 'completed',
        },
        {
            _id: '4',
            title: 'Diamond Trader Status',
            description: 'Maintain $500,000+ monthly volume for 3 consecutive months',
            icon: '💎',
            targetType: 'custom',
            targetValue: 3,
            reward: 'VIP Status + 5% Bonus Rate',
            deadline: deadline4.toISOString(),
            featured: false,
            status: 'active',
            userProgress: 1,
            userStatus: 'active',
        },
    ];

    return NextResponse.json({
        success: true,
        giveaways,
    });
}
