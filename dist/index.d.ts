import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary";
}
declare const Button: React.FC<ButtonProps>;

declare function Input(): react_jsx_runtime.JSX.Element;

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

export { Button, Input, TileChart };
