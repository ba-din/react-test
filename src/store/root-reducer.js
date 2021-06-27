import { combineReducers } from 'redux';
import eVoucherReducer from './eVoucher/eVoucher.reducer';

const rootReducer = combineReducers({
  eVoucher: eVoucherReducer
});

export default rootReducer;
