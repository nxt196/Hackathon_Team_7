import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTimes } from 'store/thunks/pageTwo-thunk';
import { useNavigate } from 'react-router-dom';
import 'common/styles.css';
import { FaArrowLeft } from 'react-icons/fa6';

const PageTwoGrid = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTimes());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleNavigatePageOne = () => {
    navigate('/page-one');
  };

  return (
    <div className="home-grid">
      <h1 className="home-title">All SKUs</h1>
      <div className="button-grid three-btn">
        <div className="button-with-label">
          <button className="action-button" onClick={handleNavigateHome}>
            <FaArrowLeft /> Go Home
          </button>
        </div>
        <div className="button-with-label">
          <button className="action-button" onClick={handleNavigatePageOne}>
            Remove Last Time Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageTwoGrid;
