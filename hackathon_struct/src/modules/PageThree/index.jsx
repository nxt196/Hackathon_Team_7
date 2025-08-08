import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTimes } from 'store/thunks/pageTwo-thunk';
import 'common/styles.css';
import ShowBacklog from 'modules/PageTwo/components/ShowBacklog.jsx';
import {Link} from "react-router-dom";
import ShowAlertsResult from "modules/PageTwo/components/ShowAlertsResult.jsx";
import ShowAllSkus from "modules/PageThree/components/ShowAllSkus.jsx";

const PageThree = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTimes());
  }, [dispatch]);

  return (
    <div className="home-container">
      <header className="dashboard-header">
        {/* Navigation Bar */}
        <nav className="header-buttons">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/page-one" className="nav-link">
            Warehouse
          </Link>
          <Link to="/page-two" className="nav-link">
            Backlog
          </Link>
          <Link to="/page-three" className="nav-link">
            All SKUs
          </Link>
        </nav>

        {/* Profile Section */}
        <div className="dashboard-profile">
          <div className="profile-icon">ME</div>
        </div>
      </header>
    <ShowAllSkus />
    </div>
  );
};

export default PageThree;
