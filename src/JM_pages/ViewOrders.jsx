import { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient'; // Import your Supabase instance
import { supabase } from '../Service/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [fetchedData, setFetchedData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from the 'order' table
  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('order')
        .select();
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setFetchedData(data || []); // Ensure data is always an array
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete data from the 'order' table
  const deleteData = async (id) => {
    try {
      const { error } = await supabase
        .from('order')
        .delete()
        .eq('id', id);
      if (error) {
        console.error('Error deleting data:', error);
      } else {
        setFetchedData((prevData) => prevData.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleEdit = (id, createdAt, name) => {
    // Navigate to EditOrdersPage with parameters
    navigate('/edit-orders', {
      state: {
        order: {
          id: id,
          createdAt: createdAt,
          name: name
        },
      },
    });

    console.log('Edit ID:', id);
  };

  const handleDelete = async (id) => {
    const confirmDeletion = window.confirm(
      'Are you sure you want to delete this record?'
    );
    if (confirmDeletion) {
      await deleteData(id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>View Orders</h2>
      {fetchedData && fetchedData.length > 0 ? ( // Add a check for fetchedData
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date & Time</th>
              <th>Name</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.created_at.split('T')[0]}</td>
                <td>{data.name || 'No Name'}</td>
                <td>
                  <button onClick={() => handleEdit(data.id, data.created_at, data.name)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(data.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default ViewOrders;
