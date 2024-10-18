import React, { createContext, useState } from 'react';

export const ServiceRequestContext = createContext();

export const ServiceRequestProvider = ({ children }) => {
  const [serviceRequest, setServiceRequest] = useState(null);

  const requestService = (selectedPin) => {
    setServiceRequest(selectedPin);
  };

  const acceptService = () => {
    // Lógica para aceitar a solicitação de serviço
    alert(`Serviço aceito para ${serviceRequest.nome}`);
    setServiceRequest(null); // Limpa a solicitação
  };

  const rejectService = () => {
    // Lógica para recusar a solicitação de serviço
    alert(`Serviço recusado para ${serviceRequest.nome}`);
    setServiceRequest(null); // Limpa a solicitação
  };

  return (
    <ServiceRequestContext.Provider value={{ serviceRequest, requestService, acceptService, rejectService }}>
      {children}
    </ServiceRequestContext.Provider>
  );
};
