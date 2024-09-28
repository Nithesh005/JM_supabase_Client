import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { supabase } from '../Service/supabaseClient'; // Adjust the import based on your file structure
import { toast } from 'react-toastify'; // Optional: For toast notifications

const ViewMeasurements = () => {
    const navigate = useNavigate();
    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from Supabase
    const fetchData = async () => {
        try {
            const { data, error } = await supabase.from('measurement').select();
            if (error) {
                console.error('Error fetching data:', error.message);
                toast.error('Error fetching data');
            } else {
                setFetchedData(data || []);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred');
        }
    };

    // Function to delete data by ID
    const deleteData = async (id) => {
        try {
            const { error } = await supabase.from('measurement').delete().eq('id', id);
            if (error) {
                console.error('Error deleting data:', error.message);
                toast.error('Error deleting data');
                return false;
            } else {
                toast.success('Record deleted successfully');
                return true;
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred');
            return false;
        }
    };

    // Function to handle record deletion
    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this record?');
        if (confirm) {
            const success = await deleteData(id);
            if (success) {
                setFetchedData((prevData) => prevData.filter((item) => item.id !== id));
            }
        }
    };

    // Function to handle record editing
    const handleEdit = (data) => {
        navigate('/edit-measurements', { state: { id: data.id, createdAt: data.created_at, length: data.length , breadth: data.breadth , width: data.width , store_id: data.store_id  } });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
          <h1 className="text-2xl font-semibold mb-6">View Measurements</h1>
          {fetchedData.length > 0 ? (
            <div className="overflow-x-auto w-full max-w-3xl bg-white rounded-lg shadow-md">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Date & Time</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Length</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Breadth</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Width</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Edit</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Delete</th>
                    <th className="py-2 px-4 border-b text-left text-gray-600">Store ID</th>
                  </tr>
                </thead>
                <tbody>
                  {fetchedData.map((data) => (
                    <tr key={data.id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">{data.id}</td>
                      <td className="py-2 px-4 border-b">{data.created_at.split('T')[0]}</td>
                      <td className="py-2 px-4 border-b">{data.length || 'empty'}</td>
                      <td className="py-2 px-4 border-b">{data.breadth || 'empty'}</td>
                      <td className="py-2 px-4 border-b">{data.width || 'empty'}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleEdit(data)}
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          Edit <i className="fas fa-edit ml-1"></i>
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleDelete(data.id)}
                          className="text-red-500 hover:underline flex items-center"
                        >
                          Delete <i className="fas fa-trash ml-1"></i>
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b">{data.store_id}</td>
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

export default ViewMeasurements;
