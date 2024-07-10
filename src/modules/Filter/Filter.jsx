import {useEffect, useRef, useState} from 'react';
import {Choices} from '../Choices/Choices'
import './filter.scss'
import {useDispatch, useSelector} from 'react-redux';
import {fetchGoods, setType} from '../../redux/goodsSlice';
import {debounce, getValidFilters} from '../../util';
import {setFilters, setMaxPrice, setMinPrice} from '../../redux/filterSlice';

export const Filter = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filter);
  const [openChoice, setOpenChoice]= useState(null);

  const prevFiltersRef = useRef(filters);

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 350)
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (prevFilters.type !== filters.type) {
      const validFilter = getValidFilters(filters);
      dispatch(setType(filters.type)); 
      dispatch(fetchGoods(validFilter));
    } else {
      debouncedFetchGoods(filters);
    }
    prevFiltersRef.current = filters;

  }, [dispatch, debouncedFetchGoods, filters]);

  const handleTypeChange = ({target}) => {
    const {value} = target;
    dispatch(setFilters({ type: value, minPrice: '', maxPrice: '' }));
    setOpenChoice(null);
  };

  const handlePriceChange = ({target}) => {
    const {name, value} = target;
    const checkedValue = !isNaN(parseInt(value, 10)) ? value : ''
    // const newFilters = {...filters, [name]: !isNaN(parseInt(value, 10)) ? value : ''};
    // setFilters(newFilters);
    dispatch(name === 'minPrice' ? setMinPrice(checkedValue) : setMaxPrice(checkedValue));
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
              checked={filters.type === 'bouquets'}
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
              checked={filters.type === 'toys'}
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
              checked={filters.type === 'postcards'}
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
                  value={filters.minPrice}
                  onChange={handlePriceChange}
                />
                <input
                  className="filter__input-price"
                  type="text"
                  name="maxPrice"
                  placeholder="до"
                  value={filters.maxPrice}
                  onChange={handlePriceChange}
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