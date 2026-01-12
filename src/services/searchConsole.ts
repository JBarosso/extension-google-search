// Google Search Console API Service

import type { SitesResponse, SearchAnalyticsResponse, SearchAnalyticsRequest } from '../types';

const API_BASE = 'https://www.googleapis.com/webmasters/v3';

async function fetchWithAuth<T>(url: string, token: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
        throw new Error(error.error?.message || `HTTP ${response.status}`);
    }

    return response.json();
}

export async function getSites(token: string): Promise<SitesResponse> {
    return fetchWithAuth<SitesResponse>(`${API_BASE}/sites`, token);
}

export async function getSearchAnalytics(
    token: string,
    siteUrl: string,
    request: SearchAnalyticsRequest
): Promise<SearchAnalyticsResponse> {
    const encodedSiteUrl = encodeURIComponent(siteUrl);
    const url = `${API_BASE}/sites/${encodedSiteUrl}/searchAnalytics/query`;

    return fetchWithAuth<SearchAnalyticsResponse>(url, token, {
        method: 'POST',
        body: JSON.stringify({
            ...request,
            rowLimit: request.rowLimit || 1000,
        }),
    });
}

// Helper to format date for API (YYYY-MM-DD)
export function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

// Helper to get date ranges
export function getDateRange(days: number): { startDate: string; endDate: string } {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 3); // Data has 3-day delay

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - days);

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
    };
}
