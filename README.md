# ChoiceTechLab-TO-DO-Assignment

# API Test Collection

Attached postman api test collection: TO-DO-List.json

# Setup

Create you folder 

cd create_your_folder

git clone "https://github.com/Abhijitaundhkar/ChoiceTechLab-Assignment.git"

# Environment Configuration

Add your Mongodb URI database configuration to the .env file.

MONGODB_URI=your_URI

DB_PORT=your_port

#Installation

Navigate to the root directory:

Install dependencies:npm install

# Start app

npm run dev

# Folder Structure

src->config->database connections and authentication configurations like JWT.

src->controller->handling all your business logic.

src->routes->all app routes with folder

src->middleware->authentication and role-based middleware

src->models->all database schema

main app.js file for run the server and other configurations
