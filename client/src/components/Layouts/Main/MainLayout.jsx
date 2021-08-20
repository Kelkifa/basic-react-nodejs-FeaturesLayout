import Header from 'components/Header/Header';
import React from 'react';

function MainLayout(props) {
    const {children} = props;

    return (
        <>
            <Header></Header>
            {children}
        </>
    );
}

export default MainLayout;