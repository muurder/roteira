import React, { useMemo } from 'react';
import type { TravelSuggestion } from '../types';
import { allSuggestions } from '../data/suggestions';

const getShuffledSuggestions = (): TravelSuggestion[] => {
  const national = allSuggestions.filter(s => s.destination.includes(', Brasil'));
  const international = allSuggestions.filter(s => !s.destination.includes(', Brasil') && !s.destination.match(/família|solo|praia|cultural|europa|montanha/i));
  
  const shuffledNational = [...national].sort(() => 0.5 - Math.random());
  const shuffledInternational = [...international].sort(() => 0.5 - Math.random());

  const numNational = 6;
  const numInternational = 2;

  const finalSuggestions = [
    ...shuffledNational.slice(0, numNational),
    ...shuffledInternational.slice(0, numInternational)
  ];

  return finalSuggestions.sort(() => 0.5 - Math.random());
};


interface SuggestionCardsProps {
  onSelect: (suggestion: TravelSuggestion) => void;
  context?: 'initial' | 'follow-up';
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ onSelect, context = 'initial' }) => {
  const suggestions = useMemo(() => getShuffledSuggestions(), []);

  const titles = {
    initial: 'Sem ideias? Comece por aqui!',
    'follow-up': 'Que tal um novo destino?'
  };

  return (
    <div className={context === 'initial' ? "mt-8 pt-8 border-t border-gray-200" : ""}>
        <h3 className="text-xl font-bold text-gray-800 text-center mb-6">{titles[context]}</h3>
        <div className="flex flex-wrap justify-center gap-3 px-4">
            {suggestions.map((suggestion) => (
                <button 
                    key={suggestion.destination} 
                    onClick={() => onSelect(suggestion)}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border border-gray-200 hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title={suggestion.description}
                    aria-label={`Sugerir roteiro para ${suggestion.destination}`}
                >
                    {suggestion.destination}
                </button>
            ))}
        </div>
    </div>
  );
};

export default SuggestionCards;