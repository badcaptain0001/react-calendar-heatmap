import React from "react";
import "./index.css";
export type TileChartStatus = "success" | "warning" | "alert" | "holiday" | "weekend" | "fullDayLeave" | "halfDayLeave" | "halfDayLOP" | "wfh" | "firstHalfLeave" | "secondHalfLeave" | "firstHalfLOP" | "secondHalfLOP";
export interface TileChartProps {
    data: {
        date: string;
        status?: TileChartStatus;
    }[];
    range?: number;
    onTileHover?: (date: string, status?: TileChartStatus) => void;
    tileText?: string;
}
declare const TileChart: React.FC<TileChartProps>;
export default TileChart;
