import { useState } from 'react';
import { toast } from 'react-toastify'; // Make sure to install react-toastify
import { supabase } from '../Service/supabaseClient';
const Page1 = () => {
  const [selectedOption, setSelectedOption] = useState('Create Orders'); // Default dropdown value
  const [formData1, setFormData1] = useState({ name: '' });
  const [formData3, setFormData3] = useState({ length: '', breath: '', width: '' });

  // Handle input changes for Create Orders form
  const handleInputChange1 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  // Handle input changes for Add Measurements form
  const handleInputChange3 = (e) => {
    setFormData3({ ...formData3, [e.target.name]: e.target.value });
  };

  // Submit function for Create Orders
  const handleCreateOrder = async () => {
    console.log('Create Orders Form Data:', formData1);
    const response = await insertOrders(formData1);

    if (response) {
      toast.success("Order created successfully!");
    }
  };

  // Submit function for Add Measurements
  const handleAddMeasurements = async () => {
    console.log('Add Measurements Form Data:', formData3);
    const response = await insertMeasurements(formData3);

    if (response) {
      toast.success("Measurements added successfully!");
    }
  };

  // Function to insert orders in Supabase
  const insertOrders = async (data) => {
    const { data: orderData, error } = await supabase
      .from('order')
      .insert([{ name: data.name }]);

    if (error) {
      console.error('Error inserting data:', error);
      return false;
    }

    console.log('Data inserted successfully:', orderData);
    return true;
  };

  // Function to insert measurements in Supabase
  const insertMeasurements = async (data) => {
    const { data: measurementData, error } = await supabase
      .from('measurements')
      .insert([{ length: data.length, breath: data.breath, width: data.width }]);

    if (error) {
      console.error('Error inserting data:', error);
      return false;
    }

    console.log('Data inserted successfully:', measurementData);
    return true;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Record Management</h1>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          <option value="Create Orders">Create Orders</option>
          {/* <option value="Add Measurements">Add Measurements</option> */}
        </select>
        {selectedOption === 'Create Orders' && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleInputChange1}
              className="mb-4 p-2 border rounded w-full"
            />
            <button
              onClick={handleCreateOrder}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create
            </button>
          </div>
        )}
        {selectedOption === 'Add Measurements' && (
          <div>
            <input
              type="text"
              name="length"
              placeholder="Length"
              onChange={handleInputChange3}
              className="mb-4 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="breath"
              placeholder="Breath"
              onChange={handleInputChange3}
              className="mb-4 p-2 border rounded w-full"
            />
            <input
              type="text"
              name="width"
              placeholder="Width"
              onChange={handleInputChange3}
              className="mb-4 p-2 border rounded w-full"
            />
            <button
              onClick={handleAddMeasurements}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );

};

export default Page1;
