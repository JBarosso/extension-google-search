import React from 'react';
import { SearchAnalyticsRow } from '../types';

interface DataTableProps {
    rows: SearchAnalyticsRow[];
    loading: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ rows, loading }) => {
    if (loading) {
        return (
            <div className="w-full p-8 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <svg className="animate-spin h-8 w-8 mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm">Chargement des données...</span>
            </div>
        );
    }

    if (rows.length === 0) {
        return (
            <div className="w-full p-8 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <svg className="w-12 h-12 mb-3 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-sm font-medium">Aucune donnée disponible</p>
                <p className="text-xs mt-1 opacity-70">Sélectionnez une propriété et cliquez sur "Récupérer"</p>
            </div>
        );
    }

    return (
        <div className="relative overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-3 py-2 w-1/2">Requête</th>
                        <th scope="col" className="px-2 py-2 text-right">Clics</th>
                        <th scope="col" className="px-2 py-2 text-right">Impr.</th>
                        <th scope="col" className="px-2 py-2 text-right">Pos.</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {rows.map((row, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-3 py-2 font-medium text-gray-900 dark:text-white truncate max-w-[150px]" title={row.keys[0]}>
                                {row.keys[0]}
                            </td>
                            <td className="px-2 py-2 text-right">{row.clicks.toLocaleString()}</td>
                            <td className="px-2 py-2 text-right">{row.impressions.toLocaleString()}</td>
                            <td className="px-2 py-2 text-right">{row.position.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
