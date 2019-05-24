export default function input( state = {useTaxAndCostTable: false}, action ) {
  switch ( action.type ) {
    case 'SUBMIT':
      return Object.assign( {}, state, {data: action.data});
    case 'COST_AND_TAX_LOOKUP_DB':
      return Object.assign( {}, state, {useTaxAndCostTable: action.data});
    case 'SET_CALCULATOR_URL':
      return Object.assign( {}, state, {url: action.data});
    case 'SET_CALCULATOR_BUDGET_URL':
      return Object.assign( {}, state, {urlBudget: action.data});
    case 'SET_DEBUG_YEAR': 
      return Object.assign( {}, state, {debugYear: action.data});
    default:
      return state;
  }
}