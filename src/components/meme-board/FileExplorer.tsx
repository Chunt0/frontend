import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface FileNode {
  name: string;
  file: File;
}

const FileExplorer: React.FC<{ onFileSelect: (file: File) => void }> = ({ onFileSelect }) => {
  const [files, setFiles] = useState<FileNode[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      const fileArray = Array.from(fileList).map(file => ({
        name: file.name,
        file,
      }));
      setFiles(fileArray);
    }
  };

  return (
    <div style={{ width: '15%', borderRight: '1px solid #ccc', padding: '10px', boxSizing: 'border-box' }}>
      <input
        type="file"
        webkitdirectory="true"
        directory=""
        multiple
        onChange={handleFileChange}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {files.map((fileNode, index) => (
          <li key={index} onClick={() => onFileSelect(fileNode.file)} style={{ cursor: 'pointer' }}>
            {fileNode.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
