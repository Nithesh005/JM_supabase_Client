import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import 'bootstrap-icons/font/bootstrap-icons.css';
import apiRequest from '../Util/ApiRequest';
import { useNavigate } from 'react-router-dom';

const CardDesign1 = ({ liveProjects }) => {
    

    const handleEdit = () => {
        // confirm(`Edit ${liveProjects.Project_id} Project`);
        navigate(`/Edit_reg/${liveProjects.Project_id}`);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return date.toLocaleString('en-GB', options).replace(',', '');
    };

    const formattedDateTime = formatDate(liveProjects.Action_time);
    const navigate = new useNavigate();
    const handleNavigate = (id) =>{
        navigate(`/GLU_updates_page/${id}`);
    }

    return (
        <>
            <Container>
                <Row className='body'>
                    <Col className='card' style={{ border: '1px solid #B3261E', height: '20rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Row className="heading">
                            <Col xs={8} className='PR_name--PR_id'>
                                <div className="projectname">{liveProjects.Project_name}</div>
                                <div className="Product_id">{liveProjects.Project_id}</div>
                            </Col>
                            <Col xs={4} className="Client_name">
                                {liveProjects.Customer_name}
                            </Col>
                        </Row>
                        <div className="CEName" style={{ width: '100%', color: '#828282', fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{liveProjects.CE_name}</div>
                        <div className="box-text">
                            <div className="box-text1">
                                <div className="sub-head">
                                    <div className='D_name'>{liveProjects.Action_by}</div>
                                    <div className='GLU_name'>{liveProjects.Assigned_to}</div>
                                </div>
                                <div className="sub-head1">
                                    {liveProjects.Description}
                                </div>
                            </div>
                            <div className="box-text2">
                                <div className='--date alighdata'><i className="bi bi-calendar3-week alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='date_data --dat'>{formattedDateTime.split(' ')[0]}</div>
                                </div>
                                <div className='--time alighdata'><i className="bi bi-stopwatch alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='time_data --dat'>{formattedDateTime.split(' ')[1]} {formattedDateTime.split(' ')[2]}</div>
                                </div>
                                <div className='--phone-no alighdata'><i className="bi bi-telephone-forward alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='phone_data --dat'>{liveProjects.CE_mobile_no}</div>
                                </div>
                                <div className='--location alighdata'><i className="bi bi-geo-alt alighicon" style={{ color: '#B3261E' }}></i>
                                    <div className='locetion_data --dat'>{liveProjects.Location}</div>
                                </div>
                            </div>
                        </div>
                        <div className='Button-container'>
                            <Button className="Red-bt Red-btnv2" variant="contained" color="error" style={{ display: 'flex', alignItems: 'center' }} onClick={handleEdit}>
                                <i className="bi bi-pen" style={{ marginRight: '8px' }}></i>
                                Edit
                            </Button>
                            <Button className='Blue-bt Blue-btnv2' variant="outlined" style={{ backgroundColor: '#FEF7FF', border: '1px solid #B3261E' }} onClick={()=>handleNavigate(liveProjects.Project_id)}>
                                <i className="bi bi-briefcase-fill" style={{ color: 'black' }}></i>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            <style>{`
            .heading {
                display: flex;
                justify-content: space-between;
            }

            .PR_name--PR_id {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .projectname {
                color: #B3261E;
                font-size: 30px;
            }

            .Product_id {
                color: #828282;
                font-size: xx-small;
            }

            .Client_name {
                color: #828282;
                font-weight: 500;
                display: flex;
                align-items: center;
                justify-content: end;
            }

            .Button-container {
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: end;
            }

            .Red-btn {
                width: 83%;
            }

            .Blue-btn {
                width: 15%;
                background-color: rgba(103, 80, 164, 0.11);
            }

            .CEName {
                margin: 10px 0;
            }

            .box-text {
                display: flex;
                justify-content: space-around;
                align-items: center;
            }

            .box-text1 {
                width: 65%;
                border: 1px solid #B3261E;
                height: 20vh;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .sub-head {
                display: flex;
                justify-content: space-between;
                font-weight: 500;
                color: #625B71;
                width: 100%;
                padding: 0px 5px 0px 5px;
            }

            .sub-head1 {
                font-size: small;
                display: flex;
                justify-content: center;
                align-items: center;
                width: auto;
                height: auto;
                padding: 10px 5px 10px 5px;
            }

            .box-text2 {
                width: 30%;
                height: 20vh;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 10px 0px 10px 0px;
            }

            .alighdata {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .alighicon {
                display: flex;
                justify-content: start;
            }

            .--dat {
                font-size: small;
                font-weight: 600;
            }

            /* Small devices (portrait tablets and large phones, 600px and up) */
            @media only screen and (min-width: 600px) {
                .sub-head {
                    font-size: 12.5px;
                }

                .sub-head1 {
                    font-size: 11px;
                }

                .Red-btn {
                    width: 85%;
                }

                .--dat {
                    font-size: x-small;
                    font-weight: 700;
                }

            }

            @media only screen and (min-width: 300px) {
                .sub-head {
                    font-size: 12px;
                    font-weight: 700;
                    padding: 5px;
                }

                .sub-head1 {
                    font-size: 12px;
                }

                .Red-btn {
                    width: 78%;
                }

                .--dat {
                    font-size: xx-small;
                    font-weight: 700;
                }
                .projectname {
                    font-size: large;
                }
            }

            /* Medium devices (landscape tablets, 768px and up) */
            @media only screen and (min-width: 768px) {
                .sub-head {
                    font-size: 12.5px;
                }

                .sub-head1 {
                    font-size: 11px;
                }

                .Red-btn {
                    width: 75%;
                }

                .--dat {
                    font-size: x-small;
                    font-weight: 700;
                }
            }

            /* Large devices (laptops/desktops, 992px and up) */
            @media only screen and (min-width: 992px) {
                .sub-head {
                    font-size: 12.5px;
                }

                .sub-head1 {
                    font-size: 11px;
                }

                .Red-btn {
                    width: 75%;
                }

                .--dat {
                    font-size: x-small;
                    font-weight: 700;
                }
            }

            /* Extra large devices (large laptops and desktops, 1200px and up) */
            @media only screen and (min-width: 1200px) {
                .sub-head {
                    font-size: 15px;
                }

                .sub-head1 {
                    font-size: small;
                }
                .Red-btn {
                    width: 84%;
                }
            }
        `}</style>
        </>
    );
}

export default CardDesign1;
