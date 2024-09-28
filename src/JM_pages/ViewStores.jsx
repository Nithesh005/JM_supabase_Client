import { useEffect, useState } from 'react';
import { supabase } from '../Service/supabaseClient'; // Adjust the import based on your file structure
import { useNavigate } from 'react-router-dom'; // For navigation
import { toast } from 'react-toastify'; // For toast notifications

const ViewStores = () => {
  const [fetchedData, setFetchedData] = useState([]);
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('store').select();
      if (error) throw error;
      setFetchedData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data');
    }
  };

  const deleteData = async (id) => {
    try {
      const { error } = await supabase.from('store').delete().eq('id', id);
      if (error) throw error;
      setFetchedData(fetchedData.filter(item => item.id !== id)); // Remove deleted item from state
      toast.success('Record deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error('Error deleting data');
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>View Stores</h2>
      {fetchedData.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date & Time</th>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{new Date(data.created_at).toLocaleString()}</td>
                <td>{data.name || 'No Name'}</td>
                <td>
                  <button
                    onClick={() =>
                      navigate('/edit-stores', {
                        state: { id: data.id, createdAt: data.created_at, name: data.name },
                      })
                    }
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={async () => {
                      const confirm = window.confirm('Are you sure you want to delete this record?');
                      if (confirm) {
                        await deleteData(data.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>{data.order_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default ViewStores;
