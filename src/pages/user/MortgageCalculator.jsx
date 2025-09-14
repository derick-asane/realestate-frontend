import React, { useState } from "react";

const MortgageCalculator = () => {
  const [price, setPrice] = useState(30000000); // Property price in FCFA
  const [downPayment, setDownPayment] = useState(6000000); // FCFA
  const [interestRate, setInterestRate] = useState(6); // %
  const [years, setYears] = useState(20); // loan term

  // Format price in FCFA with a currency symbol
  const formatPrice = (value) => {
    return new Intl.NumberFormat("en-CM", {
      style: "currency",
      currency: "XAF", // FCFA Central Africa
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Calculate loan details
  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = years * 12;

  const monthlyPayment =
    loanAmount > 0 && monthlyRate > 0
      ? (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : loanAmount / numberOfPayments;

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-800">
          <span role="img" aria-label="home" className="mr-2">
            🏠
          </span>
          Mortgage Calculator
        </h2>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Property Price Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Property Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <input
              type="range"
              min="1000000"
              max="100000000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-2 w-full h-2 rounded-lg appearance-none bg-blue-200 slider-thumb-blue accent-blue-500"
            />
          </div>

          {/* Down Payment Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Down Payment
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <input
              type="range"
              min="0"
              max={price}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="mt-2 w-full h-2 rounded-lg appearance-none bg-blue-200 slider-thumb-blue accent-blue-500"
            />
          </div>

          {/* Interest Rate Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <input
              type="range"
              min="1"
              max="15"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="mt-2 w-full h-2 rounded-lg appearance-none bg-blue-200 slider-thumb-blue accent-blue-500"
            />
          </div>

          {/* Loan Term Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">
              Loan Term (Years)
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
            <input
              type="range"
              min="1"
              max="40"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="mt-2 w-full h-2 rounded-lg appearance-none bg-blue-200 slider-thumb-blue accent-blue-500"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4">Your Mortgage Breakdown:</h3>
          <div className="space-y-3">
            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Loan Amount:</span>
              <span className="text-xl font-bold">
                {formatPrice(loanAmount)}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Estimated Monthly Payment:</span>
              <span className="text-xl font-bold">
                {formatPrice(monthlyPayment)}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Total Interest Paid:</span>
              <span className="text-xl font-bold">
                {formatPrice(totalInterest)}
              </span>
            </p>
            <p className="flex justify-between items-center text-lg">
              <span className="font-semibold">Total Payment:</span>
              <span className="text-xl font-bold">
                {formatPrice(totalPayment)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
