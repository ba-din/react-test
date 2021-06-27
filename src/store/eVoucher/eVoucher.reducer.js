import { bindActionCreators } from "redux";
import eVoucherTypes from "./eVoucher.types";

const initState = {
  eVoucherList: [],
  message: null,
  detailEVoucher: null,
};

const eVoucherReducer = (state = initState, action) => {
  switch (action.type) {
    case eVoucherTypes.LIST_EVOUCHER:
      return { ...state, eVoucherList: action.payload.data, message: null };
    case eVoucherTypes.UPDATE_EVOUCHER_STATUS:
    case eVoucherTypes.CREATE_EVOUCHER:
    case eVoucherTypes.UPDATE_EVOUCHER:
      return { ...state, message: action.payload };
    case eVoucherTypes.GET_EVOUCHER_DETAIL:
      return { ...state, detailEVoucher: action.payload.data, message: null };
    case eVoucherTypes.SET_DETAIL_EVOUCHER:
      return { ...state, detailEVoucher: action.payload, message: null };
    default:
      return state;
  }
};

export default eVoucherReducer;
