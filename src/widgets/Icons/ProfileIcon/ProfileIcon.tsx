import Profile from '../../../shared/assets/icon/profile.svg';

interface ProfileIconProps {
    className?: string
}
export const ProfileIcon = ({className}: ProfileIconProps) => {

    return (
    <img src={Profile} alt="Profile" className={className}/>
    );
};

