from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import io
import requests
from PyPDF2 import PdfReader
import PyPDF2
import logging 

app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    # allow_origins=["http://localhost:5173/"],  # Adjust this to your frontend's URL
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def process_pdf(pdf_source, is_local_file=False):
    # Process the PDF from URL or local file
    file = io.BytesIO(requests.get(pdf_source).content) if not is_local_file else open(pdf_source, 'rb')

    # Extract text from PDF
    pdf_reader = PyPDF2.PdfFileReader(file)
    text = ""
    for page in range(pdf_reader.numPages):
        text += pdf_reader.getPage(page).extractText()
    
    if is_local_file:
        file.close()

    return {"status": "Processing completed",
            "text": text}

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")
    
    try:
        content = await file.read()
        pdf_reader = PdfReader(io.BytesIO(content))

        text = ""
        for page in range(pdf_reader.numPages):
            text += pdf_reader.getPage(page).extractText()
        
        if not text:
            raise HTTPException(status_code=422, detail="Unable to extract text from the PDF")
        
        return {"text": text}  # Return first 200 characters as preview
    except Exception as e:
        logger.error(f"Error processing PDF: {str(e)}")
        raise HTTPException(status_code=422, detail=f"Error processing PDF: {str(e)}")



###########################
@app.post("/load_job_url/")
async def process_job_url(job_posting_url: str) -> str:
    from langchain_community.document_loaders import SeleniumURLLoader
    from bs4 import BeautifulSoup

    html = SeleniumURLLoader([job_posting_url]).load()

    soup = BeautifulSoup(html[0].page_content, 'html.parser')
    text_content = soup.get_text(separator=' ', strip=True)
    
    return {"output": text_content}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)