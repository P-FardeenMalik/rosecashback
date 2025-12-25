# Rose Street Cashback Dashboard

A modern, full-stack web application for managing cryptocurrency trading cashback rewards. Built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

## Features

- 🔐 **Secure Authentication** - Login with Telegram ID and password
- 📊 **Dashboard Overview** - View stats, recent activity, and performance metrics
- ⚡ **Linked Exchanges** - Manage connections to Bybit, OKX, MEXC, BingX, Bitget, and LBank
- 📈 **Trading Volume Tracking** - Monitor trading volume across all exchanges
- 💰 **Cashback History** - Track all cashback payments and earnings
- 🎁 **Giveaways & Rewards** - Participate in promotional campaigns and tasks

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - Modern state management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (v6 or higher) - Running locally or a connection string to a remote instance
- **npm** or **yarn**

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd rosecashback
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory (it should already exist):
   ```env
   MONGODB_URI=mongodb://localhost:27017/rosecashback
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start MongoDB**:
   Make sure MongoDB is running on your system:
   ```bash
   # Windows (if installed as service)
   net start MongoDB
   
   # Or run manually
   mongod
   ```

5. **Seed the database**:
   Populate the database with test data:
   ```bash
   npm run seed
   ```

6. **Start the development server**:
   ```bash
   npm run dev
   ```

7. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Test Credentials

Use these credentials to log in:
- **Telegram ID**: `test`
- **Password**: `test`

## Project Structure

```
rosecashback/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   │   └── login/         # Login endpoint
│   │   ├── cashback/          # Cashback data endpoint
│   │   ├── exchanges/         # Exchanges endpoint
│   │   └── giveaways/         # Giveaways endpoint
│   ├── dashboard/             # Dashboard page
│   └── page.tsx               # Login page
├── components/
│   ├── sections/              # Dashboard sections
│   │   ├── CashbackSection.tsx
│   │   ├── ExchangesSection.tsx
│   │   ├── GiveawaysSection.tsx
│   │   ├── OverviewSection.tsx
│   │   └── VolumeSection.tsx
│   ├── Header.tsx             # Dashboard header
│   └── Sidebar.tsx            # Navigation sidebar
├── lib/
│   └── mongodb.ts             # MongoDB connection utility
├── models/                    # Mongoose models
│   ├── Cashback.ts
│   ├── Exchange.ts
│   ├── Giveaway.ts
│   └── User.ts
├── scripts/
│   └── seed.ts                # Database seeding script
└── public/                    # Static assets
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Exchanges
- `GET /api/exchanges` - Get all linked exchanges
- `POST /api/exchanges` - Link a new exchange

### Cashback
- `GET /api/cashback` - Get cashback history and stats

### Giveaways
- `GET /api/giveaways` - Get active giveaways with user progress

## Database Models

### User
- `telegramId` - Unique Telegram identifier
- `password` - Hashed password
- `name` - User's display name
- `email` - Optional email address
- `role` - User role (user/admin)

### Exchange
- `userId` - Reference to User
- `exchangeName` - Name of the exchange (Bybit, OKX, etc.)
- `uid` - User ID on the exchange
- `tradingVolume` - Total trading volume
- `cashbackRate` - Cashback percentage
- `totalEarned` - Total cashback earned
- `status` - Connection status

### Cashback
- `userId` - Reference to User
- `exchangeId` - Reference to Exchange
- `exchangeName` - Name of the exchange
- `tradingVolume` - Trading volume for this payment
- `cashbackRate` - Applied cashback rate
- `amount` - Cashback amount
- `status` - Payment status (pending/paid/cancelled)
- `paidAt` - Payment date

### Giveaway
- `title` - Giveaway title
- `description` - Detailed description
- `targetType` - Type of target (volume/referral/exchange/custom)
- `targetValue` - Target value to complete
- `reward` - Reward description
- `deadline` - Completion deadline
- `featured` - Featured status

### UserGiveaway
- `userId` - Reference to User
- `giveawayId` - Reference to Giveaway
- `progress` - Current progress
- `status` - Participation status (active/completed/claimed)

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

### Re-seeding the Database
```bash
npm run seed
```

## Features in Detail

### Dashboard Overview
- Quick stats showing linked exchanges, total volume, cashback earned, and active giveaways
- Recent activity feed
- Monthly performance metrics

### Linked Exchanges
- View all connected exchanges
- See trading volume, cashback rate, and total earnings per exchange
- Beautiful gradient cards for each exchange

### Trading Volume
- Overall trading volume summary
- Detailed breakdown by exchange
- Daily, weekly, and monthly volume statistics
- Trend indicators

### Cashback History
- Total cashback received (all-time and monthly)
- Pending cashback amount
- Complete payment history table
- Filter by exchange and time period

### Giveaways & Rewards
- Active promotional campaigns
- Progress tracking for each giveaway
- Featured giveaways highlighted
- Completed giveaways history

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Client-side route protection
- Secure token storage

## Customization

### Changing MongoDB Connection
Edit `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rosecashback
```

### Adding New Exchanges
1. Update the `exchangeName` enum in `models/Exchange.ts`
2. Add the exchange data in the seed script
3. Update the UI components as needed

### Modifying Cashback Rates
Edit the seed script in `scripts/seed.ts` to change default cashback rates.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check the connection string in `.env.local`
- Verify MongoDB is accessible on the specified port

### Port Already in Use
If port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Database Not Seeding
- Ensure MongoDB is running
- Check for connection errors in the console
- Try running the seed script again: `npm run seed`

## Future Enhancements

- Real-time exchange API integration
- Email notifications for cashback payments
- Advanced analytics and charts
- Mobile responsive improvements
- Admin panel for managing users and giveaways
- Referral system implementation
- Multi-language support

## License

This project is private and proprietary.

## Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ for Rose Street Cashback**
