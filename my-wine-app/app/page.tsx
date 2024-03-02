"use client" 

import { ChangeEvent, useState } from 'react'; // Importing necessary modules from React for handling state and events.
import axios from 'axios'; // Importing axios for making HTTP requests.

export default function Home() {
  const [userEmail, setUserEmail] = useState(""); // State hook for storing user email.
  const [userPassword, setUserPassword] = useState(""); // State hook for storing user password.

  // Function to handle input change events.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    // Depending on the field, update the corresponding state.
    if (field === "email") {
      setUserEmail(value);
    } else if (field === "password") {
      setUserPassword(value);
    }
  };

  // Function to handle login button click.
  const handleLogin = async () => {
    console.log(userEmail + userPassword); // Log the user's email and password (for debugging purposes).
    try {
      // Send a POST request to the server with user credentials.
      const response = await axios.post('http://localhost:3001/login', {
        email: userEmail,
        password: userPassword,
      });
      // If login is successful, redirect the user to the dashboard.
      if (response.status === 200 && response.data.message === "Login Successful") {
        window.location.href = '/dashboard';
      } else {
        // If login fails, show an alert with the error message.
        alert(response.data.message);
      }
    } catch (error) {
      // Log any errors that occur during login.
      console.error('Error during login:', error);
    }
  }

  // Render the login form.
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="font-semibold text-7xl italic text-center mb-6 text-gray-800">My wines</h1>
      <div className="border p-8">
        <form className="flex flex-col space-y-4 items-center">
          <h4 className="font-medium bg-gray-800 text-white w-full h-12 text-xl flex items-center justify-center mb-4">Enter Login Details</h4>
          <input
            className="w-full p-2 border mb-4"
            type="email" placeholder="Email" value={userEmail} onChange={(e) => handleInputChange(e, "email")}
          />
          <input
            className="w-full p-2 border mb-4"
            type="password" placeholder="Password" value={userPassword} onChange={(e) => handleInputChange(e, "password")}
          />
          <button
            className="bg-sky-500 hover:bg-sky-600 rounded-md w-full py-2 px-4 font-semibold text-white focus:outline-none focus:ring focus:border-sky-300 transition duration-300"
            type="button" onClick={handleLogin} 
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
