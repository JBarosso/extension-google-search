import React from 'react';
import { DateRange } from '../types';
import { getDateRange } from '../services/searchConsole';

interface DateFiltersProps {
    dateRange: DateRange;
    onDateChange: (range: DateRange) => void;
    disabled: boolean;
}

const PRESETS = [
    { label: '7 derniers jours', days: 7 },
    { label: '28 derniers jours', days: 28 },
    { label: '3 derniers mois', days: 90 },
];

export const DateFilters: React.FC<DateFiltersProps> = ({
    dateRange,
    onDateChange,
    disabled
}) => {
    const handlePresetClick = (days: number) => {
        onDateChange(getDateRange(days));
    };

    const handleManualChange = (field: keyof DateRange, value: string) => {
        onDateChange({ ...dateRange, [field]: value });
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Période
                </label>
                <div className="flex gap-1">
                    {PRESETS.map((preset) => (
                        <button
                            key={preset.days}
                            onClick={() => handlePresetClick(preset.days)}
                            disabled={disabled}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 rounded transition-colors disabled:opacity-50"
                        >
                            {preset.days}j
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Début</label>
                    <input
                        type="date"
                        value={dateRange.startDate}
                        onChange={(e) => handleManualChange('startDate', e.target.value)}
                        disabled={disabled}
                        className="w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white disabled:opacity-50"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 mb-1">Fin</label>
                    <input
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => handleManualChange('endDate', e.target.value)}
                        disabled={disabled}
                        className="w-full text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white disabled:opacity-50"
                    />
                </div>
            </div>
        </div>
    );
};
