# Quick Setup Guide

## Step 1: Start MongoDB

Make sure MongoDB is running on your system. Open a new terminal and run:

```bash
# Windows (if installed as service)
net start MongoDB

# Or if you need to start it manually
mongod
```

## Step 2: Seed the Database

In a new terminal, navigate to the project directory and run:

```bash
cd d:\Projects\rosecashback
npm run seed
```

This will create:
- A test user with credentials: `test` / `test`
- 6 linked exchanges (Bybit, OKX, MEXC, BingX, Bitget, LBank)
- Sample cashback payment history
- Active giveaways with progress tracking

## Step 3: Access the Application

The application is already running at: **http://localhost:3002**

### Login Credentials
- **Telegram ID**: `test`
- **Password**: `test`

## What You'll See

### Login Page ✅
- Modern glassmorphism design
- Animated gradient background
- Telegram ID and password fields
- Demo credentials displayed

### Dashboard Features
Once logged in, you'll have access to:

1. **Overview Section**
   - Stats cards showing linked exchanges, total volume, cashback earned, and active giveaways
   - Recent activity feed
   - Monthly performance metrics

2. **Linked Exchanges**
   - All 6 connected exchanges displayed as cards
   - Trading volume, cashback rate, and total earned for each
   - Beautiful gradient designs for each exchange

3. **Trading Volume**
   - Overall trading volume summary
   - Detailed breakdown table
   - Daily, weekly, and monthly statistics
   - Trend indicators

4. **Cashback History**
   - Total cashback received (all-time and monthly)
   - Pending cashback amount
   - Complete payment history table
   - Filter options by exchange and time period

5. **Giveaways & Rewards**
   - Active promotional campaigns
   - Progress bars for each giveaway
   - Featured giveaways highlighted
   - Completed giveaways history

## Next Steps

1. **Seed the database** (if not done yet): `npm run seed`
2. **Login** with test/test credentials
3. **Explore** all dashboard sections
4. **Customize** the data in `scripts/seed.ts` as needed

## Troubleshooting

### MongoDB Not Running
If you see connection errors, make sure MongoDB is running:
```bash
mongod
```

### Port Already in Use
The app is running on port 3002 (since 3000 was in use). This is normal.

### Database Not Seeding
Make sure MongoDB is running before running the seed script.

## Production Deployment

Before deploying to production:

1. Update `.env.local` with production MongoDB URI
2. Change the JWT_SECRET to a secure random string
3. Run `npm run build` to create production build
4. Deploy to your hosting platform (Vercel, Netlify, etc.)

---

**Ready to go! 🚀**
