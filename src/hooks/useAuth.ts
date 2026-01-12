// Authentication Hook

import { useState, useCallback, useEffect } from 'react';
import { getAuthToken, revokeAuthToken, getUserInfo } from '../services/auth';
import type { AuthState } from '../types';

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        isAuthenticated: false,
        token: null,
        user: null,
        loading: true,
        error: null,
    });

    // Try to get existing token on mount (non-interactive)
    useEffect(() => {
        getAuthToken(false)
            .then(async (token) => {
                const user = await getUserInfo(token);
                setState({
                    isAuthenticated: true,
                    token,
                    user,
                    loading: false,
                    error: null,
                });
            })
            .catch(() => {
                setState((prev) => ({ ...prev, loading: false }));
            });
    }, []);

    const login = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        try {
            const token = await getAuthToken(true);
            const user = await getUserInfo(token);

            setState({
                isAuthenticated: true,
                token,
                user,
                loading: false,
                error: null,
            });

            return token;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Authentication failed';
            setState((prev) => ({
                ...prev,
                loading: false,
                error: message,
            }));
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        if (state.token) {
            await revokeAuthToken(state.token);
        }

        setState({
            isAuthenticated: false,
            token: null,
            user: null,
            loading: false,
            error: null,
        });
    }, [state.token]);

    return {
        ...state,
        login,
        logout,
    };
}
