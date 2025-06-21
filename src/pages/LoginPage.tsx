import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import Button from '../components/Button';
import MessageDisplay from '../components/MessageDisplay';

const LoginPage = () => {
  const { login, message } = useAuth(); // Removed setMessage as it's passed from AuthContext now
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Login</h2>

      {message && <MessageDisplay message={message} type={message.includes('successful') ? 'success' : 'error'} />}

      <form onSubmit={handleSubmit}>
        <InputField
          label="Username:"
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
        />
        <InputField
          label="Password:"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
