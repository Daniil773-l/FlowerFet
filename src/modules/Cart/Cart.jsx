import {useDispatch, useSelector} from 'react-redux'
import {CartItem} from '../CartItem/CartItem'
import './cart.scss'
import {toggleCart} from '../../redux/slices/cartSlice'
import {openModal} from '../../redux/slices/orderSlice'
import {useEffect, useRef} from 'react'
export const Cart = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(state => state.cart.isOpen);
  const items = useSelector(state => state.cart.items);
  const totalItemsPrice = Array.isArray(items) ? items.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
  const cartRef = useRef(null);

  const handlerCartClose = () => {
    dispatch(toggleCart());
  }
  const handlerOrderOpen = () => {
    dispatch(openModal());
  }

  useEffect(() => {
    if (isOpen) {
      cartRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <section className="cart cart_open" ref={cartRef}>
      <div className="cart__container">
        <div className="cart__header">
          <h3 className="cart__title">Ваш заказ</h3>

          <button className="cart__close" onClick={handlerCartClose}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="5.70715" width="1" height="25"
                transform="rotate(-45 5 5.70715)" fill="#D17D2F" />
              <rect x="22.6777" y="5" width="1" height="25"
                transform="rotate(45 22.6777 5)" fill="#D17D2F" />
            </svg>
          </button>
        </div>

        <p className="cart__date-delivery">сегодня в 14:00</p>

        <ul className="cart__list">
        {items.map((item) => (
            <CartItem key={item.id} {...item}/>
        ))}
          
        </ul>

        <div className="cart__footer">
          <button className="cart__order-btn" onClick={handlerOrderOpen} disabled={!items.length}>Оформить</button>
          <p className="cart__price cart__price_total">{totalItemsPrice}&nbsp;₸</p>
        </div>
      </div>
    </section>
  )
}
