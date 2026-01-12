import React, { useState } from 'react';
import { inspectUrl, InspectionResponse } from '../services/searchConsole';
import { ExportActions } from './ExportActions';

interface UrlInspectorProps {
    token: string | null;
    siteUrl: string | null;
}

interface InspectionResult {
    url: string;
    verdict: string;
    coverageState: string;
    indexingState: string;
    status: 'loading' | 'success' | 'error';
}

export const UrlInspector: React.FC<UrlInspectorProps> = ({ token, siteUrl }) => {
    const [input, setInput] = useState('');
    const [results, setResults] = useState<InspectionResult[]>([]);
    const [isInspecting, setIsInspecting] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });

    const handleInspect = async () => {
        if (!token || !siteUrl) return;

        const urls = input.split('\n').map(u => u.trim()).filter(u => u.length > 0);
        if (urls.length === 0) return;

        setIsInspecting(true);
        setResults([]);
        setProgress({ current: 0, total: urls.length });

        const newResults: InspectionResult[] = [];

        // Process one by one to respect rate limits
        for (const url of urls) {
            const resultItem: InspectionResult = {
                url,
                verdict: '...',
                coverageState: '...',
                indexingState: '...',
                status: 'loading'
            };

            // Optimistic update
            newResults.push(resultItem);
            setResults([...newResults]);

            try {
                const fullUrl = url.startsWith('http') ? url : siteUrl + (siteUrl.endsWith('/') ? '' : '/') + url;
                const response: InspectionResponse = await inspectUrl(token, siteUrl, fullUrl);

                const res = response.inspectionResult.indexStatusResult;

                resultItem.verdict = res.verdict || 'N/A';
                resultItem.coverageState = res.coverageState || 'N/A';
                resultItem.indexingState = res.indexingState || 'N/A';
                resultItem.status = 'success';
            } catch (error) {
                resultItem.verdict = 'Erreur';
                resultItem.coverageState = error instanceof Error ? error.message : 'Echec';
                resultItem.status = 'error';
            }

            // Update item in list
            setResults([...newResults]);
            setProgress(prev => ({ ...prev, current: prev.current + 1 }));

            // Small delay to be nice to API
            await new Promise(r => setTimeout(r, 500));
        }

        setIsInspecting(false);
    };



    return (
        <div className="flex flex-col gap-4 flex-1">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URLs à inspecter (une par ligne)
                </label>
                {!siteUrl && (
                    <div className="mb-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded border border-yellow-200 dark:border-yellow-800 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Veuillez sélectionner une propriété GSC ci-dessus pour inspecter.
                    </div>
                )}

                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isInspecting}
                    placeholder="https://example.com/page-1&#10;https://example.com/page-2"
                    className="w-full h-32 p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:text-white font-mono"
                />

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        {isInspecting ? `Inspection en cours : ${progress.current}/${progress.total}` : 'Limite : 2000 / jour'}
                    </span>
                    <button
                        onClick={handleInspect}
                        disabled={isInspecting || !input.trim() || !siteUrl}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isInspecting ? <span className="animate-spin">⏳</span> : '🔍'}
                        {siteUrl ? "Lancer l'inspection" : "Sélectionner une propriété"}
                    </button>
                </div>
            </div>

            {results.length > 0 && (
                <>
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                            <h3 className="font-semibold text-sm">Résultats</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left">
                                <thead className="text-gray-500 bg-gray-50 dark:bg-gray-800 sticky top-0">
                                    <tr>
                                        <th className="px-3 py-2">URL</th>
                                        <th className="px-3 py-2">Verdict</th>
                                        <th className="px-3 py-2">État</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {results.map((res, i) => (
                                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <td className="px-3 py-2 font-mono truncate max-w-[150px]" title={res.url}>{res.url}</td>
                                            <td className="px-3 py-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] border ${res.verdict === 'PASS' ? 'bg-green-100 text-green-700 border-green-200' :
                                                    res.verdict === 'FAIL' ? 'bg-red-100 text-red-700 border-red-200' :
                                                        'bg-gray-100 text-gray-600 border-gray-200'
                                                    }`}>
                                                    {res.verdict}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-gray-600 dark:text-gray-400">{res.coverageState}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="sticky bottom-0 z-10 w-full bg-background-light dark:bg-background-dark px-2 py-4 border-t border-gray-100 dark:border-gray-800 shadow-lg">
                        <ExportActions
                            data={results}
                            filenamePrefix="url_inspection"
                            type="inspection"
                        />
                    </div>
                </>
            )}
        </div>
    );
};
