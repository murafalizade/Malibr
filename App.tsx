import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CourseLiveCard from './components/course-live-card';
import CreateCourseForm from './components/form';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BecomeTutor from './components/becomeTutor';

const App = () => {
    return (
        <Router>

     
        <>
            <Container fluid>
                <Row>
                    <Sidebar />
                    <Col sm={10}>
                        <Row className='menu'>
                            <div>
                                <h3>Malirb</h3>

                            </div>
                            <div>
                                <input placeholder='Search' />
                            </div>
                            <div>
                                <h6>Teacher name</h6>

                            </div>
                        </Row>
                        <Switch>
                            <Route path='/' exact>
                                <CourseLiveCard />
                            </Route>
                            <Route path='/create-course'>a</Route>
                            <Route path='/become-tutor'>
                                    <BecomeTutor />
                            </Route>
                        </Switch>

                        

                    </Col>
                </Row>
            </Container>

        </>
        </Router>
    )
}


export default App;