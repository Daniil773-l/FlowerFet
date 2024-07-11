import {useDispatch} from 'react-redux'
import {Filter} from './modules/Filter/Filter'
import {Footer} from './modules/Footer/Footer'
import {Goods} from './modules/Goods/Goods'
import {Header} from './modules/Header/Header'
import {Hero} from './modules/Hero/Hero'
import {Order} from './modules/Order/Order'
import {Subscribe} from './modules/Subscribe/Subscribe'
import {useEffect, useRef, useState} from 'react'
import {fetchCart, registerCart} from './redux/cartSlice'

export const App = () => {
  const dispatch = useDispatch();

  const [titleGoods, setTitleGoods] = useState('');

  const goodsRef = useRef(null);

  const scrollToGoods = () => {
    if (goodsRef.current) {
      goodsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const initializeCart = async () => {
      await dispatch(registerCart());
      await dispatch(fetchCart());
    };
    initializeCart();
  }, [dispatch]);

  return (
    <>
      <Header setTitleGoods={setTitleGoods} scrollToGoods={scrollToGoods}/>

      <main>
        <Hero />

        <Filter setTitleGoods={setTitleGoods}/>

        <Goods title={titleGoods} goodsRef={goodsRef}/>

        <Subscribe />
      </main>

      <Footer />

      <Order />
    </>
  )
}