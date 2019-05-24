export function submit( input ) {
  return ( dispatch, getState ) => {
    dispatch( {type: 'SUBMIT', data: input} );
  };
}

export function setCostAndTaxLookupFromDB ( isTrue ) {
  return ( dispatch, getState ) => {
    dispatch( {type: 'COST_AND_TAX_LOOKUP_DB', data: isTrue} );
  };
}

export function setCalculatorURL (url) {
  return ( dispatch, getState ) => {
    dispatch( {type: 'SET_CALCULATOR_URL', data: url} );
  };
}

export function setCalculatorBudgetURL (url) {
  return ( dispatch, getState ) => {
    dispatch( {type: 'SET_CALCULATOR_BUDGET_URL', data: url} );
  };
}

export function setDebugYear(debugYear) {
  return ( dispatch, getState ) => {
    dispatch( {type: 'SET_DEBUG_YEAR', data: debugYear} );
  };
}

