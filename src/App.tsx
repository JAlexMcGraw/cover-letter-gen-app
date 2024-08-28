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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setError('Please select a file');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', resumeFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/process_pdf/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(response.data.text);
      // Handle the response here. For example:
      // console.log(response.data);
      // You might want to update some state based on the response
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while uploading the file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Header title='Cover Letter Generator' textColor='white' />
      <SingleFileUploader resumeFile={resumeFile} setResumeFile={setResumeFile} />
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