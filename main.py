from fastapi import FastAPI, UploadFile, File
import face_recognition
import os
import numpy as np
import cv2
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this to your frontend URL if necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load known face encodings and names
known_face_encodings = []
known_face_names = []

images_folder = 'images'
for image_name in os.listdir(images_folder):
    if image_name.endswith(('.jpg', '.jpeg', '.png', '.webp')):
        img_path = os.path.join(images_folder, image_name)
        img = face_recognition.load_image_file(img_path)
        img_encoding = face_recognition.face_encodings(img)[0]
        known_face_encodings.append(img_encoding)
        known_face_names.append(os.path.splitext(image_name)[0])


@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()

    # Load the uploaded image and convert it to a numpy array
    np_arr = np.fromstring(contents, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    # Convert the image to RGB
    rgb_img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Detect face encodings
    face_encodings = face_recognition.face_encodings(rgb_img)

    if not face_encodings:
        return {"message": "No face detected"}

    face_encoding = face_encodings[0]

    # Compare with known faces
    matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
    name = "Unknown"

    if True in matches:
        first_match_index = matches.index(True)
        name = known_face_names[first_match_index]

    return {"name": name}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
