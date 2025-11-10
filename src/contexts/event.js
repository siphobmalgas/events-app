import { createContext, useContext } from 'react';

export const EventContext = createContext();

export const useEvents = () => {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error('useEvents must be used within an EventProvider');
  return ctx;
};
