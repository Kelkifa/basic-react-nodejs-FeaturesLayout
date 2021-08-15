import Header from 'components/Header/Header';
import PropTypes from 'prop-types';
import React from 'react';

MainLayout.propTypes = {
    
};

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