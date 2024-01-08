import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemFromCartAsync, selectItems, updateCartAsync, } from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import { createOrderAsync, selectCurrentOrder } from '../features/orders/orderSlice';
import { selectUserInfo, updateUserAsync } from '../features/user/userSlice';



function Checkout() {
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const user = useSelector(selectUserInfo);
    const currentOrder = useSelector(selectCurrentOrder)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null)

    const items = useSelector(selectItems);
    const totalAmount = items.reduce((amount, item) => item.product.discountedPrice * item.quantity + amount, 0)
    const totalItems = items.reduce((total, item) => item.quantity + total, 0)

    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }))
    }

    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }

    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value])
    }
    const handlePayment = (e) => {
        setPaymentMethod(e.target.value)
    }
    const handleOrder = (e) => {
        if (selectedAddress && paymentMethod) {
            const order = { items, totalAmount, totalItems, user: user.id, paymentMethod, selectedAddress, status: 'pending' }
            dispatch(createOrderAsync(order))
        }
        else {
            alert('Enter Address and Payment method')
        }
    }




    return (
        <>
            {!items.length > 0 && <Navigate to='/' replace={true} />}
            {currentOrder && currentOrder.paymentMethod === 'cash' && <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />}
            {currentOrder && currentOrder.paymentMethod === 'card' && <Navigate to={`/stripe-checkout/`} replace={true} />}
            <div className='mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3 mb-40 bg-white px-4">
                        <form noValidate onSubmit={handleSubmit((data) => {
                            dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
                            reset()
                        })} >
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-xl mt-5 font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', { required: 'Name is required' })}
                                                    id="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                                />
                                                {errors.name && (<p className='text-red-500'>{errors.name.message}</p>)}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: 'Email is required' })}
                                                    type="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500">{errors.email.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone no.
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    {...register('phone', { required: 'Phone no is required' })}
                                                    type="tel"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500">{errors.phone.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('street', { required: 'Street address is required' })}
                                                    id="street"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                                />
                                                {errors.street && (
                                                    <p className="text-red-500">
                                                        {errors.street.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', { required: 'City is required' })}
                                                    id="city"
                                                    autoComplete="address-level2"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                                />
                                                {errors.city && (
                                                    <p className="text-red-500">{errors.city.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state', { required: 'State is required' })}
                                                    id="state"
                                                    autoComplete="address-level1"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                                />
                                                {errors.state && (
                                                    <p className="text-red-500">{errors.state.message}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                Pin code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pinCode', { required: 'PinCode is required' })}
                                                    id="pinCode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                                />
                                                {errors.pinCode && (
                                                    <p className="text-red-500">
                                                        {errors.pinCode.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                        Reset
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-md bg-themeBtnColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        Add Address
                                    </button>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Addresses</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose existing addresses.
                                    </p>
                                    <ul className="divide-y divide-gray-100">
                                        {user.addresses.map((address, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 p-5 ">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input
                                                        onChange={handleAddress}
                                                        name="address"
                                                        type="radio"
                                                        value={index}
                                                        className="h-4 w-4 border-gray-300 text-themeBluClr focus:ring-themeBluClr"
                                                    />
                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}, {address.state}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                                                    <p className="mt-1 text-xs leading-5 text-gray-500">PIN code: {address.pinCode}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">
                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        onChange={handlePayment}
                                                        value={'cash'}
                                                        type="radio"
                                                        checked={paymentMethod === "cash"}
                                                        className="h-4 w-4 border-gray-300 text-themeBluClr focus:ring-themeBluClr"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payments"
                                                        onChange={handlePayment}
                                                        checked={paymentMethod === "card"}
                                                        value={'card'}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-themeBluClr focus:ring-themeBluClr"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card
                                                    </label>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="mx-auto mt-16 bg-white max-w-7xl px-4 sm:px-6 lg:px-2">
                            <h1 className="text-4xl font-bold pt-8 text-center tracking-tight text-themeBluClr">Cart</h1>
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
                                                            <select className="text-gray-700 border-themeBluClr  rounded-md focus:ring-themeBluClr  " onChange={(e) => handleQuantity(e, item)} value={item.quantity} >
                                                                <option className='p-0' value="1">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                                <option value="6">6</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                onClick={e => handleRemove(e, item.id)}
                                                                type="button"
                                                                className="font-medium text-themeOrngClr "
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
                                    <div
                                        onClick={handleOrder}
                                        className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-themeBtnColor px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-themeBtnColorHover"
                                    >
                                        Order Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-themeOrngClr"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout
