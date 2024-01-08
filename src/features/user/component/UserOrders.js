import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrderAsync, selectUserInfoStatus, selectUserOrders, } from '../userSlice';
import { RotatingLines } from 'react-loader-spinner';

export default function UserOrders() {
    const dispatch = useDispatch();
    const orders = useSelector(selectUserOrders)
    const status = useSelector(selectUserInfoStatus)

    useEffect(() => {
        dispatch(fetchLoggedInUserOrderAsync())
    }, [dispatch])


    return (
        <>
            {status === 'loading' ?
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                /> : null}
            {orders && orders.map((order) => (
                <div key={order.id} className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold pt-8 text-center tracking-tight text-gray-900">Order Number is : {order.id} </h1>
                    <h3 className="text-xl font-bold pt-8 text-center tracking-tight text-red-900">Order Status is : {order.status} </h3>
                    <div className="border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                                {order.items.map((item) => (
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
                                                        Qty:{item.quantity}
                                                    </label>
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
                            <p>{order.totalItems} </p>
                        </div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>$ {order.totalAmount}</p>
                        </div>
                    </div>
                    <li className="flex justify-between gap-x-6 p-5 ">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="mt-0.5 text-sm text-blue-700">Shipping Address:</p>
                                <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.street}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress.city}, {order.selectedAddress.state}</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">Phone: {order.selectedAddress.phone}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-500">PIN code: {order.selectedAddress.pinCode}</p>
                        </div>
                    </li>
                </div>
            ))}
        </>
    );
}
