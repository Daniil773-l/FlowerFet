import {useDispatch, useSelector} from 'react-redux';
import s from './Order.module.scss';
import {closeModal} from '../../redux/orderSlice';
import {useCallback, useEffect} from 'react';
import classNames from 'classnames';
export const Order = () => {
  const dispatch = useDispatch();
  const isOrder = false;
  const isOpen = useSelector(state => state.order.isOpen);
  const handlerClose = useCallback(({ target }) => {
    if (target.matches(`.${s.order}`) || target.closest(`.${s.close}`)) {
      dispatch(closeModal());
    }
  }, [dispatch]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      dispatch(closeModal());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;
    return (
      <div className={s.order} onClick={handlerClose}>
        <div className={s.wrapper}>
          {isOrder ?
          <>
            <h2 className={s.title}>Заказ оформлен!</h2>
            <p className={s.id}>Ваш номер заказа:
              971f365a-caa1-4cdb-9446-bad2eff047e1
            </p>
          </>
          :
          <>
          <h2 className={s.title}>Оформить заказ</h2>
            <form className={s.form} id="order">
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные заказчика</legend>
                <div className={s['input-group']}>
                  <input className={s.input}
                    type="text" name="name-buyer" placeholder="Имя" />
                    <input
                    className={s.input} type="text" name="phone-buyer"
                    placeholder="Телефон" /></div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Данные получателя</legend>
                <div className={s['input-group']}>
                  <input className={s.input}
                    type="text" name="name-recipient" placeholder="Имя" />
                    <input
                    className={s.input} type="text" name="phone-recipient"
                    placeholder="Телефон" /></div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <legend className={s.legend}>Адрес</legend>
                <div className={s['input-group']}>
                  <input className={s.input}
                    type="text" name="street" placeholder="Улица" />
                      <input
                    className={classNames(s.input, s.input_min)} type="text" name="house"
                    placeholder="Дом" />
                      <input className={classNames(s.input, s.input_min)}
                    type="text" name="apartment" placeholder="Квартира" />
                  </div>
              </fieldset>
              <fieldset className={s.fieldset}>
                <div className={s.payment}><label className={s['label-radio']}>
                  <input
                      className={s.radio} type="radio" name="payment-online"
                      value="true" defaultChecked />Оплата онлайн</label></div>
                <div className={s.delivery}><label htmlFor="delivery">Доставка
                    01.07</label><input type="hidden" name="delivery-date"
                    value="01.07" />
                  <div className={s['select-wrapper']}><select className={s.select}
                      name="delivery-time" id="delivery">
                      <option value="9-12">с 9:00 до 12:00</option>
                      <option value="12-15">с 12:00 до 15:00</option>
                      <option value="15-18">с 15:00 до 18:00</option>
                      <option value="18-21">с 18:00 до 21:00</option>
                    </select>
                  </div>
                </div>
              </fieldset>
            </form>
            <div className={s.footer}>
              <p className={s.total}>92100&nbsp;₽</p><button className={s.button}
                type="submit" form="order">Заказать</button>
            </div>
          </>
          }
        <button className={s.close} type="button">×</button>
        </div>
      </div>
    );
  }
