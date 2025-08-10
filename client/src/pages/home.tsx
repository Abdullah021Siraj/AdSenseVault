import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdSenseZone from "@/components/layout/AdSenseZone";
import LoanCalculator from "@/components/calculators/LoanCalculator";
import MortgageCalculator from "@/components/calculators/MortgageCalculator";
import InvestmentCalculator from "@/components/calculators/InvestmentCalculator";
import LoanComparison from "@/components/comparison/LoanComparison";
import FinancialGuides from "@/components/guides/FinancialGuides";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { trackEvent } from "@/lib/analytics";

export default function Home() {
  const [userData, setUserData] = useLocalStorage('userData', {
    lastVisit: new Date().toISOString(),
    visitCount: 0,
    preferredCalculators: ['loan', 'mortgage'],
    theme: 'default'
  });

  useEffect(() => {
    // Cache user data and increment visit count
    setUserData(prev => ({
      ...prev,
      lastVisit: new Date().toISOString(),
      visitCount: prev.visitCount + 1
    }));

    // Track page view
    trackEvent('page_view', 'home', 'landing');
  }, [setUserData]);

  const handleCalculatorClick = (calculatorType: string) => {
    trackEvent('calculator_interaction', 'engagement', calculatorType);
  };

  const handleNewsletterSignup = () => {
    trackEvent('newsletter_signup', 'conversion', 'email_form');
  };

  return (
    <>
      <Helmet>
        <title>SmartFinance Pro - Free Financial Planning Tools & Calculators | Compare Loans, Investments & Insurance</title>
        <meta name="description" content="Free financial planning tools and calculators. Compare loans, mortgages, investments and insurance rates. Save thousands with our expert financial guidance and comparison tools for 2025." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* AdSense Top Banner */}
        <AdSenseZone 
          type="banner" 
          size="728x90" 
          className="w-full bg-gray-100 py-4"
          label="Premium Financial Ads"
        />

        <Header />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16" data-testid="hero-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight" data-testid="hero-title">
                  Smart Financial Planning Made Simple
                </h1>
                <p className="text-xl mb-8 text-blue-100" data-testid="hero-description">
                  Free calculators and comparison tools to save you thousands on loans, investments, and insurance. Trusted by over 500,000+ users.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="bg-green-500 px-3 py-1 rounded-full">✓ 100% Free</span>
                  <span className="bg-blue-600 px-3 py-1 rounded-full">✓ No Registration</span>
                  <span className="bg-purple-600 px-3 py-1 rounded-full">✓ Instant Results</span>
                </div>
              </div>
              
              {/* Featured Loan Calculator */}
              <div className="bg-white rounded-xl shadow-2xl p-6 text-gray-900">
                <LoanCalculator featured={true} />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="bg-white py-8 border-b" data-testid="trust-indicators">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-green-500">🛡️</span>
                <span className="font-medium">Bank-Level Security</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-blue-500">⭐</span>
                <span className="font-medium">4.9/5 User Rating</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-purple-500">📊</span>
                <span className="font-medium">500K+ Calculations</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-red-500">🏆</span>
                <span className="font-medium">Featured in Forbes</span>
              </div>
            </div>
          </div>
        </section>

        {/* AdSense In-Article Ad */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AdSenseZone 
            type="rectangle" 
            size="336x280" 
            className="text-center py-8"
            label="Financial Products"
          />
        </div>

        {/* Calculator Grid */}
        <section id="calculators" className="py-16 bg-gray-50" data-testid="calculators-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Financial Calculators</h2>
              <p className="text-xl text-gray-600">Choose from our comprehensive suite of financial planning tools</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mortgage Calculator */}
              <Card className="calculator-card hover:shadow-xl transition-shadow" data-testid="card-mortgage">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold mb-3">Mortgage Calculator</h3>
                  <p className="text-gray-600 mb-4">Calculate monthly payments, total interest, and compare mortgage options.</p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleCalculatorClick('mortgage')}
                    data-testid="button-mortgage-calculator"
                  >
                    Calculate Mortgage
                  </Button>
                </CardContent>
              </Card>

              {/* Investment Calculator */}
              <Card className="calculator-card hover:shadow-xl transition-shadow" data-testid="card-investment">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-xl font-semibold mb-3">Investment Growth</h3>
                  <p className="text-gray-600 mb-4">Project investment returns with compound interest calculations.</p>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleCalculatorClick('investment')}
                    data-testid="button-investment-calculator"
                  >
                    Calculate Returns
                  </Button>
                </CardContent>
              </Card>

              {/* Retirement Calculator */}
              <Card className="calculator-card hover:shadow-xl transition-shadow" data-testid="card-retirement">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold mb-3">Retirement Planner</h3>
                  <p className="text-gray-600 mb-4">Plan your retirement savings and calculate required contributions.</p>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleCalculatorClick('retirement')}
                    data-testid="button-retirement-calculator"
                  >
                    Plan Retirement
                  </Button>
                </CardContent>
              </Card>

              {/* Credit Card Payoff */}
              <Card className="calculator-card hover:shadow-xl transition-shadow" data-testid="card-credit-card">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">💳</div>
                  <h3 className="text-xl font-semibold mb-3">Credit Card Payoff</h3>
                  <p className="text-gray-600 mb-4">Calculate payoff time and interest savings strategies.</p>
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => handleCalculatorClick('credit_card')}
                    data-testid="button-credit-calculator"
                  >
                    Calculate Payoff
                  </Button>
                </CardContent>
              </Card>

              {/* Auto Loan Calculator */}
              <Card className="calculator-card hover:shadow-xl transition-shadow" data-testid="card-auto-loan">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold mb-3">Auto Loan Calculator</h3>
                  <p className="text-gray-600 mb-4">Compare car loan options and calculate monthly payments.</p>
                  <Button 
                    className="w-full bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleCalculatorClick('auto_loan')}
                    data-testid="button-auto-calculator"
                  >
                    Calculate Payment
                  </Button>
                </CardContent>
              </Card>

              {/* Savings Calculator */}
              <Card className="calculator-card hover:shadow-xl transition-shadow" data-testid="card-savings">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">🏦</div>
                  <h3 className="text-xl font-semibold mb-3">Savings Growth</h3>
                  <p className="text-gray-600 mb-4">Track savings growth with regular deposits and interest.</p>
                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => handleCalculatorClick('savings')}
                    data-testid="button-savings-calculator"
                  >
                    Calculate Growth
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <LoanComparison />
              
              {/* AdSense Rectangle */}
              <div className="my-8">
                <AdSenseZone 
                  type="rectangle" 
                  size="300x250" 
                  className="text-center py-6"
                  label="Loan Offers"
                />
              </div>

              <FinancialGuides />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* AdSense Sidebar */}
                <AdSenseZone 
                  type="sidebar" 
                  size="300x600" 
                  className="text-center py-12"
                  label="Financial Services"
                />

                {/* Quick Tools */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Quick Tools</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start" data-testid="button-budget-calculator">
                        📊 Budget Calculator
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-salary-calculator">
                        💰 Salary Calculator
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-roi-calculator">
                        📈 ROI Calculator
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-cd-calculator">
                        🏦 CD Calculator
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">💡 Financial Tips Weekly</h3>
                    <p className="text-green-100 text-sm mb-4">Get expert money-saving tips and market insights delivered to your inbox.</p>
                    <Input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="mb-3 text-gray-900"
                      data-testid="input-newsletter-email"
                    />
                    <Button 
                      className="w-full bg-white text-green-600 hover:bg-gray-100"
                      onClick={handleNewsletterSignup}
                      data-testid="button-newsletter-signup"
                    >
                      Subscribe Free
                    </Button>
                    <p className="text-xs text-green-200 mt-2">No spam. Unsubscribe anytime.</p>
                  </CardContent>
                </Card>

                {/* Sidebar Ad 2 */}
                <AdSenseZone 
                  type="rectangle" 
                  size="300x250" 
                  className="text-center py-8"
                  label="Investment Opportunities"
                />
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {/* AdSense Footer Banner */}
        <AdSenseZone 
          type="banner" 
          size="728x90" 
          className="w-full bg-gray-100 py-4"
          label="Financial Products Footer"
        />
      </div>
    </>
  );
}
