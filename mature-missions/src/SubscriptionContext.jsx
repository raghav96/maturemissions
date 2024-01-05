import React, { createContext, useContext, useState } from 'react';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [secrets, setSecrets] = useState({
    bronze: { "name" : "Bronze", "id" : "price_1O0BN6GOC4VJVNP01F5rgYus", "price" : "$23/month"},
    silver: { "name" : "Silver", "id" : "price_1O0BNKGOC4VJVNP0iYObSjyM", "price" : "$34/month"},
    gold: { "name" : "Gold", "id" : "price_1O0BNZGOC4VJVNP0ahoJqwOV", "price" : "$45/month"},
  });

  return (
    <SubscriptionContext.Provider value={{ selectedPackage, setSelectedPackage, secrets, setSecrets }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};
