import React from 'react';

interface TileChartProps {
    data: {
        date: string;
        status?: "success" | "warning" | "alert";
    }[];
    range?: 3 | 6 | 12;
    onTileHover?: (date: string, status?: "success" | "warning" | "alert") => void;
    tileText?: string;
}
declare const TileChart: React.FC<TileChartProps>;

export { TileChart };
