import * as React from 'react';
import { Grid } from '@mui/material';
import apiRequest from '../Util/ApiRequest';
import Myprojectcard from '../Componet/MyProject/Myprojectcard';
import { getCountries } from '../Util/GetCurrentProjectStatus';

function MyProject() {
    const [myProject, setmyProject] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiRequest('select/my_project');
                console.log(res);
                setmyProject(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        // getCountries();
    }, []);

    return (
        <>
            <Grid container spacing={1} >
                {myProject.map((i, index) => (
                    <Grid key={index} item xs={12} sm={12} md={4}>
                        <Myprojectcard liveProjects={myProject[index]} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default MyProject;
