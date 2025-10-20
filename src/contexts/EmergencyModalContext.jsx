import { createContext, useContext, useState } from 'react';
import EmergencyConsultation from '../components/EmergencyConsultation';

const EmergencyModalContext = createContext();

export const useEmergencyModal = () => {
  const context = useContext(EmergencyModalContext);
  if (!context) {
    throw new Error('useEmergencyModal must be used within EmergencyModalProvider');
  }
  return context;
};

export const EmergencyModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('emergency');

  const openEmergencyModal = (type = 'emergency') => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeEmergencyModal = () => {
    setIsOpen(false);
  };

  return (
    <EmergencyModalContext.Provider value={{ openEmergencyModal, closeEmergencyModal }}>
      {children}
      <EmergencyConsultation 
        isOpen={isOpen}
        onClose={closeEmergencyModal}
        type={modalType}
      />
    </EmergencyModalContext.Provider>
  );
};
