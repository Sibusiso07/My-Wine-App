"use client" 

import { ChangeEvent, FormEvent, useState } from 'react'; // Importing necessary modules from React for handling state and events.
import axios from 'axios'; // Importing axios for making HTTP requests.

export default function AddWine() {
    const [name, setName] = useState(''); // State hook for storing wine name.
    const [type, setType] = useState('red'); // State hook for storing wine type.
    const [varietal, setVarietal] = useState('Chardonnay'); // State hook for storing wine varietal.
    const [year, setYear] = useState(''); // State hook for storing wine year.
    const [image, setImage] = useState(''); // State hook for storing image URL.

    // Function to handle image change event.
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const imagePath = `/uploads/${file.name}`; // Generating the image path.
        console.log("Image location:", imagePath);
        setImage(imagePath); // Setting the image path in state.
      }
    };

    // Function to handle adding a new wine.
    const handleAddWine = async (e: FormEvent) => {
        e.preventDefault(); // Preventing default form submission behavior.

        try {
            const newWine = {
              name: name,
              year: year,
              type: type,
              varietal: varietal,
              image: image,
            };
            
            // Sending a POST request to add a new wine.
            const response = await axios.post('http://localhost:3001/dashboard/addWine', newWine);
            // If the wine is added successfully, redirect the user to the dashboard.
            if (response.status === 200 && response.data.message === "Wine added successfully") {
              window.location.href = '/dashboard';
            } else {
              // If adding the wine fails, show an alert with the error message.
              alert(response.data.message);
            }
        } catch (error) {
            // Log any errors that occur while adding the wine.
            console.error('Error adding wine:', error);
        }
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
          <input type='file' onChange={handleImageChange} /> {/* Input for selecting wine image */}
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
