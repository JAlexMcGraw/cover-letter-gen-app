import React, { Dispatch, SetStateAction, useState } from "react";
import Result from "./Result";
import axios from 'axios';

interface JobUrlUploadProps {
    text: string | undefined;
    setText: Dispatch<SetStateAction<string>>;
    placeholder: string;
    onUploadSuccess: (text: string) => void;
}
const JobUrlUpload: React.FC<JobUrlUploadProps> = ({ text, setText, placeholder, onUploadSuccess }) => {
    // const apiUrl = import.meta.env.VITE_API_URL;
    const [status, setStatus] = useState<
    'initial' | 'uploading' | 'success' | 'failure'
    >('initial');

    const handleUrlUpload = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = async () => {

        setStatus('uploading')

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
        //     const response = await axios.post(`${apiUrl}/api/load_job_url/`, { //api
        //         'job_posting_url': text,
        //         withCredentials: true,
        //     }, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         validateStatus: (status) => status < 500,
        // });
        const response = await axios.post(`${apiUrl}/api/load_job_url/`, {'job_posting_url': text}, { //api
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: (status) => status < 500,
    });

            console.log("Response data", response.data)
        if (response.status === 200 && response.data && response.data.text) {
            setStatus('success');
            onUploadSuccess(response.data.text);
            console.log('Upload: ', status)
            console.log('Text: ', response.data.text)
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
        <div className="url">
            <textarea
                value={text}
                onChange={handleUrlUpload}
                placeholder={placeholder}
                rows={1}
            />
            <button onClick={handleSubmit}>Upload</button>
            <Result status={status} uploadType="URL" />
        </div>
    );
};

export default JobUrlUpload;