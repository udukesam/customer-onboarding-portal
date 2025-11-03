import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { stage: 'Profile', clients: 10 },
  { stage: 'KYC', clients: 6 },
  { stage: 'Payment', clients: 8 },
  { stage: 'Verification', clients: 5 },
  { stage: 'Completed', clients: 12 }
];

export default function AnalyticsDashboard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Analytics Dashboard</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="stage" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="clients" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
