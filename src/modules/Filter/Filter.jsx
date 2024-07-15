import {useEffect, useRef, useState} from 'react';
import {Choices} from '../Choices/Choices'
import './filter.scss'
import {useDispatch, useSelector} from 'react-redux';
import {fetchGoods} from '../../redux/goodsSlice';
import {debounce, getValidFilters} from '../../util';
import {changeCategory, changePrice, changeType} from '../../redux/filtersSlice';
import {FilterRadio} from './FilterRadio';
import classNames from 'classnames';

const filterTypes = [
  {value: 'bouquets', title: 'Цветы'},
  {value: 'toys', title: 'Игрушки'},
  {value: 'postcards', title: 'Открытки'},
]

export const Filter = ({ setTitleGoods, filterRef }) => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const categories = useSelector(state => state.goods.categories);
  const [openChoice, setOpenChoice]= useState(null);

  const prevFiltersRef = useRef({});

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

  const handleCategoryChange = (category) => {
    dispatch(changeCategory(category));
    setOpenChoice(null);
  }

  const handleChoicesToggle = (index) => {
    setOpenChoice(openChoice === index ? null : index);
  }
  return (
    <section
      className="filter"
      ref={filterRef}
    >
      <h2 className="visually-hidden"></h2>
      <div className="container">
        <form className="filter__form">
          <fieldset className="filter__group">
            {filterTypes.map((item) => (
              <FilterRadio
                key={item.value}
                data={item}
                handleTypeChange={handleTypeChange}
                type={filters.type}
              />
            ))}
          </fieldset>

          <fieldset className="filter__group filter__group_choices">
            <Choices
              buttonLabel="Цена"
              className="filter__choices_type"
              isOpen={openChoice === 0}
              onToggle={() => handleChoicesToggle(0)}
            >
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
            {categories.length ? (
              <Choices
                buttonLabel="Тип товара"
                className="filter__choices_type"
                isOpen={openChoice === 1}
                onToggle={() => handleChoicesToggle(1)}
              >
                <ul className="filter__type-list">
                  <li
                    className="filter__type-item"
                  >
                    <button
                      className="filter__type-button"
                      type="button"
                      onClick={() => {
                        handleCategoryChange('');
                      }}
                    >
                      Все типы
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li
                      key={category}
                      className="filter__type-item"
                    >
                      <button
                        className={classNames('filter__type-button', category === filters.category ? 'filter__type-button_active' : '')}
                        type="button"
                        onClick={() => {
                          handleCategoryChange(category);
                        }}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </Choices>
            ) : null}
          </fieldset>
        </form>
      </div>
    </section>
  );
}