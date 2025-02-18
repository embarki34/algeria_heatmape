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
  const regionData = {
    "DZ01": 15, // Adrar
    "DZ02": 45, // Chlef
    "DZ03": 78, // Laghouat
    "DZ04": 32, // Oum El Bouaghi
    "DZ05": 89, // Batna
    "DZ06": 23, // Béjaïa
    "DZ07": 67, // Biskra
    "DZ08": 91, // Béchar
    "DZ09": 44, // Blida
    "DZ10": 55, // Bouira
    "DZ11": 33, // Tamanrasset
    "DZ12": 77, // Tébessa
    "DZ13": 29, // Tlemcen
    "DZ14": 83, // Tiaret
    "DZ15": 61, // Tizi Ouzou
    "DZ16": 95, // Alger
    "DZ17": 42, // Djelfa
    "DZ18": 68, // Jijel
    "DZ19": 37, // Sétif
    "DZ20": 71, // Saïda
    "DZ21": 49, // Skikda
    "DZ22": 86, // Sidi Bel Abbès
    "DZ23": 53, // Annaba
    "DZ24": 64, // Guelma
    "DZ25": 92, // Constantine
    "DZ26": 41, // Médéa
    "DZ27": 75, // Mostaganem
    "DZ28": 58, // M'Sila
    "DZ29": 84, // Mascara
    "DZ30": 27, // Ouargla
    "DZ31": 96, // Oran
    "DZ32": 39, // El Bayadh
    "DZ33": 72, // Illizi
    "DZ34": 88, // Bordj Bou Arréridj
    "DZ35": 51, // Boumerdès
    "DZ36": 63, // El Tarf
    "DZ37": 81, // Tindouf
    "DZ38": 46, // Tissemsilt
    "DZ39": 93, // El Oued
    "DZ40": 35, // Khenchela
    "DZ41": 69, // Souk Ahras
    "DZ42": 87, // Tipaza
    "DZ43": 54, // Mila
    "DZ44": 76, // Aïn Defla
    "DZ45": 43, // Naâma
    "DZ46": 65, // Aïn Témouchent
    "DZ47": 94, // Ghardaïa
    "DZ48": 57  // Relizane
  };
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
