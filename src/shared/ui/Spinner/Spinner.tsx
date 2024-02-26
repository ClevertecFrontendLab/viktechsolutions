import Lottie from 'react-lottie';

import animationData from '../../spinner/spinner.json';
import './Spinner.scss';

const Spinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className="loading-overlay"
      data-test-id="loader">
      <Lottie
        options={defaultOptions}
        height={400}
        width={400}
        data-test-id="loader"
      />
    </div>
  );

};

export default Spinner;
