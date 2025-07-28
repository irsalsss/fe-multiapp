/**
 * Formats a date based on how long ago it was
 * @param date - The date to format
 * @param timezone - Optional timezone (defaults to user's local timezone)
 * @returns Formatted date string
 */
export function formatRelativeDate(date: Date | string | number, timezone?: string): string {
  const targetDate = new Date(date);
  
  // Default to user's local timezone if no timezone is provided
  let userTimezone: string;
  try {
    if (!timezone) {
      // Use the user's local timezone
      userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } else {
      // Validate the provided timezone
      userTimezone = timezone;
      Intl.DateTimeFormat(undefined, { timeZone: userTimezone });
    }
  } catch {
    // Fallback to user's local timezone if the provided timezone is invalid
    try {
      userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      // Ultimate fallback to UTC if everything fails
      userTimezone = 'UTC';
    }
  }
  
  // Use mocked time if available (for testing), otherwise use real time
  // In Jest environment, Date.now() will use the mocked time
  const now = new Date(Date.now());
  
  // Get date components in the specified timezone
  let targetYear: number, targetMonth: number, targetDay: number;
  let nowYear: number, nowMonth: number, nowDay: number;
  
  try {
    // Use Intl.DateTimeFormat to get date parts in the target timezone
    const targetFormatter = new Intl.DateTimeFormat('en-CA', { 
      timeZone: userTimezone, 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
    const nowFormatter = new Intl.DateTimeFormat('en-CA', { 
      timeZone: userTimezone, 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
    
    const targetParts = targetFormatter.formatToParts(targetDate);
    const nowParts = nowFormatter.formatToParts(now);
    
    targetYear = parseInt(targetParts.find(p => p.type === 'year')?.value ?? '0');
    targetMonth = parseInt(targetParts.find(p => p.type === 'month')?.value ?? '0') - 1; // JS months are 0-indexed
    targetDay = parseInt(targetParts.find(p => p.type === 'day')?.value ?? '0');
    
    nowYear = parseInt(nowParts.find(p => p.type === 'year')?.value ?? '0');
    nowMonth = parseInt(nowParts.find(p => p.type === 'month')?.value ?? '0') - 1; // JS months are 0-indexed
    nowDay = parseInt(nowParts.find(p => p.type === 'day')?.value ?? '0');
  } catch {
    // Fallback to UTC if timezone operations fail
    userTimezone = 'UTC';
    targetYear = targetDate.getUTCFullYear();
    targetMonth = targetDate.getUTCMonth();
    targetDay = targetDate.getUTCDate();
    
    nowYear = now.getUTCFullYear();
    nowMonth = now.getUTCMonth();
    nowDay = now.getUTCDate();
  }
  
  // Create date-only objects for comparison (in UTC to avoid timezone issues)
  const targetDateOnly = new Date(Date.UTC(targetYear, targetMonth, targetDay));
  const todayOnly = new Date(Date.UTC(nowYear, nowMonth, nowDay));
  
  // Calculate difference in days
  const diffTime = todayOnly.getTime() - targetDateOnly.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // 1. If today, return time (9:34 PM or 10:00 AM) in user's timezone
  if (diffDays === 0) {
    return targetDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: userTimezone
    });
  }
  
  // 2. If less than a week ago (but not future dates), return day name (Thu or Mon) in user's timezone
  if (diffDays > 0 && diffDays < 7) {
    // Use Intl.DateTimeFormat for correct weekday in timezone
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: userTimezone }).format(targetDate);
  }
  
  // 3. If less than a year (past or future), return day and month (10 Oct) in user's timezone
  const oneYearAgo = new Date(Date.UTC(nowYear - 1, nowMonth, nowDay));
  const oneYearFromNow = new Date(Date.UTC(nowYear + 1, nowMonth, nowDay));
  if (targetDateOnly >= oneYearAgo && targetDateOnly < oneYearFromNow) {
    const day = targetDate.toLocaleDateString('en-US', {
      day: 'numeric',
      timeZone: userTimezone
    });
    const month = targetDate.toLocaleDateString('en-US', {
      month: 'short',
      timeZone: userTimezone
    });
    return `${day} ${month}`;
  }
  
  // 4. If more than a year, return full date (20 Jun 2020) in user's timezone
  const day = targetDate.toLocaleDateString('en-US', {
    day: 'numeric',
    timeZone: userTimezone
  });
  const month = targetDate.toLocaleDateString('en-US', {
    month: 'short',
    timeZone: userTimezone
  });
  const year = targetDate.toLocaleDateString('en-US', {
    year: 'numeric',
    timeZone: userTimezone
  });
  
  return `${day} ${month} ${year}`;
}

/**
 * Formats a date showing relative time for recent dates or full datetime for older dates
 * @param date - The date to format
 * @param timezone - Optional timezone (defaults to user's local timezone)
 * @returns Formatted time string
 */
export function formatTimeAgo(date: Date | string | number, timezone?: string): string {
  const targetDate = new Date(date);
  const now = new Date(Date.now());
  
  // Default to user's local timezone if no timezone is provided
  let userTimezone: string;
  try {
    if (!timezone) {
      // Use the user's local timezone
      userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } else {
      // Validate the provided timezone
      userTimezone = timezone;
      Intl.DateTimeFormat(undefined, { timeZone: userTimezone });
    }
  } catch {
    // Fallback to user's local timezone if the provided timezone is invalid
    try {
      userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      // Ultimate fallback to UTC if everything fails
      userTimezone = 'UTC';
    }
  }
  
  // Calculate time difference in milliseconds
  const timeDiff = now.getTime() - targetDate.getTime();
  
  // Convert to different units
  const minutes = Math.floor(timeDiff / (1000 * 60));
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  
  // 1. Just now (less than 1 minute)
  if (minutes < 1) {
    return 'Just now';
  }
  
  // 2. ... min ago (less than 60 minutes)
  if (minutes < 60) {
    return `${minutes.toString()} min ago`;
  }
  
  // 3. ... hour ago (less than 24 hours)
  if (hours < 24) {
    const hourText = hours === 1 ? 'hour' : 'hours';
    return `${hours.toString()} ${hourText} ago`;
  }
  
  // 4. dd MMM ▪ hh:mm a (for older dates)
  const day = targetDate.toLocaleDateString('en-US', {
    day: '2-digit',
    timeZone: userTimezone
  });
  const month = targetDate.toLocaleDateString('en-US', {
    month: 'short',
    timeZone: userTimezone
  });
  const time = targetDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: userTimezone
  });
  
  return `${day} ${month} ▪ ${time}`;
}
