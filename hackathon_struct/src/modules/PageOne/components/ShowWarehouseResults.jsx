import React, { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import '../../../common/styles.css';

const ShowWarehouseResults = () => {
  const [dockStatus, setDockStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'days_of_service', direction: 'desc' });

  useEffect(() => {
    fetch('http://localhost:4000/api/dock-status')
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data) => {
          setDockStatus(data.dockStatus);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
  }, []);

  const sortedDockStatus = React.useMemo(() => {
    if (!sortConfig.key) return dockStatus;

    return [...dockStatus].sort((a, b) => {
      const { key, direction } = sortConfig;
      const aVal = a[key];
      const bVal = b[key];

      if (typeof aVal === 'string') {
        return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
    });
  }, [dockStatus, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (loading) return <p>Loading dock status...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div className="results-flex">
        <div className="results-text">
          {sortedDockStatus.length > 0 ? (
              <h1 className="alert-header">Warehouse Dock Status
                <table className="sku-table">
                  <thead>
                  <tr>
                    <th onClick={() => handleSort('dock_id')}>Dock ID</th>
                    <th onClick={() => handleSort('sku_id')}>SKU ID</th>
                    <th onClick={() => handleSort('staging_lane')}>Staging Lane</th>
                    <th onClick={() => handleSort('days_of_service')}>Days of Service</th>
                    <th onClick={() => handleSort('dock_location')}>Dock Location</th>
                  </tr>
                  </thead>
                  <tbody>
                  {sortedDockStatus.map((dock) => (
                      <tr
                          key={`${dock.dock_id}-${dock.sku_id}`}
                          className={dock.days_of_service < 2 ? 'alert-row' : ''}
                      >
                        {/* Optional alert icon logic */}
                        {/* <td>
                      {dock.days_of_service < 2 ? (
                        <FiAlertTriangle style={{ color: 'red', marginRight: '8px' }} />
                      ) : null}
                      {dock.dock_id}
                    </td> */}
                        <td>{dock.dock_id}</td>
                        <td>{dock.sku_id}</td>
                        <td>{dock.staging_lane}</td>
                        <td>{dock.days_of_service}</td>
                        <td>{dock.dock_location}</td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </h1>
          ) : (
              <p>No dock status records found.</p>
          )}
        </div>
      </div>
  );
};

export default ShowWarehouseResults;
