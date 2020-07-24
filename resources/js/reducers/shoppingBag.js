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
      // axios.get('cart')
      //  .then((response) => {
      //   console.log('response is', response);

      //   dispatch({
      //    type: 'GET_CONTENT',
      //    payload: response.data,
      //   });
      // });
    default: return state;
      // const request = axios.get('cart');
      // console.log(request);
      // .then((response) => help = Object.values(response.data.content));
     // return help;
      // return state + 1;
   // default: return state;
  }
};
export default shoppingBagReducer;
