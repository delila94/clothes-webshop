/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line consistent-return
// import axios from 'axios';

const shoppingBagReducer = (state = [], action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case 'GET_CONTENT':
      return action.payload;
    case 'GET_CONTENT_TRUE':
      return true;
    default: return state;
  }
};
export default shoppingBagReducer;
