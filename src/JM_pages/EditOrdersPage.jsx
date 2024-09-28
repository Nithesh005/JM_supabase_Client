import  { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // For navigation and accessing state
import { supabase } from '../Service/supabaseClient'; // Import your Supabase client
import { toast } from 'react-toastify'; // Optional: For toast notifications

const EditOrdersPage = () => {
  const location = useLocation(); // Get location object
  const navigate = useNavigate(); // For navigation
  const order = location.state?.order; // Get the order from the location state

  // Initialize state with the passed order data
  const [nameValue, setNameValue] = useState(order?.name || '');
  const [createdAtValue, setCreatedAtValue] = useState(order?.createdAt || '');
  const [idValue] = useState(order?.id); // ID shouldn't change

  // Function to handle the update
  const updateData = async () => {
    try {
      console.log('Updating with data:', { name: nameValue, createdAt: createdAtValue, id: idValue });
      
      const { error } = await supabase
        .from('order') // Ensure this is the correct table name
        .update({ name: nameValue }) // Update the fields as needed
        .eq('id', idValue); // Ensure you update the correct record
  
      if (error) {
        console.error('Error updating data:', error.message);
        toast.error(`Error updating data: ${error.message}`); // Show the specific error message
      } else {
        // Handle successful update
        toast.success("Data updated successfully!");
        navigate('/ViewOrders'); // Go back to the view orders page
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An unexpected error occurred");
    }
  };
  
  // Optional: Use useEffect to update state if order changes
  useEffect(() => {
    if (order) {
      setNameValue(order.name);
      setCreatedAtValue(order.createdAt);
    }
  }, [order]);

  return (
    <div style={{ padding: '16px' }}>
      <h2>Edit Data</h2>
      <div>
        <label>
          ID:
          <input type="text" value={idValue} readOnly style={{ marginLeft: '8px', width: '100%' }} />
        </label>
      </div>
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
      <div>
        <label>
          Created At:
          <input
            type="text"
            value={createdAtValue}
            onChange={(e) => setCreatedAtValue(e.target.value)} // Update state on change
            placeholder="Created At"
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

export default EditOrdersPage;
