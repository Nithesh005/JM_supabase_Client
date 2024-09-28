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
    <div style={{ padding: '16px' }}>
      <h1>Edit Measurements</h1>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={lengthValue}
          onChange={(e) => setlengthValue(e.target.value)} // Update state on input change
        />
      </div>
      <div>
        <label htmlFor="breadth">Breadth</label>
        <input
          type="text"
          id="breadth"
          value={breadthValue}
          onChange={(e) => setBreadthValue(e.target.value)} // Update state on input change
        />
      </div>
      <div>
        <label htmlFor="width">Width</label>
        <input
          type="text"
          id="width"
          value={widthValue}
          onChange={(e) => setWidthValue(e.target.value)} // Update state on input change
        />
      </div>
      <div>
        <label htmlFor="storeId">Store ID</label>
        <input
          type="text"
          id="storeId"
          value={storeIdValue}
          onChange={(e) => setStoreIdValue(e.target.value)} // Update state on input change
        />
      </div>
      <button onClick={updateData}>Update</button>
    </div>
  );
};

export default EditMeasurementsPage;
