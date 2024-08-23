import React, { useState } from 'react';

const SingleFileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
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
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
        alert('A PDF file must be provided');
        return;
    }
    
    if (file) {
      setStatus('uploading');
  
      const formData = new FormData();
      formData.append('file', file);
  
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
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && 
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