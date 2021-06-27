import React, {useEffect, useContext} from 'react';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import { connect } from 'react-redux';
import { fetchData, changeData } from '../../../store/action';
import { FetchContext } from '../../../context/fetchContext';
import EVoucherForm from '../form/EVoucherForm';
import {
  createEVocher
} from '../EVoucherService';
import Toast from '../../../components/Toast';
import { useHistory } from 'react-router-dom';

const CreateEVoucher = ({ fetchData, changeData, message }) => {
  const fetchContext = useContext(FetchContext);
  const api = fetchContext.authFetch;
  const history = useHistory();

  useEffect(() => {
    if(message) {
      if(message.status > 200) Toast.fire({
        icon: 'error',
        text: message.message
      })

      if(message.status === 200) {
        Toast.fire({
          icon: 'success',
          text: message.message
        })
        history.push('/e-voucher')
      }
    }
  }, [history, message])

  const onSubmitHandler = (form) => {
    fetchData(createEVocher(api, form))
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
  message: eVoucher.message
});

export default connect(mapStateToProps, { fetchData, changeData })(CreateEVoucher);
