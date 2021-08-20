import './userBtn.scss';

import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import firebase from 'firebase';
import { linkStyle } from 'assets/styles/styles';
import { useDispatch } from 'react-redux';
import { userLogout } from 'app/userSlice';

UserBtn.propTypes = {
    name: PropTypes.string,
    img: PropTypes.string,
    uid: PropTypes.string,
};

UserBtn.defaultProps = {
    name:null,
    img:null,
    uid:null,
}

function UserBtn(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    // PROPS
    const {
        name, 
        img, 
        // uid
    } = props;

    // STATE
    const [isShow, setIsShow] = useState(false);

    // FUNCTION HANDLER
    const handleClick = ()=>{
        setIsShow(!isShow);
    }

    const handlerLogout = ()=>{
        const action = userLogout();
        dispatch(action);
        firebase.auth().signOut();
        history.push('/');
    }
    return (
        <div 
            className="user-btn"
            onClick={handleClick}
        >
            <img src={img} alt="loi roi" />
            { isShow && 
                <div className="user-btn__hide">
                    <div className="user-btn__hide__group">
                        <div className="user-btn__hide__group__item">
                            {name}
                        </div>
                            <Link to='/cart' style={linkStyle}>
                                <div className="user-btn__hide__group__item">
                                    Your carts
                                </div>
                            </Link>
                    </div>
                    <div 
                        className="user-btn__hide__group"
                        onClick={handlerLogout}    
                    >
                        <div className="user-btn__hide__group__item">
                            Sign out
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default UserBtn;