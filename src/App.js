import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import LandingPage from '../src/components/landingPage/landingPage';
import WorkPage from '../src/components/workPage/workPage';
import ProjectPage from '../src/components/projectPage/projectPage';
import Animatr from '../src/components/projects/animatr/animatr';
import Contact from '../src/components/contact/contact';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <div>
                        <LandingPage />
                        <WorkPage />
                        <ProjectPage />
                        <Contact />
                    </div>
                </Route>
                <Route
                    path='/:project'
                    render={() => {
                        return <Animatr />;
                    }}
                />
            </Switch>
        </Router>
    );
}

export default App;
