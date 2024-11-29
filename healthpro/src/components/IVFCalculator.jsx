import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function IVFCalculator() {
    const [ageRange, setAgeRange] = useState('');
    const [cycles, setCycles] = useState(1);
    const [hasICSI, setHasICSI] = useState(false);
    const [hasPGT, setHasPGT] = useState(false);
    const navigate = useNavigate();
    const [conditions, setConditions] = useState({
        PCOS: false,
        Endometriosis: false,
        LowOvarianReserve: false,
        MaleFactorInfertility: false,
    });

    const ageRanges = [
        'Under 30',
        'Between 30 - 34',
        'Between 35 - 37',
        'Between 38 - 40',
        'Between 41 - 43',
        'Above 43',
    ];

    const handleConditionChange = (e) => {
        const { name, checked } = e.target;
        setConditions((prev) => ({ ...prev, [name]: checked }));
    };

    const calculateSuccessRate = () => {
        let successRate = 50;

        if (ageRange === 'Under 30') successRate += 10;
        if (ageRange === 'Above 43') successRate -= 20;
        if (cycles > 1) successRate += Math.min(5, (cycles - 1) * 2); // Slight scaling
        if (hasICSI) successRate += 10;
        if (hasPGT) successRate += 5;
        if (conditions.Endometriosis) successRate -= 5;
        if (conditions.LowOvarianReserve) successRate -= 10;

        return Math.max(0, Math.min(100, successRate)); // Clamp between 0 and 100
    };

    const handleCalculate = () => {
        const successRate = calculateSuccessRate();
        navigate('/success-rate', { state: { successRate } });
    };

    return (
        <div className="bg-orange-50 min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
                    IVF Success Rate Calculator
                </h1>

                {/* Age Range Selector */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Select Your Age Range</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ageRanges.map((range, idx) => (
                            <label
                                key={idx}
                                className={`cursor-pointer border rounded-lg p-4 flex items-center justify-between hover:bg-orange-100 ${
                                    ageRange === range
                                        ? 'bg-orange-600 text-white'
                                        : 'bg-white text-gray-800 border-gray-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="ageRange"
                                    value={range}
                                    checked={ageRange === range}
                                    onChange={(e) => setAgeRange(e.target.value)}
                                    className="hidden"
                                />
                                <span className="text-lg">{range}</span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Number of IVF Cycles */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Number of IVF Cycles</h2>
                    <div className="flex flex-col items-center">
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={cycles}
                            onChange={(e) => setCycles(parseInt(e.target.value))}
                            className="w-full h-2 bg-orange-300 rounded-lg appearance-none cursor-pointer focus:ring focus:ring-orange-500"
                        />
                        <p className="mt-4 text-lg font-medium text-gray-700">
                            {cycles} Cycle{cycles > 1 ? 's' : ''}
                        </p>
                    </div>
                </section>

                {/* Procedures (ICSI & PGT) */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Have You Undergone These Procedures?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ICSI */}
                        <div className="flex items-center">
                            <h3 className="text-lg mr-4">ICSI Procedure:</h3>
                            <label className="flex items-center mr-4 cursor-pointer">
                                <input
                                    type="radio"
                                    name="icsi"
                                    value="yes"
                                    checked={hasICSI === true}
                                    onChange={() => setHasICSI(true)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                                        hasICSI
                                            ? 'border-orange-600 bg-orange-600'
                                            : 'border-gray-400'
                                    }`}
                                >
                                    {hasICSI && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>

                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="icsi"
                                    value="no"
                                    checked={hasICSI === false}
                                    onChange={() => setHasICSI(false)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                                        !hasICSI
                                            ? 'border-orange-600 bg-orange-600'
                                            : 'border-gray-400'
                                    }`}
                                >
                                    {!hasICSI && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>

                        {/* PGT */}
                        <div className="flex items-center">
                            <h3 className="text-lg mr-4">PGT Testing:</h3>
                            <label className="flex items-center mr-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={hasPGT}
                                    onChange={() => setHasPGT(!hasPGT)}
                                    className="hidden"
                                />
                                <div
                                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                                        hasPGT
                                            ? 'bg-orange-600 border-orange-600'
                                            : 'border-gray-400'
                                    }`}
                                >
                                    {hasPGT && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Medical Conditions */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Select Any Medical Conditions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.keys(conditions).map((condition) => (
                            <label
                                key={condition}
                                className="cursor-pointer border rounded-lg p-2 flex items-center justify-between hover:bg-orange-100 bg-white"
                            >
                                <input
                                    type="checkbox"
                                    name={condition}
                                    checked={conditions[condition]}
                                    onChange={handleConditionChange}
                                    className="hidden"
                                />
                                <span className="text-gray-800 capitalize">
                                    {condition.replace(/([A-Z])/g, ' $1')}
                                </span>
                            </label>
                        ))}
                    </div>
                </section>

                {/* Calculate Button */}
                <div className="text-center">
                    <button
                        onClick={handleCalculate}
                        className="px-8 py-3 bg-orange-600 text-white rounded-lg text-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                    >
                        Calculate Success Rate
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IVFCalculator;
