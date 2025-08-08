/**
 * Theme Colors Constants
 * 
 * These colors are used throughout the application and match the CSS variables
 * defined in globals.css. Use these constants for server-side rendering or
 * where CSS variables are not available (e.g., ImageResponse, email templates).
 */

export const THEME_COLORS = {
  // Brand Colors
  orange: '#FF6B35',
  orangeLight: '#FF8F66',
  orangeDark: '#E55A2B',
  teal: '#2C5F5F',
  tealLight: '#4A7C7C',
  tealDark: '#1A3D3D',
  cream: '#FFF5EB',
  charcoal: '#2C3E50',
  charcoalLight: '#34495E',
  white: '#FFFFFF',
  
  // External Brand Colors
  whatsapp: '#25D366',
  whatsappHover: '#128C7E',
  facebook: '#1877F2',
  twitter: '#1DA1F2',
  instagram: '#E4405F',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

// Semantic color mappings
export const SEMANTIC_COLORS = {
  primary: THEME_COLORS.orange,
  primaryHover: THEME_COLORS.orangeDark,
  secondary: THEME_COLORS.teal,
  secondaryHover: THEME_COLORS.tealDark,
  background: THEME_COLORS.cream,
  text: THEME_COLORS.charcoal,
  textMuted: `${THEME_COLORS.charcoal}99`, // 60% opacity
  border: `${THEME_COLORS.charcoal}1A`, // 10% opacity
} as const;

// Export type for TypeScript
export type ThemeColor = keyof typeof THEME_COLORS;
export type SemanticColor = keyof typeof SEMANTIC_COLORS;