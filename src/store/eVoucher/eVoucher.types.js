import apiEndPoints from "../../constants/apiEndpoints";

const eVoucherTypes = {
  CREATE_EVOUCHER_URL: apiEndPoints.CREATE_EVOUCHER,
  CREATE_EVOUCHER: 'CREATE_EVOUCHER',
  CREATE_EVOUCHER_ERROR: 'CREATE_EVOUCHER_ERROR',

  LIST_EVOUCHER_URL: apiEndPoints.LIST_EVOUCHER,
  LIST_EVOUCHER: 'LIST_EVOUCHER',
  LIST_EVOUCHER_ERROR: 'LIST_EVOUCHER_ERROR',

  UPDATE_EVOUCHER_URL: apiEndPoints.UPDATE_EVOUCHER,
  UPDATE_EVOUCHER: 'UPDATE_EVOUCHER',
  UPDATE_EVOUCHER_ERROR: 'UPDATE_EVOUCHER_ERROR',

  UPDATE_EVOUCHER_STATUS_URL: apiEndPoints.UPDATE_EVOUCHER_STATUS,
  UPDATE_EVOUCHER_STATUS: 'UPDATE_EVOUCHER_STATUS',
  UPDATE_EVOUCHER_STATUS_ERROR: 'UPDATE_EVOUCHER_STATUS_ERROR',

  GET_EVOUCHER_DETAIL_URL: apiEndPoints.GET_EVOUCHER_DETAIL,
  GET_EVOUCHER_DETAIL: 'GET_EVOUCHER_DETAIL',
  GET_EVOUCHER_DETAIL_ERROR: 'UPDATE_EVOUCHER_STATUS_ERROR',

  PURCHASE_EVOUCHER_URL: apiEndPoints.CREATE_PROMO_CODE,
  PURCHASE_EVOUCHER: 'PURCHASE_EVOUCHER',
  PURCHASE_EVOUCHER_ERROR: 'PURCHASE_EVOUCHER_ERROR',

  SET_DETAIL_EVOUCHER: 'SET_DETAIL_EVOUCHER',
};

export default eVoucherTypes;
