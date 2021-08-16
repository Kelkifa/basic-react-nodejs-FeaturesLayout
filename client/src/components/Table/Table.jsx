import './table.scss';

import PropTypes from 'prop-types';
import React from 'react';

Table.propTypes = {
    theaders: PropTypes.array,
    tbodies: PropTypes.array,    
};

Table.defaultProps = {
    theaders:[],
}

function Table(props) {
    const {theaders, children} = props;

    return (
        <table className="table-component">
            <thead>
                <tr>
                    {theaders.map(theader=>(
                        <th key={theader}>{theader}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                    {children}
            </tbody>
        </table>
    );
}

export default Table;