import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTimes } from 'store/thunks/dashboardhome-thunk';
import {Link, useNavigate} from 'react-router-dom';
import 'common/dashboard.css';
import ShowAlertsResult from 'modules/PageTwo/components/ShowAlertsResult.jsx';
import { FiAlertCircle } from 'react-icons/fi';
import ThreeHourCountdown from 'modules/DashboardHome/components/ThreeHourCountdown.jsx';

const DashboardHomeGrid = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTimes());
  }, [dispatch]);

  const handleNavigatePageOne = () => {
    navigate('/page-one');
  };
  const handleNavigatePageTwo = () => {
    navigate('/page-two');
  };
  const handleNavigatePageThree = () => {
    navigate('/page-three');
  };

  return  (
      <div className="dashboard-container">
        {/* Top Header */}
        <header className="dashboard-header">

        {/* Navigation Bar */}
        <nav className="header-buttons">
          <Link to="/page-one" className="nav-link">Page One</Link>
          <Link to="/page-two" className="nav-link">Page Two</Link>
        </nav>

          {/* Profile Section */}
          <div className="dashboard-profile">
            <div className="profile-icon">LH</div>
            <div className="profile-label">Profile</div>
          </div>
        </header>

      {/* Main Layout */}
      <div className="dashboard-main">
        <main className="dashboard-content p-4 h-full w-full">
          <div className="dashboard-panels flex flex-row gap-4 h-full">
            {/* Left column */}
            <div className="flex flex-col justify-between w-1/4 h-full">
              <section
                className="kanban-panel flex items-center gap-2 text-[#112D4E] font-[Garamond] text-lg"
                onClick={handleNavigatePageOne}
              >
                <FiAlertCircle />
                You have 7 Alerts!
              </section>
              <section className="kanban-panel">
                <ThreeHourCountdown />
              </section>
              <section className="kanban-panel" onClick={handleNavigatePageOne}>
                View by Warehouse
              </section>
              <section className="kanban-panel" onClick={handleNavigatePageTwo}>
                View the Backlog
              </section>
              <section className="kanban-panel" onClick={handleNavigatePageThree}>
                View the Dock Status
              </section>
              <section className="kanban-panel">View by asdfasdf</section>
              <section className="kanban-panel">View by asdfasdf</section>
            </div>

            {/* Right column */}
            <section className="right-panel flex-1">
              <ShowAlertsResult />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardHomeGrid;
