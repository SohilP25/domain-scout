#!/bin/bash

# Exit on error
set -e

# Function to check if a command exists
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo "Error: $1 is required but not installed."
        exit 1
    fi
}

# Function to check if port is in use
check_port() {
    if lsof -i:$1 >/dev/null 2>&1; then
        echo -e "${RED}Error: Port $1 is already in use.${NC}"
        echo "Please either:"
        echo "1. Stop the process using port $1, or"
        echo "2. Change the port in backend/run.py"
        exit 1
    fi
}

# Function to clean up child processes on exit
cleanup() {
    echo -e "\n${BLUE}Cleaning up processes...${NC}"
    jobs -p | xargs -r kill
    deactivate 2>/dev/null || true
    exit 0
}

# Check required commands
check_command python3
check_command node
check_command npm
check_command lsof

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up Domain Scout deployment...${NC}"

# Frontend build
echo -e "${BLUE}Building frontend...${NC}"
cd frontend

# Install dependencies and build
echo "Installing frontend dependencies..."
npm ci
echo "Building frontend..."
npm run build

cd ..

# Backend setup
echo -e "${BLUE}Setting up backend...${NC}"
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Check if .env exists, if not copy from example
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "Creating .env from .env.example..."
        cp .env.example .env
        echo "Please update the .env file with your configuration"
    else
        echo "Warning: .env.example not found"
    fi
fi

# Set up trap for cleanup on script termination
trap cleanup EXIT INT TERM

# Activate virtual environment and update pip
echo -e "${BLUE}Activating virtual environment and updating pip...${NC}"
source venv/bin/activate
python -m pip install --upgrade pip

# Install dependencies
echo "Installing backend dependencies..."
pip install -r requirements.txt

# Check if port 5000 is available
check_port 5000

# Start application
echo -e "${GREEN}Application starting at http://localhost:5000${NC}"
python run.py