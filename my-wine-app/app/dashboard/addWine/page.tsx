"use client" 

import { ChangeEvent, useState } from 'react'; // Importing necessary modules from React for handling state and events.
import axios from 'axios'; // Importing axios for making HTTP requests.

export default function AddWine() {
  // States.
    const [name, setName] = useState(''); 
    const [type, setType] = useState('red'); 
    const [varietal, setVarietal] = useState('Chardonnay'); 
    const [year, setYear] = useState(''); 
    let imagePath = '';

    // Function to handle adding a new wine.
    const handleAddWine = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault(); // Preventing default form submission behavior.

        // Extract the file from the file input field in the form.
        const files = event.currentTarget.file?.files;
        if (files && files.length > 0) {
          const file = files[0]; // Assume single file upload and take the first file.

          const reader =new FileReader(); // Create a FileReader to read the file.

           // Define what happens when the file has been read successfully.
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          // Ensure the file content is read as a string.
          if (e.target && typeof e.target.result === "string") {
            const base64String = e.target.result; // The file content in Base64 format.

            try {
              // Attempt to send the Base64 string to the server via POST request.
              const results = await axios.post(
                "../api/upload",
                { image: base64String, filename: file.name },
                { headers: { "Content-Type": "application/json" } }
              );
              // Log the server's response to the console.
              console.log(results.data);
              // Setting the image path
              imagePath = `/uploads/${results.data.name}`;

              const newWine = {
                name: name,
                year: year,
                type: type,
                varietal: varietal,
                image: imagePath,
              };
              
              // Sending a POST request to add a new wine.
              const response = await axios.post('http://localhost:3001/dashboard/addWine', newWine);
              // If the wine is added successfully, redirect the user to the dashboard.
              if (response.status === 200 && response.data.message === "Wine added successfully") {
                window.location.href = '/dashboard'; // Redirecting to the dashboard upon successful adding.
                // console.log(response.data.message);
              } else {
                alert(response.data.message); // Showing an alert if adding fails.
              }
            } catch (error) {
              console.error('Error adding wine:', error);
            }
          } else {
            console.error("FileReader did not load the file correctly.");
          }
        };

        // Initiate reading the file as a Base64-encoded string.
        reader.readAsDataURL(file);
      } else {
        console.log("No file selected");
      };
    };

    // Rendering the add wine form.
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Add Wine</h1>
      <form className="w-4/5 md:w-2/3 lg:w-1/2" onSubmit={handleAddWine}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Name
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="text" value={name} required onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Type
          </label>
          <select
            className="w-full p-2 border rounded-md"
            required value={type} onChange={(e) => setType(e.target.value)}
          >
            <option value="Red">Red</option>
            <option value="White">White</option>
            <option value="Rose">Rose</option>
            <option value="Orange">Orange</option>
            <option value="Sparkling">Sparkling</option>
            <option value="Fortified">Fortified</option>
            <option value="Ice">Ice</option>
            <option value="Dessert">Dessert</option>
            <option value="Fruit">Fruit</option>
            <option value="Honey">Honey</option>
            <option value="Starch">Starch</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Varietal
          </label>
          <select
            className="w-full p-2 border rounded-md"
            required value={varietal} onChange={(e) => setVarietal(e.target.value)}
          >
            <option value="Chardonnay">Chardonnay</option>
            <option value="Merlot">Merlot</option>
            <option value="Chenin_Blanc">Chenin Blanc</option>
            <option value="Cabernet_Sauvignon">Cabernet Sauvignon</option>
            <option value="Verdelho">Verdelho</option>
            <option value="Shiraz">Shiraz</option>
            <option value="Pinot_noir">Pinot Noir</option>
            <option value="Riesling">Riesling</option>
            <option value="Syrah">Syrah</option>
            <option value="Malbec">Malbec</option>
            <option value="Gamay">Gamay</option>
            <option value="Vlognier">Vlognier</option>
            <option value="Muscat">Muscat</option>
            <option value="Nebbiolo">Nebbiolo</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Year
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="text" required value={year} onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className='"mb-4'>
          <input type='file' name='file' id='fileUpload' /> {/* Input for selecting wine image */}
        </div>
          <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 rounded-md w-1/3 mx-auto py-2 px-4 font-semibold text-white focus:outline-none focus:ring focus:border-sky-300 transition duration-300 mt-4"
          >
            Add Wine
          </button>
      </form>
    </div>
    );
}
