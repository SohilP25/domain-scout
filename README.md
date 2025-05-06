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
- npm 7 or higher

## Project Structure

```
domain-scout/
├── backend/           # FastAPI backend
│   ├── app/          # Application code
│   ├── requirements.txt
│   └── .env.example
├── frontend/         # React frontend
│   ├── src/
│   └── package.json
└── deploy.sh        # Deployment script
```

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/domain-scout.git
cd domain-scout
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in both directories:
     - `backend/.env`
     - `frontend/.env`
   
   Configure the environment variables:

   ### Backend (.env)
   ```
   WHOIS_API_KEY=your_whois_api_key
   WHOIS_API_URL=whois_api_url
   CORS_ORIGINS=http://localhost:5000
   ```

   ### Frontend (.env)
   ```
   VITE_API_URL=
   ```

3. Run the deployment script (choose one method):
   ```bash
   # Option 1: Using bash directly
   bash deploy.sh

   # Option 2: Make executable and run
   chmod +x deploy.sh
   ./deploy.sh
   ```

The script will automatically:
- Build the frontend
- Set up Python virtual environment
- Install and update all dependencies
- Start the application

## Access Points

After deployment:
- Main application: http://localhost:5000
- API documentation: http://localhost:5000/api/docs
- API ReDoc: http://localhost:5000/api/redoc

## Troubleshooting

1. If you see "Address already in use" error:
   - Find the process using port 5000: `lsof -i:5000`
   - Stop the existing process or choose a different port

2. If static files are not loading:
   - Check if the frontend build was successful in `frontend/dist/`
   - Verify file permissions

3. If you encounter CORS issues:
   - Ensure CORS_ORIGINS in backend/.env includes your frontend URL

## Development Mode

For development purposes, you can run the frontend and backend separately:

### Backend Development
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### GET /api/v1/domain/info/

Retrieves domain information or contact details for a specified domain.

Query Parameters:
- `domain`: The domain name to look up
- `data_type`: Type of information to retrieve (`domain_info` or `contact_info`)

## API Documentation

The API documentation is automatically generated and available at:
- OpenAPI (Swagger UI): `/api/docs`
- ReDoc: `/api/redoc`

## Acknowledgments

- [WHOIS XML API](https://www.whoisxmlapi.com/) for providing the domain information service
- [FastAPI](https://fastapi.tiangolo.com/) for the powerful Python web framework
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
