import './goods.scss';
import {Card} from '../Card/Card';
import {Cart} from '../Cart/Cart'
import {useSelector} from 'react-redux';
import {API_URL} from '../../const';

export const Goods = () => {
  const {items: goods, status: goodsStatus, error, type} = useSelector(state => state.goods);

  let content = null;

  if (goodsStatus === 'loading') { 
    content = <p>Loading...</p>
  }
  if (goodsStatus === 'successed') {
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
  if (goodsStatus === 'failed') { 
    content = <p>Error...</p>
  }

  const getTitle = (type) => {
    switch (type) {
      case 'bouquets': return 'Цветы';
      case 'toys': return 'Игрушки';
      case 'postcards': return 'Открытки';
      default: return 'Товары';
    }
  };

  return (
    <section className="goods">
      <div className="container goods__container">
        <div className="goods__box">
          <h2 className="goods__title">{getTitle(type)}</h2>
          {content}
        </div>

        <Cart />
      </div>
    </section>
  );
}