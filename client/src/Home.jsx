import './assets/gridLibrary.scss';
import React from 'react';

function Home(props) {
    return (
        <div class='grid wide' style={{backgroundColor: 'gray'}}>
            <div className="row">
                <div className="item1 c-3 m-2" style={{backgroundColor: 'blue'}}>item1</div>
                <div className="item2" style={{backgroundColor: 'blue'}}>item2</div>
                <div className="item3" style={{backgroundColor: 'blue'}}>item3</div>
            </div>
        </div>
    );
}

export default Home;