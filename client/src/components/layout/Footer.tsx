import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  const handleFooterLinkClick = (linkName: string) => {
    trackEvent('footer_link', 'engagement', linkName);
  };

  const handleSocialClick = (platform: string) => {
    trackEvent('social_link', 'engagement', platform);
  };

  return (
    <footer className="bg-gray-900 text-white py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold mb-4" data-testid="footer-logo">
              💰 SmartFinance Pro
            </div>
            <p className="text-gray-400 mb-6">
              Empowering smart financial decisions through free tools and expert guidance. Save money, build wealth, secure your future.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleSocialClick('facebook')}
                className="text-gray-400 hover:text-white"
                data-testid="social-facebook"
              >
                📘 Facebook
              </button>
              <button 
                onClick={() => handleSocialClick('twitter')}
                className="text-gray-400 hover:text-white"
                data-testid="social-twitter"
              >
                🐦 Twitter
              </button>
              <button 
                onClick={() => handleSocialClick('linkedin')}
                className="text-gray-400 hover:text-white"
                data-testid="social-linkedin"
              >
                💼 LinkedIn
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('loan_calculator')}
                  className="hover:text-white"
                  data-testid="footer-loan-calculator"
                >
                  Loan Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('mortgage_calculator')}
                  className="hover:text-white"
                  data-testid="footer-mortgage-calculator"
                >
                  Mortgage Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('investment_calculator')}
                  className="hover:text-white"
                  data-testid="footer-investment-calculator"
                >
                  Investment Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('retirement_planner')}
                  className="hover:text-white"
                  data-testid="footer-retirement-planner"
                >
                  Retirement Planner
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('financial_guides')}
                  className="hover:text-white"
                  data-testid="footer-financial-guides"
                >
                  Financial Guides
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('rate_comparison')}
                  className="hover:text-white"
                  data-testid="footer-rate-comparison"
                >
                  Rate Comparison
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('blog')}
                  className="hover:text-white"
                  data-testid="footer-blog"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterLinkClick('about_us')}
                  className="hover:text-white"
                  data-testid="footer-about"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 SmartFinance Pro. All rights reserved. | 
            <button 
              onClick={() => handleFooterLinkClick('privacy_policy')}
              className="hover:text-white ml-2"
              data-testid="footer-privacy"
            >
              Privacy Policy
            </button> | 
            <button 
              onClick={() => handleFooterLinkClick('terms_of_service')}
              className="hover:text-white ml-2"
              data-testid="footer-terms"
            >
              Terms of Service
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
