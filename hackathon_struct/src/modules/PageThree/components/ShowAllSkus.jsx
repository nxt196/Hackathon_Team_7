import React, { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import "common/styles.css";

const ShowAllSkus = () => {
    const [skus, setSkus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: "alert_messages", direction: "desc" });

    useEffect(() => {
        fetch("http://localhost:4000/api/allskus")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                setSkus(data.skus);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const sortedSkus = React.useMemo(() => {
        if (!sortConfig.key) return skus;

        return [...skus].sort((a, b) => {
            const { key, direction } = sortConfig;

            if (key === "alert_messages") {
                const priority = (msg) => {
                    if (!msg) return 0;
                    if (msg.includes("Low days of service")) return 2;
                    if (msg.includes("SKU has been staged for over 48 hours")) return 1;
                    return 0;
                };

                const aPriority = priority(a.alert_messages);
                const bPriority = priority(b.alert_messages);

                return direction === "asc"
                    ? aPriority - bPriority
                    : bPriority - aPriority;
            }

            const aVal = a[key];
            const bVal = b[key];

            if (typeof aVal === "string") {
                return direction === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            } else {
                return direction === "asc" ? aVal - bVal : bVal - aVal;
            }
        });
    }, [skus, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    if (loading) return <p>Loading SKUs...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="results-flex">
            <div className="results-text">
                {sortedSkus.length > 0 ? (
                    <>
                        <h1 className="alert-header">All SKUs</h1>
                        <table className="sku-table">
                            <thead>
                            <tr>
                                <th onClick={() => handleSort('sku_id')}>SKU ID</th>
                                <th onClick={() => handleSort('product_name')}>Product Name</th>
                                <th onClick={() => handleSort('product_number')}>Product Number</th>
                                <th onClick={() => handleSort('destination')}>Destination</th>
                                <th onClick={() => handleSort('remortgage_gallons')}>Gallons</th>
                                <th onClick={() => handleSort('pallets')}>Pallets</th>
                                <th onClick={() => handleSort('weight_lbs')}>Weight (lbs)</th>
                                <th onClick={() => handleSort('staging_lane')}>Staging Lane</th>
                                <th onClick={() => handleSort('dock_location')}>Dock Location</th>
                                <th onClick={() => handleSort('days_of_service')}>Days of Service</th>
                                <th onClick={() => handleSort('pipeline_status')}>Pipeline Status</th>
                                <th onClick={() => handleSort('alert_messages')}>Alerts</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedSkus.map((sku) => (
                                <tr key={sku.sku_id} className={sku.alert_messages ? 'alert-row' : ''}>
                                    <td>{sku.sku_id}</td>
                                    <td>{sku.product_name}</td>
                                    <td>{sku.product_number}</td>
                                    <td>{sku.destination}</td>
                                    <td>{sku.remortgage_gallons}</td>
                                    <td>{sku.pallets}</td>
                                    <td>{sku.weight_lbs}</td>
                                    <td>{sku.staging_lane || ''}</td>
                                    <td>{sku.dock_location || ''}</td>
                                    <td>{sku.days_of_service ?? ''}</td>
                                    <td>{sku.pipeline_status || ''}</td>
                                    <td>
                                        {sku.alert_messages ? (
                                            <>
                                                {sku.alert_messages.includes("Low days of service") && (
                                                    <FiAlertTriangle style={{ color: 'red', marginRight: '8px' }} />
                                                )}
                                                {sku.alert_messages.includes("SKU has been staged for over 48 hours") && (
                                                    <FiAlertTriangle style={{ color: 'yellow', marginRight: '8px' }} />
                                                )}
                                                {sku.alert_messages}
                                            </>
                                        ) : ''}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <p>No SKUs found.</p>
                )}
            </div>
        </div>
    );
};

export default ShowAllSkus;
