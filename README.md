# react-native-year-month-picker-select

A simple and flexible Year/Month picker & select component for React Native.

## Features
- Easy-to-use UI for selecting year and month
- Supports both iOS and Android
- Flexible API: customizable icons, labels, error display, etc.
- No theme or project dependencies

## Installation

```
npm install react-native-year-month-picker-select @react-native-picker/picker
```

## Usage

```tsx
import { YearMonthPickerSelect } from 'react-native-year-month-picker-select';

<YearMonthPickerSelect
  value={value} // { year: 2024, month: 6 }
  onChange={(v) => setValue(v)}
  placeholder="Select year and month"
  label="Year/Month"
  required
  errorMessage={error}
  startYear={2000}
  endYear={2030}
  yearUnit="Year"
  monthUnit="Month"
/>
```

### YearMonthPickerSelect Props
| Name | Type | Description |
|---|---|---|
| value | `{ year: number, month: number }` | Selected year and month |
| onChange | `(value) => void` | Callback when year/month is selected |
| placeholder | `string` | Placeholder text |
| label | `string` | Label text |
| helperText | `string` | Helper text below input |
| errorMessage | `string` | Error message text |
| disabled | `boolean` | Disable input |
| required | `boolean` | Show required mark |
| startYear | `number` | Start year for selection |
| endYear | `number` | End year for selection |
| yearUnit | `string` | Suffix for year (e.g. "Year") |
| monthUnit | `string` | Suffix for month (e.g. "Month") |
| icon | `ReactNode` | Icon on the left |
| iconRight | `ReactNode` | Icon on the right |
| iconPosition | `'left' | 'right' | 'top' | 'bottom'` | Icon position |
| testID | `string` | Test ID |
| style | `ViewStyle` | Root view style |
| inputStyle | `TextStyle` | Input style |
| labelStyle | `TextStyle` | Label style |
| errorStyle | `TextStyle` | Error style |
| containerStyle | `ViewStyle` | Container style |
| pickerProps | `Partial<YearMonthPickerProps>` | Additional props for modal picker |

### YearMonthPicker Props
| Name | Type | Description |
|---|---|---|
| visible | `boolean` | Modal visibility |
| value | `{ year: number, month: number }` | Selected year and month |
| onClose | `() => void` | Callback when modal is closed |
| onConfirm | `(value) => void` | Callback when year/month is confirmed |
| startYear | `number` | Start year for selection |
| endYear | `number` | End year for selection |
| yearUnit | `string` | Suffix for year |
| monthUnit | `string` | Suffix for month |
| title | `string` | Modal title |
| order | `'asc' | 'desc'` | Year order |

## License
MIT 