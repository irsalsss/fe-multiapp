import { useQuery } from "@tanstack/react-query";
import { getStatsUsage } from "../../get-stats-usage";

export const QUERY_KEY_STATS_USAGE = "useGetStatsUsageQuery";

export const useGetStatsUsageQuery = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: [QUERY_KEY_STATS_USAGE, userId],
    queryFn: () => getStatsUsage(userId),
    enabled,
  });
};