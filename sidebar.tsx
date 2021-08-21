import React from 'react';
import {Col} from 'react-bootstrap'
const Sidebar:React.FunctionComponent = () => {
    return (
        <Col sm={2}>
            <div className="sidenav">
                <a href="#">Home</a>
                <a href="#">Explore</a>
                <a href="#">Create</a>
                <a href="#">Calendar</a>
                <a href="#">Courses</a>
                <a href="#">Settings</a>

            </div>
        </Col>
    );
}

export default Sidebar;