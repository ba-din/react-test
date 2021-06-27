import eVoucherTypes from "../../store/eVoucher/eVoucher.types";

export const getEVoucherList = (api) => [
  api.get(eVoucherTypes.LIST_EVOUCHER_URL),
  eVoucherTypes.LIST_EVOUCHER,
  eVoucherTypes.LIST_EVOUCHER_ERROR,
];

export const updateEVocherStatus = (api, body) => [
  api.post(eVoucherTypes.UPDATE_EVOUCHER_STATUS_URL, body),
  eVoucherTypes.UPDATE_EVOUCHER_STATUS,
  eVoucherTypes.UPDATE_EVOUCHER_ERROR,
]

export const createEVocher = (api, body) => [
  api.post(eVoucherTypes.CREATE_EVOUCHER_URL, body),
  eVoucherTypes.CREATE_EVOUCHER,
  eVoucherTypes.CREATE_EVOUCHER_ERROR,
]

export const getDetailEVoucher = (api, body) => [
  api.post(eVoucherTypes.GET_EVOUCHER_DETAIL_URL, body),
  eVoucherTypes.GET_EVOUCHER_DETAIL,
  eVoucherTypes.GET_EVOUCHER_DETAIL_ERROR,
]

export const updateEVoucher = (api, body) => [
  api.post(eVoucherTypes.UPDATE_EVOUCHER_URL, body),
  eVoucherTypes.UPDATE_EVOUCHER,
  eVoucherTypes.UPDATE_EVOUCHER_ERROR,
]

export const setDetailEVoucher = (data) => [eVoucherTypes.SET_DETAIL_EVOUCHER, data];
