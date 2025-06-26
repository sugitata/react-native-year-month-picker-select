import { Picker } from '@react-native-picker/picker';
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';

export type YearMonth = {
  year: number;
  month: number;
};

export type YearMonthPickerProps = {
  visible: boolean;
  startYear?: number;
  endYear?: number;
  months?: { label: string; value: number }[];
  value?: YearMonth;
  yearMonthOrder?: 'year-month' | 'month-year';
  order?: 'asc' | 'desc';
  cancelText?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm: (value: YearMonth) => void;
};

const getYears = (
  startYear: number,
  endYear: number,
  order: 'asc' | 'desc',
): { label: string; value: number }[] => {
  const years = [];
  if (order === 'asc') {
    for (let i = startYear; i <= endYear; i++) {
      years.push({ label: String(i), value: i });
    }
  } else {
    for (let i = endYear; i >= startYear; i--) {
      years.push({ label: String(i), value: i });
    }
  }
  return years;
};

export const defaultMonths = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

// @ts-ignore
export const YearMonthPicker = forwardRef<any, YearMonthPickerProps>(
  (
    {
      visible,
      months,
      startYear = new Date().getFullYear() - 50,
      endYear = new Date().getFullYear() + 10,
      value,
      order = 'desc',
      cancelText = 'Cancel',
      confirmText = 'Confirm',
      yearMonthOrder = 'year-month',
      onClose,
      onConfirm,
    },
    ref,
  ) => {
    const yearsList = getYears(startYear, endYear, order);
    const monthsList = months || defaultMonths;
    const initialYear = value?.year || yearsList[0].value;
    const initialMonth = value?.month || monthsList[0].value;
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);

    useEffect(() => {
      if (visible) {
        setSelectedYear(value?.year || yearsList[0].value);
        setSelectedMonth(value?.month || monthsList[0].value);
      }
    }, [value, visible]);

    useImperativeHandle(ref, () => ({
      reset: () => {
        setSelectedYear(initialYear);
        setSelectedMonth(initialMonth);
      },
    }));

    if (!visible) return null;

    // @ts-ignore
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        {/* @ts-ignore */}
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={1}
          onPress={onClose}
        >
          {/* @ts-ignore */}
          <TouchableOpacity activeOpacity={1} style={styles.outerContainer}>
            {/* @ts-ignore */}
            <View style={styles.toolBar}>
              {/* @ts-ignore */}
              <TouchableOpacity style={styles.toolBarButton} onPress={onClose}>
                <Text style={styles.toolBarButtonText}>{cancelText}</Text>
              </TouchableOpacity>
              {/* @ts-ignore */}
              <TouchableOpacity
                style={styles.toolBarButton}
                onPress={() =>
                  onConfirm({ year: selectedYear, month: selectedMonth })
                }
              >
                <Text style={styles.toolBarButtonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
            {/* @ts-ignore */}
            <View style={styles.innerContainer}>
              {yearMonthOrder === 'year-month' && (
                <>
                  {/* @ts-ignore */}
                  <Picker
                    selectedValue={selectedYear}
                    style={styles.picker}
                    onValueChange={setSelectedYear}
                  >
                    {yearsList.map((y) => (
                      // @ts-ignore
                      <Picker.Item
                        key={y.value}
                        label={y.label}
                        value={y.value}
                      />
                    ))}
                  </Picker>
                  {/* @ts-ignore */}
                  <Picker
                    selectedValue={selectedMonth}
                    style={styles.picker}
                    onValueChange={setSelectedMonth}
                  >
                    {monthsList.map((m) => (
                      // @ts-ignore
                      <Picker.Item
                        key={m.value}
                        label={m.label}
                        value={m.value}
                      />
                    ))}
                  </Picker>
                </>
              )}
              {yearMonthOrder === 'month-year' && (
                <>
                  {/* @ts-ignore */}
                  <Picker
                    selectedValue={selectedMonth}
                    style={styles.picker}
                    onValueChange={setSelectedMonth}
                  >
                    {monthsList.map((m) => (
                      // @ts-ignore
                      <Picker.Item
                        key={m.value}
                        label={m.label}
                        value={m.value}
                      />
                    ))}
                  </Picker>
                  {/* @ts-ignore */}
                  <Picker
                    selectedValue={selectedYear}
                    style={styles.picker}
                    onValueChange={setSelectedYear}
                  >
                    {yearsList.map((y) => (
                      // @ts-ignore
                      <Picker.Item
                        key={y.value}
                        label={y.label}
                        value={y.value}
                      />
                    ))}
                  </Picker>
                </>
              )}
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  },
) as any;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  outerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
  },
  toolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#EBECED',
  },
  toolBarButton: {
    padding: 8,
  },
  toolBarButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  picker: {
    flex: 1,
  },
});

export default YearMonthPicker;
