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
export declare const YearMonthPicker: any;
export default YearMonthPicker;
