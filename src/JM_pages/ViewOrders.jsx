import { useEffect, useState } from 'react';
// import { supabase } from '../supabaseClient'; // Import your Supabase instance
import { supabase } from '../Service/supabaseClient';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
  const [fetchedData, setFetchedData] = useState([]); // Initialize as an empty array
  // const [isLoading, setIsLoading] = useState(true);

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
    } 
    // finally {
    //   setIsLoading(false);
    // }
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

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6">View Orders</h2>
      {fetchedData && fetchedData.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-3xl bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Date & Time</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Name</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Update</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{data.id}</td>
                  <td className="py-2 px-4 border-b">{data.created_at.split('T')[0]}</td>
                  <td className="py-2 px-4 border-b">{data.name || 'No Name'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(data.id, data.created_at, data.name)}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(data.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 text-gray-500">No data available</div>
      )}
    </div>
  );
  
};

export default ViewOrders;
