import React, { useRef, useState, useEffect } from 'react';

const ImageCanvas: React.FC<{ imageFile?: File }> = ({ imageFile }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    console.log(`Clicked at x: ${x}, y: ${y}`);
  };

  useEffect(() => {
    if (imageFile && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
          const x = (canvasRef.current!.width - img.width) / 2;
          const y = (canvasRef.current!.height - img.height) / 2;
          ctx.drawImage(img, x, y);
        };
        img.src = URL.createObjectURL(imageFile);
      }
    }
  }, [imageFile]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onClick={handleCanvasClick}
      style={{ width: '90%', height: '100%', display: 'block', boxSizing: 'border-box' }}
    />
  );
};

export default ImageCanvas;
