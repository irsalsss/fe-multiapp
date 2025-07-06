/**
 * Formats a date based on how long ago it was
 * @param date - The date to format
 * @param timezone - Optional timezone (defaults to user's local timezone)
 * @returns Formatted date string
 */
export function formatRelativeDate(date: Date | string | number, timezone?: string): string {
  const targetDate = new Date(date);
  
  // Default to UTC if no timezone is provided
  let userTimezone: string = timezone ?? 'UTC';
  try {
    if (!timezone) {
      userTimezone = 'UTC';
    } else {
      // Validate timezone
      Intl.DateTimeFormat(undefined, { timeZone: userTimezone });
    }
  } catch {
    userTimezone = 'UTC';
  }
  
  // Use mocked time if available (for testing), otherwise use real time
  // In Jest environment, Date.now() will use the mocked time
  const now = new Date(Date.now());
  
  // Create dates in the user's timezone for comparison
  let targetDateInTZ: Date;
  let nowInTZ: Date;
  
  try {
    targetDateInTZ = new Date(targetDate.toLocaleString('en-US', { timeZone: userTimezone }));
    nowInTZ = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }));
  } catch {
    // Fallback to UTC if timezone is invalid
    targetDateInTZ = new Date(targetDate.toLocaleString('en-US', { timeZone: 'UTC' }));
    nowInTZ = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    userTimezone = 'UTC';
  }
  
  // Reset time to compare just the dates in the user's timezone
  const targetDateOnly = new Date(
    targetDateInTZ.getFullYear(), 
    targetDateInTZ.getMonth(), 
    targetDateInTZ.getDate()
  );
  const todayOnly = new Date(
    nowInTZ.getFullYear(), 
    nowInTZ.getMonth(), 
    nowInTZ.getDate()
  );
  
  // Calculate difference in days
  const diffTime = todayOnly.getTime() - targetDateOnly.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // 1. If today, return time (9:34 PM or 10:00 AM) in user's timezone
  if (diffDays === 0) {
    return targetDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: userTimezone
    });
  }
  
  // 2. If less than a week, return day name (Thu or Mon) in user's timezone
  if (diffDays < 7) {
    // Use Intl.DateTimeFormat for correct weekday in timezone
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: userTimezone }).format(targetDate);
  }
  
  // 3. If less than a year, return day and month (10 Oct) in user's timezone
  const oneYearAgo = new Date(nowInTZ.getFullYear() - 1, nowInTZ.getMonth(), nowInTZ.getDate());
  if (targetDateInTZ >= oneYearAgo) {
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
  
  // Default to UTC if no timezone is provided
  let userTimezone: string = timezone ?? 'UTC';
  try {
    if (!timezone) {
      userTimezone = 'UTC';
    } else {
      // Validate timezone
      Intl.DateTimeFormat(undefined, { timeZone: userTimezone });
    }
  } catch {
    userTimezone = 'UTC';
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
