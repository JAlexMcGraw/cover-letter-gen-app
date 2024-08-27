import React from 'react';

interface GenerateButtonProps {
    resumeFile: File | null;
    urlText: string;
}
const GenerateButton: React.FC<GenerateButtonProps> = ({ resumeFile, urlText }) => {
    const isEnabled = urlText !== '' && resumeFile !== null;

    return (
        <button disabled={!isEnabled}>
            Generate!
        </button>
    );
};

export default GenerateButton;
