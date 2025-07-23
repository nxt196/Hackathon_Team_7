
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeLastTime } from 'store/thunks/pageOne-thunk';
import { getAllTimes } from 'store/thunks/pageTwo-thunk';

import 'common/styles.css'

const RemoveTimeButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTimes());
    }, [dispatch]);

    const handleRemoveLastTime = () => {
        dispatch(removeLastTime());
    }



    const handleNavigateHome = () => {
        navigate('/')
    };
    const handleNavigatePageTwo = () => {
        navigate('/page-two')
    };
    return (
        <div className="home-container">
            <div className='home-grid'>
                <h1 className="home-title">Remove Time(Page One)</h1>
                <div className="button-grid three-btn">
                    <button className="action-button" onClick={handleNavigateHome}>
                        Home Page
                    </button>
                    <button className="action-button" onClick={handleRemoveLastTime}>
                        Remove Last Time
                    </button>
                    <button className="action-button" onClick={handleNavigatePageTwo}>
                        Show All Times
                    </button>

                </div>
            </div>
        </div>
    );
};


export default RemoveTimeButton;
