import './assets/gridLibrary.scss';
import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from './components/Header/Header';



function App(props) {
    return (
        <div className="body">
            <Router>
                <Header></Header>
                <Switch>
                    {/* <Route exact path="/" component={Home} /> */}
                    <Route>
                        <h1>Not match</h1>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;