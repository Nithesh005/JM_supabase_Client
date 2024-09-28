import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For navigation and accessing location
import { supabase } from '../Service/supabaseClient'; // Adjust the import based on your file structure
import { toast } from 'react-toastify'; // Optional: For toast notifications

const EditStoresPage = () => {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // For navigation
  const { id, createdAt, name } = location.state || {}; // Get the state from location

  const [nameValue, setNameValue] = useState(name || ''); // State for the name input

  // Function to handle the update
  const updateData = async () => {
    try {
      const { data, error } = await supabase
        .from('store') // Replace with your actual table name
        .update({ name: nameValue }) // Update the field as needed
        .eq('id', id); // Ensure you update the correct record

      if (error) {
        console.error('Error updating data:', error.message);
        toast.error('Error updating data');
      } else {
        toast.success('Data updated successfully!');
        navigate(-1); // Go back to the previous page
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6">Edit Data</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Name:
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)} // Update state on change
              placeholder="Name"
              className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          onClick={updateData}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Update
        </button>
      </div>
    </div>
  );
  
};

export default EditStoresPage;
