"use client"
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';

const Home: NextPage = () => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [returnsType, setReturnsType] = useState('monthly');
  const [calculatedResults, setCalculatedResults] = useState({totalInvestment: '', estimatedReturns: ''});

  const handleCalculation = () => {
    const principal = parseFloat(initialInvestment);
    const monthlyAddition = parseFloat(monthlyInvestment);
    const rate = parseFloat(interestRate) / 100 / 12; 
    const periods = parseFloat(timePeriod) * 12; 

    console.log("principal:", principal);
    console.log("monthlyAddition:", monthlyAddition);
  
    // Formula approach
    let totalInvestment = principal;
    let estimatedReturns = 0;
    for (let i = 0; i < periods; i++) {
      estimatedReturns += (totalInvestment + monthlyAddition) * rate;
      totalInvestment += monthlyAddition + estimatedReturns; 
    }
  
    setCalculatedResults({ 
      totalInvestment: totalInvestment.toFixed(2), 
      estimatedReturns: estimatedReturns.toFixed(2) 
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>Investment Calculator</title>
        <link rel="icon" href="/favicon.ico" /> 
      </Head>

      <main className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6">Investment Calculator</h1>

        <form className="space-y-4"> {/* Add onSubmit for calculation */}
          <div>
            <label htmlFor="initialInvestment" className="block text-gray-700">
              Initial Investment
            </label>
            <input
              type="number"
              id="initialInvestment"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="monthlyInvestment" className="block text-gray-700">
              Monthly Investment
            </label>
            <input
              type="number"
              id="monthlyInvestment"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="timePeriod" className="block text-gray-700">
              Time Period (Years)
            </label>
            <input
              type="number"
              id="timePeriod"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="interestRate" className="block text-gray-700">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded"
            />
          </div>

          {/* ... (Returns Type - Example using a select dropdown) */}
          <div>
            <label htmlFor="returnsType" className="block text-gray-700">
              Returns Type
            </label>
            <select
              id="returnsType"
              value={returnsType}
              onChange={(e) => setReturnsType(e.target.value)}
              className="mt-1 px-3 py-2 w-full border border-gray-300 rounded"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* ... Similar input fields for other parameters */}

          <button
            type="button" /* Change to 'submit' if not doing client-side calc */
            onClick={handleCalculation}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Calculate
          </button>
        </form>

        {/* Results Display */}
        {calculatedResults && (
          <div className="mt-8 p-4 border border-gray-300 rounded">
            <h2 className="text-xl font-semibold mb-2">Results</h2>
            <p>Total Investment: {calculatedResults.totalInvestment}</p> 
            <p>Estimated Returns: {calculatedResults.estimatedReturns}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
