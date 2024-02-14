import { useEffect } from 'react';

const useNavbarHeight = () => {
    useEffect(() => {
        const updateNavbarHeight = () => {
            const navbar = document.querySelector('.navbar');
            const height = navbar ? navbar.offsetHeight : 0;
            document.documentElement.style.setProperty('--navbar-height', `${height}px`);
        };

        updateNavbarHeight();

        window.addEventListener('resize', updateNavbarHeight);

        // Очистка: удаляем обработчики событий при размонтировании компонента
        return () => window.removeEventListener('resize', updateNavbarHeight);
    }, []);
};

export default useNavbarHeight;
