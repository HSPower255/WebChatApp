import { useState } from 'react';
import { locales } from '../locales'

export const useLocale = () => {
  const [locale, setLocale] = useState<'en' | 'es'>('en');

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    setLocale(newLocale);
  };

  return { locale, toggleLocale, messages: locales[locale] };
};