import React, { useRef, useEffect } from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const CoverLetterOutput: React.FC<TextAreaProps> = ({ value, onChange, placeholder, disabled = true }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to calculate the new height
      textareaRef.current.style.height = 'auto';
      // Set the height of the textarea to the scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      rows={1} // Initial row count
      style={{
        width: '100%',
        resize: 'none', // Disable manual resizing by the user
        overflow: 'hidden', // Hide overflow to avoid scrollbar
      }}
    />
  );
};

export default CoverLetterOutput;
