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
  yearUnit?: string;
  monthUnit?: string;
  value?: YearMonth;
  onClose: () => void;
  onConfirm: (value: YearMonth) => void;
  title?: string;
  order?: 'asc' | 'desc';
};

const getYears = (
  startYear: number,
  endYear: number,
  order: 'asc' | 'desc',
) => {
  const years = [];
  if (order === 'asc') {
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
  } else {
    for (let i = endYear; i >= startYear; i--) {
      years.push(i);
    }
  }
  return years;
};

const getMonths = () => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

// @ts-ignore
export const YearMonthPicker = forwardRef<any, YearMonthPickerProps>(
  (
    {
      visible,
      startYear = new Date().getFullYear() - 50,
      endYear = new Date().getFullYear() + 10,
      yearUnit,
      monthUnit,
      value,
      order = 'desc',
      onClose,
      onConfirm,
    },
    ref,
  ) => {
    const years = getYears(startYear, endYear, order);
    const months = getMonths();
    const initialYear = value?.year || years[0];
    const initialMonth = value?.month || 1;
    const [selectedYear, setSelectedYear] = useState(initialYear);
    const [selectedMonth, setSelectedMonth] = useState(initialMonth);

    useEffect(() => {
      setSelectedYear(value?.year || years[0]);
      setSelectedMonth(value?.month || 1);
    }, [value, visible, years]);

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
                <Text style={styles.toolBarButtonText}>キャンセル</Text>
              </TouchableOpacity>
              {/* @ts-ignore */}
              <TouchableOpacity
                style={styles.toolBarButton}
                onPress={() =>
                  onConfirm({ year: selectedYear, month: selectedMonth })
                }
              >
                <Text style={styles.toolBarButtonText}>完了</Text>
              </TouchableOpacity>
            </View>
            {/* @ts-ignore */}
            <View style={styles.innerContainer}>
              {/* @ts-ignore */}
              <Picker
                selectedValue={selectedYear}
                style={styles.picker}
                onValueChange={setSelectedYear}
              >
                {years.map((y) => (
                  // @ts-ignore
                  <Picker.Item
                    key={y}
                    label={`${y}${yearUnit || ''}`}
                    value={y}
                  />
                ))}
              </Picker>
              {/* @ts-ignore */}
              <Picker
                selectedValue={selectedMonth}
                style={styles.picker}
                onValueChange={setSelectedMonth}
              >
                {months.map((m) => (
                  // @ts-ignore
                  <Picker.Item
                    key={m}
                    label={`${m}${monthUnit || ''}`}
                    value={m}
                  />
                ))}
              </Picker>
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
