import { Fragment, useState } from 'react'
import Header from './components/Header';
import StringUpload from './components/StringUpload';
import SingleFileUploader from './components/SingleFileUpload';
import CoverLetterOutput from './components/CoverLetterOutput';
import GenerateButton from './components/GenerateButton';
import axios from 'axios';

function App() {
  const [coverLetterText, setCoverLetterText] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [urlText, setUrlText] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string | null>(null);

  const handleUploadSuccess = (text: string) => {
    setResumeText(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    console.log("resumeFile type: ", typeof resumeFile)
    formData.append('file', resumeFile);
    console.log("formData type: ", typeof formData)

    try {
      const response = await axios.post('http://localhost:8000/upload-pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    
      // Check if the response contains the expected data
      if (response.data && response.data.text) {
        // File was uploaded successfully and text was returned
        setCoverLetterText(response.data.text);
        setError(null);
        console.log('File uploaded successfully and text was returned');
      } else {
        // File might have been uploaded, but no text was returned
        setError('File uploaded, but no text was returned from the server');
        console.log('File uploaded, but no text was returned');
      }
    } catch (error) {
      // An error occurred during the upload process
      console.error('Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Upload failed: ${error.response.data.message || error.message}`);
      } else {
        setError('An error occurred while uploading the file');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Header title='Cover Letter Generator' textColor='white' />
      <SingleFileUploader resumeFile={resumeFile} setResumeFile={setResumeFile} onUploadSuccess={handleUploadSuccess}/>
      <StringUpload text={urlText} setText={setUrlText} placeholder="Upload Job URL here" />
      <StringUpload text={apiKey} setText={setApiKey} placeholder="Upload OpenAI API key here" />
      <div>
        <GenerateButton 
          onClick={handleSubmit}
          disabled={!resumeFile || !urlText || !apiKey || isLoading}
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CoverLetterOutput 
        value={coverLetterText} 
        onChange={setCoverLetterText} 
        placeholder='Cover letter output here!' 
      />
    </Fragment>
  );
}

export default App;