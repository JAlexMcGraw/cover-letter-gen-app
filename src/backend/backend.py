from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from io import BytesIO
import requests
import PyPDF2

app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173/"],  # Adjust this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def process_pdf(pdf_source, is_local_file=False):
    # Process the PDF from URL or local file
    file = BytesIO(requests.get(pdf_source).content) if not is_local_file else open(pdf_source, 'rb')

    # Extract text from PDF
    pdf_reader = PyPDF2.PdfFileReader(file)
    text = ""
    for page in range(pdf_reader.numPages):
        text += pdf_reader.getPage(page).extractText()
    
    if is_local_file:
        file.close()

    return {"status": "Processing completed",
            "text": text}

@app.post("/process_pdf/")
async def process_pdf(pdf_source, is_local_file=False):
    # Process the PDF from URL or local file
    file = BytesIO(requests.get(pdf_source).content) if not is_local_file else open(pdf_source, 'rb')

    # Extract text from PDF
    pdf_reader = PyPDF2.PdfFileReader(file)
    text = ""
    for page in range(pdf_reader.numPages):
        text += pdf_reader.getPage(page).extractText()
    
    if is_local_file:
        file.close()

    return {"status": "Processing completed",
            "text": text}

@app.post("/load_job_url/")
async def process_job_url(job_posting_url: str) -> str:
    from langchain_community.document_loaders import SeleniumURLLoader
    from bs4 import BeautifulSoup

    html = SeleniumURLLoader([job_posting_url]).load()

    soup = BeautifulSoup(html[0].page_content, 'html.parser')
    text_content = soup.get_text(separator=' ', strip=True)
    
    return {"output": text_content}