# TileChart Component

The `TileChart` is a React component that displays data in a tile format, where each tile represents a day. The color of the tile indicates the status of that day, which can be "success", "warning", or "alert".

## Props

- `data`: An array of objects, where each object represents a day and has a `date` and a `status`. The `date` is a string in ISO format, and the `status` can be "success", "warning", or "alert".
- `range`: The number of months to display. It can be 3, 6, or 12. The default is 6.
- `onTileHover`: A callback function that is called when a tile is hovered over. It receives the date and status of the hovered tile.
- `tileText`: A string that is displayed on each tile.

## Usage

```tsx
import TileChart from './TileChart';

const data = [
  { date: '2022-01-01T00:00:00.000Z', status: 'success' },
  { date: '2022-01-02T00:00:00.000Z', status: 'warning' },
  // More data...
];

function App() {
  return (
    <TileChart
      data={data}
      range={6}
      onTileHover={(date, status) => console.log(date, status)}
      tileText="Day"
    />
  );
}

export default App;