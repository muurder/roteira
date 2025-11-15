import React, { useState, useEffect, useRef } from 'react';
import type { TravelPreferences, TravelSuggestion } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface TravelFormProps {
  onSubmit: (preferences: TravelPreferences) => void;
  isLoading: boolean;
  suggestion: TravelSuggestion | null;
  onSuggestionApplied: () => void;
}

const interestsOptions = [
  'Natureza', 'História', 'Gastronomia', 'Vida Noturna', 'Viagem barata', 'Cultura', 'Arte', 'Praia', 'Aventura'
];

const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];


const TravelForm: React.FC<TravelFormProps> = ({ onSubmit, isLoading, suggestion, onSuggestionApplied }) => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState<number>(3);
  const [interests, setInterests] = useState<string[]>([]);
  const [month, setMonth] = useState('');
  const [budget, setBudget] = useState<number | ''>('');
  const [travelerType, setTravelerType] = useState<'sozinho' | 'casal' | 'família' | 'amigos' | ''>('');

  const [isInterestsDropdownOpen, setIsInterestsDropdownOpen] = useState(false);
  const interestsInputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (suggestion) {
      setDestination(suggestion.destination);
      setDuration(suggestion.duration);
      setInterests(suggestion.interests);
      onSuggestionApplied();
    }
  }, [suggestion, onSuggestionApplied]);

  const handleInterestToggle = (interest: string) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleRemoveInterest = (interestToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setInterests(prev => prev.filter(i => i !== interestToRemove));
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (interestsInputRef.current && !interestsInputRef.current.contains(event.target as Node)) {
            setIsInterestsDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      alert('Por favor, informe o destino da viagem.');
      return;
    }
    onSubmit({ destination, duration, interests, month, budget, travelerType });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SparklesIcon className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Para onde vamos? Ex: Paris, França"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">Duração (dias)</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setDuration(prev => Math.max(1, prev - 1))}
                    className="absolute left-0 top-0 h-full px-3 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 transition-colors"
                    aria-label="Diminuir dias"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    min="1"
                    className="w-full text-center px-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                    type="button"
                    onClick={() => setDuration(prev => prev + 1)}
                    className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 transition-colors"
                    aria-label="Aumentar dias"
                >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                </button>
            </div>
          </div>
        </div>
        
        <div className="relative" ref={interestsInputRef}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principais Interesses</label>
            <button
                type="button"
                onClick={() => setIsInterestsDropdownOpen(prev => !prev)}
                className="w-full flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md shadow-sm bg-white cursor-pointer min-h-[42px] items-center text-left focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-haspopup="listbox"
                aria-expanded={isInterestsDropdownOpen}
            >
                {interests.length > 0 ? (
                    interests.map(interest => (
                        <span key={interest} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                            {interest}
                            <button
                                type="button"
                                onClick={(e) => handleRemoveInterest(interest, e)}
                                className="ml-1.5 -mr-1 flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-blue-600 hover:bg-blue-200 hover:text-blue-800 focus:outline-none focus:bg-blue-500 focus:text-white"
                                aria-label={`Remover ${interest}`}
                            >
                                <span className="sr-only">Remover {interest}</span>
                                <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                                    <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                                </svg>
                            </button>
                        </span>
                    ))
                ) : (
                    <span className="text-gray-500 px-1">Selecione um ou mais interesses...</span>
                )}
            </button>
            {isInterestsDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none" role="listbox">
                    <ul className="py-1">
                        {interestsOptions.map(option => (
                            <li
                                key={option}
                                onClick={() => handleInterestToggle(option)}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between text-gray-900"
                                role="option"
                                aria-selected={interests.includes(option)}
                            >
                                <span className={`${interests.includes(option) ? 'font-semibold' : 'font-normal'}`}>
                                    {option}
                                </span>
                                {interests.includes(option) && (
                                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
          <div>
            <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">Mês da Viagem (Opcional)</label>
            <div className="relative">
              <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none"
              >
                  <option value="">Selecione...</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.25 3.25a.75.75 0 11-1.06 1.06L10 4.81 7.28 7.53a.75.75 0 01-1.06-1.06l3.25-3.25A.75.75 0 0110 3zM7.28 12.47a.75.75 0 011.06 0L10 15.19l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0l-3.25-3.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
              </div>
            </div>
          </div>
           <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">Orçamento (Opcional)</label>
            <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">R$</span>
                 </div>
                <input
                    type="number"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value ? parseInt(e.target.value, 10) : '')}
                    placeholder="2000"
                    min="0"
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Viajante (Opcional)</label>
            <div className="relative">
              <select
                  id="travelerType"
                  value={travelerType}
                  onChange={(e) => setTravelerType(e.target.value as any)}
                  className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 appearance-none"
              >
                  <option value="">Selecione...</option>
                  <option value="sozinho">Sozinho</option>
                  <option value="casal">Casal</option>
                  <option value="família">Família</option>
                  <option value="amigos">Amigos</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 3a.75.75 0 01.53.22l3.25 3.25a.75.75 0 11-1.06 1.06L10 4.81 7.28 7.53a.75.75 0 01-1.06-1.06l3.25-3.25A.75.75 0 0110 3zM7.28 12.47a.75.75 0 011.06 0L10 15.19l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0l-3.25-3.25a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Gerando Roteiro...
              </>
            ) : (
               <>
                <SparklesIcon className="w-5 h-5 mr-2" />
                Criar Meu Roteiro
               </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TravelForm;