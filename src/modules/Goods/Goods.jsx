import './goods.scss';
import {Card} from '../Card/Card';
import {Cart} from '../Cart/Cart'
import {useSelector} from 'react-redux';
import {API_URL} from '../../const';

export const Goods = ({title}) => {
  const {items: goods, status: goodsStatus, error} = useSelector(state => state.goods);

  let content = null;

  if (goodsStatus === 'loading') { 
    content = <p>Loading...</p>
  }
  if (goodsStatus === 'successed' && goods.length) {
    content = (
      <ul className="goods__list">
        {goods.map((item) => (
          <li key={item.id} className="goods__item">
            <Card className='goods__card' 
            id={item.id}
            img={`${API_URL}${item.photoUrl}`}
            title={item.name}
            dateDelivery="cегодня в 14:00"
            price={item.price}
            />
          </li>
        ))}
      </ul>
    )
  }
  if (!goods.length) {
    content = <p>По вашему запросу ничего не найдено</p>
  }
  if (goodsStatus === 'failed') { 
    content = <p>{error}</p>
  }

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">{title}</h2>
          {content}
        </div>
        <Cart />
      </div>
    </section>
  );
}