export function setCurrentTab(tab) {
  return ( dispatch, getState ) => {
    dispatch( {type: 'SET_CURRENT_TAB', data: tab} );
  };
}


