import React, { useState } from 'react';

export type FilterType = 'keys' | 'clicks' | 'impressions' | 'ctr' | 'position';

export interface FilterCondition {
    id: string;
    field: FilterType;
    operator: 'contains' | 'regex' | 'gt' | 'lt';
    value: string;
}

interface FilterBuilderProps {
    onFiltersChange: (filters: FilterCondition[]) => void;
    disabled?: boolean;
}

export const FilterBuilder: React.FC<FilterBuilderProps> = ({ onFiltersChange, disabled = false }) => {
    const [activeFilters, setActiveFilters] = useState<FilterCondition[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    // New Filter State
    const [selectedField, setSelectedField] = useState<FilterType>('keys');
    const [operator, setOperator] = useState<'contains' | 'regex' | 'gt' | 'lt'>('contains');
    const [value, setValue] = useState('');

    const fieldLabels: Record<FilterType, string> = {
        keys: 'Requête',
        clicks: 'Clics',
        impressions: 'Impressions',
        ctr: 'CTR',
        position: 'Position'
    };

    const getOperatorsForField = (field: FilterType) => {
        if (field === 'keys') {
            return [
                { value: 'contains', label: 'Contient' },
                { value: 'regex', label: 'Regex' }
            ];
        }
        return [
            { value: 'gt', label: 'Supérieur à (>)' },
            { value: 'lt', label: 'Inférieur à (<)' }
        ];
    };

    const handleAddField = () => {
        if (!value) return;

        const newFilter: FilterCondition = {
            id: Math.random().toString(36).substr(2, 9),
            field: selectedField,
            operator: operator as any, // Cast safe because we reset operator on field change
            value
        };

        const updatedFilters = [...activeFilters, newFilter];
        setActiveFilters(updatedFilters);
        onFiltersChange(updatedFilters);

        // Reset Form
        setValue('');
        setIsAdding(false);
    };

    const removeFilter = (id: string) => {
        const updatedFilters = activeFilters.filter(f => f.id !== id);
        setActiveFilters(updatedFilters);
        onFiltersChange(updatedFilters);
    };

    const handleFieldChange = (newField: FilterType) => {
        setSelectedField(newField);
        // Reset operator to default valid one for type
        if (newField === 'keys') {
            setOperator('contains');
        } else {
            setOperator('gt');
        }
    };

    return (
        <div className="flex flex-col gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
            {/* Header / Add Button */}
            <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filtres ({activeFilters.length})</span>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        disabled={disabled}
                        className="text-xs flex items-center gap-1 text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded transition-colors disabled:opacity-50"
                    >
                        <span>+</span> Ajouter un filtre
                    </button>
                )}
            </div>

            {/* Active Filters List */}
            {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {activeFilters.map(filter => (
                        <div key={filter.id} className="flex items-center gap-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-xs shadow-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{fieldLabels[filter.field]}</span>
                            <span className="text-gray-400">
                                {filter.operator === 'gt' ? '>' :
                                    filter.operator === 'lt' ? '<' :
                                        filter.operator === 'regex' ? 'matches' : ':'}
                            </span>
                            <span className="font-mono text-blue-600 dark:text-blue-400 max-w-[100px] truncate">{filter.value}</span>
                            <button
                                onClick={() => removeFilter(filter.id)}
                                className="ml-1 text-gray-400 hover:text-red-500 font-bold"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Filter Form */}
            {isAdding && (
                <div className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-3 rounded border border-blue-100 dark:border-blue-900 shadow-sm animate-in fade-in slide-in-from-top-2">
                    <div className="flex gap-2">
                        <select
                            value={selectedField}
                            onChange={(e) => handleFieldChange(e.target.value as FilterType)}
                            className="flex-1 text-xs border border-gray-300 dark:border-gray-600 rounded p-1.5 bg-white dark:bg-gray-700 dark:text-white"
                        >
                            {Object.entries(fieldLabels).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>

                        <select
                            value={operator}
                            onChange={(e) => setOperator(e.target.value as any)}
                            className="flex-1 text-xs border border-gray-300 dark:border-gray-600 rounded p-1.5 bg-white dark:bg-gray-700 dark:text-white"
                        >
                            {getOperatorsForField(selectedField).map(op => (
                                <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                        </select>
                    </div>

                    <input
                        type={selectedField === 'keys' ? 'text' : 'number'}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={selectedField === 'keys' ? (operator === 'regex' ? 'Regex (ex: ^(quoi|comment).*)' : 'Texte à chercher...') : 'Valeur...'}
                        className="text-xs border border-gray-300 dark:border-gray-600 rounded p-1.5 bg-white dark:bg-gray-700 dark:text-white"
                        onKeyDown={(e) => e.key === 'Enter' && handleAddField()}
                        autoFocus
                    />

                    <div className="flex justify-end gap-2 mt-1">
                        <button
                            onClick={() => setIsAdding(false)}
                            className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleAddField}
                            disabled={!value}
                            className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            Appliquer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
