import * as React from 'react';
import { Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import { Button, Fade, Modal, TextField, Autocomplete } from '@mui/material';
// import JothiText from '../assets/Logo/jOTHI_MEDIA_SOFTWARE_LOGO.png';
import CF_Autocomplete from './CF_Autocomplete';
import Applogo from "../assets/Logo/logo1.png";
import { useState } from 'react';
import { style } from './Bootstrap_Comp/FullModal';
import apiRequest from '../Util/ApiRequest';
import { Create_Job_Form, V__assign, V__Client_name, V__location, V_message, V_Outlet, V_phoneNumber, V_Project_name } from '../Util/Validation';
import { V_name } from '../Util/Validation';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
// const handleDrawerClose = () => {
//     setOpen(false);    
// };
// var handleclickicon = () => {
//     var element = document.getElementById("drower2");
//     element.style.display = "block";
//     element.style.display = "flex";
//     element.style.position = "absolute";
// }

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = useState({});
    // const [modelopen, setModelOpen] = React.useState(false);
    // const [show, setShow] = useState(false);

    //Input validation
    const JobInput = {
        projectname: '',
        clietname: '',
        cename: '',
        ce_number: '',
        location: '',
        no_outlets: '',
        assignto: '',
        aboutjob: '',
    }
    const [jobstate, setJobState] = useState(JobInput);
    const [btnDisable, setbtnDisable] = useState(true);
    const [employeName, setemployeName] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const emp_names = await apiRequest('select/Get_employe_names');
                const fNames = emp_names.map(i => i.First_name)
                setemployeName(fNames);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobState({ ...jobstate, [name]: value });
        // console.log(jobstate);
        name == 'projectname' && setErrors({ ...errors, ...V_Project_name(value) });
        name == 'clietname' && setErrors({ ...errors, ...V__Client_name(value) });
        name == 'cename' && setErrors({ ...errors, ...V_name(value) });
        name == 'ce_number' && setErrors({ ...errors, ...V_phoneNumber(value) });
        name == 'location' && setErrors({ ...errors, ...V__location(value) });
        name == 'no_outlets' && setErrors({ ...errors, ...V_Outlet(value) });
        name == 'assignto' && setErrors({ ...errors, ...V__assign(value) });
        name == 'aboutjob' && setErrors({ ...errors, ...V_message(value) });
        setbtnDisable(false);
    }

    const handleSubmitbtn = (e) => {
        e.preventDefault();
        setErrors({ ...errors, ...Create_Job_Form(jobstate) });
        console.log({ ...errors, ...Create_Job_Form(jobstate) });
        const bool = Object.values({ ...errors, ...Create_Job_Form(jobstate) }).every(e => e === null);
        if (bool) {
           console.log("Valid Inputs");
           fetchData();
           setbtnDisable(true);
        }
    }

    const handleAutocompleteChange = (event, newValue) => {
        setJobState(prevState => ({
            ...prevState,
            assignto: newValue || 'NotSelected'
        }));
        // console.log(newValue);
    };

    const fetchData = async () => {
        try {
            const res = await apiRequest('insert/new_job', jobstate);
            console.log(res);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);

    };
    const navigation = [
        { "tittle": "Create Order", "path": "Page1", "icon": "i" },
        { "tittle": "View Orders", "path": "ViewOrders", "icon": "i" },
        { "tittle": "View Stores Jobs", "path": "ViewStores", "icon": "i" },
        { "tittle": "View Measurements", "path": "ViewMeasurements", "icon": "i" },
        // { "tittle": "Live Project", "path": "liveproject", "icon": "i" },
        // { "tittle": "My Project", "path": "myproject", "icon": "i" },
        // { "tittle": "Completed Jobs", "path": "completedjobs", "icon": "i" },
        // { "tittle": "Pillars", "path": "Pillars", "icon": "i" },
    ];

    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);


    return (
        <>
            {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                // slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade
                    in={openModal}
                >
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Add New Project
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                label='Project Name' name='projectname' id='projectname' placeholder='Saravanapati'
                                onChange={handleChange}
                                helperText={errors.Projet_name}
                                error={!!errors.Projet_name}
                            >
                            </TextField>
                            <TextField
                                label='Client Name' name='clietname' id='clietname' placeholder='Pepsi'
                                onChange={handleChange}
                                helperText={errors.Client_name}
                                error={!!errors.Client_name}
                            >
                            </TextField>
                            <TextField
                                label='CE Name' name='cename' id='cename' placeholder='Jhon Joe'
                                onChange={handleChange}
                                helperText={errors.name}
                                error={!!errors.name}
                            >
                            </TextField>
                            <TextField
                                label='CE Numbner' name='ce_number' id='ce_number' placeholder='8870469532'
                                onChange={handleChange}
                                helperText={errors.phoneNumber}
                                error={!!errors.phoneNumber}
                            >
                            </TextField>
                            <TextField
                                label='Location' name='location' id='location' placeholder='saravanapatti'
                                onChange={handleChange}
                                helperText={errors.V_CF_location}
                                error={!!errors.V_CF_location}
                            >
                            </TextField>
                            <TextField
                                label='No of Outlet' name='no_outlets' id='no_outlets' placeholder='10'
                                onChange={handleChange}
                                helperText={errors.V_Outlet_Count}
                                error={!!errors.V_Outlet_Count}
                            >

                            </TextField>
                            <Autocomplete
                                disablePortal
                                name='assignto'
                                id="combo-box-demo"
                                options={employeName}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Assign to" />}
                                onChange={handleAutocompleteChange}
                                helperText={errors.V_GL_assign}
                                error={!!errors.V_GL_assign}
                                value={jobstate.V_GL_assign}
                            />
                            <TextField
                                id="outlined-multiline-static"
                                name='aboutjob'
                                label="Job Details"
                                multiline
                                rows={4}
                                placeholder='About Job Details'
                                onChange={handleChange}
                                helperText={errors.message}
                                error={!!errors.message}
                                value={jobstate.message}
                            />
                        </Typography>
                        <Button variant="outlined" >Cancel</Button>
                        <Button variant="contained" onClick={handleSubmitbtn} disabled={btnDisable}>Create Job</Button>
                    </Box>
                </Fade>
            </Modal> */}

            <Box sx={{ display: 'flex', zIndex: '1' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}
                    sx={{
                        backgroundColor: 'white',
                        color: 'Black',
                        boxShadow: '1',
                        marginLeft: '10px',
                    }}

                >

                    <Toolbar>
                        <IconButton
                            color="Black"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            {/* onClick={handleclickicon} */}
                            <div id='click-icon' >
                                <MenuIcon />
                            </div>

                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', width: '100%' }}>
                            <div className="appTittle">
                                <img src={Applogo} alt="Jothimedia" width={250} />
                            </div>
                            {/* <div className='Button-align' style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', }}>
                                <div className="combobox" style={{ marginRight: '10px' }}>
                                    <CF_Autocomplete client={"All Client"} />
                                </div>
                                <div className="combobox" style={{ marginRight: '10px' }}>
                                    <CF_Autocomplete client={"All Project"} />
                                </div>
                                <div className="combobox" style={{ marginRight: '10px' }}>
                                    <CF_Autocomplete client={"All Cards"} />
                                </div>
                                <div className="btn-hoolder">
                                    <Button variant="contained" onClick={handleOpen}
                                        sx={{
                                            backgroundColor: '#DC362E',
                                            '&:hover': {
                                                backgroundColor: '#FF0C00',
                                            },
                                        }}
                                    ><AddIcon />
                                        Add New
                                    </Button>
                                </div>
                            </div> */}
                        </Typography>
                    </Toolbar>
                </AppBar>



                <Drawer variant="permanent" open={open} id='drower2'
                // sx={{
                //     position: { xs: 'absolute', md: "relative" },
                //     display: { xs: 'none', md: "block" },
                // }}
                >
                    <DrawerHeader>
                        <IconButton id="ico" onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {navigation.map((text, index) => (
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <Link to={text.path}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text.tittle} sx={{ opacity: open ? 1 : 0 }} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    {/* <List>
                        {['HR', 'Purchase', 'Accountant'].map((text, index) => (
                            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List> */}
                </Drawer>
            </Box>
        </>
    );

}
