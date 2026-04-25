import type { StatsUsage } from "../../types/stats.interface";
import fetchJson from "../../utils/fetch-json";
import mapToCamelCase from "../../utils/map-to-camel-case";

export const getStatsUsage = async (
  userId: string,
  options?: RequestInit
): Promise<StatsUsage> => {
  const response = await fetchJson<StatsUsage>("/api/stats/usage/" + userId, options);

  return mapToCamelCase<StatsUsage>(response);
};