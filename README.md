# React Calendar Heatmap

`@riishabh/react-calender-heatmap` is a lightweight React component that renders a contribution-style calendar heatmap. It ships with sensible defaults, supports custom day states, and now works seamlessly in both React 18 and React 19 applications.

## Highlights
- ✅ **React 18 & 19 support** with strict TypeScript typings
- 🧩 **Plug-and-play component** — no context or provider setup required
- 🎨 **Customizable color palette** for different attendance or productivity states
- 🧪 **Storybook & Testing Library** integration for rapid UI iteration

## Installation

```bash
npm install @riishabh/react-calender-heatmap
# or
yarn add @riishabh/react-calender-heatmap
# or
pnpm add @riishabh/react-calender-heatmap
```

### Peer dependencies
- `react`: `^18.2.0 || ^19.0.0`
- `react-dom`: match your React version

## Quick Start

```tsx
import { TileChart } from '@riishabh/react-calender-heatmap';

const data = [
  { date: '2024-01-01', status: 'success' },
  { date: '2024-01-02', status: 'warning' },
  { date: '2024-01-03', status: 'holiday' },
];

export function AttendanceHeatmap() {
  return (
    <TileChart
      data={data}
      range={6}
      tileText="Day"
      onTileHover={(label, status) => {
        if (status) {
          console.log(`${label} → ${status}`);
        }
      }}
    />
  );
}
```

Importing the package automatically injects the default stylesheet, so the heatmap is ready to render without additional configuration.

## Data shape

Each entry in the `data` array corresponds to a day.

```ts
type TileState =
  | 'success'
  | 'warning'
  | 'alert'
  | 'holiday'
  | 'weekend'
  | 'fullDayLeave'
  | 'halfDayLeave';

interface TileDataPoint {
  date: string;   // any ISO-8601 string parsable by new Date()
  status?: TileState;
}
```

## Component props

| Prop          | Type                                                                                   | Default | Description                                                                                             |
|---------------|----------------------------------------------------------------------------------------|---------|---------------------------------------------------------------------------------------------------------|
| `data`        | `TileDataPoint[]`                                                                      | —       | Source data for the heatmap. Dates should be parseable by the browser's `Date` constructor.             |
| `range`       | `3 \| 6 \| 12`                                                                         | `6`     | Number of months (backwards from the current month) to render.                                          |
| `onTileHover` | `(label: string, status?: TileState) => void`                                          | —       | Callback fired after a tile has been hovered long enough for the tooltip to appear. Empty string clears.|
| `tileText`    | `string`                                                                               | —       | Optional static string shown in the tooltip instead of the generated date string.                       |

## Visual states

Use one of the built-in `status` values to map data to colors. Override the classes below to match your design system.

| Status          | Class             | Default styling (excerpt)                             |
|-----------------|-------------------|--------------------------------------------------------|
| `success`       | `.bg-success`     | green background, subtle border                       |
| `warning`       | `.bg-warning`     | amber background                                      |
| `alert`         | `.bg-alert`       | red background                                        |
| `holiday`       | `.bg-holiday`     | blue background                                       |
| `weekend`       | `.bg-weekend`     | lilac background                                      |
| `fullDayLeave`  | `.bg-fullDayLeave`| burnt orange background                               |
| `halfDayLeave`  | `.bg-halfDayLeave`| magenta background                                    |
| _unset_         | `.bg-default`     | neutral gray background                               |

### Customizing the palette

Create a global stylesheet (or use CSS modules) to override the classes:

```css
:root {
  --heatmap-success: #00a86b;
}

.bg-success {
  background-color: var(--heatmap-success);
  border-color: rgba(0, 168, 107, 0.45);
}
```

Because the component injects its CSS at runtime, make sure your overrides load after the component (for example, in your app-level stylesheet).

## Tooltip & interactions

Tile hover events emit a human-friendly label (e.g. `3rd Jan 24`) and the resolved status. Use this to show additional UI (like side panels or analytics) or to hook into analytics events.

```tsx
<TileChart
  data={data}
  onTileHover={(label, status) => track('heatmap-hover', { label, status })} 
/>
```

## TypeScript support

All exports ship with `.d.ts` files generated from the source TypeScript. If you need to narrow the `status` union for your own domain, extend the provided `TileChartProps`:

```ts
import type { TileChartProps } from '@riishabh/react-calender-heatmap';

type CustomTileState = TileChartProps['data'][number]['status'] | 'remote';
```

## Development & contributing

```bash
npm install        # install dependencies
npm run storybook  # launch interactive component docs at http://localhost:6006
npm run build      # create the production-ready bundles in /dist
npm test           # (optional) run Jest in watch mode
```

Feel free to open issues or pull requests on [GitHub](https://github.com/badcaptain0001/react-calendar-heatmap) with feature ideas or fixes.

## License

MIT © Rishabh Sharma
