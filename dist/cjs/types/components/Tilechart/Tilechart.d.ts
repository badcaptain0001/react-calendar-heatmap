import React from "react";
import "./index.css";
export interface TileChartProps {
    data: {
        date: string;
        status?: "success" | "warning" | "alert" | "holiday" | "weekend" | "fullDayLeave" | "halfDayLeave";
    }[];
    range?: 3 | 6 | 12;
    onTileHover?: (date: string, status?: "success" | "warning" | "alert" | "holiday" | "weekend" | "fullDayLeave" | "halfDayLeave") => void;
    tileText?: string;
}
declare const TileChart: React.FC<TileChartProps>;
export default TileChart;
