import React from "react";
import AdminApproval from "../components/AdminApproval";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 text-center text-2xl font-semibold">
        Admin Dashboard
      </header>
      <main className="p-6">
        <AdminApproval />
      </main>
    </div>
  );
};

export default AdminPage;
