"use client";

import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
);

interface ChartConfig {
    type: "line" | "bar";
    data: any;
    options?: any;
}

interface DynamicChartProps {
    chart: ChartConfig;
    className?: string;
}

const DynamicChart: React.FC<DynamicChartProps> = ({ chart, className }) => {
    const { type, data, options } = chart;

    if (type === "line") {
        return <Line data={data} options={options} className={className} />;
    } else if (type === "bar") {
        return <Bar data={data} options={options} className={className} />;
    }

    return <p>Unsupported chart type: {type}</p>;
};

export default DynamicChart;
