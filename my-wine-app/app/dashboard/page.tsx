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

export default function Dashboard() {
    const [wineList, setWineList] = useState<any[] | null>(null);

    useEffect(() => {
        const fetchWineList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/dashboard');
                setWineList(response.data);
            } catch (error) {
                console.error('Error fetching wine list:', error);
            }
        };
        fetchWineList();
    }, []);

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
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Varietal</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Consumed</TableHead>
                <TableHead>Date Consumed</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(wineList) && wineList.map((wine) => (
                <TableRow key={wine.id} className="hover:bg-gray-200">
                  <TableCell>{wine.id}</TableCell>
                  <TableCell>{wine.name}</TableCell>
                  <TableCell>{wine.year}</TableCell>
                  <TableCell>{wine.type}</TableCell>
                  <TableCell>{wine.varietal}</TableCell>
                  <TableCell>{wine.rating}</TableCell>
                  <TableCell>{wine.consumed}</TableCell>
                  <TableCell>{wine.dateConsumed}</TableCell>
                  <TableCell>
                    <button
                    className="bg-sky-300 text-white py-1.5 px-2.5 rounded-md mt-2 hover:bg-blue-500"
                    type="submit"
                    >
                    Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4">
        Add
        </button>
      </div>
    );
}