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
        <div style={{ padding: '16px' }}>
            <h1>View Measurements</h1>
            {fetchedData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date & Time</th>
                            <th>Length</th>
                            <th>Breadth</th>
                            <th>Width</th>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Store ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedData.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.created_at.split('T')[0]}</td>
                                <td>{data.length || 'empty'}</td>
                                <td>{data.breadth || 'empty'}</td>
                                <td>{data.width || 'empty'}</td>
                                <td>
                                    <button onClick={() => handleEdit(data)}>
                                        edit
                                        <i className="fas fa-edit"></i> {/* Font Awesome edit icon */}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(data.id)}>
                                        delete
                                        <i className="fas fa-trash"></i> {/* Font Awesome delete icon */}
                                    </button>
                                </td>
                                <td>{data.store_id}</td>
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

export default ViewMeasurements;
