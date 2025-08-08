import React from 'react';

const CircleGraph = ({ size = 200, strokeWidth = 40 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const data = [
        { value: 4, color: '#3F72AF', label: 'Backlog' },
        { value: 3, color: '#DBE2EF', label: 'In Production' },
        { value: 3, color: '#112D4E', label: 'Ready to Ship' },
    ];

    const total = data.reduce((sum, item) => sum + item.value, 0);

    let offset = 0;

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Garamond, serif' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
                    {data.map((item, index) => {
                        const percentage = item.value / total;
                        const dash = percentage * circumference;
                        const circle = (
                            <circle
                                key={index}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth={strokeWidth}
                                strokeDasharray={`${dash} ${circumference - dash}`}
                                strokeDashoffset={offset}
                            />
                        );
                        offset -= dash;
                        return circle;
                    })}
                </g>
            </svg>
            <div style={{ marginTop: '1rem' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {data.map((item, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <div
                                style={{
                                    width: '16px',
                                    height: '16px',
                                    backgroundColor: item.color,
                                    marginRight: '8px',
                                    borderRadius: '2px',
                                }}
                            />
                            <span style={{ color: 'white' }}>{item.label}: {item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CircleGraph;
