import React, { useEffect, useContext } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CDataTable
} from '@coreui/react';
import { connect, useSelector } from 'react-redux';
import { fetchData, changeData } from '../../store/action';
import { FetchContext } from '../../context/fetchContext';
import {
  getEVoucherList,
  updateEVocherStatus,
  setDetailEVoucher
} from './EVoucherService';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import Image from '../../components/Image.js';
import Toggle from 'react-toggle';
import Toast from '../../components/Toast.js';

const EVoucher = ({ fetchData, changeData, message }) => {
  const fetchContext = useContext(FetchContext);
  const api = fetchContext.authFetch;
  const history = useHistory();

  const eVoucherList = useSelector(({ eVoucher }) => eVoucher.eVoucherList)

  useEffect(() => {
    fetchData(getEVoucherList(api))
  }, [api, fetchData])

  useEffect(() => {
    if (message && message.status === 200) {
      fetchData(getEVoucherList(api))
      Toast.fire({
        icon: 'success',
        text: message.message
      })
    }
  }, [api, fetchData, message])

  const onHandleUpdateStatus = async (item) => {
    await fetchData(updateEVocherStatus(api, {
      id: item.id,
      status: !item.status
    }))
  }

  const onHandleUpdateEVoucher = async (item) => {
    await changeData(setDetailEVoucher(null))
    history.push(`/e-voucher/${item.id}/edit`);
  }

  const fields = [
    'title',
    'desc',
    'expiredAt',
    'image',
    'qty',
    'price',
    'paymentMethods',
    'active',
    'createdAt',
    'actions'
  ]

  return (
    <CCard>
      <CCardHeader>
        E-Voucher List
        <div className='card-header-actions'>
          <CButton
            size='sm'
            color='primary'
            className={'float-right mb-0 ml-2'}
            onClick={() => history.push('/e-voucher/create')}
          >
            Create New Voucher
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        {
          eVoucherList && (
            < CDataTable
              items={eVoucherList}
              fields={fields}
              striped
              itemsPerPage={5}
              pagination
              scopedSlots={{
                'expiredAt':
                  (item) => (
                    <td>
                      {moment(new Date(item.expiredAt)).format('MMM DD, YYYY')}
                    </td>
                  ),
                'image':
                  (item) => (
                    <td>
                      <Image
                        src={item.image}
                        size="40px"
                      />
                    </td>
                  ),
                'paymentMethods':
                  (item) => (
                    <td>
                      <ul style={{listStyle: 'none'}}>
                        {
                          item.paymentMethods.map((payment) => (
                            <li>
                              {payment.name} {payment.discountAmount ? ` (Discount : ${payment.discountAmount} ${payment.discount})` : ''}
                            </li>
                          ))
                        }
                      </ul>
                    </td>
                  ),
                'createdAt':
                  (item) => (
                    <td>
                      {moment(new Date(item.createdAt)).format('MMM DD, YYYY')}
                    </td>
                  ),
                'actions':
                  (item) => (
                    <td>
                      <CButton
                        size='sm'
                        color='info'
                        className={'float-right mb-0 ml-2'}
                        onClick={() => onHandleUpdateEVoucher(item)}
                      >
                        Edit
                      </CButton>
                    </td>
                  ),
                'active':
                  (item) => (
                    <td>
                      <Toggle
                        checked={item.status}
                        onChange={() => onHandleUpdateStatus(item)}
                      />
                    </td>
                  )

              }}
            />
          )
        }
      </CCardBody>
    </CCard>
  )
}

const mapStateToProps = ({ eVoucher }) => ({
  eVoucherList: eVoucher.eVoucherList,
  message: eVoucher.message
});

export default connect(mapStateToProps, { fetchData, changeData })(EVoucher);
