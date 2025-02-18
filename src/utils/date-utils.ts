import { DateTime } from 'luxon';

export const formatDate = (dateString?: string | null, format: string = 'MMMM dd, yyyy hh:mm a'): string => {
  if (!dateString) return 'N/A';
  const date = DateTime.fromISO(dateString);
  return date.isValid ? date.toFormat(format) : 'N/A';
};
