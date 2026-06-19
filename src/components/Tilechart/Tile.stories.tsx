import type { Meta, StoryObj } from "@storybook/react";
import TileChart, { type TileChartStatus } from "./Tilechart";

const meta = {
  title: "UI/TileChart",
  component: TileChart,
  tags: ["autodocs", "tilechart", "ui"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof TileChart>;

export default meta;

type Story = StoryObj<typeof meta>;

const statuses: TileChartStatus[] = [
  "success", "warning", "alert", "holiday", "weekend",
  "fullDayLeave", "halfDayLeave", "halfDayLOP", "wfh",
  "firstHalfLeave", "secondHalfLeave", "firstHalfLOP", "secondHalfLOP",
];

// Generate data for the past `months` months from today
function generateDummyData(months: number) {
  const data: { date: string; status: TileChartStatus }[] = [];
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth() - months, 1);
  const cur = new Date(start);
  while (cur <= today) {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    data.push({
      date: cur.toISOString().split("T")[0] as string,
      status: status as TileChartStatus,
    });
    cur.setDate(cur.getDate() + 1);
  }
  return data;
}

const data12 = generateDummyData(12);
const data3  = generateDummyData(3);

export const Default: Story = {
  args: {
    data: data12,
    range: 12,
    onTileHover: (date: string, status?: TileChartStatus) => {
      console.log(date, status);
    },
  },
};

export const ThreeMonths: Story = {
  args: {
    data: data3,
    range: 3,
  },
};

export const Empty: Story = {
  args: { data: [], range: 6 },
};
