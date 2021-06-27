import eVoucherTypes from "./eVoucher.types";

const initState = {
  eVoucherList: [],
  message: null,
  detailEoucher: null,
};

const eVoucherReducer = (state = initState, action) => {
  switch (action.type) {
    case eVoucherTypes.LIST_EVOUCHER:
      return { ...state, eVoucherList: action.payload.data };
    case eVoucherTypes.UPDATE_EVOUCHER_STATUS:
    case eVoucherTypes.CREATE_EVOUCHER:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default eVoucherReducer;
