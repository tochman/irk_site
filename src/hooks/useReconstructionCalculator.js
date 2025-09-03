import { useState, useCallback } from 'react';

// Calculator constants - adjust these to reflect your pricing and assumptions
const HAIRCUT_RATE = 0.50; // 50% debt reduction on unsecured debts (assumption)
const VAT_MULTIPLIER = { "12": 0.25, "4": 0.5, "1": 1.0 }; // simplified estimation

// Official court fees (from Domstolsverket)
const COURT_FEES = {
  application: 2800,    // Ansökningsavgift
  supervision: 10000,   // Tillsynsavgift 
  publication: 500      // Kungörandeavgift
};

const FEES = {
  rb: { base: 95000, perEmployee: 2000 },    // Reconstructor fees
  lawyer: { base: 250000, perEmployee: 4000 } // Lawyer/reconstructor fees
};

export const useReconstructionCalculator = () => {
  const [formData, setFormData] = useState({
    numEmployees: '',
    supplierDebt: '',
    taxLiabilities: '',
    vatPrevious: '',
    vatAccounting: '12' // default to yearly
  });

  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Helper function to format numbers for display
  const formatNumber = useCallback((num) => {
    return isNaN(num) ? "0" : Math.round(num).toLocaleString("sv-SE");
  }, []);

  // Calculate fees for both options
  const calculateFees = useCallback((employees) => {
    // Base court fees (same for both options)
    const courtFees = COURT_FEES.application + COURT_FEES.supervision + COURT_FEES.publication;
    
    // Professional fees
    const rbFees = FEES.rb.base + FEES.rb.perEmployee * employees;
    const lawyerFees = FEES.lawyer.base + FEES.lawyer.perEmployee * employees;
    
    // Total costs including court fees
    const rb = rbFees + courtFees;
    const lawyer = lawyerFees + courtFees;
    
    return { 
      rb, 
      lawyer, 
      rbFees, 
      lawyerFees, 
      courtFees 
    };
  }, []);

  // Get calculated values from form data
  const getCalculatedValues = useCallback(() => {
    const employees = Number(formData.numEmployees || 0);
    const supplier = Number(formData.supplierDebt || 0);
    const taxes = Number(formData.taxLiabilities || 0);
    const vatPrev = Number(formData.vatPrevious || 0);
    const vatMode = formData.vatAccounting;
    const vatOutstanding = vatPrev * (VAT_MULTIPLIER[vatMode] ?? 0.5);

    // Unsecured debt (rough): suppliers + tax debts + estimated outstanding VAT
    const unsecured = Math.max(0, supplier + taxes + vatOutstanding);
    return { employees, unsecured };
  }, [formData]);

  // Main calculation function
  const calculateResults = useCallback(() => {
    const { employees, unsecured } = getCalculatedValues();
    const fees = calculateFees(employees);

    const grossSavings = unsecured * HAIRCUT_RATE;

    const netRb = Math.max(0, grossSavings - fees.rb);
    const netLaw = Math.max(0, grossSavings - fees.lawyer);

    const savingsCompare = netRb - netLaw;
    const costCompare = fees.rb - fees.lawyer; // negative means RB is cheaper

    return {
      netRb,
      netLaw,
      feeRb: fees.rb,
      feeLaw: fees.lawyer,
      rbFees: fees.rbFees,
      lawyerFees: fees.lawyerFees,
      courtFees: fees.courtFees,
      savingsCompare,
      costCompare,
      grossSavings,
      unsecured
    };
  }, [getCalculatedValues, calculateFees]);

  // Handle form data changes
  const updateFormData = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Handle form submission
  const handleCalculate = useCallback((e) => {
    e.preventDefault();
    const { employees } = getCalculatedValues();
    
    if (employees < 0) return;
    
    const calculatedResults = calculateResults();
    setResults(calculatedResults);
    setShowResults(true);
  }, [getCalculatedValues, calculateResults]);

  // Reset calculator
  const resetCalculator = useCallback(() => {
    setFormData({
      numEmployees: '',
      supplierDebt: '',
      taxLiabilities: '',
      vatPrevious: '',
      vatAccounting: '12'
    });
    setResults(null);
    setShowResults(false);
  }, []);

  return {
    formData,
    updateFormData,
    handleCalculate,
    resetCalculator,
    results,
    showResults,
    formatNumber
  };
};
