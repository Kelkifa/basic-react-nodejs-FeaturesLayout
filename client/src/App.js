import './assets/scss/components/gridLibrary.scss';
import './assets/scss/base.scss';

import React, { Suspense } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import Cart from 'features/Cart';
import Header from './components/Header/Header';
import NotFound from 'components/NotFound';

// Lazy load - Code splitting
const Product = React.lazy(() => import('./features/Product'));

function App(props) {
    return (
        <div className="body custom-scroll">
            <Suspense fallback={<div>Loading ... </div>}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exac path="/cart" component={Cart} />
                        <Route exac path="/" component={Product} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;