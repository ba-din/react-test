import eVoucherTypes from "../../store/eVoucher/eVoucher.types";

export const getEVoucherList = (api) => [
  api.get(eVoucherTypes.LIST_EVOUCHER_URL),
  eVoucherTypes.LIST_EVOUCHER,
  eVoucherTypes.LIST_EVOUCHER_ERROR,
];
