# Face Recognition Attendance System

This project is a face recognition attendance system built with a FastAPI backend and a React frontend. It allows users to upload images, recognize faces, and display the recognized names.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
 - [Backend Setup](#backend-setup)
 - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **Backend:** FastAPI, Python, face_recognition, OpenCV
- **Frontend:** React, Axios, CSS
- **Database:** (Optional) You can integrate a database like SQLite or MongoDB for storing recognized faces and attendance logs.

## Setup

### Backend Setup

1. **Clone the Repository** (optional):
   - Clone the repository to your local machine if you haven't already.

2. **Navigate to the Backend Directory:**
   - Change to the backend directory.

3. **Create a Virtual Environment:**
   ```bash
   python -m venv venv

4.  **Activate the Virtual Environment:**
    
    -   On Windows:
    ```bash
    venv\Scripts\activate
    ```
    -   On macOS/Linux:
    ```bash
    source venv/bin/activate
    ```
    
5.  **Install Requirements:** Create a `requirements.txt` file in the backend directory with the following content:
    
    `fastapi
    uvicorn
    face_recognition
    opencv-python
    numpy
    python-multipart` 
    
    Then install the dependencies:
    ```bash
    `pip install -r requirements.txt` 
    ```
    
6.  **Run the Backend Server:**

    
    `uvicorn main:app --reload` 
    
    The backend will be available at `http://127.0.0.1:8000`.
    

### Frontend Setup

1.  **Navigate to the Frontend Directory:**

    ```bash
    `cd ../frontend` 
    ```
    
2.  **Install Node.js Packages:** Ensure you have Node.js and npm installed, then run:
    

    ```bash
    `npm install` 
    ```
    
3.  **Run the Frontend Application:**

    ```bash
    `npm start` 
    ```
    
    The frontend will be available at `http://localhost:3000`.
    

## Usage

1.  Navigate to the frontend application in your web browser.
2.  Upload an image of a face you want to recognize.
3.  Click the "Recognize" button to see the result.
4.  The recognized name will be displayed below the preview image.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to add features, please create a pull request.

## License

This project is licensed under the MIT License.
