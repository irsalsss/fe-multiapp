import { formatRelativeDate } from './date';

describe('formatRelativeDate', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-01-15T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  describe('when date is today', () => {
    it('should return time in 12-hour format', () => {
      const todayMorning = new Date('2024-01-15T09:30:00.000Z');
      const todayEvening = new Date('2024-01-15T21:45:00.000Z');

      expect(formatRelativeDate(todayMorning, 'UTC')).toBe('9:30 AM');
      expect(formatRelativeDate(todayEvening, 'UTC')).toBe('9:45 PM');
    });

    it('should handle different timezone inputs', () => {
      const todayDate = new Date('2024-01-15T15:30:00.000Z');
      
      expect(formatRelativeDate(todayDate, 'America/New_York')).toBe('10:30 AM');
      expect(formatRelativeDate(todayDate, 'Europe/London')).toBe('3:30 PM');
    });
  });

  describe('when date is within a week', () => {
    it('should return short weekday name', () => {
      const yesterday = new Date('2024-01-14T12:00:00.000Z');
      const twoDaysAgo = new Date('2024-01-13T12:00:00.000Z');
      const sixDaysAgo = new Date('2024-01-09T12:00:00.000Z');

      expect(formatRelativeDate(yesterday, 'UTC')).toBe('Sun');
      expect(formatRelativeDate(twoDaysAgo, 'UTC')).toBe('Sat');
      expect(formatRelativeDate(sixDaysAgo, 'UTC')).toBe('Tue');
    });

    it('should handle timezone differences correctly', () => {
      const yesterday = new Date('2024-01-14T12:00:00.000Z');
      
      expect(formatRelativeDate(yesterday, 'America/New_York')).toBe('Sun');
      expect(formatRelativeDate(yesterday, 'Asia/Tokyo')).toBe('Sun');
    });
  });

  describe('when date is within a year', () => {
    it('should return day and month format', () => {
      const oneWeekAgo = new Date('2024-01-08T12:00:00.000Z');
      const oneMonthAgo = new Date('2023-12-15T12:00:00.000Z');
      const sixMonthsAgo = new Date('2023-07-15T12:00:00.000Z');

      expect(formatRelativeDate(oneWeekAgo, 'UTC')).toBe('8 Jan');
      expect(formatRelativeDate(oneMonthAgo, 'UTC')).toBe('15 Dec');
      expect(formatRelativeDate(sixMonthsAgo, 'UTC')).toBe('15 Jul');
    });

    it('should handle edge case of exactly one year ago', () => {
      const oneYearAgo = new Date('2023-01-15T12:00:00.000Z');
      
      expect(formatRelativeDate(oneYearAgo, 'UTC')).toBe('15 Jan');
    });
  });

  describe('when date is more than a year ago', () => {
    it('should return full date with year', () => {
      const twoYearsAgo = new Date('2022-01-15T12:00:00.000Z');
      const fiveYearsAgo = new Date('2019-01-15T12:00:00.000Z');

      expect(formatRelativeDate(twoYearsAgo, 'UTC')).toBe('15 Jan 2022');
      expect(formatRelativeDate(fiveYearsAgo, 'UTC')).toBe('15 Jan 2019');
    });

    it('should handle different months and years', () => {
      const oldDate = new Date('2020-06-20T12:00:00.000Z');
      
      expect(formatRelativeDate(oldDate, 'UTC')).toBe('20 Jun 2020');
    });
  });

  describe('input format handling', () => {
    it('should handle string date inputs', () => {
      const todayString = '2024-01-15T09:30:00.000Z';
      const yesterdayString = '2024-01-14T12:00:00.000Z';
      const oldDateString = '2022-01-15T12:00:00.000Z';

      expect(formatRelativeDate(todayString, 'UTC')).toBe('9:30 AM');
      expect(formatRelativeDate(yesterdayString, 'UTC')).toBe('Sun');
      expect(formatRelativeDate(oldDateString, 'UTC')).toBe('15 Jan 2022');
    });

    it('should handle timestamp inputs', () => {
      const todayTimestamp = new Date('2024-01-15T09:30:00.000Z').getTime();
      const yesterdayTimestamp = new Date('2024-01-14T12:00:00.000Z').getTime();
      const oldDateTimestamp = new Date('2022-01-15T12:00:00.000Z').getTime();

      expect(formatRelativeDate(todayTimestamp, 'UTC')).toBe('9:30 AM');
      expect(formatRelativeDate(yesterdayTimestamp, 'UTC')).toBe('Sun');
      expect(formatRelativeDate(oldDateTimestamp, 'UTC')).toBe('15 Jan 2022');
    });
  });

  describe('timezone handling', () => {
    it('should handle invalid timezone gracefully', () => {
      const todayDate = new Date('2024-01-15T12:00:00.000Z');
      
      // Should not throw error with invalid timezone
      expect(() => formatRelativeDate(todayDate, 'Invalid/Timezone')).not.toThrow();
    });

    it('should not treat future dates as today', () => {
      // Bug case: future date should not be treated as "today"
      const futureDate = '2025-07-28T01:31:34.471Z';
      const result = formatRelativeDate(futureDate, 'UTC');
      
      // Should not return a time format (which indicates "today")
      // Should return a proper date format instead
      expect(result).not.toMatch(/^\d{1,2}:\d{2} [AP]M$/);
      expect(result).toBe('28 Jul 2025');
    });

    it('should default to user local timezone when no timezone provided', () => {
      const todayDate = new Date('2024-01-15T09:30:00.000Z');
      
      // Should not throw error and should format in local timezone
      expect(() => formatRelativeDate(todayDate)).not.toThrow();
      
      // The result will depend on the system timezone, but should be a valid time format
      const result = formatRelativeDate(todayDate);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
