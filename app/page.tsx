'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [telegramId, setTelegramId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌹</span>
              <span className="text-base sm:text-lg md:text-xl font-bold">Rose Street Cashback</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">How to join</a>
              <a href="#trade-history" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">Trade History</a>
              <a href="#customer-feedback" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">Feedback</a>
              <a href="#team" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">About us</a>
              <a href="https://t.me/RoseCashbackGuide/15" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm xl:text-base">Guide</a>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-[#00ff88] text-black px-4 xl:px-6 py-2 rounded-lg font-semibold hover:bg-[#00dd77] transition-all text-sm xl:text-base"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-[#00ff88] text-black px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-[#00dd77] transition-all text-sm"
              >
                Login
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {showMobileMenu ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="lg:hidden mt-4 pb-4 space-y-2 border-t border-gray-800 pt-4">
              <a href="#how-it-works" onClick={() => setShowMobileMenu(false)} className="block text-gray-300 hover:text-white transition-colors py-2 px-2 rounded hover:bg-gray-800">How to join</a>
              <a href="#trade-history" onClick={() => setShowMobileMenu(false)} className="block text-gray-300 hover:text-white transition-colors py-2 px-2 rounded hover:bg-gray-800">Trade History</a>
              <a href="#customer-feedback" onClick={() => setShowMobileMenu(false)} className="block text-gray-300 hover:text-white transition-colors py-2 px-2 rounded hover:bg-gray-800">Feedback</a>
              <a href="#team" onClick={() => setShowMobileMenu(false)} className="block text-gray-300 hover:text-white transition-colors py-2 px-2 rounded hover:bg-gray-800">About us</a>
              <a href="https://t.me/RoseCashbackGuide/15" target="_blank" rel="noopener noreferrer" className="block text-gray-300 hover:text-white transition-colors py-2 px-2 rounded hover:bg-gray-800">Guide & more details</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Gradient glow effects */}
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight px-4">
              ROSE STREET CASHBACK
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3 sm:mb-4 px-4">
              Earn up to <span className="text-[#00ff88] font-bold">50% cashback</span> on your trading fees
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 px-4">
              <span className="text-[#00ff88]">Bybit, OKX, MEXC, BingX, Bitget & LBank</span>
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              How it works? As an official partner of leading exchanges, we receive exclusive commission rates.
              Instead of keeping it all, we share it with you. For every $100 in trading fees you pay, you can
              receive up to $50 back — directly to your wallet. Start saving more with every trade. Join Rose Street Cashback today!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00ff88] mb-2">&gt; $2B</div>
              <div className="text-sm sm:text-base text-gray-400">Monthly trading volume</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-[#00ff88] mb-2">&gt; $200K</div>
              <div className="text-sm sm:text-base text-gray-400">Monthly paid out</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-6 text-center sm:col-span-2 lg:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold text-[#00ff88] mb-2">1000++</div>
              <div className="text-sm sm:text-base text-gray-400">Cashback members</div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section id="how-it-works" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">HOW TO JOIN</h2>
            <p className="text-lg sm:text-xl text-gray-400">3 easy steps</p>
          </div>

          {/* Step 1 */}
          <div className="mb-12 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-block bg-[#00ff88] text-black px-4 sm:px-6 py-2 rounded-full font-bold mb-4 text-sm sm:text-base">Step 1</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 px-4">Register Account</h3>
              <p className="text-sm sm:text-base text-gray-400 px-4">Use the referral links below or input ref code to create an account on one or more exchanges.</p>
            </div>

            {/* Exchange Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {[
                { name: 'Bybit', logo: '/logos/bybit.webp' },
                { name: 'OKX', logo: '/logos/okx.webp' },
                { name: 'MEXC', logo: '/logos/mexc.webp' },
                { name: 'BingX', logo: '/logos/bingx.webp' },
                { name: 'Bitget', logo: '/logos/bitget.jpg' },
                { name: 'LBank', logo: '/logos/lbank.jpg' },
              ].map((exchange) => (
                <div key={exchange.name} className="group cursor-pointer">
                  <div className="bg-white rounded-2xl aspect-square flex items-center justify-center transform transition-all group-hover:scale-105 group-hover:shadow-2xl overflow-hidden">
                    <img
                      src={exchange.logo}
                      alt={`${exchange.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center mt-3 text-sm sm:text-base text-gray-300 font-semibold">{exchange.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-12 sm:mb-20">
            <div className="text-center mb-6 sm:mb-8 px-4">
              <div className="inline-block bg-[#00ff88] text-black px-4 sm:px-6 py-2 rounded-full font-bold mb-4 text-sm sm:text-base">Step 2</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Verification</h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto">
                After registering, complete the KYC process and make a deposit into your account. Next, fill out the{' '}
                <a href="https://forms.gle/zmTJw1JnhB2MiMe7A" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">
                  registration form
                </a>{' '}
                and send your account UID to{' '}
                <a href="https://t.me/cookingfood" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">
                  Rose Admin Support
                </a>{' '}
                @cookingfood to finalize your cashback enrollment and receive an invitation to the Rose Street community.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="text-center mb-6 sm:mb-8 px-4">
              <div className="inline-block bg-[#00ff88] text-black px-4 sm:px-6 py-2 rounded-full font-bold mb-4 text-sm sm:text-base">Step 3</div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Join and Get Paid</h3>
              <p className="text-sm sm:text-base text-gray-400 max-w-3xl mx-auto">
                Once you've joined our community, please follow all community guidelines to maintain your membership status.
                Your cashback will be processed either monthly or daily, depending on the exchange you registered with (as described in Step 1).
                For detailed instructions and FAQs, please check them out{' '}
                <a href="https://t.me/RoseCashbackGuide/15" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">
                  HERE
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trade History Section */}
      <section id="trade-history" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 px-4">The Collection of Trading Setups by Rose Street</h2>
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-base sm:text-lg text-gray-400">Filter By Date</p>
            <p className="text-gray-500 mt-6 sm:mt-8">No data!</p>
          </div>
        </div>
      </section>

      {/* Customer Feedback Section */}
      <section id="customer-feedback" className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 px-4">Customer Feedback & Cashback Payment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 aspect-square flex items-center justify-center">
                <p className="text-sm sm:text-base text-gray-500">Feedback Screenshot {i}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="team" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">ROSE STREET</h2>
          <div className="space-y-4 sm:space-y-6 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              Originally launched in 2017 as Rose Premium Channel, we rebranded to ROSE STREET in 2024 to reflect our broader vision and growing global community.
              ROSE STREET is a community-driven initiative with a strong presence in the cryptocurrency and blockchain space. Here's what defines us:
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">1. Community Engagement:</h3>
                <p>ROSE STREET is dedicated to building and maintaining a strong community of members who are interested in cryptocurrency trading.</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">2. Education & Insights:</h3>
                <p>Our community shares market knowledge through technical and fundamental analysis, trading guides, and real-time insights to help members grow with confidence.</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">3. Cashback Program:</h3>
                <p>The Rose Cashback service refunds up to 50% of your trading fees based on referral commissions from top exchanges. It's our way of helping you save more with every trade.</p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">4. Private Membership:</h3>
                <p>ROSE STREET is a free and open community. By joining our cashback program, you'll gain access to our private group and exclusive member benefits.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">Contact us</h3>
              <a href="https://t.me/cookingfood" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline flex items-center gap-2 text-sm sm:text-base">
                <span>📱</span> Telegram
              </a>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-4">Community</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline block">X (Twitter)</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline block">Telegram Public Channel</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline block">Telegram Support Group</a>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 pt-6 sm:pt-8 border-t border-gray-800 text-sm sm:text-base">
            <p>&copy; 2025 Rose Street Cashback. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowLoginModal(false)}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Login to Dashboard</h2>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Telegram ID</label>
                <input
                  type="text"
                  value={telegramId}
                  onChange={(e) => setTelegramId(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your Telegram ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00ff88] focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#00ff88] text-black py-3 px-6 rounded-lg font-semibold hover:bg-[#00dd77] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              <p className="text-center text-sm text-gray-400">
                Demo: <span className="text-[#00ff88]">rose / rose</span>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
