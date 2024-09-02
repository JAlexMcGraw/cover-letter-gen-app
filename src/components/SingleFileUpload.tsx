import React, { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import styles from './styles/styles.module.css';

interface SingleFileUploaderProps {
    resumeFile: File | null;
    setResumeFile: Dispatch<SetStateAction<File | null>>;
    onUploadSuccess: (text: string) => void;
}

const SingleFileUploader: React.FC<SingleFileUploaderProps> = ({ resumeFile, setResumeFile, onUploadSuccess }) => {
//   const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
  'initial' | 'uploading' | 'success' | 'failure'
  >('initial');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.toLowerCase().endsWith('.pdf')) {
        alert('File must be a PDF');
        e.preventDefault();  // Stop the default behavior
        e.target.value = ''; // Clear the file input
        return;
    } else if (e.target.files) {
        setResumeFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!resumeFile) {
      alert('A PDF file must be provided');
      return;
    }
  
    setStatus('uploading');
  
    const formData = new FormData();
    formData.append('file', resumeFile);
  
    try {
      const response = await axios.post('/api/upload-pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        validateStatus: (status) => status < 500, // Treat all non-500 responses as successful
      });
  
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
  
      if (response.status === 200 && response.data && response.data.text) {
        setStatus('success');
        onUploadSuccess(response.data.text);
      } else {
        throw new Error(`Unexpected response: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      setStatus('failure');
    }
  };

  return (
    <>
      <div className={styles.body}>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} accept='.pdf' />
      </div>
      {resumeFile && (
        <section>
          File details:
          <ul>
            <li>Name: {resumeFile.name}</li>
            <li>Type: {resumeFile.type}</li>
            <li>Size: {resumeFile.size} bytes</li>
          </ul>
        </section>
      )}

      {resumeFile && 
      (<button onClick={handleUpload}>Upload a file</button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }: { status: string }) => {
    if (status === "success") {
      return <p>✅ File uploaded successfully!</p>;
    } else if (status === "failure") {
      return <p>❌ File upload failed!</p>;
    } else if (status === "uploading") {
      return <p>⏳ Uploading selected file...</p>;
    } else {
      return null;
    }
  };
  

export default SingleFileUploader;