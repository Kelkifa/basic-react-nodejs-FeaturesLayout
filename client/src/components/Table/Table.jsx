import './table.scss';
import React from 'react';
import PropTypes from 'prop-types';

Table.propTypes = {
    theaders: PropTypes.array,
    tbodies: PropTypes.array,    
};

Table.defaultProps = {
    theaders:[
        '',
        'Sản phẩm',
        'Mô tả',
        'Hình dáng',
        'Màu sắc',
        'Đơn giá',
        'Số lượng',
        'Thành tiền',
        'Lưa chọn'
    ],
    tbodies:[[]],
}

function Table(props) {
    const {theaders, tbodies} = props;

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
                <tr>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                    <th><input type="checkbox" /></th>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;