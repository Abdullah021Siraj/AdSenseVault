import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";

interface MortgageResult {
  monthlyPayment: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTax, setPropertyTax] = useState(3500);
  const [insurance, setInsurance] = useState(1200);
  const [result, setResult] = useState<MortgageResult | null>(null);

  const calculateMortgage = () => {
    if (homePrice <= 0 || downPayment < 0 || loanTerm <= 0 || interestRate <= 0) {
      alert('Please enter valid values for all fields');
      return;
    }

    const loanAmount = homePrice - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numPayments = loanTerm * 12;
    
    // Calculate monthly principal and interest
    const monthlyPI = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                     (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Calculate PMI (if down payment < 20%)
    const downPaymentPercent = (downPayment / homePrice) * 100;
    const monthlyPMI = downPaymentPercent < 20 ? (loanAmount * 0.005) / 12 : 0;
    
    // Monthly tax and insurance
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    
    const totalMonthlyPayment = monthlyPI + monthlyPMI + monthlyTax + monthlyInsurance;
    const totalPayment = monthlyPI * numPayments;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment: monthlyPI,
      monthlyPMI,
      totalMonthlyPayment,
      totalInterest,
      totalPayment: totalPayment + (monthlyPMI * numPayments)
    });

    trackEvent('mortgage_calculation', 'calculator', 'mortgage_calculator');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="mortgage-calculator">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">🏠 Mortgage Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="homePrice">Home Price ($)</Label>
            <Input
              id="homePrice"
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              data-testid="input-home-price"
            />
          </div>
          <div>
            <Label htmlFor="downPayment">Down Payment ($)</Label>
            <Input
              id="downPayment"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              data-testid="input-down-payment"
            />
          </div>
          <div>
            <Label htmlFor="loanTerm">Loan Term (Years)</Label>
            <Input
              id="loanTerm"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              data-testid="input-loan-term"
            />
          </div>
          <div>
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              step="0.1"
              data-testid="input-interest-rate"
            />
          </div>
          <div>
            <Label htmlFor="propertyTax">Annual Property Tax ($)</Label>
            <Input
              id="propertyTax"
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              data-testid="input-property-tax"
            />
          </div>
          <div>
            <Label htmlFor="insurance">Annual Insurance ($)</Label>
            <Input
              id="insurance"
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
              data-testid="input-insurance"
            />
          </div>
        </div>
        
        <Button 
          onClick={calculateMortgage}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
          data-testid="button-calculate-mortgage"
        >
          Calculate Mortgage Payment
        </Button>

        {result && (
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 mt-6" data-testid="mortgage-result">
            <h4 className="text-lg font-semibold mb-4">Monthly Payment Breakdown</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Principal & Interest:</span>
                  <span className="font-semibold" data-testid="text-principal-interest">
                    ${result.monthlyPayment.toFixed(2)}
                  </span>
                </div>
                {result.monthlyPMI > 0 && (
                  <div className="flex justify-between mb-2">
                    <span>PMI:</span>
                    <span className="font-semibold" data-testid="text-pmi">
                      ${result.monthlyPMI.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between mb-2">
                  <span>Property Tax:</span>
                  <span className="font-semibold">${(propertyTax / 12).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Insurance:</span>
                  <span className="font-semibold">${(insurance / 12).toFixed(2)}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-lg font-bold border-t pt-2">
                  <span>Total Monthly Payment:</span>
                  <span className="text-blue-600" data-testid="text-total-monthly">
                    ${result.totalMonthlyPayment.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Total Interest:</span>
                  <span data-testid="text-total-interest">${result.totalInterest.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Payment:</span>
                  <span data-testid="text-total-payment">${result.totalPayment.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
