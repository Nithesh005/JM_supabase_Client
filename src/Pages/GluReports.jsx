import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiRequest from '../Util/ApiRequest';
import { Col, Container, Row } from 'react-bootstrap';
import '../Css/GluReports.css';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Apps';
import Job from '@mui/icons-material/Work';
import ShopList from '../Componet/ShopList_Comp/ShopList';
import { supabase } from '../Util/Supabase';

const GluReports = () => {
    let { id } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await apiRequest('select/ ', { id });
                console.log(res);
                // setLiveProjects(res);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);


    const shopsData = [
        {
            name: 'Shop 1',
            branches: ['Branch 1.1', 'Branch 1.2', 'Branch 1.3']
        },
        {
            name: 'Shop 2',
            branches: ['Branch 2.1', 'Branch 2.2']
        },
        {
            name: 'Shop 3',
            branches: ['Branch 3.1', 'Branch 3.2', 'Branch 3.3', 'Branch 3.4']
        }
    ];
    const imageNames = ['CF0001JMU.jpg', 'CF0002JMU.jpg'];
    const [images, setImages] = useState([]);
    useEffect(() => {
        const fetchImages = async () => {
            const urls = await Promise.all(imageNames.map(async (imageName) => {
                const { data } = supabase
                    .storage
                    .from('image-bucket')
                    .getPublicUrl(`Avatars/${imageName}`);
                return data.publicUrl;
            }));
            setImages(urls);
        };
        fetchImages();
    }, []);
    console.log(images[0]);



    return (
        <div className='Cont-card'>

            {/* <div className="images df g1r">
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Avatar ${index + 1}`} width={200} />
                ))}
            </div> */}
            <Container className='Overallcontainer'>
                <Row className='glu-card-container-1'>
                    <Row className='glu-card-container-1-1'>
                        <Col className='d-flex pro_name'>
                            <Col className='clr-black n-w'>Project Name : </Col>
                            <Col className='Pro_name_data n-w'> Saravanampatti </Col>
                        </Col>
                        <Col className='d-flex'>
                            <Col className='clr-black n-w'>Client Name :</Col>
                            <Col className='Pro_name_data n-w'> Pepsi </Col>
                        </Col>
                        <Col className='d-flex Glu-Button-box '>
                            <Button
                                variant="contained"
                                className='n-w'
                                sx={{
                                    backgroundColor: '#DC362E',
                                    '&:hover': {
                                        backgroundColor: '#FF0C00',
                                    },
                                }}
                            >
                                <AddIcon />
                                Download All Outlets
                            </Button>
                        </Col>
                    </Row>
                    <Row className='glu-card-container-1-1'>
                        <Col className='d-flex pro_name'>
                            <Col className='clr-black n-w'>Overall Out Let Count : </Col>
                            <Col className='Pro_name_data n-w'> 25 </Col>
                        </Col>
                        <Col className='d-flex'>
                            <Col className='clr-black n-w'>GU Name :</Col>
                            <Col className='Pro_name_data n-w'> Username </Col>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className='glu-card-container-1-1'>
                        <Col className='d-flex pro_name'>
                            <Col className='clr-black n-w'>Location : </Col>
                            <Col className='Pro_name_data n-w'> Saravanampatti </Col>
                        </Col>
                        <Col className='d-flex'>
                            <Col className='clr-black n-w'>GU Number :</Col>
                            <Col className='Pro_name_data n-w'> 1234567890 </Col>
                        </Col>
                        <Col className='d-flex Glu-Button-box '>
                            <Button
                                variant="contained"
                                className='n-w'
                                sx={{
                                    backgroundColor: '#DC362E',
                                    '&:hover': {
                                        backgroundColor: '#FF0C00',
                                    },
                                }}
                            >
                                <Job />
                                Accept Job
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Container>
            <div className="g-1rm"></div>
            <Container>
                <Row className='second-potion'>
                    <Col md={3} lg={3} className='Details-content'>
                        <Row>
                            <Col className='d-flex details-head'>
                                <h1 className='data-font'>Outlet Details</h1>
                            </Col>
                        </Row>
                        <Row className='d-flex data-part'>
                            <Row className='d-flex pro_name'>
                                <ShopList shops={shopsData} />
                            </Row>
                        </Row>
                    </Col>
                    <Col md={6} lg={6}>Carousal Data</Col>
                    <Col md={3} lg={3} className='Details-content d-flex'>
                        <Row>
                            <Col className='d-flex details-head'>
                                <h1 className='data-font'>DETAILS</h1>
                            </Col>
                        </Row>
                        <Row className='d-flex data-part'>
                            <Row className='d-flex pro_name'>
                                <Col className='clr-black n-w'>Shop Name :</Col>
                                <Col className='Pro_name_data data-align-end n-w'>Nithesh Stores</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>Contact No:</Col>
                                <Col className='Pro_name_data n-w data-align-end'>1234567890</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>Address:</Col>
                                <Col className='Pro_name_data data-align-end'>20/93, north, street</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>City:</Col>
                                <Col className='Pro_name_data n-w data-align-end'>Thambaram</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>District:</Col>
                                <Col className='Pro_name_data n-w data-align-end'>Chennai</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>Width:</Col>
                                <Col className='Pro_name_data n-w data-align-end'>90</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>Height:</Col>
                                <Col className='Pro_name_data n-w data-align-end'>90</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>Pole:</Col>
                                <Col className='Pro_name_data n-w data-align-end'>2</Col>
                            </Row>
                            <Row className='d-flex'>
                                <Col className='clr-black n-w'>Media Type:</Col>
                                <Col className='Pro_name_data n-w data-align-end'>Vinyl</Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default GluReports;
