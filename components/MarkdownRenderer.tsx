import React from 'react';

interface MarkdownRendererProps {
  text: string;
}

const parseInlineFormatting = (text: string): React.ReactNode => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ text }) => {
  const renderableElements: React.JSX.Element[] = [];
  const lines = text.split('\n');

  let currentListItems: React.ReactNode[] = [];

  const flushList = () => {
    if (currentListItems.length > 0) {
      renderableElements.push(
        <ul key={`ul-${renderableElements.length}`} className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-700">
          {currentListItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
      currentListItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('### ')) {
        flushList();
        renderableElements.push(<h3 key={index} className="text-xl font-bold text-blue-700 mt-6 mb-3 pt-2 border-t border-gray-200">{parseInlineFormatting(trimmedLine.substring(4))}</h3>);
    } else if (trimmedLine.startsWith('## ')) {
        flushList();
        renderableElements.push(<h2 key={index} className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b-2 border-blue-200">{parseInlineFormatting(trimmedLine.substring(3))}</h2>);
    } else if (trimmedLine.startsWith('# ')) {
        flushList();
        renderableElements.push(<h1 key={index} className="text-3xl font-extrabold text-gray-900 mb-6 text-center">{parseInlineFormatting(trimmedLine.substring(2))}</h1>);
    } else if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
        currentListItems.push(parseInlineFormatting(trimmedLine.substring(2)));
    } else if (['Manhã:', 'Tarde:', 'Noite:'].some(s => trimmedLine.startsWith(s))) {
        flushList();
        renderableElements.push(<h4 key={index} className="text-md font-semibold text-gray-600 mt-4 mb-2 uppercase tracking-wider">{parseInlineFormatting(trimmedLine)}</h4>);
    } else if (trimmedLine.length > 0) {
        flushList();
        renderableElements.push(<p key={index} className="mb-4 text-gray-700 leading-relaxed">{parseInlineFormatting(trimmedLine)}</p>);
    } else {
        flushList();
    }
  });

  flushList();

  return <div className="prose max-w-none">{renderableElements}</div>;
};

export default MarkdownRenderer;