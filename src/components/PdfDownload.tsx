import React from 'react';
import jsPDF from 'jspdf';

interface PdfDownloadProps {
  coverLetterText: string;
}

const PdfDownload: React.FC<PdfDownloadProps> = ( {coverLetterText }) => {

  const downloadPdf = () => {
    const pdf = new jsPDF();
    
    // Split the text into lines that fit within the PDF
    const lines = pdf.splitTextToSize(coverLetterText, 190);
    
    pdf.text(lines, 10, 10);
    pdf.save("download.pdf");
  };

  return (
    <div>
      <button id="cover-letter-download" onClick={downloadPdf}>Download as PDF</button>
    </div>
  );
};

export default PdfDownload;