"use client"

import { SetStateAction, useState } from 'react';
import axios from 'axios';

export default function AddWine() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('red');
    const [varietal, setVarietal] = useState('Chardonnay');
    const [rating, setRating] = useState('');
    const [consumed, setConsumed] = useState('no');
    const [dateConsumed, setDateConsumed] = useState('');
    const [dateConsumedDisabled, setDateConsumedDisabled] = useState(true);

    const handleConsumedChange = (value: SetStateAction<string>) => {
        setConsumed(value);
        setDateConsumedDisabled(value === 'no');
        if (value === 'no') {
          setDateConsumed('');
        }
      };

    const handleAddWine = async () => {
        try {
            const newWine = {
            name: name,
            year: year,
            type: type,
            varietal: varietal,
            rating: rating,
            consumed: consumed,
            dateConsumed: dateConsumed,
            };
            const response = await axios.post('http://localhost:3001/addWine', newWine);
            console.log('New wine added:', response.data);
        } catch (error) {
            console.error('Error adding wine:', error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
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
            Year
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="text" required value={year} onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Rating
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="number" min="1" max="5" required value={rating} onChange={(e) => setRating(e.target.value)}
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
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="rose">Rose</option>
            <option value="white_blend">White Blend</option>
            <option value="red_blend">Red Blend</option>
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
          </select>
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Consumed
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={consumed} onChange={(e) => handleConsumedChange(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Date Consumed
            </label>
            <input
              type="date" required
              className={`w-full p-2 border rounded-md ${
                dateConsumedDisabled ? 'bg-gray-200' : ''
              }`}
              value={dateConsumed}
              onChange={(e) => !dateConsumedDisabled && setDateConsumed(e.target.value)}
              disabled={dateConsumedDisabled}
            />
          </div>
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