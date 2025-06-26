import React, { useState } from 'react';
import { YearMonthPicker } from '../YearMonthPicker';

export default {
  title: 'YearMonthPicker',
  component: YearMonthPicker,
};

export const Default = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<
    { year: number; month: number } | undefined
  >(undefined);
  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setVisible(true)}>年月を選択</button>
      <div style={{ marginTop: 16 }}>
        選択値: {value ? `${value.year}年${value.month}月` : '未選択'}
      </div>
      <YearMonthPicker
        visible={visible}
        value={value}
        onClose={() => setVisible(false)}
        onConfirm={(v) => {
          setValue(v);
          setVisible(false);
        }}
      />
    </div>
  );
};

export const WithInitialValue = () => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<{ year: number; month: number }>({
    year: 2020,
    month: 5,
  });
  return (
    <div style={{ padding: 40 }}>
      <button onClick={() => setVisible(true)}>年月を選択</button>
      <div style={{ marginTop: 16 }}>
        選択値: {value ? `${value.year}年${value.month}月` : '未選択'}
      </div>
      <YearMonthPicker
        visible={visible}
        value={value}
        onClose={() => setVisible(false)}
        onConfirm={(v) => {
          setValue(v);
          setVisible(false);
        }}
      />
    </div>
  );
};
