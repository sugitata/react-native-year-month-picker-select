import type { ReactNode } from 'react';
import React from 'react';
type PickerProps = {
    selectedValue: string | number;
    onValueChange: (value: string | number) => void;
    children: ReactNode;
    style?: any;
};
type PickerItemProps = {
    label: string;
    value: string | number;
};
declare const Picker: {
    ({ selectedValue, onValueChange, children, style, }: PickerProps): React.JSX.Element;
    Item({ label, value }: PickerItemProps): React.JSX.Element;
};
export { Picker };
export default Picker;
