import React, { Dispatch, SetStateAction, useState } from "react";
import Result from "./Result";

interface stringUploadProps {
    keyText: string | undefined;
    setKeyText: Dispatch<SetStateAction<string>>;
    placeholder: string;
}
const stringUpload: React.FC<stringUploadProps> = ({ keyText, setKeyText, placeholder }) => {
    const [shownText, setShownText] = useState('');

    const [status, setStatus] = useState<
        'initial' | 'uploading' | 'success' | 'failure'
        >('initial');

    const handleUrlUpload = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setKeyText(event.target.value);
        const textLength = event.target.value.length
        setShownText('*'.repeat(textLength))
        setStatus('uploading')
    };

    const handleSubmit = () => {
        if (keyText !== '') {
            console.log('Key Uploaded: ' + keyText?.substring(0,5) + '...');
            setStatus('success')
        } else {
            setStatus('failure')
            alert('Must provide a valid OpenAI key. Cannot be empty.')
        }
    }

    return (
        <div>
            <textarea
                value={shownText}
                onChange={handleUrlUpload}
                placeholder={placeholder}
                rows={1}
            />
            <button onClick={handleSubmit}>Upload</button>
            <Result status={status} uploadType="Key" />
        </div>
    );
};

export default stringUpload;