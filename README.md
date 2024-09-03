# Cover Letter Generator

### Built using Typescript + Python + React

This project was built using Typescript/React front end, a Python/FastAPI backend, and Vite to get the project structure and boilerplate set up. This currently only runs on localhost and does not have a public domain. 

I've recently wanted to get into app/product development, but my background is in strictly Python, generally around the DS/GenAI space. This is my first project using Typescript and React. It seemed like a great way to start, because I had already built a lot of the needed Python code a while back, but had no idea how to actually build something an individual could use. It is definitely still a work in progress at the moment, but this is to show that I'm starting to learn how to build it all.

This simple project takes an individual's PDF resume file, a link to a job posting (ideally from the company's website and not a 3rd party), and a user's API key (need to build this with Llama so don't need to require a key). The user can then click generate, and it will generate a cover letter that is tailored for that job posting, based off the individual's resume. 

I'm still learning the CSS side of things and adding some functionality, but this is a working start. I appreciate any feedback.

### To run this project

You will need ```npm``` and ```conda``` installed.

Starting with the backend, you will need python installed. Once it is, run ```conda env create -n <YOUR-CONDA-ENV-NAME> -f environment.yml```. This will create a new conda virtual environment in which the backend will run. Once created, then run ```conda activate <YOUR-CONDA-ENV-NAME>```. Once you're in the virtual environment, now run ```uvicorn src.backend.backend:app```. This starts the Uvicorn/FastAPI backend. If you want to make any changes to the backend on the fly, add ```--reload``` at the end of the ```uvicorn``` command.

The frontend requires you have typescript and react installed. Once these are installed, run ```npm run dev```. This will run the frontend in your default browser, in a development environment. If you decide to make any changes, it will update the frontend every time those changes are saved.
