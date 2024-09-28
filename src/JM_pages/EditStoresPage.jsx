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
    <div style={{ padding: '16px' }}>
      <h2>Edit Data</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)} // Update state on change
            placeholder="Name"
            style={{ marginLeft: '8px', width: '100%' }}
          />
        </label>
      </div>
      <button onClick={updateData} style={{ marginTop: '20px' }}>
        Update
      </button>
    </div>
  );
};

export default EditStoresPage;
