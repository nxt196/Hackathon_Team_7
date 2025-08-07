import React, { useEffect, useState } from "react";
import "common/styles.css";

const ShowPipelineResult = () => {
    const [pipelineData, setPipelineData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        fetch("http://localhost:4000/api/pipeline")
            .then((res) => {
                if (!res.ok) throw new Error("Network response was not ok");
                return res.json();
            })
            .then((data) => {
                setPipelineData(data.production_pipeline);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const sortedPipeline = React.useMemo(() => {
        if (!sortConfig.key) return pipelineData;

        return [...pipelineData].sort((a, b) => {
            const { key, direction } = sortConfig;
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
    }, [pipelineData, sortConfig]);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    if (loading) return <p>Loading production pipeline...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="results-flex">
            <div className="results-text">
                {sortedPipeline.length > 0 ? (
                    <table className="sku-table">
                        <thead>
                        <tr>
                            <th onClick={() => handleSort("pipeline_id")}>Pipeline ID</th>
                            <th onClick={() => handleSort("sku_id")}>SKU ID</th>
                            <th onClick={() => handleSort("status")}>Status</th>
                            <th onClick={() => handleSort("estimated_completion")}>Estimated Completion</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedPipeline.map((item) => (
                            <tr key={item.pipeline_id}>
                                <td>{item.pipeline_id}</td>
                                <td>{item.sku_id}</td>
                                <td>{item.status}</td>
                                <td>{item.estimated_completion}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No pipeline data found.</p>
                )}
            </div>
        </div>
    );
};

export default ShowPipelineResult;
