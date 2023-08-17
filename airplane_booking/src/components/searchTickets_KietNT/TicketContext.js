import React, { createContext, useState } from 'react';

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const updateTickets = (newTickets) => {
    setTickets(newTickets);
  };

  return (
    <TicketContext.Provider value={{ tickets, updateTickets }}>
      {children}
    </TicketContext.Provider>
  );
};