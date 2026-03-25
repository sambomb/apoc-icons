// =============================
// CONFIG
// =============================
const SERVER_UTC_OFFSET = -2; // GMT-2
const EVENT_INTERVAL_HOURS = 4;
const EVENT_SLOTS = [0, 4, 8, 12, 16, 20];

// =============================
// TIME CONVERSION
// =============================
export function getServerNow() {
  const now = new Date();

  // Local → UTC
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);

  // UTC → GMT-2
  return new Date(utc + SERVER_UTC_OFFSET * 3600000);
}

// =============================
// CURRENT SLOT
// =============================
export function getCurrentSlot() {
  const now = getServerNow();
  const hour = now.getHours();

  for (let i = 0; i < EVENT_SLOTS.length; i++) {
    const start = EVENT_SLOTS[i];
    const end = start + EVENT_INTERVAL_HOURS;

    if (hour >= start && hour < end) {
      return {
        index: i,
        startHour: start,
        endHour: end % 24,
        day: now.getDay()
      };
    }
  }

  // fallback (should never happen)
  return {
    index: 0,
    startHour: 0,
    endHour: 4,
    day: now.getDay()
  };
}

// =============================
// NEXT EVENT COUNTDOWN
// =============================
export function getNextEventCountdown() {
  const now = getServerNow();
  const slot = getCurrentSlot();

  let nextHour = slot.startHour + EVENT_INTERVAL_HOURS;

  let next = new Date(now);

  if (nextHour >= 24) {
    nextHour = nextHour % 24;
    next.setDate(next.getDate() + 1);
  }

  next.setHours(nextHour, 0, 0, 0);

  const diff = next - now;

  return {
    total: diff,
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000)
  };
}

// =============================
// FORMATTERS
// =============================
export function formatTime(date, use24h = true) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: !use24h
  });
}

export function formatFullTime(date, use24h = true) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !use24h
  });
}

// =============================
// DEBUG / INFO
// =============================
export function getTimeInfo() {
  const local = new Date();
  const server = getServerNow();
  const countdown = getNextEventCountdown();

  return {
    local,
    server,
    countdown,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}
