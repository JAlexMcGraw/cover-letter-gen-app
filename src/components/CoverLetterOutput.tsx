import React, { useRef, useEffect, SetStateAction, Dispatch, useState } from 'react';
import axios from 'axios';

interface TextAreaProps {
  value: string | undefined;
  onChange: (value: string) => void;
  setCoverLetterText: Dispatch<SetStateAction<string>>;
  jobText: string | undefined;
  resumeText: string | undefined;
  apiKey: string;
  placeholder?: string;
  disabled?: boolean;
}

const CoverLetterOutput: React.FC<TextAreaProps> = ({ value, onChange, setCoverLetterText, resumeText, apiKey, jobText, placeholder, disabled = false }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [generationStatus, setGenerationStatus] = useState<
    'initial' | 'generating' | 'success' | 'failure'
    >('initial');

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

  const handleSubmit = async () => {
    try {
      console.log('Sending request with data:', {
        job_post_text: jobText,
        resume_text: resumeText,
        openai_api_key: apiKey.substring(0, 5) + '...' // Log only the first 5 characters of the API key
      });
      
      setGenerationStatus('generating');
      const response = await axios.post('/api/generate_cover_letter/', {
        job_post_text: jobText,
        resume_text: resumeText,
        openai_api_key: apiKey
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Response data", response.data);
      if (response.status === 200 && response.data && response.data.text) {
        setCoverLetterText(response.data.text);
        setGenerationStatus('success');
      } else {
        throw new Error(`Unexpected response: ${JSON.stringify(response.data)}`);
        setGenerationStatus('failure');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setGenerationStatus('failure');
      if (axios.isAxiosError(error)) {
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
        console.error('Error message:', error.message);
        console.error('Error config:', error.config);
      }
    }
  }


  return (
    <div>
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
    <button onClick={handleSubmit}>Generate Cover Letter</button>
    <GenerationResult status={generationStatus} />
    </div>
  );
};

interface GenerationResultProps {
  status: "initial" | "generating" | "success" | "failure";
}

const GenerationResult = ( {status}: GenerationResultProps ): JSX.Element | null => {
  if (status === "success") {
    return <p>✅  Cover letter generated successfully!</p>;
  } else if (status === "failure") {
    return <p>❌ Cover letter generation failed!</p>;
  } else if (status === "generating") {
    return <p>⏳ Generating cover letter...</p>;
  } else {
    return null;
  }
};

export default CoverLetterOutput;
