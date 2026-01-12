import React from 'react';
import { SearchAnalyticsRow } from '../types';

interface ExportButtonProps {
    rows: SearchAnalyticsRow[];
    siteUrl: string | null;
    disabled: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ rows, siteUrl, disabled }) => {
    const handleExport = () => {
        if (!rows.length || !siteUrl) return;

        const data = {
            site: siteUrl,
            exportedAt: new Date().toISOString(),
            rowCount: rows.length,
            rows: rows
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gsc_export_${siteUrl.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            disabled={disabled}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exporter en JSON
        </button>
    );
};
