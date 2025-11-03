import React, { useState, useEffect } from 'react';
import ClientForm from './components/ClientForm';
import ClientList from './components/ClientList';
import AnalyticsDashboard from './components/AnalyticsDashboard';

export default function App() {
  const [clients, setClients] = useState([]);

  const handleNewClient = async (client) => {
    const res = await fetch('http://localhost:4000/api/crm/addClient', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client)
    });
    const data = await res.json();
    setClients([...clients, data.client]);
  };

  useEffect(() => {
    fetch('http://localhost:4000/api/crm/clients')
      .then((res) => res.json())
      .then(setClients);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Customer Onboarding Portal</h1>
      <div className="grid gap-6 max-w-5xl mx-auto">
        <ClientForm onAddClient={handleNewClient} />
        <ClientList clients={clients} />
        <AnalyticsDashboard />
      </div>
    </div>
  );
}
