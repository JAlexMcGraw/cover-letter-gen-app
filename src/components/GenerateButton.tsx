import React from 'react';

interface GenerateButtonProps {
  onClick: (e: React.FormEvent) => void;
  disabled: boolean;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      Generate Cover Letter
    </button>
  );
};

export default GenerateButton;