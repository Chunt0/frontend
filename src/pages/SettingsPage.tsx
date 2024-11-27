import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface SettingsRequest {
  is_connected: boolean;
  public_key: string | null;
  token_addition: number;
}

const Settings: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [formData, setFormData] = useState<{ token_addition: number }>({ token_addition: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: parseFloat(value), // Convert the input value to a number
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData: SettingsRequest = {
      is_connected: connected,
      public_key: publicKey?.toBase58() || null,
      token_addition: formData.token_addition,
    };

    try {
      const response = await fetch('http://localhost:8000/add_tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        const token_amount = data.token_amount;
        console.log(`Current token amount: ${token_amount}`);
      } else {
        console.error('Failed to add tokens');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px', backgroundColor: '#1e1e1e', color: '#f5f5f5', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <h3 style={{ color: '#f5f5f5' }}>Settings</h3>
        <input
          type="number"
          name="token_addition"
          placeholder="Add Tokens"
          value={formData.token_addition}
          min="0"
          onChange={handleInputChange}
          required
          style={{ backgroundColor: '#333', color: '#f5f5f5', border: '1px solid #555', padding: '8px' }}
        />
        <button type="submit" style={{ backgroundColor: '#6200ee', color: '#f5f5f5', border: 'none', padding: '10px', cursor: 'pointer' }}>
          Add Tokens
        </button>
      </form>
    </div>
  );
};

export default Settings;
