import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For navigation and getting location state
import { supabase } from '../Service/supabaseClient'; // Adjust the import based on your file structure
import { toast } from 'react-toastify'; // Optional: For toast notifications

const EditMeasurementsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id, createdAt, length, breadth, width, store_id } = location.state; // Get the data from location state

  // Set initial states
  const [lengthValue, setlengthValue] = useState(length);
  const [breadthValue, setBreadthValue] = useState(breadth);
  const [widthValue, setWidthValue] = useState(width);
  const [storeIdValue, setStoreIdValue] = useState(store_id);

  // Function to handle the update
  const updateData = async () => {
    try {
      const { error } = await supabase
        .from('measurement') // Replace with your actual table length
        .update({ 
          length: lengthValue,
          breadth: breadthValue,
          width: widthValue
        }) // Update the fields as needed
        .eq('id', id); // Ensure you update the correct record
      
      if (error) {
        console.error('Error updating data:', error.message);
        toast.error('Error updating data');
      } else {
        toast.success('Data updated successfully');
        navigate(-1); // Go back to the previous page
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-6">Edit Measurements</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={lengthValue}
            onChange={(e) => setLengthValue(e.target.value)} // Update state on input change
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="breadth" className="block text-gray-700 mb-1">
            Breadth
          </label>
          <input
            type="text"
            id="breadth"
            value={breadthValue}
            onChange={(e) => setBreadthValue(e.target.value)} // Update state on input change
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="width" className="block text-gray-700 mb-1">
            Width
          </label>
          <input
            type="text"
            id="width"
            value={widthValue}
            onChange={(e) => setWidthValue(e.target.value)} // Update state on input change
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="storeId" className="block text-gray-700 mb-1">
            Store ID
          </label>
          <input
            type="text"
            id="storeId"
            value={storeIdValue}
            onChange={(e) => setStoreIdValue(e.target.value)} // Update state on input change
            className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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

export default EditMeasurementsPage;
