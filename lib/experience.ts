import { experiences } from "./data";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const MONTH_INDEX: Record<string, number> = MONTHS.reduce(
  (acc, name, i) => ({ ...acc, [name.toUpperCase()]: i }),
  {} as Record<string, number>
);

function parseDate(value: string): Date | null {
  if (/present|current|now/i.test(value)) return null;
  const [mon, year] = value.trim().split(/\s+/);
  const idx = MONTH_INDEX[mon?.toUpperCase().slice(0, 3)];
  if (idx === undefined || !year) return null;
  return new Date(Number(year), idx, 1);
}

export function parsePeriod(period: string): { start: Date; end: Date | null } {
  const [a, b] = period.split(/\s*[-–—]\s*/);
  const start = parseDate(a) ?? new Date();
  const end = parseDate(b ?? "");
  return { start, end };
}

function diffMonths(start: Date, end: Date | null): number {
  const e = end ?? new Date();
  return Math.max(
    0,
    (e.getFullYear() - start.getFullYear()) * 12 + (e.getMonth() - start.getMonth())
  );
}

export function formatDuration(months: number): string {
  const safe = Math.max(1, months);
  const years = Math.floor(safe / 12);
  const rest = safe % 12;
  const parts: string[] = [];
  if (years) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? "month" : "months"}`);
  return parts.join(" ") || "1 month";
}

/** Returns a human label ("Feb 2025 - Present") and computed duration ("1 year 4 months"). */
export function describePeriod(period: string): { label: string; duration: string } {
  const { start, end } = parsePeriod(period);
  const fmt = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  const label = `${fmt(start)} - ${end ? fmt(end) : "Present"}`;
  const duration = formatDuration(diffMonths(start, end));
  return { label, duration };
}

/** Total career span, from the earliest role start to today. */
export function totalExperience(): string {
  const starts = experiences.map((e) => parsePeriod(e.period).start.getTime());
  if (!starts.length) return "0 months";
  const earliest = new Date(Math.min(...starts));
  return formatDuration(diffMonths(earliest, null));
}
