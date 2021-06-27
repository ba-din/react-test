import React, {useEffect, useContext} from 'react';
import { CCard, CCardHeader, CCardBody, CButton, CForm, CFormGroup, CLabel, CInput, CFormText } from '@coreui/react';
import { connect, useSelector } from 'react-redux';
import { fetchData, changeData } from '../../../store/action';
import { FetchContext } from '../../../context/fetchContext';
import EVoucherForm from '../form/EVoucherForm';

const CreateEVoucher = ({ fetchData, changeData, message }) => {
  const fetchContext = useContext(FetchContext);
  // const authContext = useContext(AuthContext);
  const api = fetchContext.authFetch;

  const onSubmitHandler = (form) => {
    console.log(form)
  }

  return (
    <CCard>
      <CCardHeader>
        Create New Voucher
      </CCardHeader>
      <CCardBody>
        <EVoucherForm
          onSubmitForm={onSubmitHandler}
        />
      </CCardBody>
    </CCard>
  )
}

const mapStateToProps = ({ eVoucher }) => ({
  // eVoucherList: eVoucher.eVoucherList,
});

export default connect(mapStateToProps, { fetchData, changeData })(CreateEVoucher);
