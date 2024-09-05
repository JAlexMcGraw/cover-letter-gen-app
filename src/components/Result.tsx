import React from "react";

interface ResultProps {
    status: string;
    uploadType: 'File' | 'URL' | 'Key';
}


const Result: React.FC<ResultProps> = ({ status, uploadType }) => {
    if (status === "success") {
      return <p>✅ {uploadType} uploaded successfully!</p>;
    } else if (status === "failure") {
      return <p>❌ {uploadType} upload failed!</p>;
    } else if (status === "uploading") {
      return <p>⏳ Uploading selected {uploadType.toLowerCase()}...</p>;
    } else {
      return null;
    }
};

export default Result;