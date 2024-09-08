import React,{useEffect} from 'react';
import { Chart } from 'react-google-charts';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions,getPieChartData } from '../features/transactions/transactionsSlice';
import DropDownButtons from './pieChartDropDown';

const SpendingPieChart = () => {
  const { pieMonth, pieYear, pieChartData } = useSelector((store) => store.transactions);
  const dispatch = useDispatch();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = [2023, 2024];

  const data = [
    ['CATEGORY', 'AMOUNT'],
 ['TRANSPORTATION', '35.19'],
 ['INCOME', 12.66],
['ENTERTAINMENT', 268.20000000000005],
 ['OTHER', 1425],
 ['FOOD_AND_DRINK', 48.99],
  ];

  useEffect(()=>{
   // dispatch(getTransactions())
    dispatch(getPieChartData())
  },[])

  const options = {
    title: 'Monthly Summary',
  };

  return (
    <div>
      <DropDownButtons/>
    <div style={{ width: '900px', height: '500px' }}>
      <Chart
        chartType="PieChart"
        data={pieChartData}
        options={options}
        width="100%"
        height="400px"
      />
    </div>
    </div>
  );
};

export default SpendingPieChart;
