// import React, { useRef, useEffect } from 'react';
// import './styles/styles.css';

// interface ResumeTextProps {
//     text: string | undefined;
//     placeholder?: string;
//     disabled: boolean;
// }

// const ResumeText: React.FC<ResumeTextProps> = ({ text, placeholder="Resume text here", disabled=true }) => {
//     const textareaRef = useRef<HTMLTextAreaElement>(null);

//     useEffect(() => {
//         if (textareaRef.current) {
//           // Reset height to auto to calculate the new height
//           textareaRef.current.style.height = 'auto';
//           // Set the height of the textarea to the scroll height
//           textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//         }
//       }, [text]);

//     return (
//         <textarea className="body"
//         ref={textareaRef}
//         value={text}
//         placeholder={placeholder}
//         disabled={disabled}
//         style={{
//             width: '100%',
//             resize: 'none', // Disable manual resizing by the user
//             overflow: 'clip', // Hide overflow to avoid scrollbar
//           }}
//         />
//     );
// };

// export default ResumeText;

import React, { useRef, useEffect, ChangeEvent } from 'react';
import './styles/styles.css';

interface ResumeTextProps {
    text: string | undefined;
    placeholder?: string;
    disabled: boolean;
    onChange?: (value: string) => void;
}

const ResumeText: React.FC<ResumeTextProps> = ({ text, placeholder="Resume text here", disabled=true, onChange }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        adjustHeight();
    }, [text]);

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight);
            const maxHeight = lineHeight * 10; // 5 rows
            textareaRef.current.style.height = `${Math.max(scrollHeight, maxHeight)}px`;
        }
    };

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
        adjustHeight();
    };

    return (
        <textarea 
            className="body"
            ref={textareaRef}
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleChange}
            style={{
                width: '100%',
                resize: 'none',
                overflow: 'auto',
                maxHeight: `${parseInt(getComputedStyle(document.documentElement).fontSize) * 15 * 3}px`, // Assuming 1.5 line height
            }}
        />
    );
};

export default ResumeText;