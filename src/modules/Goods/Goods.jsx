import './goods.scss';
import {Card} from '../Card/Card';
import {Cart} from '../Cart/Cart'
import {useSelector} from 'react-redux';
import {API_URL} from '../../const';
import {Preload} from '../Preload/Preload';

export const Goods = ({title}) => {
  const {items: goods, status: goodsStatus, error} = useSelector(state => state.goods);

  let content = null;

  if (goodsStatus === 'loading') {
    content = <Preload />;
    // <div className='spinnerBox'>
    //   <div className='spinner'></div>
    // </div>
  } else if (goodsStatus === 'successed' && goods.length) {
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
  } else if (goodsStatus === 'successed' && !goods.length) {
    content = <p className="goods__not-found">По вашему запросу ничего не найдено</p>;
  } else if (goodsStatus === 'failed') { 
    content = <p>{error}</p>
  }

  return (
    <section className="goods"
    style={{position: goodsStatus === 'loading' ? 'relative' : 'static'}}>
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