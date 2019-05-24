import React from 'react';
import {MAX_NUMBER_OF_COLUMNS} from './constants';

export const convertPercentToDecimal=(x) => parseFloat(x) * 0.01;

export const mergeCustodies=(yearly) => {
    if (!yearly.length) {
        return;
    }

    if (yearly[0].freeAssetSummary.prognoses.length === 1) {
        return yearly;
    }

    return yearly.map(function (year) {
        return {
            "year": year.year,
            "freeAssetSummary": year.freeAssetSummary,
            "pensionSummary": {}
        }
    })

}

export const getLifeExpectancyYear=(customer) => {
    const currentYear=new Date().getFullYear();
    const {birthDate, lifeExpectancy}=customer;
    const customerAge=currentYear - new Date(birthDate).getFullYear();
    return currentYear + lifeExpectancy - customerAge;
}

export const yearsDropDown=(start, end, acc=[]) => {
    if (isNaN(end) || start > end) {
        return acc;
    }
    return (yearsDropDown(start + 1, end, [
        ...acc, <option key={
            start
        }
        value={
            start
        } > {
            start
        } </option>]));
}

export const yearsDropDownInAge=(customer) => {
    const { birthDate, lifeExpectancy }=customer;
    const customerAge=new Date().getFullYear() - new Date(birthDate).getFullYear();
    return yearsDropDown(customerAge, lifeExpectancy);
}

export const yearsDropDownInYears=(customer) => {
    const twentyYearsBeforeNow=new Date().getFullYear() - 20;
    return yearsDropDown(twentyYearsBeforeNow, getLifeExpectancyYear(customer));
}

export const incrementMonthAndMaybePrefix0=(month) => month < 9 ? `0${month + 1}` : month + 1; 

const formattedMonth=(date) => incrementMonthAndMaybePrefix0(date.getMonth())


export const formatDate=(s) => {
  const date=new Date(s);
  
  const day=date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
   return `${formattedMonth(date)}/${day}/${date.getFullYear()}`;
}

export const getYearMonthFromDate=(e) => {
  const date=new Date(e);
  return `${date.getFullYear()}-${formattedMonth(date)}`;
}

export const getYearAndMonthObjectFromDate=( e ) => {
  const date=new Date( e );
  return {
    year: date.getFullYear(),
    month: date.getMonth()
  };
}


export const setDate=(d) => {
  try {
    return new Date(d).toISOString();
  } catch(exc) {
    return '';
  }
}

export const getEndIndexForDisplay=( startIndex, array ) =>
  startIndex + MAX_NUMBER_OF_COLUMNS < array.length ?
  startIndex + MAX_NUMBER_OF_COLUMNS :
  array.length;

export function roundOff(value) {
  const roundedOffValue=Math.round(Math.round(value * 10) / 10)
  return isNaN(roundedOffValue)
    ? 0
    : roundedOffValue;
}


export function printDataRowsOnSubIndex(payOutValues2D, subIndex) {
  return payOutValues2D.map((payOut, index) => {
    if (!payOut[subIndex].value) {
      return <td key={index}></td>
    }
    return (
      <td className="align-right" key={index}>
        {roundOff(payOut[subIndex].value)}
      </td>
    )
  })
}