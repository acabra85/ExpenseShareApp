import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const App = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 font-sans antialiased flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col items-center py-8">
      <header className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">ExpenseShare Frontend</h1>
        <p className="text-gray-600">Your React-powered interface for managing expenses.</p>
      </header>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {isLoggedIn ? <DashboardPage /> : <LoginPage />}
      </div>

      <footer className="mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ExpenseShare. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
