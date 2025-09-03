import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, Language } from '../../contexts/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ru' as Language, name: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">
          {languages.find(l => l.code === language)?.flag}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-3 transition-colors ${
              language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};