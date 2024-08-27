import React, { Dispatch, SetStateAction } from "react";

interface jobUrlUploadProps {
    urlText: string;
    setUrlText: Dispatch<SetStateAction<string>>;
}
const JobUrlUpload: React.FC<jobUrlUploadProps> = ({ urlText, setUrlText }) => {

    const handleUrlUpload = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUrlText(event.target.value);
    };

    const handleSubmit = () => {
        console.log('URL Uploaded: ' + urlText);
    }

    return (
        <div>
            <textarea
                value={urlText}
                onChange={handleUrlUpload}
                placeholder='Upload job URL here'
                rows={1}
            />
            <button onClick={handleSubmit}>Upload URL</button>
        </div>
    );
};

export default JobUrlUpload