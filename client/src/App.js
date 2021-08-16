import './assets/scss/components/gridLibrary.scss';
import './assets/scss/base.scss';

import React, { Suspense, useEffect } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";

import Auth from 'features/auth';
import AuthLayout from 'components/Layouts/Auth/AuthLayout';
import Cart from 'features/Cart';
import MainLayout from 'components/Layouts/Main/MainLayout';
import NotFound from 'components/NotFound';
import firebase from 'firebase';
import { getMe } from 'app/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy load - Code splitting
const Product = React.lazy(() => import('features/Product'));


// FIREBASE
const config = {
    apiKey: 'AIzaSyCxYti9LK9rfbFU8Hf25F_OH4SOayk6K4A',
    authDomain: 'banhang-8749b.firebaseapp.com',
    // ...
};
firebase.initializeApp(config);

function App(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async user => {
            if (!user) {
                // console.log('User is not logged in');
                return
            }
            try {
                const actionResult = await dispatch(getMe());
                const currentUser = unwrapResult(actionResult);
                // console.log('Logged in user: ', currentUser);
            } catch (err) {
                console.log(`Failed to login: ${err.message}`);
            }
        });

        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);

    return (
        <div className="body custom-scroll">
            <Suspense fallback={<div>Loading ... </div>}>
                <Router>
                    <Switch>
                        <Route exac path='/auth'>
                            <AuthLayout>
                                <Route component={Auth}></Route>
                            </AuthLayout>
                        </Route>
                        <Route >
                            <MainLayout>
                                <Switch>
                                    <Route exac path="/cart" component={Cart} />
                                    <Route exac path="/" component={Product} />
                                    <Route component={NotFound}></Route>
                                </Switch>
                            </MainLayout>
                        </Route>
                    </Switch>
                </Router>
            </Suspense>
        </div>
    );
}

export default App;


