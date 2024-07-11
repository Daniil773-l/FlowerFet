import classNames from "classnames";
import './card.scss'
import {useDispatch} from 'react-redux';
import {addItemToCart} from '../../redux/cartSlice';
import {useState} from 'react';

export const Card = ({ className, id, img, title, dateDelivery, price }) => {
  const dispatch = useDispatch();
  const [buttonText, setIsHovered] = useState(`${price}\u00A0₽`);
  const hadlerAddToCart = () => {
    console.log('Adding to cart:', { productId: id, quantity: 1 });
    dispatch(addItemToCart({productId: id, quantity: 1}));
  }

  const handleMouseEnter = () => {
    setIsHovered('в корзину');
  };

  const handleMouseLeave = () => {
    setIsHovered(`${price}\u00A0₽`);
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
            {buttonText}</button>
        </div>
      </div>
    </article>
  );
};
