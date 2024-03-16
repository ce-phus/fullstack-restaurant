import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBreakfastList } from '../actions/breakfastActions';
import { getLunchList } from '../actions/lunchActions';
import { getDinnerList } from "../actions/dinnerActions"
import { CREATE_BREAKFAST_RESET, CREATE_LUNCH_RESET, CREATE_DINNER_RESET } from '../constants'; 
import MenuList from '../components/MenuList';
import MenuLunch from '../components/MenuLunch';
import MenuDinner from '../components/MenuDinner';
import Footer from '../components/Footer'

const MenuListPage = () => {
  const dispatch = useDispatch();

  // Fetch breakfast list from Redux store
  const { loading: breakfastLoading, error: breakfastError, breakfast } = useSelector((state) => state.breakfastListReducer);

  // Fetch lunch list from Redux store
  const { loading: lunchLoading, error: lunchError, lunch } = useSelector((state) => state.lunchListReducer);

  // Fetch DInner List from redux store
  const { loading: dinnerLoading, error:dinnerError, dinner } = useSelector((state) =>state.dinnerListReducer);

  useEffect(() => {
    dispatch(getBreakfastList());
    dispatch({ type: CREATE_BREAKFAST_RESET });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLunchList());
    dispatch({ type: CREATE_LUNCH_RESET });
  }, [dispatch]);

  useEffect(()=> {
    dispatch(getDinnerList());
    dispatch({ type: CREATE_DINNER_RESET });
  },[dispatch])

  // Handle loading and error states
  if (breakfastLoading || lunchLoading) {
    return <div>Loading...</div>;
  }

  if (breakfastError || lunchError) {
    return <div>Error: {breakfastError || lunchError}</div>;
  }

  if (dinnerLoading) {
    return <div>Loading....</div>
  }

  if (dinnerError) {
    return <div>Error: {dinnerError} </div>
  }

  return (
    <div>
      <MenuList breakfastList={breakfast} />
      <MenuLunch lunchList={lunch} />
      <MenuDinner dinnerList={dinner} />
      <Footer/>
    </div>
  );
};

export default MenuListPage;
