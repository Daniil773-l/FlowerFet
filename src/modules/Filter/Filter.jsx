import {useState} from 'react';
import {Choices} from '../Choices/Choices'
import './filter.scss'
import {useDispatch} from 'react-redux';
import {fetchGoods} from '../../redux/goodsSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const [openChoice, setOpenChoice]= useState(null);
  const [selectedType, setSelectedType] = useState('bouquets');
  const handleTypeChange = (event) => {
    const type = event.target.value;
    setSelectedType(type);
    dispatch(fetchGoods({ type }));
  };
  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  }
  return (
    <section className="filter">
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            <input
              className="filter__radio"
              type="radio"
              name="type"
              value="bouquets"
              id="flower"
              defaultChecked
              onChange={handleTypeChange}
            />
            <label
              className="filter__label filter__label_flower"
              htmlFor="flower"
            >
              Цветы
            </label>

            <input
              className="filter__radio"
              type="radio"
              name="type"
              value="toys"
              id="toys"
              onChange={handleTypeChange}
            />
            <label
              className="filter__label filter__label_toys"
              htmlFor="toys"
            >
              Игрушки
            </label>

            <input
              className="filter__radio"
              type="radio"
              name="type"
              value="postcards"
              id="postcard"
              onChange={handleTypeChange}
            />
            <label
              className="filter__label filter__label_postcard"
              htmlFor="postcard"
            >
              Открытки
            </label>
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices buttonLabel="Цена"
            className="filter__choices_type"
            isOpen={openChoice === 0}
            onToggle={() => handleChoicesToggle(0)}>
              <fieldset className="filter__price">
                <input
                  className="filter__input-price"
                  type="text"
                  name="minPrice"
                  placeholder="от"
                />
                <input
                  className="filter__input-price"
                  type="text"
                  name="maxPrice"
                  placeholder="до"
                />
              </fieldset>
            </Choices>

            <Choices
              buttonLabel="Тип
                товара"
              className="filter__choices_type"
              isOpen={openChoice === 1}
              onToggle={() => handleChoicesToggle(1)}
            >
              <ul className="filter__type-list">
                <li className="filter__type-item">
                  <button
                    className="filter__type-button"
                    type="button"
                  >
                    Монобукеты
                  </button>
                </li>
                <li className="filter__type-item">
                  <button
                    className="filter__type-button"
                    type="button"
                  >
                    Авторские букеты
                  </button>
                </li>
                <li className="filter__type-item">
                  <button
                    className="filter__type-button"
                    type="button"
                  >
                    Цветы в коробке
                  </button>
                </li>
                <li className="filter__type-item">
                  <button
                    className="filter__type-button"
                    type="button"
                  >
                    Цветы в корзине
                  </button>
                </li>
                <li className="filter__type-item">
                  <button
                    className="filter__type-button"
                    type="button"
                  >
                    Букеты из сухоцветов
                  </button>
                </li>
              </ul>
            </Choices>
          </fieldset>
        </form>
      </div>
    </section>
  );
}