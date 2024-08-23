import { Fragment, useState } from 'react'
import Header from './components/Header';
import JobUrlUpload from './components/jobUrlUpload';
import SingleFileUploader from './components/SingleFileUpload';
import CoverLetterOutput from './components/CoverLetterOutput';

function App() {

  const [coverLetterText, setCoverLetterText] = useState<string>('');
  return (
    <Fragment>

      <Header title='Cover Letter Generator'
      textColor='white'
      />
      <SingleFileUploader /><JobUrlUpload />
      <CoverLetterOutput value={coverLetterText} onChange={setCoverLetterText} placeholder='Cover letter output here!' />
    </Fragment>
  );
};

export default App