// Google Search Console Types

export interface Site {
    siteUrl: string;
    permissionLevel: string;
}

export interface SitesResponse {
    siteEntry: Site[];
}

export interface SearchAnalyticsRow {
    keys: string[];
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}

export interface SearchAnalyticsResponse {
    rows?: SearchAnalyticsRow[];
    responseAggregationType?: string;
}

export interface SearchAnalyticsRequest {
    startDate: string;
    endDate: string;
    dimensions: string[];
    rowLimit?: number;
    startRow?: number;
}

export interface UserInfo {
    email: string;
    name?: string;
    picture?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: UserInfo | null;
    loading: boolean;
    error: string | null;
}

export interface DataState {
    sites: Site[];
    selectedSite: string | null;
    rows: SearchAnalyticsRow[];
    loading: boolean;
    error: string | null;
}

export interface DateRange {
    startDate: string;
    endDate: string;
}
