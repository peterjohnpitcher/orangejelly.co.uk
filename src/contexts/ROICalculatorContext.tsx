'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

/**
 * State shape for the ROI Calculator
 * @interface ROICalculatorState
 */
interface ROICalculatorState {
  /** Hours spent per week on admin tasks */
  adminHours: number;
  /** Hours spent per week on social media marketing */
  socialMediaHours: number;
  /** Hours spent per month updating menus */
  menuUpdates: number;
  /** Average customer spend in pounds */
  averageSpend: number;
}

/**
 * Context type for ROI Calculator functionality
 * @interface ROICalculatorContextType
 */
interface ROICalculatorContextType {
  /** Current calculator state */
  state: ROICalculatorState;
  /** Update calculator values */
  updateState: (updates: Partial<ROICalculatorState>) => void;
  /** Reset calculator to default values */
  resetState: () => void;
}

/** Default values for the ROI calculator */
const defaultState: ROICalculatorState = {
  adminHours: 10,
  socialMediaHours: 5,
  menuUpdates: 2,
  averageSpend: 15,
};

const ROICalculatorContext = createContext<ROICalculatorContextType | undefined>(undefined);

const STORAGE_KEY = 'roi-calculator-state';

/**
 * Provider component for ROI Calculator state management
 * Persists state to localStorage for cross-session persistence
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider wrapper
 *
 * @example
 * ```tsx
 * <ROICalculatorProvider>
 *   <ROICalculator />
 * </ROICalculatorProvider>
 * ```
 */
export function ROICalculatorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ROICalculatorState>(defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setState(parsed);
      }
    } catch (error) {
      console.error('Failed to load ROI calculator state:', error);
    }
    setIsHydrated(true);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save ROI calculator state:', error);
      }
    }
  }, [state, isHydrated]);

  const updateState = (updates: Partial<ROICalculatorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetState = () => {
    setState(defaultState);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear ROI calculator state:', error);
    }
  };

  return (
    <ROICalculatorContext.Provider value={{ state, updateState, resetState }}>
      {children}
    </ROICalculatorContext.Provider>
  );
}

/**
 * Hook to access ROI Calculator context
 * Must be used within a ROICalculatorProvider
 *
 * @returns {ROICalculatorContextType} Calculator state and methods
 * @throws {Error} If used outside of ROICalculatorProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { state, updateState, resetState } = useROICalculator();
 *
 *   return (
 *     <div>
 *       <p>Admin hours: {state.adminHours}</p>
 *       <button onClick={() => updateState({ adminHours: 20 })}>
 *         Set to 20 hours
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useROICalculator() {
  const context = useContext(ROICalculatorContext);
  if (context === undefined) {
    throw new Error('useROICalculator must be used within a ROICalculatorProvider');
  }
  return context;
}
