import React from 'react';

interface HelpGuideProps {
    isOpen: boolean;
    onClose: () => void;
}

export const HelpGuide: React.FC<HelpGuideProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-sm max-h-[90vh] overflow-y-auto flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Guide d'utilisation</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-4 space-y-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-300">1</span>
                            Connexion
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 pl-8">
                            Cliquez sur "Se connecter avec Google" et autorisez l'accès à votre Search Console.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-300">2</span>
                            Sélection
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 pl-8">
                            Choisissez une propriété dans la liste déroulante et définissez la plage de dates.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-300">3</span>
                            Analyse
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 pl-8">
                            Cliquez sur "Récupérer les données" pour voir les performances de vos requêtes.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-xs text-blue-700 dark:text-blue-300">4</span>
                            Export
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 pl-8">
                            Utilisez le bouton "Exporter en JSON" pour télécharger vos données et les analyser ailleurs.
                        </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
                        >
                            Compris !
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
