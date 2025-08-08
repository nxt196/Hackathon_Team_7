import React, { useState } from 'react';
import {FiAlertCircle} from "react-icons/fi";

const AlertTooltip = ({ message = "You have new alerts! Click to dismiss." }) => {
    const [visible, setVisible] = useState(true);

    const handleClick = () => {
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#3F72AF',
                borderLeft: '6px solid #F9F7F7',
                padding: '1rem 1.25rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                fontFamily: 'Garamond, serif',
                color: '#F9F7F7',
                maxWidth: '600px',
                margin: '1rem auto',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease-in-out'
            }}
        >
      <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
        <FiAlertCircle /> {message}
      </span>
        </div>
    );
};

export default AlertTooltip;
