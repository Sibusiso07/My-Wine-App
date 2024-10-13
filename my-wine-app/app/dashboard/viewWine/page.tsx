"use client" 

// Imports.
import { useState, useEffect} from 'react'; 
import axios from 'axios'; 
import { useSearchParams} from 'next/navigation'; 
import Image from 'next/image';
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css' 

export default function EditWine() {
    const [name, setName] = useState(''); // State hook for storing wine name.
    const [year, setYear] = useState(''); // State hook for storing wine year.
    const [type, setType] = useState('red'); // State hook for storing wine type.
    const [varietal, setVarietal] = useState('Chardonnay'); // State hook for storing wine varietal.
    const [image, setImage] = useState(''); // State hook for storing wine image.
    const searchParams = useSearchParams(); // Using the useSearchParams hook to get URL query parameters.

    const params  = (searchParams.get('id')); // Getting the 'id' parameter from the URL query string.
    const id = Number(params); // Converting the 'id' parameter to a number.

    useEffect(() => {
        const fetchWineDetails = async () => {
          try {
            // Fetching wine details from the server based on the provided 'id'.
            const response = await axios.post(`http://localhost:3001/dashboard/editWine/${id}`);
            const wine = response.data[0];
            // console.log(wine);
            // Updating state with the fetched wine details.
            setName(wine.name);
            setType(wine.type);
            setVarietal(wine.varietal);
            setYear(wine.year);
            setImage(wine.image);
            console.log(image);
        } catch (error) {
            console.error('Error fetching wine:', error);
          }
        };
    
        // Fetch wine details only if 'id' exists.
        if (id) {
          fetchWineDetails();
        }
      }, [id]);

      const handleBack = () => {
        window.location.href = '/dashboard'; // Redirecting back to the dashboard.
      }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Wine Details</h1>
            <form className="w-4/5 md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    {/* Displaying wine image using the Next.js Image component */}
                    <Image
                    src={image}
                    width={400}
                    height={400}
                    alt={`${name} Wine`}
                    className="mx-auto duration-500 ease-in-out hover:scale-150"
                    />
                </div>
                <div className="mb-6">
                    {/* Displaying wine details */}
                    <h6 className="font-bold text-lg mb-2">Name:</h6>
                    <p className="text-gray-700">{name}</p>
                    <h6 className="font-bold text-lg mt-4 mb-2">Type:</h6>
                    <p className="text-gray-700">{type}</p>
                    <h6 className="font-bold text-lg mt-4 mb-2">Varietal:</h6>
                    <p className="text-gray-700">{varietal}</p>
                    <h6 className="font-bold text-lg mt-4 mb-2">Year:</h6>
                    <p className="text-gray-700">{year}</p>
                </div>
                {/* Button to navigate back to the dashboard */}
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
