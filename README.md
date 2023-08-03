# WeboTak_Assessment

This is the backend and frontend components of WeboTak Assessment, a survey form with implementation for both the user and admin. The backend handles data processing, analysis, and storage and the frontend handles what's seen by the user and the state management.

## Technologies Used

This project was developed using the PERN stack (PostgreSQL, Express, ReactJs, Node.js)

- Frontend: [ReactJs](https://react.dev/)
- State-management: [Zustand](https://zustand-demo.pmnd.rs/)
- Backend and API handling: [Node.js](https://nodejs.org/en), [Express](https://expressjs.com/)
- Database: [PostgreSQL](https://www.postgresql.org/)

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Routes](#routes)
- [Contact](#contact)

## Installation

Clone the repository: `git clone https://github.com/SamaJabri/WeboTak_Assessment.git`

### Backend

1. Navigate inside backend folder: `cd server/`
2. Install backend dependencies: `npm install`
3. Set up environment variables: Copy the `.env.example` file and rename it to `.env`. Fill in the required values. More in [configuration](#configuration).

### Database

Before proceeding with this, make sure you set the `POSTGRES_URL` in the `.env` file. Check [configuration](#configuration).

1. Go to `server/src/controllers/controller.js` file.
2. Uncomment the `setupDb()` function call on line 52 to set up the db.

### Frontend

1. Navigate inside frontend folder: `cd client/`
2. Install frontend dependencies: `npm install`

## Configuration

- The `.env.example` file serves as a template for the `.env` file that needs to be created. It provides an example of the required environment variables and their expected values. Before running the application, make a copy of this file and rename it to `.env`. Then, replace the placeholders with actual values.
- The `POSTGRES_URL` environment variable is used to specify the connection URL for the PostgreSQL database.
- The `PORT` environment variable is used to specify the port on which the application will run. The default value is `3000`, but you can change it if necessary.

You can find more info in the `.env.example` file.

## Usage

1. Navigate to the server side: `cd server/`
2. Start the backend server: `npm run dev`
3. The backend API will be accessible at `http://localhost:3000` or your customized port number.
4. Open another terminal and Navigate to the client side: `cd client/`
5. Start the [Vite](https://vitejs.dev/) development server: `npm run dev`
6. The project will now be hosted on `http://localhost:5173/`

Make sure you connected a reliable database connection so the application won't show server errors.

## Routes
- `/` --> User path
- `/admin/add` --> To add a question
- `/admin/show` --> Show survey answers analysis

## Contact

- For any inquiries or support, please email at sama.jabri@outlook.com.
