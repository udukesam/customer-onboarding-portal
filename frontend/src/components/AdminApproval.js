import React, { useEffect, useState } from "react";

const AdminApproval = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8000/admin/pending");
      if (!response.ok) throw new Error("Failed to load customers");
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/approve/${customerId}`, {
        method: "PUT",
      });
      if (response.ok) {
        alert("Customer approved successfully!");
        fetchCustomers();
      } else {
        alert("Failed to approve customer");
      }
    } catch (err) {
      alert("Error approving customer: " + err.message);
    }
  };

  const handleReject = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:8000/admin/reject/${customerId}`, {
        method: "PUT",
      });
      if (response.ok) {
        alert("Customer rejected successfully!");
        fetchCustomers();
      } else {
        alert("Failed to reject customer");
      }
    } catch (err) {
      alert("Error rejecting customer: " + err.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <p>Loading pending approvals...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Pending Customer Approvals</h2>
      {customers.length === 0 ? (
        <p>No customers pending approval.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-3 border-b">Name</th>
              <th className="py-2 px-3 border-b">Email</th>
              <th className="py-2 px-3 border-b">KYC Status</th>
              <th className="py-2 px-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.customer_id}>
                <td className="py-2 px-3 border-b">{cust.name}</td>
                <td className="py-2 px-3 border-b">{cust.email}</td>
                <td className="py-2 px-3 border-b">
                  {cust.kyc_uploaded ? "Uploaded" : "Pending"}
                </td>
                <td className="py-2 px-3 border-b">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                    onClick={() => handleApprove(cust.customer_id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(cust.customer_id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminApproval;
