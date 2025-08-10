import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { trackEvent } from "@/lib/analytics";

interface LoanCalculatorProps {
  featured?: boolean;
}

interface LoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
}

interface LoanCalculation {
  date: string;
  amount: number;
  rate: number;
  term: number;
  monthlyPayment: string;
}

export default function LoanCalculator({ featured = false }: LoanCalculatorProps) {
  const [amount, setAmount] = useState(25000);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(5);
  const [result, setResult] = useState<LoanResult | null>(null);
  const [savedCalculations, setSavedCalculations] = useLocalStorage<LoanCalculation[]>('savedCalculations', []);

  const calculateLoan = () => {
    if (amount <= 0 || rate <= 0 || term <= 0) {
      alert('Please enter valid positive numbers for all fields');
      return;
    }

    const monthlyRate = (rate / 100) / 12;
    const numPayments = term * 12;
    
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - amount;

    const loanResult = {
      monthlyPayment,
      totalInterest,
      totalPayment
    };

    setResult(loanResult);

    // Store calculation in localStorage
    const calculation: LoanCalculation = {
      date: new Date().toISOString(),
      amount,
      rate,
      term,
      monthlyPayment: monthlyPayment.toFixed(2)
    };
    
    const updatedCalculations = [calculation, ...savedCalculations].slice(0, 10); // Keep only last 10
    setSavedCalculations(updatedCalculations);

    // Track the calculation event
    trackEvent('loan_calculation', 'calculator', 'loan_calculator');
  };

  return (
    <div className={featured ? "" : "bg-white rounded-xl shadow-lg p-6"}>
      <h3 className="text-2xl font-bold mb-6 text-center" data-testid="loan-calculator-title">
        Loan Payment Calculator
      </h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="loanAmount" className="block text-sm font-medium mb-2">
            Loan Amount ($)
          </Label>
          <Input
            id="loanAmount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full"
            placeholder="25000"
            data-testid="input-loan-amount"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="interestRate" className="block text-sm font-medium mb-2">
              Interest Rate (%)
            </Label>
            <Input
              id="interestRate"
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full"
              placeholder="5.5"
              step="0.1"
              data-testid="input-interest-rate"
            />
          </div>
          <div>
            <Label htmlFor="loanTerm" className="block text-sm font-medium mb-2">
              Term (Years)
            </Label>
            <Input
              id="loanTerm"
              type="number"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full"
              placeholder="5"
              data-testid="input-loan-term"
            />
          </div>
        </div>
        <Button 
          onClick={calculateLoan}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold"
          data-testid="button-calculate-loan"
        >
          Calculate Payment
        </Button>
        {result && (
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-600" data-testid="loan-result">
            <div className="text-lg font-semibold">
              Monthly Payment: 
              <span className="text-green-600 ml-2" data-testid="text-monthly-payment">
                ${result.monthlyPayment.toFixed(2)}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <div data-testid="text-total-interest">
                Total Interest: ${result.totalInterest.toFixed(2)}
              </div>
              <div data-testid="text-total-payment">
                Total Payment: ${result.totalPayment.toFixed(2)}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
