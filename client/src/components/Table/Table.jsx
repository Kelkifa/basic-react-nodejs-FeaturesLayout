import './table.scss';

import PropTypes from 'prop-types';

Table.propTypes = {

};

Table.defaultProps = {
 
}

function Table(props) {

    return (
        <table className='component-table custom-scroll'>
            <thead>
                <tr>
                    <th>stt</th>
                    <th>name</th>
                    <th>type</th>
                </tr>
            </thead>

            <tbody>
                <tr className='component-table__body'>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
            </tbody>

        </table>
    );
}

export default Table;