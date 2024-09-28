import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Myprojectcard.css'
import { useNavigate } from 'react-router-dom';


const Myprojectcard = ({liveProjects}) => {
    const navigate = new useNavigate();
    const handleViewJobDetials = (id) =>{
        navigate(`/GLU_updates_page/${id}`);
    }
    return (
        <>
            <Container>
                <Row className='body'>
                    <Col className='card' style={{ border: '1px solid #B3261E', height: '20rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Row className="heading">
                            <Col xs={8} className='PR_name--PR_id'>
                            {/* {console.log(liveProjects)} */}
                                <div className="projectname">{liveProjects.Project_name}</div>
                                <div className="Product_id">{liveProjects.Project_id}</div>
                            </Col>
                            <Col xs={4} className="Client_name">
                                PEPSI
                            </Col>
                        </Row>
                        <div className="CEName" style={{ width: '100%', color: '#828282', fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>NitheshWaran T</div>
                        <div className="box-text">
                            <div className="box-text1">
                                <div className="sub-head">
                                    <div className='D_name'>Designer Name</div>
                                    <div className='GLU_name'>GL User Name</div>
                                </div>
                                <div className="sub-head1">
                                    Color is used to express style and communicate meaning. With dynamic color, Material puts personal color preferences and individual needs....
                                </div>
                            </div>
                            <div className="box-text2">
                                <div className='--date alighdata'><i className="bi bi-calendar3-week alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='date_data --dat'>18/06/2024</div>
                                </div>
                                <div className='--time alighdata'><i className="bi bi-stopwatch alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='time_data --dat'>09:30 PM</div>
                                </div>
                                <div className='--phone-no alighdata'><i className="bi bi-telephone-forward alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='phone_data --dat'>1234567890</div>
                                </div>
                                <div className='--location alighdata'><i className="bi bi-geo-alt alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='locetion_data --dat'>Saravanapatti</div>
                                </div>
                            </div>
                        </div>
                        <div className='Button-container'>
                            <Button className="Red-btn Red-btnv2" variant="contained" color="error" style={{ display: 'flex', alignItems: 'center' }} onClick={()=>handleViewJobDetials(liveProjects.Project_id)}>
                                <i className="bi bi-binoculars" style={{ marginRight: '8px' }}></i>
                                View Job Details
                            </Button>
                            <Button className="Blue-bt Blue-btnv2" variant="outlined" style={{ display: 'flex', alignItems: 'center',backgroundColor: '#FEF7FF', border: '1px solid #B3261E' }}>
                                <i className="bi bi-binoculars" style={{ color: 'black' }}></i>
                               Move to Head
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Myprojectcard;