import React, { useState } from "react";

const JobUrlUpload: React.FC = () => {
    const [urlText, setUrlText] = useState<string>('');

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