import React, { useState } from "react";
import "./index.css";

export type TileChartStatus =
  | "success"
  | "warning"
  | "alert"
  | "holiday"
  | "weekend"
  | "fullDayLeave"
  | "halfDayLeave"
  | "halfDayLOP"
  | "wfh"
  | "firstHalfLeave"
  | "secondHalfLeave"
  | "firstHalfLOP"
  | "secondHalfLOP";

export interface TileChartProps {
  data: {
    date: string;
    status?: TileChartStatus;
  }[];
  range?: number;
  onTileHover?: (date: string, status?: TileChartStatus) => void;
  tileText?: string;
}

// Helper function to get the number of days in a month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// date will come in 2024-04-30T18:35:53.575Z ISO format
// so we need to filter out all the months and years and days
const getFormattedDate = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth(); // Month is zero-based
  const day = dateObj.getDate();
  return { year, month, day };
};

type PopupState = {
  x: number;
  y: number;
  content: string;
} | null;

const TileChart: React.FC<TileChartProps> = ({
  data,
  range = 6,
  onTileHover,
  tileText,
}) => {
  const getColor = (status?: TileChartStatus) => {
    switch (status) {
      case "success":
        return "bg-success";
      case "warning":
        return "bg-warning";
      case "alert":
        return "bg-alert";
      case "holiday":
        return "bg-holiday";
      case "weekend":
        return "bg-weekend";
      case "fullDayLeave":
        return "bg-fullDayLeave";
      case "halfDayLeave":
        return "bg-halfDayLeave";
      case "halfDayLOP":
        return "bg-halfDayLOP";
      case "wfh":
        return "bg-wfh";
      case "firstHalfLeave":
        return "bg-firstHalfLeave";
      case "secondHalfLeave":
        return "bg-secondHalfLeave";
      case "firstHalfLOP":
        return "bg-firstHalfLOP";
      case "secondHalfLOP":
        return "bg-secondHalfLOP";
      default:
        return "bg-default";
    }
  };

  const currentDate = new Date();
  const endMonth = currentDate.getMonth();
  const endYear = currentDate.getFullYear();
  let startMonth = endMonth - range;
  let startYear = endYear;
  while (startMonth < 0) {
    startMonth += 12;
    startYear -= 1;
  }

  const groupedData = data.reduce((acc: any, curr: any) => {
    const formattedDate = getFormattedDate(curr.date);
    const key = `${formattedDate.year}-${formattedDate.month}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({ day: formattedDate.day, status: curr.status });
    return acc;
  }, {} as { [key: string]: { day: number; status?: "success" | "warning" | "alert" }[] });

  const allMonths = [];
  let currentMonth = startMonth;
  let currentYear = startYear;

  while (
    currentYear < endYear ||
    (currentYear === endYear && currentMonth <= endMonth)
  ) {
    const key = `${currentYear}-${currentMonth}`;
    allMonths.push(key);
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  const [popup, setPopup] = useState<PopupState>(null);
  const [popupTimeout, setPopupTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    content: string,
    status?: TileChartStatus
  ) => {
    if (popupTimeout) clearTimeout(popupTimeout);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupTimeout(
      setTimeout(() => {
        setPopup({ x: rect.left, y: rect.top - 3, content }); // Position the popup relative to the element
        onTileHover && onTileHover(content, status);
      }, 100)
    ); // Delay before showing the popup
  };

  const handleMouseLeave = () => {
    if (popupTimeout) clearTimeout(popupTimeout);
    setPopupTimeout(
      setTimeout(() => {
        setPopup(null);
        onTileHover && onTileHover("");
      }, 100)
    ); // Delay before hiding the popup
  };
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  return (
    <div className="tile-chart">
      {allMonths.map((key) => {
        const [year, month] = key.split("-").map(Number) as [number, number];
        const daysInMonth = getDaysInMonth(year, month);
        const monthData = groupedData[key] || [];

        return (
          <div key={key} className="month-container">
            <span className="month-lable">
              {new Date(year, month).toLocaleString("default", {
                month: "short",
              })}
            </span>
            <div className="day-tiles">
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const status = monthData.find(
                    (d: any) => d.day === day
                  )?.status;
                  const dateObj = new Date(year, month, day);
                  const date = `${dateObj.getDate()}${getOrdinalSuffix(
                    dateObj.getDate()
                  )} ${dateObj.toLocaleString("default", {
                    month: "short",
                  })} ${String(year).slice(-2)}`;
                  return (
                    <div
                      key={day}
                      className={`day-tile ${getColor(status)}`}
                      onMouseEnter={(event) =>
                        handleMouseEnter(event, date, status)
                      }
                      onMouseLeave={handleMouseLeave}
                    ></div>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
      {popup && (
        <div
          className="popup"
          style={{ position: "fixed", top: popup.y, left: popup.x }}
        >
          {tileText ? tileText : popup.content}
        </div>
      )}
    </div>
  );
};

export default TileChart;
