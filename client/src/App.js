import React from 'react';
import Home from './Home.jsx';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App(props) {
    return (
        <div className="body">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route>
                        <h1>Not match</h1>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;