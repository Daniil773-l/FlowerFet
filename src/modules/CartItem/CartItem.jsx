import s from './CartItem.module.scss'
export const CartItem = ({img, title, price}) => {

  return (
    <>
      <li className={s.item}>
        <img className={s.img}
        src={img}
        alt={title} />
        <h4 className={s.title}>{title}</h4>
        <div className={s.counter}><button
            className={s.btn}>-</button>
            <input
            className={s.input} type="number" max="99" min="0"
            value="1" /><button className={s.btn}>+</button></div>
        <p className="price">{price}&nbsp;₽</p>
        </li>
    </>
  )
}