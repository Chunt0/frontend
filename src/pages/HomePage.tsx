import { useState } from 'react';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error: ', error);
      setMessage('An error occurred.');
    }
  };

  return (
    <>
      <div className="flex min-h-screen justify-center items-center bg-gradient-to-r from-gray-400 to-gray-900">
      </div>
    </>
  );
};

export default HomePage;
