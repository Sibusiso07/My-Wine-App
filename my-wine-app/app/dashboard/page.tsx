"use client"

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [wineList, setWineList] = useState<any[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchWineList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/dashboard');
                console.log(response);
                setWineList(response.data);
            } catch (error) {
                console.error('Error fetching wine list:', error);
            }
        };
        fetchWineList();
    }, []);

    const handleAdd = () => {
      router.push('/dashboard/addWine');
    }

    const handleEdit = (wine: { id: number }) => {
      const url = `/dashboard/editWine?id=${wine.id}`;
      router.push(url);
    }

    const handleView = (wine: { id: number }) => {
      const url = `/dashboard/viewWine?id=${wine.id}`;
      router.push(url);
    }

    return (
        <div className="flex flex-col items-center my-10 min-h-screen">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Wine List</h1>
        <div className="w-4/5">
          <Table className="w-full my-10">
            <TableCaption className="text-lg mb-2">
              A list of your wines
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-800 text-white">
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Varietal</TableHead>
                <TableHead>Year</TableHead>
                <TableHead></TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(wineList) && wineList.map((wine) => (
                <TableRow key={wine.id} className="hover:bg-gray-200">
                  <TableCell>{wine.id}</TableCell>
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
                    className="bg-sky-600 text-white py-1.5 px-2.5 rounded-md mt-2 hover:bg-sky-800" onClick={() => handleEdit(wine)}>
                    Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-sky-700" onClick={handleAdd}>
          Add
        </button>
      </div>
    );
}