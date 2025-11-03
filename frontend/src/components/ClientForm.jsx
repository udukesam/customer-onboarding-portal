import React, { useState } from 'react';

export default function ClientForm({ onAddClient }) {
  const [form, setForm] = useState({ name: '', email: '', company: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => {
    if (form.name && form.email && form.company) onAddClient(form);
    setForm({ name: '', email: '', company: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Client Onboarding</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2 rounded" />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border p-2 rounded" />
        <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="border p-2 rounded" />
      </div>
      <button onClick={handleSubmit} className="bg-blue-500 text-white mt-3 px-4 py-2 rounded">Add Client</button>
    </div>
  );
}
