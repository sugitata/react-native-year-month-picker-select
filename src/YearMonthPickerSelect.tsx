import type { ReactNode } from 'react';
import React, { useState } from 'react';
import type { ViewStyle, TextStyle } from 'react-native';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import type { YearMonth, YearMonthPickerProps } from './YearMonthPicker';
import YearMonthPicker from './YearMonthPicker';

export type YearMonthPickerSelectProps = {
  value?: YearMonth;
  onChange: (value: YearMonth) => void;
  placeholder?: string;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
  startYear?: number;
  endYear?: number;
  yearUnit?: string;
  monthUnit?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  testID?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  containerStyle?: ViewStyle;
  pickerProps?: Partial<YearMonthPickerProps>;
};

const YearMonthPickerSelect = ({
  value,
  onChange,
  placeholder,
  label,
  helperText,
  errorMessage,
  disabled,
  required,
  startYear,
  endYear,
  yearUnit,
  monthUnit,
  icon,
  iconRight,
  iconPosition = 'right',
  testID,
  style,
  inputStyle,
  labelStyle,
  errorStyle,
  containerStyle,
  pickerProps,
}: YearMonthPickerSelectProps) => {
  const [visible, setVisible] = useState(false);

  const renderIcon = (pos: 'left' | 'right' | 'top' | 'bottom') => {
    if (pos === 'left' && icon)
      return <View style={styles.iconLeft}>{icon}</View>;
    if (pos === 'right' && iconRight)
      return <View style={styles.iconRight}>{iconRight}</View>;
    if (pos === 'right' && !iconRight && icon)
      return <View style={styles.iconRight}>{icon}</View>;
    if (pos === 'left' && !icon && iconRight)
      return <View style={styles.iconLeft}>{iconRight}</View>;
    return null;
  };

  // @ts-ignore
  const inputContent = (
    // @ts-ignore
    <TouchableOpacity
      style={[styles.input, disabled && styles.inputDisabled, inputStyle]}
      onPress={() => !disabled && setVisible(true)}
      activeOpacity={0.7}
      disabled={disabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label || placeholder}
      accessibilityState={{ disabled }}
    >
      {iconPosition === 'left' && renderIcon('left')}
      {/* @ts-ignore */}
      <Text
        style={[styles.inputText, !value && styles.placeholder, inputStyle]}
      >
        {value
          ? `${value.year}${yearUnit || ''}${value.month}${monthUnit || ''}`
          : placeholder}
        {required && (
          // @ts-ignore
          <Text style={styles.required}> *</Text>
        )}
      </Text>
      {iconPosition === 'right' && renderIcon('right')}
    </TouchableOpacity>
  );

  // @ts-ignore
  return (
    // @ts-ignore
    <View style={[styles.container, containerStyle, style]}>
      {label && (
        // @ts-ignore
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && (
            // @ts-ignore
            <Text style={styles.required}> *</Text>
          )}
        </Text>
      )}
      {iconPosition === 'top' && renderIcon('top')}
      {inputContent}
      {iconPosition === 'bottom' && renderIcon('bottom')}
      {/* @ts-ignore */}
      <YearMonthPicker
        visible={visible}
        value={value}
        startYear={startYear}
        endYear={endYear}
        yearUnit={yearUnit}
        monthUnit={monthUnit}
        onClose={() => setVisible(false)}
        onConfirm={(v: YearMonth) => {
          onChange(v);
          setVisible(false);
        }}
        {...pickerProps}
      />
      {helperText && !errorMessage && (
        // @ts-ignore
        <Text style={styles.helperText}>{helperText}</Text>
      )}
      {errorMessage && (
        // @ts-ignore
        <Text color="alert" style={[styles.errorText, errorStyle]}>
          {errorMessage}
        </Text>
      )}
    </View>
  ) as any;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  required: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    borderRadius: 4,
    height: 54,
  },
  inputDisabled: {
    backgroundColor: '#F2F2F2',
  },
  inputText: {
    fontSize: 14,
    flex: 1,
  },
  placeholder: {
    color: '#999',
    fontSize: 14,
  },
  errorText: {
    marginTop: 4,
    textAlign: 'left',
    color: '#FF3B30',
    fontSize: 12,
  },
  helperText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

export default YearMonthPickerSelect;
