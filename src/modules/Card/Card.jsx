import classNames from "classnames";
import './card.scss'
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {addItemToCart} from '../../redux/thunks/addItemToCart';
import {toggleCart} from '../../redux/slices/cartSlice';

export const Card = ({ className, id, img, title, dateDelivery, price }) => {
  const dispatch = useDispatch();
  const isOpenCart = useSelector(state => state.cart.isOpen);
  const [buttonText, setIsHovered] = useState(`${price}\u00A0₸`);
  const hadlerAddToCart = () => {
    dispatch(addItemToCart({productId: id, quantity: 1}));
    if (!isOpenCart) {
      dispatch(toggleCart());
    }
  }

  const handleMouseEnter = () => {
    setIsHovered('в корзину');
  };

  const handleMouseLeave = () => {
    setIsHovered(`${price}\u00A0₸`);
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
