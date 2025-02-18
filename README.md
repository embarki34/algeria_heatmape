# Heatmap Component Documentation

## Overview
The Heatmap component is a React component that creates an interactive heatmap visualization using an SVG map of Algeria. It displays data intensity across different regions using color gradients and provides interactive tooltips.

## Features
- Responsive SVG rendering
- Interactive tooltips on hover
- Smooth animations and transitions 
- Customizable color ranges
- Accessibility support with ARIA labels
- Region highlighting on hover

## Installation

Ensure you have React and D3 installed in your project before using this component:

```sh
npm install d3 react
```
#usage
Import and use the Heatmap component in your project:
```
import Heatmap from "./Heatmap";

const data = {
  region1: 100,
  region2: 300,
  region3: 50,
};

<Heatmap data={data} width="600px" height="400px" />;
```
# Props Interface
```
interface HeatmapProps {
  data: Record<string, number>;
  width?: string | number;
  height?: string | number;
  colorRange?: [string, string];
}
```

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `Record<string, number>` | Yes | - | An object mapping region IDs to numerical values |
| `width` | `string \| number` | No | '100%' | Width of the heatmap component |
| `height` | `string \| number` | No | '100%' | Height of the heatmap component |
| `colorRange` | `[string, string]` | No | ['#ffedea', '#ff5233'] | Array of two colors defining the gradient range |

## Methods

### `getColor(value: number): string`
Returns the interpolated color for a given value based on the color range and data extent.

### `handleMouseOver(event: MouseEvent, region: string): void`
Handles mouse hover events to display tooltips and highlight regions.

## Examples
```jsx
// Basic usage
<Heatmap data={regionData} />
// Custom dimensions and colors
<Heatmap
data={regionData}
width={800}
height={600}
colorRange={['#ffffff', '#000000']}
/>
```
## Accessibility

The component implements ARIA labels for each region and supports keyboard navigation. Regions can be focused using the tab key and tooltips are readable by screen readers.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- React 16.8+
- D3.js 7+
