from fastapi import FastAPI, File, UploadFile, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from langchain_community.document_loaders import SeleniumURLLoader
from urllib.request import Request, urlopen
from api.utils import CoverLetterGenerator
from bs4 import BeautifulSoup
from pydantic import BaseModel
from typing import Dict
import io
import requests
from PyPDF2 import PdfReader
import PyPDF2
import logging 
import traceback
import uvicorn
import os
import sys
import json

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

app = FastAPI()

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Setup CORS
origins = [
    "https://cover-letter-gen-app.vercel.app",
    "https://cover-letter-gen-616w1v7vg-alex-mcgraws-projects.vercel.app",
    "http://localhost:3000",  # Add this if you need local development
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    # expose_headers=["*"],
    # max_age=600,  # Cache preflight requests for 10 minutes
)

# Configure logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

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

@app.options("/api/upload-pdf/")
async def options_upload_pdf():
    return Response(
        status_code=200,
        headers={
            "Access-Control-Allow-Origin": "https://cover-letter-gen-app.vercel.app",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )

@app.get('/api/health-check/')
async def health_check():
    try:
        logger.info("Health check endpoint called")
        return {"status": "Health check successful"}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    # logger.log(msg="/upload-pdf/ endpoint reached")
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
# @app.post("/api/load_job_url/")
# async def process_job_url(job_posting_url: Dict[str,str]) -> Dict[str,str]:
#     html = SeleniumURLLoader([job_posting_url['job_posting_url']]).load()

#     soup = BeautifulSoup(html[0].page_content, 'html.parser')
#     text_content = soup.get_text(separator=' ', strip=True)
    
#     return {"text": text_content}


@app.post("/api/load_job_url/")
async def process_job_url(job_posting_url: Dict[str,str]) -> Dict[str,str]:
    response = requests.get(job_posting_url['job_posting_url'])
    soup = BeautifulSoup(response.text, 'html.parser')
    text_content = soup.get_text(separator=' ', strip=True)
    
    return {"text": text_content}

class CoverLetterData(BaseModel):
    job_post_text: str
    resume_text: str
    openai_api_key: str


@app.post("/api/generate_cover_letter/")
async def cover_letter_generate(data: CoverLetterData):
    try:
    #     logger.info("Received request for cover letter generation")
    #     logger.debug(f"Job post text: {data.job_post_text[:100]}...")
    #     logger.debug(f"Resume text: {data.resume_text[:100]}...")
    #     logger.debug(f"API Key (first 5 chars): {data.openai_api_key[:5]}...")

        # Here you would typically use your CoverLetterGenerator
        # For now, we'll just return a placeholder
        # cover_letter_str = f"Generated cover letter based on job post and resume."

        generator = CoverLetterGenerator(
            resume_text=data.resume_text,
            job_posting_text=data.job_post_text,
            openai_api_key=data.openai_api_key
        )
        
        logger.debug("GENERATOR INSTANCE CREATED")
        cover_letter_str = generator.generate_cover_letter()
        
        logger.info("Cover letter generated successfully")
        return {'text': cover_letter_str}
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        logger.error(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

#########################
#########################


# if __name__ == "__main__":
#     port = int(os.getenv("PORT", 5000))
#     uvicorn.run(app, host="0.0.0.0", port=port)