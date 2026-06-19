import React from 'react';

type TileChartStatus = "success" | "warning" | "alert" | "holiday" | "weekend" | "fullDayLeave" | "halfDayLeave" | "halfDayLOP" | "wfh" | "firstHalfLeave" | "secondHalfLeave" | "firstHalfLOP" | "secondHalfLOP";
interface TileChartProps {
    data: {
        date: string;
        status?: TileChartStatus;
    }[];
    range?: number;
    onTileHover?: (date: string, status?: TileChartStatus) => void;
    tileText?: string;
}
declare const TileChart: React.FC<TileChartProps>;

export { TileChart };
