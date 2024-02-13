
import CalendarIcon from "../../../shared/assets/icon/calendar.svg";
interface CalendarProps {
    className?: string
}
export const Calendar = ({ className }: CalendarProps ) => {

    return (
      <img src={CalendarIcon} alt="Calendar" className={className}/>
    );
};

