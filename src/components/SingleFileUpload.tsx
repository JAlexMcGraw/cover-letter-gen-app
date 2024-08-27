import React, { Dispatch, SetStateAction, useState } from 'react';

interface SingleFileUploaderProps {
    resumeFile: File | null;
    setResumeFile: Dispatch<SetStateAction<File | null>>;
}

const SingleFileUploader: React.FC<SingleFileUploaderProps> = ({ resumeFile, setResumeFile }) => {
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

    if (resumeFile) {
      setStatus('uploading');
  
      const formData = new FormData();
      formData.append('file', resumeFile);
  
      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: formData,
        });
  
        const data = await result.json();
        
        console.log(data);
        setStatus('success');
      } catch (error) {
        console.log(error);
        setStatus('failure');
      }
    }
  };

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
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