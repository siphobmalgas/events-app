import React, { useState, useEffect } from 'react';
import { useAuth } from './auth';
import { EventContext } from './event';

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load user's events from localStorage
      const allEvents = JSON.parse(localStorage.getItem('eventManagerEvents') || '[]');
      const userEvents = allEvents.filter(event => event.userId === user.id);
      setEvents(userEvents);
    } else {
      setEvents([]);
    }
  }, [user]);

  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now().toString(),
      ...eventData,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const allEvents = JSON.parse(localStorage.getItem('eventManagerEvents') || '[]');
    allEvents.push(newEvent);
    localStorage.setItem('eventManagerEvents', JSON.stringify(allEvents));
    
    setEvents(prevEvents => [...prevEvents, newEvent]);
    return newEvent;
  };

  const updateEvent = (eventId, eventData) => {
    const updatedEvent = {
      ...eventData,
      id: eventId,
      userId: user.id,
      updatedAt: new Date().toISOString()
    };

    const allEvents = JSON.parse(localStorage.getItem('eventManagerEvents') || '[]');
    const eventIndex = allEvents.findIndex(event => event.id === eventId);
    
    if (eventIndex !== -1) {
      allEvents[eventIndex] = updatedEvent;
      localStorage.setItem('eventManagerEvents', JSON.stringify(allEvents));
      
      setEvents(prevEvents => 
        prevEvents.map(event => event.id === eventId ? updatedEvent : event)
      );
      return updatedEvent;
    }
    return null;
  };

  const deleteEvent = (eventId) => {
    const allEvents = JSON.parse(localStorage.getItem('eventManagerEvents') || '[]');
    const filteredEvents = allEvents.filter(event => event.id !== eventId);
    localStorage.setItem('eventManagerEvents', JSON.stringify(filteredEvents));
    
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  const getEvent = (eventId) => {
    return events.find(event => event.id === eventId);
  };

  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => new Date(event.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const getPastEvents = () => {
    const now = new Date();
    return events
      .filter(event => new Date(event.date) < now)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
    getUpcomingEvents,
    getPastEvents
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};