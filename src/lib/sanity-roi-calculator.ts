import { client } from './sanity.client';

export interface ROISlider {
  id: string;
  label: string;
  min: number;
  max: number;
  defaultValue: number;
  unit?: string;
  calculation?: number;
}

export interface ROICalculatorContent {
  title: string;
  hourlyValue: number;
  sliders: ROISlider[];
  resultMessages: {
    hoursSavedLabel: string;
    moneySavedLabel: string;
    revenueIncreaseLabel: string;
    totalBenefitLabel: string;
    ctaText: string;
  };
}

export async function getROICalculatorContent(): Promise<ROICalculatorContent | null> {
  try {
    const query = `*[_type == "roiCalculator" && _id == "roiCalculator"][0] {
      title,
      hourlyValue,
      sliders[] {
        id,
        label,
        min,
        max,
        defaultValue,
        unit,
        calculation
      },
      resultMessages
    }`;
    
    const result = await client.fetch(query);
    return result;
  } catch (error) {
    console.error('Error fetching ROI Calculator content:', error);
    return null;
  }
}