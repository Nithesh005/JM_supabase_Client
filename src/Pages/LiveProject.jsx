import * as React from 'react';
import CardDesign1 from '../Componet/CardDesign1';
import { Grid } from '@mui/material';
import apiRequest from '../Util/ApiRequest';

function LiveProject() {
    const [liveProjects, setLiveProjects] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiRequest('select/live_project');
                // console.log(fNames);
                setLiveProjects(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Grid container spacing={1} >
                {liveProjects.map((i, index) => (
                    <Grid key={index} item xs={12} sm={12} md={4}>
                        <CardDesign1 liveProjects={liveProjects[index]} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default LiveProject;
