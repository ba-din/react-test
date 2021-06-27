import eVoucherTypes from "./eVoucher.types";

const initState = {
  eVoucherList: [],
  message: null,
  detailEoucher: null,
};

const eVoucherReducer = (state = initState, action) => {
  switch (action.type) {
    case eVoucherTypes.LIST_EVOUCHER:
      return { ...state, eVoucherList: action.payload.DATA };
    default:
      return state;
  }
};

export default eVoucherReducer;
