import React, {useEffect, useContext} from 'react';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import { connect, useSelector } from 'react-redux';
import { fetchData, changeData } from '../../../store/action';
import { FetchContext } from '../../../context/fetchContext';
import EVoucherForm from '../form/EVoucherForm';
import { useHistory, useParams } from 'react-router-dom';
import {
  getDetailEVoucher,
  updateEVoucher
} from '../EVoucherService';
import Toast from '../../../components/Toast';

const UpdateEVoucher = ({ fetchData, changeData, message }) => {
  const fetchContext = useContext(FetchContext);
  const api = fetchContext.authFetch;

  const history = useHistory()
  const urlParams = useParams()
  const detailEVoucher = useSelector(({eVoucher}) => eVoucher.detailEVoucher)

  useEffect(() => {
    fetchData(getDetailEVoucher(api, {id: urlParams.id}));
  }, [api, fetchData, urlParams])

  useEffect(() => {
    if(!message) return

    if(message.status === 200) {
      Toast.fire({
        icon: 'success',
        text: message.message
      })
      history.push('/e-voucher')
    } else {
      Toast.fire({
        icon: 'error',
        text: message.message
      })
    }
  }, [history, message])

  const onSubmitHandler = (form) => {
    fetchData(updateEVoucher(api, {
      ...form,
      id: urlParams.id,
    }))
  }

  return (
    <CCard>
      <CCardHeader>
        Create New Voucher
      </CCardHeader>
      <CCardBody>
        {
          detailEVoucher && (
            <EVoucherForm
              defaultValues={detailEVoucher}
              onSubmitForm={onSubmitHandler}
            />
          )
        }

      </CCardBody>
    </CCard>
  )
}

const mapStateToProps = ({ eVoucher }) => ({
  detailEVoucher: eVoucher.detailEVoucher,
  message: eVoucher.message
});

export default connect(mapStateToProps, { fetchData, changeData })(UpdateEVoucher);
