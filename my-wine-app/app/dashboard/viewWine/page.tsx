"use client"

import { useState, useEffect} from 'react';
import axios from 'axios';
import { useSearchParams} from 'next/navigation';
import Image from 'next/image';

export default function EditWine() {
    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [type, setType] = useState('red');
    const [varietal, setVarietal] = useState('Chardonnay');
    const [image, setImage] = useState('');
    const searchParams = useSearchParams();

    const params  = (searchParams.get('id'));
    const id = Number(params);

    useEffect(() => {
        const fetchWineDetails = async () => {
          try {
            const response = await axios.post(`http://localhost:3001/dashboard/editWine/${id}`);
            const wine = response.data[0];
            console.log(wine);
            setName(wine.name);
            setType(wine.type);
            setVarietal(wine.varietal);
            setYear(wine.year);
            setImage(wine.image)
        } catch (error) {
            console.error('Error fetching wine:', error);
          }
        };
    
        if (id) {
          fetchWineDetails();
        }
      }, [id]);

      const handleBack = () => {
        window.location.href = '/dashboard';
      }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Wine Details</h1>
            <form className="w-4/5 md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <Image
                    src={image}
                    width={400}
                    height={400}
                    alt={`${name} Wine`}
                    className="mx-auto"
                    />
                </div>
                <div className="mb-6">
                    <h6 className="font-bold text-lg mb-2">Name:</h6>
                    <p className="text-gray-700">{name}</p>
                    <h6 className="font-bold text-lg mt-4 mb-2">Type:</h6>
                    <p className="text-gray-700">{type}</p>
                    <h6 className="font-bold text-lg mt-4 mb-2">Varietal:</h6>
                    <p className="text-gray-700">{varietal}</p>
                    <h6 className="font-bold text-lg mt-4 mb-2">Year:</h6>
                    <p className="text-gray-700">{year}</p>
                </div>
                <button
                    type='button' onClick={handleBack}
                    className="bg-sky-500 hover:bg-sky-600 rounded-md w-1/3 mx-auto py-2 px-4 font-semibold text-white focus:outline-none focus:ring focus:border-sky-300 transition duration-300"
                >
                    Back
                </button>
            </form>
      </div>
      
    );
}