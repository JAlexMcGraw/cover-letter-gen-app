import React, { useRef, useEffect } from 'react';
import './styles/styles.css';

interface ResumeTextProps {
    text: string | undefined;
    placeholder?: string;
    disabled: boolean;
}

const ResumeText: React.FC<ResumeTextProps> = ({ text, placeholder="Resume text here", disabled=true }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
          // Reset height to auto to calculate the new height
          textareaRef.current.style.height = 'auto';
          // Set the height of the textarea to the scroll height
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
      }, [text]);

    return (
        <textarea className="body"
        ref={textareaRef}
        value={text}
        placeholder={placeholder}
        disabled={disabled}
        style={{
            width: '100%',
            resize: 'none', // Disable manual resizing by the user
            overflow: 'hidden', // Hide overflow to avoid scrollbar
          }}
        />
    );
};

export default ResumeText;