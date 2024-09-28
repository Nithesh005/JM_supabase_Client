import { Autocomplete, Paper, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const CF_Autocomplete = ({client}) => {
    const Jobstatus = [
        { title: 'GLU Card'},
        { title: 'Designer Card'},
        { title: 'All Cards'}
    ]
    const Clientname = [
        { title: 'Dairy Day'},
        { title: 'Pepsi'},
        { title: 'All Client'}
    ]
    const Project = [
        { title: 'Kanyakumari'},
        { title: 'Saravanapatti'},
        { title: 'All Project'}
    ]
    const options = (client)=>{
        if (client == "All Client") {
            return Clientname;
        }
        else if(client == "All Project"){
            return Project;
        }
        else{
            return Jobstatus;
        }
    }
    // console.log(options(client));
    return (
        <>
            <Autocomplete
                options={options(client)}
                getOptionLabel={(option) => option.title}
                sx={{ width: 200 }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={client}
                        sx={{
                            '.MuiOutlinedInput-root': {
                                borderRadius: '10px',
                                height: '40px'
                            },
                            '& .MuiInputLabel-root': {
                                transform: 'translate(15px, 6px) scale(1)', 
                            },
                            '& .MuiInputLabel-shrink': {
                                transform: 'translate(15px, -7px) scale(0.75)', 
                            }
                        }}
                    />
                )}
                PaperComponent={(props) => (
                    <Paper
                        {...props}
                        sx={{
                            borderRadius: '10px'
                        }}
                    />
                )}
            />
        </>
    )
}
CF_Autocomplete.propTypes = {
    client: PropTypes.string.isRequired,
};

export default CF_Autocomplete;