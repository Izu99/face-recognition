import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Import CSS if you're using an external stylesheet

const App = () => {
	const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/300"); // Path to a sample image
	const [name, setName] = useState("");
	const [imageFile, setImageFile] = useState(null);
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result);
				setImageFile(file);
				setIsButtonDisabled(false); // Enable the button after selecting an image
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("file", imageFile);

		try {
			const response = await axios.post("http://127.0.0.1:8000/upload/", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			setName(formatName(response.data.name)); // Format the name after recognition
		} catch (error) {
			console.error("Error uploading image:", error);
		}
	};

	const formatName = (name) => {
		const parts = name.split(" ");
		return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join("");
	};

	return (
		<div className='App'>
			<h1>Face Recognition</h1>
			<form onSubmit={handleSubmit}>
				{/* Hidden file input */}
				<input
					type='file'
					accept='image/*'
					onChange={handleChange}
					style={{ display: "none" }}
					id='file-input'
					required
				/>
				<label htmlFor='file-input'>{imagePreview ? "Change Image" : "Upload Image"}</label>
			</form>
			<div className='image-div'>
				{/* Preview of the uploaded image as a file input */}
				<div
					className='image-preview'
					onClick={() => document.getElementById("file-input").click()}>
					{/* <h2>Preview:</h2> */}
					<img src={imagePreview} alt='Preview' />
				</div>
			</div>
			<button type='submit' onClick={handleSubmit} disabled={isButtonDisabled}>
				Recognize
			</button>
			<h2>Recognized Name: {name}</h2>
		</div>
	);
};

export default App;
