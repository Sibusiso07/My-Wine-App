"use client" 

import { useEffect, useState } from "react"; // Importing necessary modules from React for handling state and side effects.
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Importing table components from a custom module.
import axios from "axios"; // Importing axios for making HTTP requests.
import { useRouter } from "next/navigation"; // Importing useRouter hook from Next.js for navigation.

export default function Dashboard() {
    const [wineList, setWineList] = useState<any[] | null>(null); // State hook for storing wine list data.
    const router = useRouter(); // Initializing useRouter hook for navigation.

    // Effect hook to fetch wine list data when the component mounts.
    useEffect(() => {
        const fetchWineList = async () => {
            try {
                // Sending a GET request to retrieve wine list data from the server.
                const response = await axios.get('http://localhost:3001/dashboard');
                console.log(response); // Logging the response for debugging purposes.
                setWineList(response.data); // Updating the wine list state with fetched data.
            } catch (error) {
                console.error('Error fetching wine list:', error); // Logging any errors that occur during fetching.
            }
        };
        fetchWineList(); // Calling the fetchWineList function when the component mounts.
    }, []); // Empty dependency array ensures the effect runs only once after the component mounts.

    // Function to navigate to the add wine page.
    const handleAdd = () => {
      router.push('/dashboard/addWine');
    }

    // Function to navigate to the edit wine page for a specific wine.
    const handleEdit = (wine: { id: number }) => {
      const url = `/dashboard/editWine?id=${wine.id}`;
      router.push(url);
    }

    // Function to navigate to the view wine page for a specific wine.
    const handleView = (wine: { id: number }) => {
      const url = `/dashboard/viewWine?id=${wine.id}`;
      router.push(url);
    }

    // Ftunction to delete wine from the list
    const handleDelete = async (wine: { id: number }) => {
      try {
        console.log("wine id >>>", wine);
        const response = await axios.post("http://localhost:3001/delete", {
          id : wine.id
        });
        if (response.status === 200 && response.data.message === "Wine successfully deleted") {
          router.refresh();
        } else {
          alert(response.data.message);
          console.log("Error deleting wine:", response.data.message);
        }
      } catch (error) {
        console.error("Unable to delete wine", error);
      }
    }

    // Render the dashboard with wine list and actions.
    return (
      <div className="flex flex-col items-center my-10 min-h-screen py-10 shadow-xl">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Wine List</h1>
        <div className="w-4/5">
          <Table className="w-full my-10">
            <TableCaption className="text-lg mb-2">
              A list of your wines
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-800 text-white">
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Varietal</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>View</TableHead>
                <TableHead>Edit</TableHead>
                <TableHead>Delete</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(wineList) && wineList.map((wine) => (
                <TableRow key={wine.id} className="hover:bg-gray-200">
                  <TableCell>{wine.name}</TableCell>
                  <TableCell>{wine.type}</TableCell>
                  <TableCell>{wine.varietal}</TableCell>
                  <TableCell>{wine.year}</TableCell>
                  <TableCell>
                    <button
                    className="bg-sky-300 text-white py-1.5 px-2.5 rounded-md mt-2 hover:bg-sky-500" onClick={() => handleView(wine)}>
                    View
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                    className="bg-sky-600 text-white py-1.5 px-2.5 rounded-md mt-2 hover:bg-sky-800" 
                    onClick={() => handleEdit(wine)}>
                    Edit
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                    className="bg-red-500 text-white py-1.5 px-2.5 rounded-md mt-2 hover:bg-red-600" 
                    onClick={() => handleDelete(wine)}>
                    Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-sky-700" 
        onClick={handleAdd}>
          Add
        </button>
      </div>
    );
}
