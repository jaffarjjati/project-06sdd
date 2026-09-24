import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerCalendarProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
}

const DatePickerCalendar = ({
  selected,
  onChange,
}: DatePickerCalendarProps) => (
  <ReactDatePicker
    selected={selected}
    onChange={onChange}
    inline
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    dateFormat="MM/dd/yyyy"
    calendarClassName="bg-white rounded-3xl! overflow-auto"
  />
);

export default DatePickerCalendar;
