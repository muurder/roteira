import React, { useMemo } from 'react';
import type { TravelSuggestion } from '../types';
import { allSuggestions } from '../data/suggestions';
import type { RawSuggestion } from '../data/suggestions';

const mapTipoToInterest = (tipo: string): string => {
    const mapping: { [key: string]: string } = {
        'praia': 'Praia',
        'natureza': 'Natureza',
        'cidade': 'Cultura',
        'aventura': 'Aventura',
        'romântico': 'Romântico',
        'histórico': 'História',
        'cultural': 'Cultura',
        'gastronômico': 'Gastronomia',
    };
    return mapping[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1);
};


const getShuffledSuggestions = (count = 8): TravelSuggestion[] => {
  const shuffled: RawSuggestion[] = [...allSuggestions].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count);

  return selected.map((s: RawSuggestion) => ({
    destination: s.label,
    duration: s.duracaoIdealDias,
    interests: [mapTipoToInterest(s.tipo)],
    description: s.descricaoCurta,
  }));
};


interface SuggestionCardsProps {
  onSelect: (suggestion: TravelSuggestion) => void;
  context?: 'initial' | 'follow-up';
  appliedSuggestion?: TravelSuggestion | null;
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ onSelect, context = 'initial', appliedSuggestion }) => {
  const suggestions = useMemo(() => getShuffledSuggestions(8), []);

  const titles = {
    initial: 'Sem ideias? Comece por aqui!',
    'follow-up': 'Que tal um novo destino?'
  };

  return (
    <div className={context === 'initial' ? "mt-8 pt-8 border-t border-gray-200 dark:border-gray-700" : ""}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 text-center mb-6">{titles[context]}</h3>
        <div className="flex flex-wrap justify-center gap-3 px-4">
            {suggestions.map((suggestion) => {
                const isApplied = appliedSuggestion?.destination === suggestion.destination;
                return (
                    <button 
                        key={suggestion.destination} 
                        onClick={() => onSelect(suggestion)}
                        className={`px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:text-blue-800 dark:hover:text-gray-100 hover:border-blue-300 dark:hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out ${isApplied ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 shadow-lg scale-105' : ''}`}
                        title={suggestion.description}
                        aria-label={`Sugerir roteiro para ${suggestion.destination}`}
                    >
                        {suggestion.destination}
                    </button>
                )
            })}
        </div>
    </div>
  );
};

export default SuggestionCards;