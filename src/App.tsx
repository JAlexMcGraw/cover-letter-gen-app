import { Fragment, useState } from 'react'
import Header from './components/Header';
import JobUrlUpload from './components/jobUrlUpload';
import SingleFileUploader from './components/SingleFileUpload';
import CoverLetterOutput from './components/CoverLetterOutput';
import GenerateButton from './components/GenerateButton';

function App() {

  const [coverLetterText, setCoverLetterText] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [urlText, setUrlText] = useState<string>('');

  return (
    <Fragment>

      <Header title='Cover Letter Generator'
      textColor='white'
      />
      <SingleFileUploader resumeFile={resumeFile} setResumeFile={setResumeFile}/><JobUrlUpload urlText={urlText} setUrlText={setUrlText}/>
      <div>
        <GenerateButton resumeFile={resumeFile} urlText={urlText} />
      </div>
      <CoverLetterOutput value={coverLetterText} onChange={setCoverLetterText} placeholder='Cover letter output here!' />
    </Fragment>
  );
};

export default App