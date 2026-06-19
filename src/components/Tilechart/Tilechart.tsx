import React, { useState, useRef, useEffect } from "react";
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

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFormattedDate = (date: string) => {
  const dateObj = new Date(date);
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    day: dateObj.getDate(),
  };
};

const getColor = (status?: TileChartStatus): string => {
  switch (status) {
    case "success":        return "bg-success";
    case "warning":        return "bg-warning";
    case "alert":          return "bg-alert";
    case "holiday":        return "bg-holiday";
    case "weekend":        return "bg-weekend";
    case "fullDayLeave":   return "bg-fullDayLeave";
    case "halfDayLeave":   return "bg-halfDayLeave";
    case "halfDayLOP":     return "bg-halfDayLOP";
    case "wfh":            return "bg-wfh";
    case "firstHalfLeave": return "bg-firstHalfLeave";
    case "secondHalfLeave":return "bg-secondHalfLeave";
    case "firstHalfLOP":   return "bg-firstHalfLOP";
    case "secondHalfLOP":  return "bg-secondHalfLOP";
    default:               return "bg-default";
  }
};

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
};

type PopupState = { x: number; y: number; content: string } | null;

const TileChart: React.FC<TileChartProps> = ({
  data,
  range = 6,
  onTileHover,
  tileText,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [popup, setPopup] = useState<PopupState>(null);
  const [popupTimeout, setPopupTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  // Build month window using JS Date auto-wrapping for negative months
  const today = new Date();
  const endMonth = today.getMonth();
  const endYear = today.getFullYear();
  const startRaw = new Date(today.getFullYear(), today.getMonth() - range, 1);
  const startMonth = startRaw.getMonth();
  const startYear = startRaw.getFullYear();

  // Group data by "YYYY-M" key
  const groupedData = data.reduce((acc: Record<string, { day: number; status?: TileChartStatus }[]>, curr) => {
    const { year, month, day } = getFormattedDate(curr.date);
    const key = `${year}-${month}`;
    if (!acc[key]) acc[key] = [];
    acc[key]!.push({ day, status: curr.status });
    return acc;
  }, {});

  // Build ordered list of all months in the window
  const allMonths: { year: number; month: number }[] = [];
  let cur = new Date(startYear, startMonth, 1);
  const end = new Date(endYear, endMonth, 1);
  while (cur <= end) {
    allMonths.push({ year: cur.getFullYear(), month: cur.getMonth() });
    cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
  }

  // Auto-scroll to the latest (rightmost) month on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    content: string,
    status?: TileChartStatus
  ) => {
    if (popupTimeout) clearTimeout(popupTimeout);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupTimeout(
      setTimeout(() => {
        setPopup({ x: rect.left, y: rect.top - 3, content });
        onTileHover?.(content, status);
      }, 100)
    );
  };

  const handleMouseLeave = () => {
    if (popupTimeout) clearTimeout(popupTimeout);
    setPopupTimeout(
      setTimeout(() => {
        setPopup(null);
        onTileHover?.("");
      }, 100)
    );
  };

  return (
    <div className="tile-chart-wrapper" ref={scrollRef}>
      <div className="tile-chart">
        {allMonths.map(({ year, month }, idx) => {
          const key = `${year}-${month}`;
          const daysInMonth = getDaysInMonth(year, month);
          const monthData = groupedData[key] ?? [];
          const isFirstMonthOfYear = month === 0 || idx === 0;

          return (
            <React.Fragment key={key}>
              {isFirstMonthOfYear && (
                <div className="year-separator">
                  <span className="year-label">{year}</span>
                </div>
              )}
              <div className="month-container">
                <span className="month-lable">
                  {new Date(year, month).toLocaleString("default", { month: "short" })}
                </span>
                <div className="day-tiles">
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const status = monthData.find((d) => d.day === day)?.status;
                    const dateObj = new Date(year, month, day);
                    const dateLabel = `${dateObj.getDate()}${getOrdinalSuffix(dateObj.getDate())} ${dateObj.toLocaleString("default", { month: "short" })} ${String(year).slice(-2)}`;
                    return (
                      <div
                        key={day}
                        className={`day-tile ${getColor(status)}`}
                        onMouseEnter={(e) => handleMouseEnter(e, dateLabel, status)}
                        onMouseLeave={handleMouseLeave}
                      />
                    );
                  })}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {popup && (
        <div className="popup" style={{ position: "fixed", top: popup.y, left: popup.x }}>
          {tileText ? tileText : popup.content}
        </div>
      )}
    </div>
  );
};

export default TileChart;
