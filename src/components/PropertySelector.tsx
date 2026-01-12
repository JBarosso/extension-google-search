import React from 'react';
import { Site } from '../types';

interface PropertySelectorProps {
    sites: Site[];
    selectedSite: string | null;
    onSelect: (siteUrl: string) => void;
    loading: boolean;
}

export const PropertySelector: React.FC<PropertySelectorProps> = ({
    sites,
    selectedSite,
    onSelect,
    loading
}) => {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Propriété
            </label>
            <div className="relative">
                <select
                    value={selectedSite || ''}
                    onChange={(e) => onSelect(e.target.value)}
                    disabled={loading || sites.length === 0}
                    className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg py-2.5 pl-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                    <option value="">Sélectionner un site...</option>
                    {sites.map((site) => (
                        <option key={site.siteUrl} value={site.siteUrl}>
                            {site.siteUrl}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    {loading ? (
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    )}
                </div>
            </div>
            {sites.length === 0 && !loading && (
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                    Aucune propriété trouvée. Assurez-vous d'avoir accès à la Search Console.
                </p>
            )}
        </div>
    );
};
