# DomainScout - Domain Information Lookup Tool

DomainScout is a full-stack web application that allows users to look up comprehensive domain information using the WHOIS API. Users can retrieve both domain registration details and contact information for any domain name.

## Features

- Domain information lookup including registrar details, registration dates, and nameservers
- Contact information retrieval for domain owners and administrators
- Clean and intuitive user interface with real-time data toggle
- Responsive design with elegant animations
- Error handling and validation
- Modern tech stack using FastAPI and React

## Tech Stack

### Backend

- Python 3.9+
- FastAPI
- HTTPX for async HTTP requests
- python-dotenv for environment management
- Uvicorn ASGI server

### Frontend

- React (Vite)
- Tailwind CSS for styling
- Framer Motion for animations
- HeadlessUI for accessible UI components
- Axios for HTTP requests

## Prerequisites

Before you begin, ensure you have the following installed:

- Python 3.9 or higher
- Node.js 16 or higher
- npm or yarn
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/domain-scout.git
cd domain-scout
```

2. Set up the backend:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

3. Configure backend environment:
   - Copy `.env.example` to `.env`
   - Add your WHOIS API key and other configuration:

```
WHOIS_API_KEY=your_whois_api_key
WHOIS_API_URL=https://www.whoisxmlapi.com/whoisserver/WhoisService
CORS_ORIGINS=http://localhost:5173 #in local
```

4. Set up the frontend:

```bash
cd ../frontend
npm install 
```

5. Configure frontend environment:
   - Copy `.env.example` to `.env`
   - Add the backend API URL:

```
VITE_API_URL=http://localhost:8000 #in local
```

## Running the Application

1. Start the backend server:

```bash
cd backend
source venv/bin/activate  # On Windows use: venv\Scripts\activate
python run.py
```

The backend will start on http://localhost:8000

2. In a new terminal, start the frontend development server:

```bash
cd frontend
npm run dev  # or: yarn dev
```

The frontend will start on http://localhost:5173

## Usage

1. Open your browser and navigate to http://localhost:5173
2. Enter a domain name in the search field
3. Toggle between "Domain Info" and "Contact Info" to see different information
4. Click "Search" to retrieve the domain information

## API Endpoints

### GET /api/v1/domain/info/

Retrieves domain information or contact details for a specified domain.

Query Parameters:

- `domain`: The domain name to look up
- `data_type`: Type of information to retrieve (`domain_info` or `contact_info`)

## Deployment

### Backend Deployment

1. Set up a Python environment on your server
2. Install dependencies from requirements.txt
3. Configure environment variables
4. Run with a production ASGI server like Uvicorn or Gunicorn

### Frontend Deployment

1. Build the production bundle:

```bash
cd frontend
npm run build  # or: yarn build
```

2. Deploy the contents of the `dist` directory to your web server

## Acknowledgments

- [WHOIS XML API](https://www.whoisxmlapi.com/) for providing the domain information service
- [FastAPI](https://fastapi.tiangolo.com/) for the powerful Python web framework
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
