import React from 'react';

const ShipmentsSummary = () => {
    const shipmentsDueToday = 6;

    return (
        <div style={{
            backgroundColor: '#112D4E',
            color: '#F9F7F7',
            fontFamily: 'Garamond, serif',
            padding: '2rem 1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
            width: '100%',
        }}>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
            }}>
                Shipments Due Today
            </h2>
            <p style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                margin: 0
            }}>
                {shipmentsDueToday}
            </p>
        </div>
    );
};

export default ShipmentsSummary;
