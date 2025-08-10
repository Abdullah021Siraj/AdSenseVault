import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

interface LoanOffer {
  lender: string;
  subtitle: string;
  aprRange: string;
  loanAmount: string;
  terms: string;
  rating: string;
  stars: number;
}

const loanOffers: LoanOffer[] = [
  {
    lender: "SoFi",
    subtitle: "No fees",
    aprRange: "5.99% - 21.28%",
    loanAmount: "$5,000 - $100,000",
    terms: "2-7 years",
    rating: "4.8/5",
    stars: 5
  },
  {
    lender: "LightStream",
    subtitle: "AutoPay discount",
    aprRange: "7.49% - 25.49%",
    loanAmount: "$5,000 - $100,000",
    terms: "2-7 years",
    rating: "4.5/5",
    stars: 4
  },
  {
    lender: "Discover",
    subtitle: "30-day guarantee",
    aprRange: "6.99% - 24.99%",
    loanAmount: "$2,500 - $35,000",
    terms: "3-7 years",
    rating: "4.3/5",
    stars: 4
  }
];

export default function LoanComparison() {
  const handleLenderClick = (lender: string) => {
    trackEvent('lender_comparison', 'engagement', lender.toLowerCase());
  };

  return (
    <section id="compare" className="mb-16" data-testid="loan-comparison-section">
      <h2 className="text-3xl font-bold mb-8">Compare Financial Products</h2>
      
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardTitle className="text-2xl">Best Personal Loan Rates 2025</CardTitle>
          <p className="text-blue-100 mt-2">Compare top-rated lenders with competitive rates</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="loan-comparison-table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    APR Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loan Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Terms
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loanOffers.map((offer, index) => (
                  <tr 
                    key={offer.lender}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleLenderClick(offer.lender)}
                    data-testid={`row-lender-${index}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900" data-testid={`lender-name-${index}`}>
                        {offer.lender}
                      </div>
                      <div className="text-sm text-gray-500">{offer.subtitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold" data-testid={`apr-range-${index}`}>
                      {offer.aprRange}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900" data-testid={`loan-amount-${index}`}>
                      {offer.loanAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900" data-testid={`terms-${index}`}>
                      {offer.terms}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-lg ${i < offer.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600" data-testid={`rating-${index}`}>
                          {offer.rating}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-6 py-4">
            <p className="text-sm text-gray-600">
              *Rates shown are for qualified borrowers. Actual rates may vary based on creditworthiness.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
