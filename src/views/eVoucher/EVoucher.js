import React, {useEffect, useContext} from 'react';
import { CCard, CCardHeader, CCardBody, CButton } from '@coreui/react';
import { connect, useSelector } from 'react-redux';
import { fetchData, changeData } from '../../store/action';
import { FetchContext } from '../../context/fetchContext';
import {
  getEVoucherList
} from './EVoucherService';
import { useHistory } from 'react-router-dom';

const EVoucher = ({ fetchData, changeData, message }) => {
  const fetchContext = useContext(FetchContext);
  // const authContext = useContext(AuthContext);
  const api = fetchContext.authFetch;
  const history = useHistory();

  useEffect(() => {
    fetchData(getEVoucherList(api, {}))
  }, [api, fetchData])

  return (
    <CCard>
      <CCardHeader>
        E-Voucher List
        <div className='card-header-actions'>
          <CButton
            size='sm'
            color='info'
            className={'float-right mb-0 ml-2'}
            onClick={() => history.push('/e-voucher/create')}
          >
            Create New Voucher
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <h1>Hello Gatone</h1>
      </CCardBody>
    </CCard>
  )
}

const mapStateToProps = ({ eVoucher }) => ({
  // eVoucherList: eVoucher.eVoucherList,
});

export default connect(mapStateToProps, { fetchData, changeData })(EVoucher);
