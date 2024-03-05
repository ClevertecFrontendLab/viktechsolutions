import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { Rate } from 'antd';

import Avatar from '../../../../shared/assets/images/avatar.png';
import './ReviewItem.scss';

interface ReviewItemProps {
    result: {
        imageSrc?: string;
        fullName?: string;
        rating?: number;
        createdAt?: string;
        message?: string;
    };
}

export const ReviewItem = ({ result }: ReviewItemProps) => {
  // const { result } = props;
  const customCharacter = (starProps: {
        index: number
    }) => {
    return result.rating && result.rating > starProps.index ? <StarFilled

      style={{ color: '#faad14', fontSize: '13px' }}/> :
      <StarTwoTone
        twoToneColor="#faad14"
        style={{ fontSize: '13px' }}
      />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div
      className="review-item">
      <div className="box">
        <div className="avatar">
          <img
            src={result.imageSrc || Avatar}
            alt="avatar"/>
          <div className="name">
            {result.fullName ? result.fullName.split(' ').map((word, index) => (
              <span
                key={index}
                style={{ display: 'block' }}>{word}</span>
            )) : 'Аноним'}
          </div>
        </div>
      </div>
      <div className="text-box">
        <div className="rating">
          <div>
            <Rate
              character={customCharacter}
              value={result.rating}
            />
          </div>
          <div>
            {formatDate(result.createdAt)}
          </div>
        </div>
        <div className="message">
          {result.message}
        </div>
      </div>
    </div>
  );
};
