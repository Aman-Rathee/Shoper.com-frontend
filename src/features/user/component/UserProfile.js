import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';


export default function UserProfile() {
    const dispatch = useDispatch();
    const userInfo = useSelector(selectUserInfo);
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
    const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
    const [showAddAddressForm, setShowAddAddressForm] = useState(false)


    const handleEditForm = (index) => {
        setSelectedEditIndex(index)
        const address = userInfo.addresses[index]
        setValue('editName', address.name)
        setValue('editEmail', address.email)
        setValue('editPhone', address.phone)
        setValue('editStreet', address.street)
        setValue('editCity', address.city)
        setValue('editState', address.state)
        setValue('editPinCode', address.pinCode)
    }

    const handleEdit = (addressUpdate, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] } //for shallow copy issue
        newUser.addresses.splice(index, 1, addressUpdate)
        dispatch(updateUserAsync(newUser))
        setSelectedEditIndex(-1)
    }

    const handleRemove = (e, index) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses] } //for shallow copy issue
        newUser.addresses.splice(index, 1)
        dispatch(updateUserAsync(newUser))
    }

    const handleAdd = (address) => {
        const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] }
        dispatch(updateUserAsync(newUser))
        setShowAddAddressForm(false)
    }


    return (
        <>
            <div className="mx-auto mt-6 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* <h1 className="text-4xl font-bold pt-8 tracking-tight text-gray-900">Name : {userInfo.name ? userInfo.name : 'New User'} </h1> */}
                <h3 className="text-xl font-bold pt-8 tracking-tight text-red-900">Email : {userInfo.email} </h3>
                {userInfo.role === 'admin' && <h3 className="text-xl font-bold pt-8 tracking-tight text-red-900">Role : {userInfo.role} </h3>}
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <button onClick={e => { setShowAddAddressForm(true); setSelectedEditIndex(-1) }} type="submit" className="rounded-md my-5 bg-themeBtnColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" >
                        Add New Address
                    </button>
                    {showAddAddressForm ? (
                        <form noValidate onSubmit={handleSubmit((data) => {
                            handleAdd(data)
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
                                                    type="number"
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
                                    <button onClick={(e) => setShowAddAddressForm(false)} type="cancel" className="px-3 py-2 text-sm font-semibold text-gray-600  " >
                                        Cancel
                                    </button>
                                    <button className="rounded-md bg-themeBtnColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" >
                                        Add Address
                                    </button>
                                </div>
                            </div>
                        </form>) : null}


                    <p className="mt-0.5 font-bold text-center text-themeDrkTxtClr pt-10">Your Addresses.</p>
                    {userInfo.addresses.map((address, index) => (
                        <div key={index}>
                            {selectedEditIndex === index ?
                                <form noValidate onSubmit={handleSubmit((data) => {
                                    handleEdit(data, index)
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
                                                            {...register('editName', { required: 'Name is required' })}
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
                                                            {...register('editEmail', { required: 'Email is required' })}
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
                                                            {...register('editPhone', { required: 'Phone no is required' })}
                                                            type="number"
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
                                                            {...register('editStreet', { required: 'Street address is required' })}
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
                                                            {...register('editCity', { required: 'City is required' })}
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
                                                            {...register('editState', { required: 'State is required' })}
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
                                                            {...register('editPinCode', { required: 'PinCode is required' })}
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
                                            <button onClick={(e) => setSelectedEditIndex(-1)} type="cancel" className="px-3 py-2 text-sm font-semibold text-gray-600  " >
                                                Cancel
                                            </button>
                                            <button type="submit" className="rounded-md bg-themeBtnColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" >
                                                Edit Address
                                            </button>
                                        </div>
                                    </div>
                                </form> : null}
                            <li className="flex justify-between gap-x-6 p-5 ">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.city}, {address.state}</p>
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.email}</p>
                                    </div>
                                </div>
                                <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                                    <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                                    <p className="mt-1 text-xs leading-5 text-gray-500">PIN code: {address.pinCode}</p>
                                    <div className='flex gap-7'>
                                        <button onClick={(e) => handleRemove(e, index)} type="button" className="font-medium text-themeOrngClr" >
                                            Delete
                                        </button>
                                        <button onClick={(e) => { setShowAddAddressForm(false); handleEditForm(index) }} type="button" className="font-medium text-themeTxtClr" >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
