import React from 'react';
import InsurancePremium from '../components/input/lookup/InsurancePremium';

export function displayinsurancePremiumRanges(
  insurancePremiumRanges, addInputInsurancePremiumField, 
  setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, setInputFieldFirstLevelArraySecondLevelObject, category, indexCategory, secondLevelCategory, thirdLevelCategory 
  ) {
  if (!insurancePremiumRanges) {
    return (<InsurancePremium
      category={category}
      indexCategory={indexCategory}
      secondLevelCategory={secondLevelCategory}
      thirdLevelCategory={thirdLevelCategory}
      key={0}
      indexThirdLevelCategory={0}
      isLast={true}
      addInputInsurancePremiumField={addInputInsurancePremiumField}
      setInputFieldFirstLevelArraySecondLevelObject={setInputFieldFirstLevelArraySecondLevelObject}
      setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray={setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray}/>);
  }
  return insurancePremiumRanges.map((i, index) => <InsurancePremium
    category={category}
    indexCategory={indexCategory}
    secondLevelCategory={secondLevelCategory}
    thirdLevelCategory={thirdLevelCategory}
    data={i}
    key={index}
    indexThirdLevelCategory={index}
    isLast={index === (insurancePremiumRanges.length - 1)}
    addInputInsurancePremiumField={addInputInsurancePremiumField}
    setInputFieldFirstLevelArraySecondLevelObject={setInputFieldFirstLevelArraySecondLevelObject}
    setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray={setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray}/>);
}