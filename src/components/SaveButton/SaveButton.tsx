import React from 'react';
import { Block } from '../../types';

interface SaveButtonProps {
  blocks: Block[];
}

const SaveButton: React.FC<SaveButtonProps> = ({ blocks }) => {
  const handleSave = () => {
    const exportData = JSON.stringify(blocks, null, 2);
    console.log('Landing Page Data:', exportData);
  };

  return (
    <button className="btn btn-primary" onClick={handleSave}>
      Save
    </button>
  );
};

export default SaveButton;