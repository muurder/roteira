import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { TravelPreferences, ItineraryResult, TravelSuggestion, FavoriteItinerary } from './types';
import { generateItinerary } from './services/geminiService';
import Header from './components/Header';
import TravelForm from './components/TravelForm';
import MarkdownRenderer from './components/MarkdownRenderer';
import { SparklesIcon } from './components/icons/SparklesIcon';
import { ShareIcon } from './components/icons/ShareIcon';
import { CopyIcon } from './components/icons/CopyIcon';
import { MapPinIcon } from './components/icons/MapPinIcon';
import SuggestionCards from './components/SuggestionCards';
import ItineraryMap from './components/ItineraryMap';
import { WhatsAppIcon } from './components/icons/WhatsAppIcon';
import { HeartIcon } from './components/icons/HeartIcon';
import FavoritesSection from './components/FavoritesSection';

declare const jspdf: any;

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<ItineraryResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [lastPreferences, setLastPreferences] = useState<TravelPreferences | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<TravelSuggestion | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItinerary[]>([]);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
        const storedFavorites = localStorage.getItem('favoriteItineraries');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    } catch (error) {
        console.error("Failed to load favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
      try {
          localStorage.setItem('favoriteItineraries', JSON.stringify(favorites));
      } catch (error) {
          console.error("Failed to save favorites to localStorage", error);
      }
  }, [favorites]);

  const handleFormSubmit = useCallback(async (preferences: TravelPreferences) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setLastPreferences(preferences);

    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
    } catch (err) {
      setError('Desculpe, ocorreu um erro ao gerar seu roteiro. Verifique sua conexão e tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRegenerate = useCallback(() => {
    if (lastPreferences) {
      handleFormSubmit(lastPreferences);
    }
  }, [lastPreferences, handleFormSubmit]);
  
  const handleCopyText = useCallback(() => {
    if (!itinerary || !navigator.clipboard) {
      alert('A função de copiar não é suportada neste navegador.');
      return;
    }

    const plainText = itineraryRef.current?.innerText || itinerary.text;

    navigator.clipboard.writeText(plainText).then(() => {
      setCopyStatus('copied');
      setTimeout(() => {
        setCopyStatus('idle');
      }, 2000);
    }).catch(err => {
      console.error('Falha ao copiar o roteiro: ', err);
      alert('Não foi possível copiar o roteiro. Tente manualmente.');
    });
  }, [itinerary, itineraryRef]);

  const handleSharePdf = useCallback(async () => {
    if (!itinerary || !lastPreferences) return;
    
    try {
        const { jsPDF } = jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const contactInfo = '(11) 98769-7684';

        let y = 20; // Start position
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 15;
        const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2;
        
        const addPageIfNeeded = (spaceNeeded: number) => {
            if (y + spaceNeeded > pageHeight - margin) {
                pdf.addPage();
                y = margin;
            }
        };

        // Header
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(20);
        pdf.setTextColor('#1E3A8A'); // Dark Blue
        let titleLines = pdf.splitTextToSize(`Roteiro de Viagem: ${lastPreferences.destination}`, maxWidth);
        addPageIfNeeded(titleLines.length * 10);
        pdf.text(titleLines, margin, y);
        y += titleLines.length * 10;
        pdf.setDrawColor('#E5E7EB'); // Light Gray
        pdf.line(margin, y, maxWidth + margin, y);
        y += 10;

        // Content
        pdf.setTextColor('#374151'); // Gray-700
        const lines = itinerary.text.split('\n');

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine.length === 0) {
                if (y < pageHeight - margin - 10) y += 5; // Add space for empty lines
                return;
            }
            
            let fontSize = 10;
            let lineHeight = 5;
            let spaceBefore = 0;

            if (trimmedLine.startsWith('## ')) {
                fontSize = 16;
                lineHeight = 7;
                spaceBefore = 8;
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor('#1D4ED8'); // Blue-700
            } else if (trimmedLine.match(/^\*\*(Dia \d+.*?)\*\*$/) || trimmedLine.startsWith('### ')) {
                fontSize = 14;
                lineHeight = 6;
                spaceBefore = 6;
                pdf.setFont('helvetica', 'bold');
                pdf.setTextColor('#374151'); // Gray-700
            } else if (['Manhã:', 'Tarde:', 'Noite:'].some(s => trimmedLine.startsWith(s))) {
                fontSize = 11;
                lineHeight = 5;
                spaceBefore = 4;
                pdf.setFont('helvetica', 'bold');
            } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
                pdf.setFont('helvetica', 'normal');
            } else {
                pdf.setFont('helvetica', 'normal');
            }
            
            y += spaceBefore;
            pdf.setFontSize(fontSize);
            
            const content = pdf.splitTextToSize(
                trimmedLine.replace(/#|\*|^- /g, ''),
                trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ') ? maxWidth - 5 : maxWidth
            );

            addPageIfNeeded(content.length * lineHeight);

            const textX = (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) ? margin + 5 : margin;
            const textToRender = (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) ? `• ${content.join('\n').substring(2)}` : content;


            pdf.text(textToRender, textX, y);
            y += content.length * lineHeight;
        });
        
        // Add footer to all pages
        const pageCount = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setTextColor(150);
            const footerText = `Gerado por Planejador de Viagens IA | Contato: ${contactInfo} | Página ${i} de ${pageCount}`;
            pdf.text(footerText, margin, pageHeight - 10);
        }
        
        const pdfBlob = pdf.output('blob');
        const pdfFile = new File([pdfBlob], 'roteiro-de-viagem.pdf', { type: 'application/pdf' });

        if (navigator.share && navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
            await navigator.share({
                title: 'Meu Roteiro de Viagem',
                text: 'Confira este roteiro de viagem incrível que criei!',
                files: [pdfFile],
            });
        } else {
            pdf.save('roteiro-de-viagem.pdf');
        }
    } catch (err) {
        console.error("Erro ao gerar ou compartilhar PDF: ", err);
        alert("Desculpe, ocorreu um erro ao gerar o PDF do roteiro.");
    }
  }, [itinerary, lastPreferences]);

  const handleSuggestionSelect = useCallback((suggestion: TravelSuggestion) => {
    setSelectedSuggestion(suggestion);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const isCurrentFavorite = useMemo(() => {
    if (!itinerary || !lastPreferences) return false;
    return favorites.some(fav => 
        fav.result.text === itinerary.text &&
        JSON.stringify(fav.preferences) === JSON.stringify(lastPreferences)
    );
  }, [itinerary, lastPreferences, favorites]);

  const handleToggleFavorite = useCallback(() => {
    if (!itinerary || !lastPreferences) return;

    if (isCurrentFavorite) {
        setFavorites(prev => prev.filter(fav => 
            fav.result.text !== itinerary.text ||
            JSON.stringify(fav.preferences) !== JSON.stringify(lastPreferences)
        ));
    } else {
        const newFavorite: FavoriteItinerary = {
            preferences: lastPreferences,
            result: itinerary
        };
        setFavorites(prev => [...prev, newFavorite]);
    }
  }, [isCurrentFavorite, itinerary, lastPreferences]);

  const handleSelectFavorite = useCallback((favorite: FavoriteItinerary) => {
    setItinerary(favorite.result);
    setLastPreferences(favorite.preferences);
    itineraryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollTo({ top: itineraryRef.current?.offsetTop ?? 0, behavior: 'smooth' });
  }, []);

  const handleRemoveFavorite = useCallback((favoriteToRemove: FavoriteItinerary) => {
      setFavorites(prev => prev.filter(fav => 
           JSON.stringify(fav) !== JSON.stringify(favoriteToRemove)
      ));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100/50 font-sans text-gray-800 antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div ref={formRef}>
            <TravelForm
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
              suggestion={selectedSuggestion}
              onSuggestionApplied={() => setSelectedSuggestion(null)}
            />
          </div>

          <div className="mt-12">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-white rounded-lg shadow-md border border-gray-200">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-lg font-semibold text-gray-700">Criando seu roteiro mágico...</p>
                <p className="text-gray-500">Isso pode levar alguns segundos.</p>
              </div>
            ) : error ? (
              <div className="p-6 bg-red-100 border border-red-300 text-red-800 rounded-lg shadow-md text-center">
                <h3 className="font-bold text-lg mb-2">Ops! Algo deu errado.</h3>
                <p>{error}</p>
              </div>
            ) : itinerary ? (
              <div className="bg-white rounded-lg shadow-xl border border-gray-200 animate-fade-in">
                 <div className="sticky top-0 z-10 flex items-center justify-end space-x-1 sm:space-x-2 p-2 bg-gray-50/80 backdrop-blur-sm border-b border-gray-200 rounded-t-lg">
                    <button
                        onClick={handleToggleFavorite}
                        title={isCurrentFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                        className={`p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isCurrentFavorite ? 'text-red-500 bg-red-100' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
                        aria-label="Adicionar aos Favoritos"
                    >
                        <HeartIcon className="w-5 h-5" filled={isCurrentFavorite} />
                    </button>
                    <button
                        onClick={handleRegenerate}
                        title="Gerar novo roteiro com IA"
                        className="p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label="Gerar novo roteiro com IA"
                        disabled={!lastPreferences}
                    >
                        <SparklesIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleCopyText}
                        title={copyStatus === 'copied' ? 'Copiado!' : 'Copiar para área de transferência'}
                        className="p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        aria-label="Copiar para área de transferência"
                        disabled={copyStatus === 'copied'}
                    >
                        <CopyIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleSharePdf}
                        title="Compartilhar como PDF"
                        className="p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        aria-label="Compartilhar como PDF"
                    >
                        <ShareIcon className="w-5 h-5" />
                    </button>
                 </div>
                 <div ref={itineraryRef} className="p-6 sm:p-10">
                    {itinerary.mapImageUrl && <ItineraryMap imageUrl={itinerary.mapImageUrl} />}
                    <MarkdownRenderer text={itinerary.text} />
                    {itinerary.sources.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center">
                                <MapPinIcon className="w-5 h-5 mr-2 text-blue-600" />
                                Fontes e Referências
                            </h3>
                            <ul className="space-y-2 pl-2">
                            {itinerary.sources.map((source, index) => (
                                <li key={index} className="text-sm">
                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                                    {source.title}
                                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                </a>
                                </li>
                            ))}
                            </ul>
                        </div>
                    )}
                 </div>
                 <div className="p-6 sm:p-10 bg-gray-50/70 border-t border-gray-200 rounded-b-lg">
                    <SuggestionCards onSelect={handleSuggestionSelect} context="follow-up" />
                 </div>
              </div>
            ) : (
               <div className="text-center p-8 bg-white/70 backdrop-blur-sm rounded-lg shadow-md border border-gray-200">
                  <SparklesIcon className="w-16 h-16 mx-auto text-blue-500" />
                  <h2 className="mt-4 text-2xl font-bold text-gray-800">Seu Roteiro Personalizado Começa Aqui</h2>
                  <p className="mt-2 text-gray-600 max-w-xl mx-auto">Preencha os campos acima para que nossa inteligência artificial crie um plano de viagem exclusivo para você. Boa viagem!</p>
                  <SuggestionCards onSelect={handleSuggestionSelect} context="initial" />
              </div>
            )}
          </div>
        </div>
      </main>
      <FavoritesSection 
        favorites={favorites} 
        onSelect={handleSelectFavorite} 
        onRemove={handleRemoveFavorite} 
      />
      <footer className="text-center py-6 text-gray-500 text-sm">
        <div className="inline-flex items-center justify-center gap-2">
          <span>Contato:</span>
          <a
            href="https://wa.me/5511987697684"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            aria-label="Entrar em contato via WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>(11) 98769-7684</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
