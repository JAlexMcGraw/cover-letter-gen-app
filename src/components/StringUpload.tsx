import React, { Dispatch, SetStateAction } from "react";

interface stringUploadProps {
    text: string;
    setText: Dispatch<SetStateAction<string>>;
    placeholder: string;
}
const stringUpload: React.FC<stringUploadProps> = ({ text, setText, placeholder }) => {

    const handleUrlUpload = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        console.log('URL Uploaded: ' + text);
    }

    return (
        <div>
            <textarea
                value={text}
                onChange={handleUrlUpload}
                placeholder={placeholder}
                rows={1}
            />
            <button onClick={handleSubmit}>Upload</button>
        </div>
    );
};

export default stringUpload;