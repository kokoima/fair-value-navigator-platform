
/**
 * Formats a number as currency with the specified locale and currency code
 */
export const formatCurrency = (
  value: number,
  locale: string = 'es-ES',
  currency: string = 'EUR'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats a date string to localized format
 */
export const formatDate = (
  dateString: string,
  locale: string = 'es-ES',
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }
): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, options).format(date);
};
