// Dark Mode Hook with chrome.storage persistence

import { useState, useEffect, useCallback } from 'react';

export function useDarkMode(): [boolean, () => void] {
    const [isDark, setIsDark] = useState<boolean>(false);

    useEffect(() => {
        // Load saved preference
        chrome.storage.local.get(['darkMode'], (result) => {
            const savedMode = result.darkMode ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(savedMode);
            updateDocumentClass(savedMode);
        });
    }, []);

    const updateDocumentClass = (dark: boolean) => {
        if (dark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const toggleDarkMode = useCallback(() => {
        setIsDark((prev) => {
            const newValue = !prev;
            updateDocumentClass(newValue);
            chrome.storage.local.set({ darkMode: newValue });
            return newValue;
        });
    }, []);

    return [isDark, toggleDarkMode];
}
