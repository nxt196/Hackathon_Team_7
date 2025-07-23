import React from 'react';
import { useDispatch } from 'react-redux';
import { addCurrentTime } from 'store/thunks/dashboardhome-thunk';
import { useNavigate } from 'react-router-dom';
import 'common/styles.css'




const AddTimeButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigatePageOne = () => {
        navigate('/page-one')
    };
    const handleNavigatePageTwo = () => {
        navigate('/page-two')
    };
    const handleAddTime = () => {
        const currentTime = new Date().toISOString();
        dispatch(addCurrentTime(currentTime));
    }

    return (
        <div className="home-container">
            <div className='home-grid'>
                <h1 className="home-title">Home Page</h1>
                <div className="button-grid three-btn">
                    <button className="action-button" onClick={handleNavigatePageOne}>
                        Remove Last Time Page
                    </button>
                    <button className="action-button" onClick={handleAddTime}>
                        Add Current Time
                    </button>
                    <button className="action-button" onClick={handleNavigatePageTwo}>
                        Show All Times Page
                    </button>
                </div>
            </div>
        </div>
    );

};

export default AddTimeButton;
