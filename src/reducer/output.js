export default function output( state = {currentTab: 'custodyOutputData'}, action ) {
  switch ( action.type ) {
    case 'SET_CURRENT_TAB':
      return Object.assign( {}, state, {currentTab: action.data});
    default:
      return state;
  }
}