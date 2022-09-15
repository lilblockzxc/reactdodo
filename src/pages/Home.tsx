import { FC, useEffect, useRef, useState } from "react";
import { Categories } from "../components/Filters/Categories";
import qs from "qs";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Index } from "../components/PizzaBlock";

import { Pagination } from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCategoryId, setFilters } from "../redux/filter/slice";
import { Sortlist } from "../components/Filters/Sort";
import Sort from "../components/Filters/Sort";
import axios from "axios";
import { setPizzas } from "../redux/pizza/slice";
import { Pizza } from "../redux/pizza/types";

export const Home: FC = () => {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );
  const sortType = sort.sortProperty;
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const dispatch = useDispatch();
  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const items: Pizza[] = useSelector((state: RootState) => state.pizza.items);

  const [isLoading, setIsLoading] = useState(true);

  const category = categoryId > 0 ? `category=${categoryId}` : ``;
  const order = sortType.includes("-") ? "abs" : "desc";
  const sortBy = sortType.replace("-", "");
  const search = searchValue ? `&search=${searchValue}` : ``;

  const url = `https://6310b74e36e6a2a04ef5c356.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`;

  const getPizzas = async (url: string) => {
    try {
      const { data } = await axios.get<Pizza[]>(url);
      dispatch(setPizzas(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    } finally {
      setIsLoading(false);
    }
  };

  //рисуем пицы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas(url);
    }
    setIsLoading(true);
    isSearch.current = false;
  }, [url]);

  //ToDo исправить ошибку двойного рендеринга и неотрисовки пицц
  //Если был первый рендер, то проверяем параметры урла и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = Sortlist.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  const pizzas = items.map((pizza) => <Index key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(10)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination />
    </div>
  );
};
