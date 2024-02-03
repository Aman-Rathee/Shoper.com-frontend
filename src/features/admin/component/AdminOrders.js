import React, { useEffect, useState } from 'react'
import { fetchAllOrdersAsync, selectOrders, selectTotalOrders, updateOrderAsync } from '../../orders/orderSlice'
import { ITEMs_PER_PAGE } from '../../../app/constants'
import { useDispatch, useSelector } from 'react-redux'
import { EyeIcon, PencilIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid'
import Pagination from '../../common/Pagination'

const AdminOrders = () => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({})
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const totalOrders = useSelector(selectTotalOrders)
  const [editableIOrderId, setEditableOrderId] = useState(-1)


  const handleShow = (order) => {

  }

  const handleEdit = (order) => {
    setEditableOrderId(order.id)
  }

  const handleOrderStatus = (e, order) => {
    const updatedOrderStatus = { ...order, status: e.target.value }
    dispatch(updateOrderAsync(updatedOrderStatus))
    setEditableOrderId(-1)
  }

  const handleOrderPaymentStatus = (e, order) => {
    const updatedPaymentOrder = { ...order, paymentStatus: e.target.value }
    dispatch(updateOrderAsync(updatedPaymentOrder))
    setEditableOrderId(-1)
  }

  const statusColor = (status) => {
    switch (status) {
      case 'pending':
        return `bg-purple-200 text-purple-600`
      case 'dispatched':
        return `bg-yellow-200 text-yellow-600`
      case 'delivered':
        return `bg-green-200 text-green-600`
      case 'received':
        return `bg-green-200 text-green-600`
      case 'cancelled':
        return `bg-red-200 text-red-600`
      default:
        return `bg-purple-200 text-purple-600`
    }
  }

  const handlePage = (page) => {
    setPage(page)
  }

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort)
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMs_PER_PAGE }
    dispatch(fetchAllOrdersAsync({ pagination, sort }))
  }, [dispatch, page, sort])


  return (
    <>
      <div className="overflow-x-auto">
        <div className="bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-4">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-4 cursor-pointer text-center"
                      onClick={(e) => { handleSort({ sort: 'id', order: sort?._order === 'desc' ? 'asc' : 'desc' }) }} >
                      Order Id.{' '}
                      {sort._sort === 'id' && (sort._order === 'asc' ? <ArrowDownIcon className='w=4 h-4 inline ' />
                        : <ArrowUpIcon className='w=4 h-4 inline' />)}
                    </th>
                    <th className="py-3 px-2 text-center">Items</th>
                    <th className="py-3 px-2 cursor-pointer text-center"
                      onClick={(e) => { handleSort({ sort: 'totalAmount', order: sort?._order === 'asc' ? 'desc' : 'asc' }) }} >
                      Total Amount{' '}
                      {sort._sort === 'totalAmount' && (sort._order === 'asc' ? <ArrowDownIcon className='w=4 h-4 inline ' />
                        : <ArrowUpIcon className='w=4 h-4 inline' />)}
                    </th>
                    <th className="py-3 px-2 text-center">Shipping Address</th>
                    <th className="py-3 px-2 text-center">Order Status</th>
                    <th className="py-3 px-2 text-center">Payment</th>
                    <th className="py-3 px-2 text-center">Payment Status</th>
                    <th className="py-3 px-2 cursor-pointer text-center"
                      onClick={(e) => { handleSort({ sort: 'createdAt', order: sort?._order === 'asc' ? 'desc' : 'asc' }) }} >
                      Order Time{' '}
                      {sort._sort === 'createdAt' && (sort._order === 'asc' ? <ArrowDownIcon className='w=4 h-4 inline ' />
                        : <ArrowUpIcon className='w=4 h-4 inline' />)}
                    </th>
                    <th className="py-3 px-2 cursor-pointer text-center"
                      onClick={(e) => { handleSort({ sort: 'updatedAt', order: sort?._order === 'asc' ? 'desc' : 'asc' }) }} >
                      Last Updated{' '}
                      {sort._sort === 'updatedAt' && (sort._order === 'asc' ? <ArrowDownIcon className='w=4 h-4 inline ' />
                        : <ArrowUpIcon className='w=4 h-4 inline' />)}
                    </th>
                    <th className="py-3 px-2 pr-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium"> {order.id}. </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-normal text-center">
                      {order.items.map((item, index) => (<div key={index} className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-6 h-6 rounded-full"
                            src={item.product.thumbnail}
                            alt={item.product.title}
                          />
                        </div>
                        <div> {item.product.title}, #{item.quantity}, ${item.product.discountedPrice} </div>
                      </div>))}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center">
                        ${(order.totalAmount)}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="">
                        <div><strong>{order.selectedAddress.name}</strong></div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city}, {order.selectedAddress.state}</div>
                        <div>PIN: {order.selectedAddress.pinCode} </div>
                        <div>{order.selectedAddress.phone}, {order.selectedAddress.email}  </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {order.id === editableIOrderId ? (
                        <select onChange={(e) => { handleOrderStatus(e, order) }} value={order.status} >
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>) : (
                        <span className={` ${statusColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                          {order.status}
                        </span>)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center">
                        {(order.paymentMethod)}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      {order.id === editableIOrderId ? (
                        <select onChange={(e) => { handleOrderPaymentStatus(e, order) }} value={order.paymentStatus} >
                          <option value="pending">Pending</option>
                          <option value="received">Received</option>
                        </select>) : (
                        <span className={` ${statusColor(order.paymentStatus)} py-1 px-3 rounded-full text-xs`}>
                          {order.paymentStatus}
                        </span>)}
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center">
                        {(order.createdAt ? new Date(order.createdAt).toLocaleString() : null)}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <div className="flex items-center justify-center">
                        {(order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null)}
                      </div>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <div className="flex item-center justify-center">
                        {/* <div onClick={(e) => handleShow(order)} className="w-5 mr-2 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon />
                        </div> */}
                        <div onClick={(e) => handleEdit(order)} className="w-5 ml-2 mr-4 cursor-pointer transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon />
                        </div>
                      </div>
                    </td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalOrders} />
      </div>
    </>

  )
}

export default AdminOrders
