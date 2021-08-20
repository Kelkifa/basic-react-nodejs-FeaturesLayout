import './adminLayout.scss';

import Header from 'features/Admin/components/Header';
import Leftbar from 'features/Admin/components/Leftbar';
import React from 'react';

function AdminLayout(props) {
    const {children} = props;
    
    return (
        <div className='admin-layout'>
            <div className="admin-layout__leftbar">
                <Leftbar></Leftbar>
            </div>
            <div className="admin-layout__content">
                <div className="admin-layout__content__header">
                    <Header />
                </div>
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;