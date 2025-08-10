import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";

interface InvestmentResult {
  finalAmount: number;
  totalContributions: number;
  totalEarnings: number;
  yearlyBreakdown: Array<{
    year: number;
    balance: number;
    contributions: number;
    earnings: number;
  }>;
}

export default function InvestmentCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(20);
  const [result, setResult] = useState<InvestmentResult | null>(null);

  const calculateInvestment = () => {
    if (initialAmount < 0 || monthlyContribution < 0 || annualReturn <= 0 || years <= 0) {
      alert('Please enter valid values for all fields');
      return;
    }

    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    let balance = initialAmount;
    const yearlyBreakdown = [];
    
    // Calculate compound growth with monthly contributions
    for (let year = 1; year <= years; year++) {
      const startBalance = balance;
      
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
      
      const yearContributions = monthlyContribution * 12;
      const yearEarnings = balance - startBalance - yearContributions;
      
      yearlyBreakdown.push({
        year,
        balance,
        contributions: year * yearContributions + initialAmount,
        earnings: balance - (year * yearContributions + initialAmount)
      });
    }

    const totalContributions = initialAmount + (monthlyContribution * totalMonths);
    const totalEarnings = balance - totalContributions;

    setResult({
      finalAmount: balance,
      totalContributions,
      totalEarnings,
      yearlyBreakdown
    });

    trackEvent('investment_calculation', 'calculator', 'investment_calculator');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto" data-testid="investment-calculator">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">📈 Investment Growth Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="initialAmount">Initial Investment ($)</Label>
            <Input
              id="initialAmount"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              data-testid="input-initial-amount"
            />
          </div>
          <div>
            <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
            <Input
              id="monthlyContribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              data-testid="input-monthly-contribution"
            />
          </div>
          <div>
            <Label htmlFor="annualReturn">Annual Return (%)</Label>
            <Input
              id="annualReturn"
              type="number"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              step="0.1"
              data-testid="input-annual-return"
            />
          </div>
          <div>
            <Label htmlFor="years">Investment Period (Years)</Label>
            <Input
              id="years"
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              data-testid="input-years"
            />
          </div>
        </div>
        
        <Button 
          onClick={calculateInvestment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
          data-testid="button-calculate-investment"
        >
          Calculate Investment Growth
        </Button>

        {result && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600" data-testid="text-final-amount">
                    ${result.finalAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600">Final Amount</div>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600" data-testid="text-total-contributions">
                    ${result.totalContributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600">Total Contributions</div>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600" data-testid="text-total-earnings">
                    ${result.totalEarnings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-sm text-gray-600">Total Earnings</div>
                </CardContent>
              </Card>
            </div>

            {/* Yearly Breakdown */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold mb-4">Year-by-Year Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Year</th>
                      <th className="text-right py-2">Balance</th>
                      <th className="text-right py-2">Total Contributions</th>
                      <th className="text-right py-2">Total Earnings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.slice(-10).map((year) => (
                      <tr key={year.year} className="border-b">
                        <td className="py-2">{year.year}</td>
                        <td className="text-right py-2 font-semibold">
                          ${year.balance.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-2">
                          ${year.contributions.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="text-right py-2 text-green-600">
                          ${year.earnings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
