import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, fetchItemsByUserIdAsync, selectCartLoaded, selectCartStatus, selectItems, updateCartAsync, } from './cartSlice';
import { Link, Navigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import Modal from '../common/Modal';


export default function Cart() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false)


  const status = useSelector(selectCartStatus)
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);

  const totalAmount = items.reduce((amount, item) => item.product.discountedPrice * item.quantity + amount, 0)
  const totalItems = items.reduce((total, item) => item.quantity + total, 0)

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
  }

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id))
  }

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync())
  }, [dispatch])


  return (
    <>
      {!items.length > 0 && cartLoaded && <Navigate to='/' replace={true} />}
      <div className="mx-auto mt-16 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold pt-8 text-center tracking-tight text-gray-900">Cart</h1>
        {status === 'loading' ?
          <div className=" m-auto" >
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            /> </div> : null}
        <div className="border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">{item.product.discountedPrice}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label htmlFor="quantity" className="inline mr-4 text-sm font-medium leading-6 text-gray-900">
                          Qty
                        </label>
                        <select className="text-gray-700 border-themeBluClr  rounded-md focus:ring-themeBluClr  "
                          onChange={(e) => handleQuantity(e, item)} value={item.quantity} >
                          <option className='p-0 ' value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>

                      <div className="flex">
                        <Modal title={`Remove (${item.product.title})`} message='Are you sure you want to remove this item.' action='Remove' cancelOption='cancel' dangerAction={(e) => handleRemove(e, item.id)} cancelAction={() => setOpenModal(false)} showModal={openModal === item.id} />
                        <button
                          onClick={e => { setOpenModal(item.id) }}
                          type="button"
                          className="font-medium text-themeOrngClr hover:text-[#db2727a3]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex pb-2 justify-between text-base font-medium text-gray-900">
            <p>Total Items</p>
            <p>{totalItems} </p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>$ {totalAmount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-themeBtnColor px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-themeBtnColorHover"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-[#ff0000a3] hover:text-[#db2727a3]"
                // onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div >
    </>
  );
}
