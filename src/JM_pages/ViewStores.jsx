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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-semibold mb-6">View Stores</h2>
      {fetchedData.length > 0 ? (
        <div className="overflow-x-auto w-full max-w-3xl bg-white rounded-lg shadow-md">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Date & Time</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Name</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Update</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Delete</th>
                <th className="py-2 px-4 border-b text-left text-gray-600">Order ID</th>
              </tr>
            </thead>
            <tbody>
              {fetchedData.map((data) => (
                <tr key={data.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{data.id}</td>
                  <td className="py-2 px-4 border-b">{new Date(data.created_at).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b">{data.name || 'No Name'}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() =>
                        navigate('/edit-stores', {
                          state: { id: data.id, createdAt: data.created_at, name: data.name },
                        })
                      }
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={async () => {
                        const confirm = window.confirm('Are you sure you want to delete this record?');
                        if (confirm) {
                          await deleteData(data.id);
                        }
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">{data.order_id}</td>
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

export default ViewStores;
