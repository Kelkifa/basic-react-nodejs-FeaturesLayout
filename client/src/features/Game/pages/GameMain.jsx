import './gameMain.scss';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import gameApi from 'api/gameApi';

GameMain.propTypes = {
    
};

function GameMain(props) {
    const [dataInfo, setDataInfo] = useState({
        loading:true,
        error: null,
        data:null
    });

    useEffect(()=>{
        const fetchGames = async ()=>{
            try{
                const response = await gameApi.getAll();
                console.log(response);
                if(response.success===true){
                    setDataInfo({
                        loading:false,
                        error:false,
                        data:response.response,
                    });
                    return
                }
                
                setDataInfo({
                    loading:false,
                    error:response.message,
                    data:null,
                });

            }catch(err){
                console.log(err);

                setDataInfo({
                    loading:false,
                    error :err.message,
                    data:null,
                })
            }


        }
        
        fetchGames();
    },[])
    
    if(dataInfo.loading){
        return(
            <div>Loading...</div>
        )
    }
    if(dataInfo.error){
        return(
            <div>{dataInfo.error}</div>
        )
    }
    
    return (
        <div className='game-main'>
            <h3>Bờ lay tu ghe đờ</h3>
            <div className="game-main__img-container">
                {dataInfo.data.map(data=> 
                    <div key={data._id} className="game-main__img-container__img">
                        <img src={data.img} alt='err' />    
                    </div>
                )}
            </div>
        </div>
    );
}

export default GameMain;