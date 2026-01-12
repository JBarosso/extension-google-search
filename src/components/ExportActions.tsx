import React from 'react';
import { SearchAnalyticsRow } from '../types';

interface ExportActionsProps {
    data: any[];
    filenamePrefix: string;
    type: 'performance' | 'inspection';
    disabled?: boolean;
}

export const ExportActions: React.FC<ExportActionsProps> = ({ data, filenamePrefix, type, disabled = false }) => {

    const handleExportJSON = () => {
        if (data.length === 0) return;
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = `${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportCSV = () => {
        if (data.length === 0) return;

        let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // Add BOM for Excel compatibility

        if (type === 'performance') {
            // Performance headers
            csvContent += "Query;Clicks;Impressions;CTR;Position\n";
            csvContent += data.map((row: SearchAnalyticsRow) => {
                // Escape quotes in keys
                const key = row.keys[0].replace(/"/g, '""');
                return `"${key}";${row.clicks};${row.impressions};${row.ctr.toFixed(4)};${row.position.toFixed(2)}`;
            }).join("\n");
        } else {
            // Inspection headers
            csvContent += "URL;Verdict;Coverage State;Indexing State\n";
            csvContent += data.map((row: any) => {
                // Assuming specific structure for inspection results
                return `"${row.url}";"${row.verdict}";"${row.coverageState}";"${row.indexingState}"`;
            }).join("\n");
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${filenamePrefix}_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={handleExportJSON}
                disabled={disabled || data.length === 0}
                className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                title="Exporter en JSON"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                JSON
            </button>

            <button
                onClick={handleExportCSV}
                disabled={disabled || data.length === 0}
                className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                title="Exporter en CSV"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                CSV
            </button>
        </div>
    );
};
