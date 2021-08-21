import TextTruncate from 'react-text-truncate';
import { Card } from 'react-bootstrap';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
const CourseLiveCard: React.FunctionComponent = () => {
    return (
        <Card style={{ marginTop: '50px', width: '550px', height: '350px' }}>
            <Card.Body>
                <div style={{ justifyContent: 'space-between' }} className='d-flex'>
                    <div className='d-flex'>
                        <div className='profile-img-container'></div>
                        <Card.Title>
                            <a href='#' className='link-header'>  Front-end course</a>
                            <br />
                            <small className='text-center'>
                                <a href="#" className='link-header muted'>TeacherName</a>
                            </small>
                            <br />
                            <small className='muted'>Spoken:English</small>
                        </Card.Title>

                    </div>
                    <div>
                        <FavoriteBorderIcon className='muted' />
                        <MoreVertIcon className='muted' />
                    </div>
                </div>

                <Card.Text style={{ maxWidth: '350px', display: 'flex', marginTop: '10px' }}>
                    <TextTruncate
                        line={4}
                        element="span"
                        truncateText="…"
                        text="We are looking for a backend developer to take on multiple project assignments to build specific features for our Job Board platform. The first set of features includes:

                        User Registration
                        Product Sign Up
                        Subscription Manager
                        Create Candidate Profile
                        Review and Edit Profile Information
                        Cover Letters

                        We will provide more details for each feature upon awarding the project. Each individual feature successfully delivered would be $200. There are additional project features beyond this that are also available."
                        textTruncateChild={<a href="#">more</a>}
                    />
                    <div className='price-ticket'>Single 25$/h</div>
                    <div style={{ top: '80px', backgroundColor: 'green' }} className='price-ticket'>Group 25$/m</div>

                </Card.Text>
                <div className='d-flex'>
                    <a className='keyword-card' href='#'>
                        <span>ReactJS</span>
                    </a>
                    <a className='keyword-card' href='#'>
                        <span>HTML</span>
                    </a>
                    <a className='keyword-card' href='#'>
                        <span>CSS</span>
                    </a>
                    <a className='keyword-card' href='#'>
                        <span>UI/UX Design</span>
                    </a>
                </div>
                <div style={{ position: 'absolute', bottom: "0" }} className='d-flex py-4'>
                    <span className='muted'>Participate:</span>
                    <strong className='muted'>less than 5</strong>
                    <small className='ml-2'>
                        <StarOutlineIcon style={{ width: '20px' }} />
                        <StarOutlineIcon style={{ width: '20px' }} />
                        <StarOutlineIcon style={{ width: '20px' }} />
                        <StarOutlineIcon style={{ width: '20px' }} />
                        <StarOutlineIcon style={{ width: '20px' }} />
                        <StarOutlineIcon style={{ width: '20px' }} />
                    </small>
                    <span className='ml-2'>
                        <LocationOnIcon /><small className='muted'>Azerbaijan</small>
                    </span>
                </div>
            </Card.Body>
        </Card>
    )
}
export default CourseLiveCard;