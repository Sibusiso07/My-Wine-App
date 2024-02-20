"use client"

import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EditWine() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('red');
    const [varietal, setVarietal] = useState('Chardonnay');
    const [image, setImage] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    const params  = (searchParams.get('id'));
    const id = Number(params);

    useEffect(() => {
      const fetchWineDetails = async () => {
        try {
          const response = await axios.post(`http://localhost:3001/dashboard/editWine/${id}`);
          const wine = response.data[0];
          setName(wine.name);
          setType(wine.type);
          setVarietal(wine.varietal);
          setYear(wine.year);
          setImage(wine.image);
        } catch (error) {
          console.error('Error fetching wine:', error);
        }
      };
      if (id) {
        fetchWineDetails();
      }
    }, [id]);
    

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const imagePath = `/uploads/${file.name}`;
        console.log("Image location:", imagePath);
        setImage(imagePath);
      }
    };

      const handleEditWine = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const updatedWineData = {
            name: name,
            type: type,
            varietal: varietal,
            year: year,
            image: image,
          };
    
          const response = await axios.put(`http://localhost:3001/dashboard/editWine/${id}`, updatedWineData);
          if (response.status === 200 && response.data.message === "Wine edited successfully") {
            window.location.href = '/dashboard';
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          console.error('Error editing wine:', error);
        }
      };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Edit Wine</h1>
        <form className="w-4/5 md:w-2/3 lg:w-1/2" onSubmit={handleEditWine}>
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
              <option value="red">Red</option>
              <option value="white">White</option>
              <option value="rose">Rose</option>
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
            <input type='file' onChange={handleImageChange} />
          </div>
        <button
            type="submit"
            className="bg-sky-500 hover:bg-sky-600 rounded-md w-1/3 mx-auto py-2 px-4 font-semibold text-white focus:outline-none focus:ring focus:border-sky-300 transition duration-300 mt-4"
        >
            Submit
        </button>
        </form>
      </div>
    );
}