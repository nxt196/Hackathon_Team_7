
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimes } from 'store/thunks/pageTwo-thunk';
import { useNavigate } from 'react-router-dom';
import 'common/styles.css'


const ShowTimesButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllTimes());
    }, [dispatch]);

    const [showTimes, setShowTimes] = useState(false);

    const previousTimes = useSelector((state) => state.pageTwo?.previousTimes || []);

    const handleNavigateHome = () => {
        navigate('/')
    };

    const handleNavigatePageOne = () => {
        navigate('/page-one')
    };

    return (
        <div className="home-container">
            <div className='home-grid'>
                <h1 className="home-title">Show Times(Page Two)</h1>
                <div className="button-grid three-btn">
                    <button className="action-button" onClick={handleNavigateHome}>
                        Go Home
                    </button>
                    <button className="action-button" onClick={() => setShowTimes(true)}>Show All Times</button>
                    <button className="action-button" onClick={handleNavigatePageOne}>
                        Add Time Page
                    </button>

                </div>
            </div>

            {showTimes && (
                <ul>
                    {Array.isArray(previousTimes) && previousTimes.slice().reverse().map((time, index) => (
                        <li key={index}>{time}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// return (
//     <div className="home-container">
//         <div className='home-grid'>
//             <h1 className="home-title">Add Time(Page One)</h1>
//             <div className="button-grid three-btn">
//                 <button className="action-button" onClick={handleNavigatePageOne}>
//                     Page 1
//                 </button>
//                 <button className="action-button" onClick={handleNavigateHome}>
//                     Go Home
//                 </button>
//                 <button className="action-button" onClick={() => setShowTimes(true)}>Show All Times</button>
//             </div>
//         </div>
//         {showTimes && (
//             <ul>
//                 {previousTimes.map((time, index) => (
//                     <li key={index}>{time}</li>
//                 ))}
//             </ul>
//         )}
//     </div>
// );
// };

export default ShowTimesButton;
