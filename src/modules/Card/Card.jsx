import classNames from "classnames";
import './card.scss'
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../../redux/cartSlice';
import {useState} from 'react';

export const Card = ({ className, id, img, title, dateDelivery, price }) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const hadlerAddToCart = () => {
    dispatch(addItemToCart({id, img, title, dateDelivery, price}));
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <article className={classNames(className, "card")}>
      <img
        className="card__image"
        src={img}
        alt={title}
      />
      <div className="card__content">
        <h3 className="card__title">{title}</h3>
        <div className="card__footer">
          <p className="card__date-delivery">{dateDelivery}</p>
          <button className="card__button"
            onClick={hadlerAddToCart}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {isHovered ? 'в корзину' : `${price} ₽`}</button>
        </div>
      </div>
    </article>
  );
};
