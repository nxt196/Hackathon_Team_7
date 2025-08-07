import React, { useEffect, useState } from "react";
import "common/styles.css";

const ShowTimesResult = () => {
    const [skus, setSkus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        fetch("http://localhost:4000/api/skus")
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
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (typeof aVal === "string") {
                return sortConfig.direction === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            } else {
                return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
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
                    <table className="sku-table">
                        <thead>
                        <tr>
                            <th onClick={() => handleSort("alert_message")}>Alert</th>
                            <th onClick={() => handleSort("sku_id")}>SKU ID</th>
                            <th onClick={() => handleSort("product_name")}>Product Name</th>
                            <th onClick={() => handleSort("product_number")}>Product Number</th>
                            <th onClick={() => handleSort("destination")}>Destination</th>
                            <th onClick={() => handleSort("remortgage_gallons")}>Gallons</th>
                            <th onClick={() => handleSort("pallets")}>Pallets</th>
                            <th onClick={() => handleSort("weight_lbs")}>Weight (lbs)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedSkus.map((sku) => (
                            <tr key={sku.sku_id} className={sku.alert_message ? "alert-row" : ""}>
                                <td>{sku.sku_id}</td>
                                <td>{sku.product_name}</td>
                                <td>{sku.alert_message || "—"}</td>
                                <td>{sku.product_number}</td>
                                <td>{sku.destination}</td>
                                <td>{sku.remortgage_gallons}</td>
                                <td>{sku.pallets}</td>
                                <td>{sku.weight_lbs}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No SKUs found.</p>
                )}
            </div>
        </div>
    );
};

export default ShowTimesResult;
