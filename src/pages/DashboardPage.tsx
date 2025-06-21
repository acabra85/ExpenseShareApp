import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import MessageDisplay from '../components/MessageDisplay';

const DashboardPage = () => {
  const { logout, fetchProtectedData, message, setMessage } = useAuth();
  const [backendData, setBackendData] = useState<any | null>(null); // Use 'any' for flexibility for now

  const handleFetchData = async () => {
    setBackendData(null);
    const data = await fetchProtectedData();
    if (data) {
      setBackendData(JSON.stringify(data, null, 2));
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Dashboard</h2>
      <p className="text-gray-700 mb-4">Welcome! You are logged in.</p>

      {message && <MessageDisplay message={message} type={message.includes('successful') ? 'success' : 'error'} />}

      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={handleFetchData}>Fetch Protected Data</Button>
        <Button onClick={logout} className="bg-red-500 hover:bg-red-600">Logout</Button>
      </div>

      {backendData && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200 text-left overflow-auto max-h-64">
          <h3 className="font-semibold text-gray-700 mb-2">Data from Backend:</h3>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">{backendData}</pre>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
