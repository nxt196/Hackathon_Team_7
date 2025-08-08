import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllTimes } from 'store/thunks/dashboardhome-thunk';
import { Link, useNavigate } from 'react-router-dom';
import 'common/dashboard.css';
import ShowAlertsResult from 'modules/PageTwo/components/ShowAlertsResult.jsx';
import { FiAlertCircle } from 'react-icons/fi';
import CircleGraph from "modules/DashboardHome/components/CircleGraph.jsx";
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

  return (
    <div className="dashboard-container">
      {/* Top Header */}
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
            Dock Status
          </Link>
        </nav>

        {/* Profile Section */}
        <div className="dashboard-profile">
          <div className="profile-icon">ME</div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="dashboard-main">
        <main className="dashboard-content p-4 h-full w-full">
          <div className="dashboard-panels flex flex-row gap-4 h-full">
            {/* Left column */}
            <div className="flex flex-col justify-between w-1/4 h-full">
              <section
                className="kanban-panel flex items-center text-[#112D4E] font-[Garamond] text-lg"
                onClick={handleNavigatePageOne}
              >
                <CircleGraph />
              </section>
              <section className="kanban-panel">
                <ThreeHourCountdown />
              </section>
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
