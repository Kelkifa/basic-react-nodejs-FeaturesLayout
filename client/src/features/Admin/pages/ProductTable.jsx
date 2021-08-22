import AdminList from '../components/AdminList';
import PropTypes from 'prop-types';
import React from 'react';
import Table from 'components/Table/Table';

ProductTable.propTypes = {
    
};

function ProductTable(props) {
    return (
        <div className='admin-table'>
            <AdminList></AdminList>
        </div>
    );
}

export default ProductTable;