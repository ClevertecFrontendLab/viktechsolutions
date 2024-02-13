
import HeartIcon from "../../../shared/assets/icon/heart.svg";
interface HeartProps {
    className?: string
}
export const Heart = ({ className }: HeartProps ) => {

    return (
      <img src={HeartIcon} alt="Heart" className={className}/>
    );
};

