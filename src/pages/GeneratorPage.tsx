import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface GenerationParams {
  pos_prompt: string;
  neg_prompt: string;
  prompt_strength: number;
  batch_size: number;
  size: [number, number];
  loras: string[];
}

interface GenerateRequest {
  is_connected: boolean;
  public_key: string | null;
  gen_params: GenerationParams;
}

const Generator: React.FC = () => {
  const { connected, publicKey } = useWallet();
  const [formData, setFormData] = useState<GenerationParams>({
    pos_prompt: '',
    neg_prompt: '',
    prompt_strength: 1.0,
    batch_size: 1,
    size: [1024, 1024],
    loras: [],
  });
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => {
      if (name === 'loras') {
        return { ...prevData, loras: [value] }; // Assuming single selection for simplicity
      }

      return {
        ...prevData,
        [name]: type === 'number' || type === 'range' ? parseFloat(value) : value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData: GenerateRequest = {
      is_connected: connected,
      public_key: publicKey?.toBase58() || null,
      gen_params: formData,
    };

    try {
      //const response = await fetch('https://backend-bs98b.ondigitalocean.app/generate', {
      const response = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        const base64Image = data.image;
        setImageSrc(`data:image/png;base64,${base64Image}`);
      } else {
        console.error('Failed to generate image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px', backgroundColor: '#1e1e1e', color: '#f5f5f5', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <h3 style={{ color: '#f5f5f5' }}>AI Image Generator</h3>
        <input
          type="text"
          name="pos_prompt"
          placeholder="Positive Prompt"
          value={formData.pos_prompt}
          onChange={handleInputChange}
          required
          style={{ backgroundColor: '#333', color: '#f5f5f5', border: '1px solid #555', padding: '8px' }}
        />
        <input
          type="text"
          name="neg_prompt"
          placeholder="Negative Prompt"
          value={formData.neg_prompt}
          onChange={handleInputChange}
          style={{ backgroundColor: '#333', color: '#f5f5f5', border: '1px solid #555', padding: '8px' }}
        />
        <div>
          <label htmlFor="prompt_strength" style={{ display: 'block', marginBottom: '4px' }}>
            Prompt Strength: {formData.prompt_strength.toFixed(1)}
          </label>
          <input
            type="range"
            name="prompt_strength"
            min="0"
            max="1"
            step="0.1"
            value={formData.prompt_strength}
            onChange={handleInputChange}
            style={{ width: '100%', backgroundColor: '#333' }}
          />
        </div>
        <input
          type="number"
          name="batch_size"
          placeholder="Batch Size"
          value={formData.batch_size}
          min="1"
          onChange={handleInputChange}
          required
          style={{ backgroundColor: '#333', color: '#f5f5f5', border: '1px solid #555', padding: '8px' }}
        />
        <input
          type="number"
          name="size"
          placeholder="Height"
          value={formData.size[0]}
          min="1"
          onChange={(e) => setFormData({ ...formData, size: [parseInt(e.target.value, 10), formData.size[1]] })}
          required
          style={{ backgroundColor: '#333', color: '#f5f5f5', border: '1px solid #555', padding: '8px' }}
        />
        <input
          type="number"
          name="size"
          placeholder="Width"
          value={formData.size[1]}
          min="1"
          onChange={(e) => setFormData({ ...formData, size: [formData.size[0], parseInt(e.target.value, 10)] })}
          required
          style={{ backgroundColor: '#333', color: '#f5f5f5', border: '1px solid #555', padding: '8px' }}
        />
        <select
          name="loras"
          value={formData.loras[0] || ''}
          onChange={handleInputChange}
          style={{ backgroundColor: '#333', color: '#f5f5f5', border: '1px solid #555', padding: '8px' }}
        >
          <option value="">Select Lora</option>
          <option value="lora1">Lora 1</option>
          <option value="lora2">Lora 2</option>
        </select>
        <button type="submit" style={{ backgroundColor: '#6200ee', color: '#f5f5f5', border: 'none', padding: '10px', cursor: 'pointer' }}>
          Generate Image
        </button>
      </form>
      {/*  TODO: this needs to be turned into a component  */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #555', minHeight: '512px' }}>
        {imageSrc ? <img src={imageSrc} alt="Generated" style={{ maxWidth: '100%', maxHeight: '100%' }} /> : <p>No Image Generated</p>}
      </div>
    </div>
  );
};

export default Generator;
