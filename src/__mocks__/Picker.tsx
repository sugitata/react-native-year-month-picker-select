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

const Picker = ({
  selectedValue,
  onValueChange,
  children,
  style,
}: PickerProps) => (
  <select
    value={selectedValue}
    onChange={(e) => onValueChange(e.target.value)}
    style={style}
  >
    <>
      {React.Children.toArray(children).map((child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, {
              value: String((child as any).props.value),
            })
          : child,
      )}
    </>
  </select>
);

Picker.Item = ({ label, value }: PickerItemProps) => (
  <option value={String(value)}>{label}</option>
);

export { Picker };
export default Picker;
