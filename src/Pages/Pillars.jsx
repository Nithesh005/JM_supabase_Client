


import { useState, useEffect } from 'react';
import apiRequest from '../Util/ApiRequest';
import { Button, Card, Typography } from '@mui/material';

function Pillars() {
    const [employee, setEmployee] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiRequest('select/employee_primary_info');
                console.log(res);
                setEmployee(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Completed Job Page Map</h1>
            {console.log(employee.length)}
            <div className="employecard df fdc g1r p1r">
                {employee.length > 0 ? (
                    employee.map((i, index) => (
                        <div className="fullCard" key={index}>
                            <Card style={{ height: '5rem' }} className='p1r df jcsb'>
                                <div className="name_mail df g1r p1r">
                                    <Typography>
                                        {i.First_name}
                                    </Typography>
                                    <Typography>
                                        {i.mail}
                                    </Typography>
                                </div>
                                <Button variant='outlined' sx={{height:'35px'}}>Fill Form</Button>
                            </Card>
                        </div>
                    ))
                ) : (
                    <p>No employee data available.</p>
                )}
            </div>
        </div>
    );
}

export default Pillars;
