// Authentication Service using chrome.identity

export async function getAuthToken(interactive = true): Promise<string> {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive }, (token) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
            }
            if (!token) {
                reject(new Error('No token received'));
                return;
            }
            resolve(token);
        });
    });
}

export async function revokeAuthToken(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
        chrome.identity.removeCachedAuthToken({ token }, () => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
                return;
            }
            // Also revoke on Google's side
            fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`)
                .then(() => resolve())
                .catch(() => resolve()); // Ignore errors on revoke
        });
    });
}

export async function getUserInfo(token: string): Promise<{ email: string; name?: string; picture?: string }> {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to get user info');
    }

    return response.json();
}
