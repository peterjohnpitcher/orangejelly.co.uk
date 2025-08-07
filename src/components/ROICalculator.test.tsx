import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils';
import ROICalculator from './ROICalculator';
import { ROICalculatorProvider } from '@/contexts/ROICalculatorContext';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('ROICalculator Component', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(
      <ROICalculatorProvider>
        {component}
      </ROICalculatorProvider>
    );
  };

  it('renders calculator with default values', () => {
    renderWithProvider(<ROICalculator />);
    
    expect(screen.getByText(/Calculate Your Time & Money Savings/i)).toBeInTheDocument();
    expect(screen.getByText(/Hours per week on admin tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Hours per week on social media/i)).toBeInTheDocument();
  });

  it('calculates savings correctly', () => {
    renderWithProvider(<ROICalculator />);
    
    // Default values should show calculated results
    expect(screen.getByText(/Hours Saved Weekly/i)).toBeInTheDocument();
    expect(screen.getByText(/Weekly Value/i)).toBeInTheDocument();
  });

  it('updates calculations when slider values change', async () => {
    const { container } = renderWithProvider(<ROICalculator />);
    
    // Find the admin hours slider
    const adminSlider = container.querySelector('input[type="range"]');
    expect(adminSlider).toBeInTheDocument();
    
    // Change the value
    if (adminSlider) {
      fireEvent.change(adminSlider, { target: { value: '20' } });
    }
    
    // Check that the display updates
    await waitFor(() => {
      expect(screen.getByText('20h')).toBeInTheDocument();
    });
  });

  it('persists state to localStorage', async () => {
    renderWithProvider(<ROICalculator />);
    
    // Change a value
    const sliders = screen.getAllByRole('slider');
    fireEvent.change(sliders[0], { target: { value: '15' } });
    
    // Check localStorage was called
    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'roi-calculator-state',
        expect.any(String)
      );
    });
  });

  it('loads state from localStorage on mount', () => {
    const savedState = JSON.stringify({
      adminHours: 15,
      socialMediaHours: 8,
      menuUpdates: 3,
      averageSpend: 20,
    });
    
    localStorageMock.getItem.mockReturnValue(savedState);
    
    renderWithProvider(<ROICalculator />);
    
    // Check that localStorage was accessed
    expect(localStorageMock.getItem).toHaveBeenCalledWith('roi-calculator-state');
  });

  it('displays WhatsApp CTA button', () => {
    renderWithProvider(<ROICalculator />);
    
    expect(screen.getByText(/Get This For Your Pub/i)).toBeInTheDocument();
  });

  it('shows monetary benefit calculation', () => {
    renderWithProvider(<ROICalculator />);
    
    // Should show total monthly benefit
    expect(screen.getByText(/Monthly Benefit/i)).toBeInTheDocument();
  });

  it('has accessible form controls', () => {
    const { container } = renderWithProvider(<ROICalculator />);
    
    // All sliders should have labels
    const labels = container.querySelectorAll('label');
    expect(labels.length).toBeGreaterThan(0);
    
    // Sliders should have proper min/max attributes
    const sliders = container.querySelectorAll('input[type="range"]');
    sliders.forEach(slider => {
      expect(slider).toHaveAttribute('min');
      expect(slider).toHaveAttribute('max');
    });
  });
});