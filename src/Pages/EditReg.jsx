
// export const Edit_reg = () => {
//     
//     return (
//         <div>Edit this id {id}</div>
//     )
// }

import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import apiRequest from "../Util/ApiRequest";
import { CURRENT_USER } from "../Config/Auth";

const EditReg = () => {
    let { id } = useParams();
    const [project, setProject] = useState();
    

    const [formData, setFormData] = useState({
        projectname: '',
        clientname: '',
        cename: '',
        ce_number: '',
        location: '',
        no_outlets: '',
        assignto: '',
        aboutjob: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(CURRENT_USER);
                const res = await apiRequest('select/single_project', {id} );
                console.log(res);
                // console.log(res[0].Project_name);
                setFormData((mathan)=>{
                    return {
                        ...mathan,
                        projectname: res[0].Project_name,
                        clientname: res[0].Customer_name,
                        cename: res[0].CE_name,
                        ce_number: res[0].CE_mobile_no,
                        no_outlets: res[0].Outlet_count,
                        assignto: res[0].Assigned_to,
                        aboutjob: res[0].Description,
                    }
                })
                setProject(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://your-api-endpoint.com/submit', formData);
            console.log('Response:', response.data);
            // Handle success (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Job Form - {id}
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Project Name"
                            name="projectname"
                            value={formData.projectname}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Client Name"
                            name="clientname"
                            value={formData.clientname}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            name="cename"
                            value={formData.cename}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company Number"
                            name="ce_number"
                            value={formData.ce_number}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Number of Outlets"
                            name="no_outlets"
                            value={formData.no_outlets}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Assign To"
                            name="assignto"
                            value={formData.assignto}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="About Job"
                            name="aboutjob"
                            value={formData.aboutjob}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default EditReg;
