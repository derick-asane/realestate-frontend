// src/pages/user/MortgageCalculator.jsx

import { useState, useMemo } from "react";
import { Calculator, TrendingUp, DollarSign, Calendar, AlertCircle } from "lucide-react";

const fmt = (value) =>
  new Intl.NumberFormat("en-CM", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
  }).format(value);

const MortgageCalculator = () => {
  const [price,        setPrice]        = useState(30_000_000);
  const [downPayment,  setDownPayment]  = useState(6_000_000);
  const [interestRate, setInterestRate] = useState(6);
  const [years,        setYears]        = useState(20);

  const calc = useMemo(() => {
    const loanAmount       = Math.max(0, price - downPayment);
    const monthlyRate      = interestRate / 100 / 12;
    const numberOfPayments = years * 12;
    const downPct          = price > 0 ? ((downPayment / price) * 100).toFixed(1) : 0;

    let monthlyPayment = 0;
    if (loanAmount > 0 && numberOfPayments > 0) {
      if (monthlyRate > 0) {
        monthlyPayment =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      } else {
        monthlyPayment = loanAmount / numberOfPayments;
      }
    }

    const totalPayment  = monthlyPayment * numberOfPayments;
    const totalInterest = Math.max(0, totalPayment - loanAmount);
    const principalPct  = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 0;
    const interestPct   = 100 - principalPct;

    return {
      loanAmount, monthlyPayment, totalPayment,
      totalInterest, downPct, principalPct, interestPct,
      isValid: downPayment <= price && price > 0,
    };
  }, [price, downPayment, interestRate, years]);

  const inputClass =
    "w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all";

  const Slider = ({ min, max, step = 1, value, onChange }) => (
    <input type="range" min={min} max={max} step={step} value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-2 w-full h-2 rounded-lg appearance-none bg-blue-100 accent-blue-600 cursor-pointer"/>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-7 h-7 text-white"/>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Mortgage Calculator</h1>
          <p className="text-gray-500 mt-2">Estimate your monthly payments in FCFA</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">

          {/* Validation warning */}
          {!calc.isValid && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0"/>
              Down payment cannot exceed the property price.
            </div>
          )}

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

            {/* Property Price */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Property Price</label>
                <span className="text-sm font-semibold text-blue-600">{fmt(price)}</span>
              </div>
              <input type="number" value={price} min={0}
                onChange={(e) => setPrice(Number(e.target.value))} className={inputClass}/>
              <Slider min={1_000_000} max={500_000_000} step={500_000}
                value={price} onChange={setPrice}/>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1M</span><span>500M FCFA</span>
              </div>
            </div>

            {/* Down Payment */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Down Payment</label>
                <span className="text-sm font-semibold text-blue-600">
                  {fmt(downPayment)} <span className="text-gray-400 font-normal">({calc.downPct}%)</span>
                </span>
              </div>
              <input type="number" value={downPayment} min={0} max={price}
                onChange={(e) => setDownPayment(Math.min(Number(e.target.value), price))}
                className={inputClass}/>
              <Slider min={0} max={price} step={100_000}
                value={downPayment} onChange={(v) => setDownPayment(Math.min(v, price))}/>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0%</span><span>100%</span>
              </div>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Interest Rate</label>
                <span className="text-sm font-semibold text-blue-600">{interestRate}%</span>
              </div>
              <input type="number" step="0.1" value={interestRate} min={0} max={30}
                onChange={(e) => setInterestRate(Number(e.target.value))} className={inputClass}/>
              <Slider min={0.5} max={20} step={0.1}
                value={interestRate} onChange={setInterestRate}/>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0.5%</span><span>20%</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-medium text-gray-700">Loan Term</label>
                <span className="text-sm font-semibold text-blue-600">{years} years</span>
              </div>
              <input type="number" value={years} min={1} max={40}
                onChange={(e) => setYears(Number(e.target.value))} className={inputClass}/>
              <Slider min={1} max={40} step={1}
                value={years} onChange={setYears}/>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 yr</span><span>40 yrs</span>
              </div>
            </div>
          </div>

          {/* Results */}
          {calc.isValid && (
            <>
              {/* Monthly payment hero */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 mb-6 text-white text-center">
                <p className="text-blue-100 text-sm font-medium mb-1">Estimated Monthly Payment</p>
                <p className="text-4xl font-bold mb-1">{fmt(calc.monthlyPayment)}</p>
                <p className="text-blue-200 text-sm">
                  over {years * 12} payments ({years} years)
                </p>
              </div>

              {/* Breakdown cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-blue-600"/>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Loan Amount</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{fmt(calc.loanAmount)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {price > 0 ? (100 - parseFloat(calc.downPct)).toFixed(1) : 0}% of price
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-orange-600"/>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Interest</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{fmt(calc.totalInterest)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {calc.totalPayment > 0 ? ((calc.totalInterest / calc.totalPayment) * 100).toFixed(1) : 0}% of total
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-green-600"/>
                    </div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Payment</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{fmt(calc.totalPayment)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">principal + interest</p>
                </div>
              </div>

              {/* Visual breakdown bar */}
              <div>
                <div className="flex justify-between text-xs font-medium text-gray-600 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"/>
                    Principal {calc.principalPct.toFixed(1)}%
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"/>
                    Interest {calc.interestPct.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 w-full rounded-full overflow-hidden bg-gray-100 flex">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${calc.principalPct}%` }}
                  />
                  <div
                    className="h-full bg-orange-400 transition-all duration-500"
                    style={{ width: `${calc.interestPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  For every {fmt(calc.monthlyPayment)} you pay,{" "}
                  {fmt((calc.loanAmount / calc.totalPayment) * calc.monthlyPayment)} goes to principal and{" "}
                  {fmt((calc.totalInterest / calc.totalPayment) * calc.monthlyPayment)} to interest
                </p>
              </div>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          This calculator provides estimates only. Consult a financial advisor for accurate mortgage advice.
        </p>
      </div>
    </div>
  );
};

export default MortgageCalculator;