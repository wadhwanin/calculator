import React from 'react';
import PayIn from '../components/input/lookup/PayIn';
import PayOut from '../components/input/lookup/PayOut';

export function displayPayInRanges(payInRanges, addInputPayInField, setInputFieldFirstLevelArraySecondLevelArray, setInputFieldFirstLevelArray, category, indexCategory, subCategory ) {
  if (!payInRanges) {
    return (<PayIn
      category={category}
      indexCategory={indexCategory}
      subCategory={subCategory}
      key={0}
      indexSubCategory={0}
      isLast={true}
      addInputPayInField={addInputPayInField}
      setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray}
      setInputFieldFirstLevelArray={setInputFieldFirstLevelArray}/>);
  }
  return payInRanges.map((i, index) => <PayIn
    category={category}
    indexCategory={indexCategory}
    subCategory={subCategory}
    data={i}
    key={index}
    indexSubCategory={index}
    isLast={index === (payInRanges.length - 1)}
    addInputPayInField={addInputPayInField}
    setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray}
    setInputFieldFirstLevelArray={setInputFieldFirstLevelArray}/>);
}

export function displayPayOutRanges(payOutRanges, addInputPayOutField, setInputFieldFirstLevelArraySecondLevelArray, setInputFieldFirstLevelArray, category, indexCategory, subCategory) {
  if (!payOutRanges) {
    return (<PayOut
      category={category}
      indexCategory={indexCategory}
      subCategory={subCategory}
      key={0}
      indexSubCategory={0}
      isLast={true}
      addInputPayOutField={addInputPayOutField}
      setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray}
      setInputFieldFirstLevelArray={setInputFieldFirstLevelArray}/>);
    }
  return payOutRanges.map((i, index) => <PayOut
    category={category}
    indexCategory={indexCategory}
    subCategory={subCategory}
    data={i}
    key={index}
    indexSubCategory={index}
    isLast={index === (payOutRanges.length - 1)}
    addInputPayOutField={addInputPayOutField}
    setInputFieldFirstLevelArraySecondLevelArray={setInputFieldFirstLevelArraySecondLevelArray}
    setInputFieldFirstLevelArray={setInputFieldFirstLevelArray}/>);
}