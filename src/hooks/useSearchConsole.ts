// Search Console Data Hook

import { useState, useCallback } from 'react';
import { getSites, getSearchAnalytics } from '../services/searchConsole';
import type { Site, SearchAnalyticsRow, DateRange } from '../types';

interface UseSearchConsoleReturn {
    sites: Site[];
    rows: SearchAnalyticsRow[];
    loading: boolean;
    error: string | null;
    fetchSites: (token: string) => Promise<void>;
    fetchAnalytics: (token: string, siteUrl: string, dateRange: DateRange) => Promise<void>;
    clearData: () => void;
}

export function useSearchConsole(): UseSearchConsoleReturn {
    const [sites, setSites] = useState<Site[]>([]);
    const [rows, setRows] = useState<SearchAnalyticsRow[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSites = useCallback(async (token: string) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getSites(token);
            setSites(response.siteEntry || []);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch sites';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchAnalytics = useCallback(async (token: string, siteUrl: string, dateRange: DateRange) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getSearchAnalytics(token, siteUrl, {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                dimensions: ['query'],
                rowLimit: 1000,
            });
            setRows(response.rows || []);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to fetch analytics';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    const clearData = useCallback(() => {
        setSites([]);
        setRows([]);
        setError(null);
    }, []);

    return {
        sites,
        rows,
        loading,
        error,
        fetchSites,
        fetchAnalytics,
        clearData,
    };
}
