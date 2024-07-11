import {useEffect, useRef, useState} from 'react';
import {Choices} from '../Choices/Choices'
import './filter.scss'
import {useDispatch, useSelector} from 'react-redux';
import {fetchGoods} from '../../redux/goodsSlice';
import {debounce, getValidFilters} from '../../util';
import {changePrice, changeType} from '../../redux/filtersSlice';
import {FilterRadio} from './FilterRadio';

const filterTypes = [
  {value: 'bouquets', title: 'Цветы'},
  {value: 'toys', title: 'Игрушки'},
  {value: 'postcards', title: 'Открытки'},
]

export const Filter = ({ setTitleGoods }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const [openChoice, setOpenChoice]= useState(null);

  const prevFiltersRef = useRef(filters);

  const debouncedFetchGoods = useRef(
    debounce((filters) => {
      dispatch(fetchGoods(filters));
    }, 350)
  ).current;

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    const validFilter = getValidFilters(filters);
    if (!validFilter.type) {
      return;
    }
    if (prevFilters.type !== validFilter.type) {
      dispatch(fetchGoods(validFilter));
    setTitleGoods(
      filterTypes.find(item => item.value === validFilter.type).title
    );
    } else {
      debouncedFetchGoods(validFilter);
    }
    prevFiltersRef.current = filters;
  }, [dispatch, setTitleGoods, debouncedFetchGoods, filters]);

  const handleTypeChange = ({target}) => {
    const {value} = target;
    dispatch(changeType(value));
    setOpenChoice(null);
  };

  const handlePriceChange = ({target}) => {
    const {name, value} = target;
    dispatch(changePrice({name, value}));
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
            {filterTypes.map(item => (
            <FilterRadio
            key={item.value}
            data={item}
            handleTypeChange={handleTypeChange}
            type={filters.type}
            />))}
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