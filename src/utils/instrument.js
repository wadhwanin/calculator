import React from 'react';
import PoolInstrument from '../components/input/lookup/PoolInstrument'
import Instrument from '../components/input/lookup/Instrument'

export function displayPool(poolInstruments, addPoolInstrument, setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, category, index, subCategory) {
  if (!poolInstruments.length) {

    return false;
  }
  
  return poolInstruments.map((i, indexSubCategory) => < PoolInstrument category={ category }
    subCategory="pool"
    thirdCategory="instruments"
    data={ i }
    indexCategory={ index }
    key={ indexSubCategory }
    indexThirdCategory={ indexSubCategory }
    addPoolInstrument={ addPoolInstrument }
    setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray={ setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray }
    />);
  }

  export function displayCustody(custodyInstruments, addInstrument, setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray, setInputFieldFirstLevelArray, category, index, subCategory) {
    if (!custodyInstruments.length) {
      
      return ( < Instrument category={ category }
        secondCategory="custody"
        thirdCategory="instruments"
        indexCategory={ index }
        key={ 0 }
        indexThirdCategory={ 0 }
        isLast={ true }
        addInstrument={ addInstrument }
        setInputFieldFirstLevelArray={ setInputFieldFirstLevelArray }
        setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray={ setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray }
        />);
      }
      
      return custodyInstruments.map((i, indexSubCategory) => < Instrument category={ category }
        secondCategory="custody"
        thirdCategory="instruments"
        data={ i }
        indexCategory={ index }
        key={ indexSubCategory }
        indexThirdCategory={ indexSubCategory }
        isLast={ indexSubCategory === (custodyInstruments.length - 1) && custodyInstruments.length < 9 }
        addInstrument={ addInstrument }
        setInputFieldFirstLevelArray={ setInputFieldFirstLevelArray }
        setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray={ setInputFieldFirstLevelArraySecondLevelObjectThirdLevelArray }
        />);
      }