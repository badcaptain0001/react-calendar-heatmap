import React from "react";
import "./index.css";
export interface TileChartProps {
    data: {
        date: string;
        status?: "success" | "warning" | "alert";
    }[];
    range?: 3 | 6 | 12;
    onTileHover?: (date: string, status?: "success" | "warning" | "alert") => void;
    tileText?: string;
}
declare const TileChart: React.FC<TileChartProps>;
export default TileChart;
