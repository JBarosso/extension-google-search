import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthButton } from './components/AuthButton';
import { PropertySelector } from './components/PropertySelector';
import { DateFilters } from './components/DateFilters';
import { DataTable } from './components/DataTable';
import { ExportButton } from './components/ExportButton';
import { HelpGuide } from './components/HelpGuide';
import { useAuth } from './hooks/useAuth';
import { useSearchConsole } from './hooks/useSearchConsole';
import { useDarkMode } from './hooks/useDarkMode';
import { getDateRange } from './services/searchConsole';

function App() {
    const [isDark, toggleTheme] = useDarkMode();
    const [showHelp, setShowHelp] = useState(false);
    const [selectedSite, setSelectedSite] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState(getDateRange(7));

    const auth = useAuth();
    const gsc = useSearchConsole();

    // Load sites when authenticated
    useEffect(() => {
        if (auth.isAuthenticated && auth.token && !gsc.sites.length) {
            gsc.fetchSites(auth.token);
        }
    }, [auth.isAuthenticated, auth.token]);

    // Reset selection on logout
    useEffect(() => {
        if (!auth.isAuthenticated) {
            setSelectedSite(null);
            gsc.clearData();
        }
    }, [auth.isAuthenticated]);

    const handleFetchData = () => {
        if (auth.token && selectedSite) {
            gsc.fetchAnalytics(auth.token, selectedSite, dateRange);
        }
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200">
            <Header
                isDark={isDark}
                toggleTheme={toggleTheme}
                onOpenHelp={() => setShowHelp(true)}
            />

            <main className="flex-1 p-4 flex flex-col gap-6 w-full max-w-md mx-auto">
                {/* Auth Section */}
                <section>
                    <AuthButton
                        isAuthenticated={auth.isAuthenticated}
                        user={auth.user}
                        loading={auth.loading}
                        onLogin={auth.login}
                        onLogout={auth.logout}
                    />
                    {auth.error && (
                        <div className="mt-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded">
                            Erreur: {auth.error}
                        </div>
                    )}
                </section>

                {auth.isAuthenticated && (
                    <>
                        {/* Controls Section */}
                        <section className="flex flex-col gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <PropertySelector
                                sites={gsc.sites}
                                selectedSite={selectedSite}
                                onSelect={setSelectedSite}
                                loading={gsc.loading && !gsc.rows.length}
                            />

                            <DateFilters
                                dateRange={dateRange}
                                onDateChange={setDateRange}
                                disabled={gsc.loading}
                            />

                            <button
                                onClick={handleFetchData}
                                disabled={!selectedSite || gsc.loading}
                                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {gsc.loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Chargement...
                                    </>
                                ) : (
                                    'Récupérer les données'
                                )}
                            </button>
                        </section>

                        {/* Error Message */}
                        {gsc.error && (
                            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                                {gsc.error}
                            </div>
                        )}

                        {/* Results Section */}
                        <section className="flex-1 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                    Résultats ({gsc.rows.length})
                                </h2>
                            </div>

                            <DataTable rows={gsc.rows} loading={gsc.loading} />

                            {gsc.rows.length > 0 && (
                                <div className="sticky bottom-4 z-10">
                                    <ExportButton
                                        rows={gsc.rows}
                                        siteUrl={selectedSite}
                                        disabled={gsc.loading}
                                    />
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>

            <HelpGuide isOpen={showHelp} onClose={() => setShowHelp(false)} />
        </div>
    );
}

export default App;
