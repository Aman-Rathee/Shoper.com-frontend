import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAsync, selectError, selectPasswordReset } from '../authSlice';

export default function ResetPassword() {

    const query = new URLSearchParams(window.location.search)
    const token = query.get('token')
    const email = query.get('email')

    const passwordReset = useSelector(selectPasswordReset)
    const error = useSelector(selectError)
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <>
            {(email && token) ? <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-themeDrkTxtClr">
                        Enter your new password
                    </h2>
                </div>

                <div className="mt-10 mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
                        dispatch(resetPasswordAsync({ email, token, password: data.password }))
                    })}
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    New Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    {...register("password", {
                                        required: "password is required", pattern: {
                                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                                            message: `- at least 8 characters\n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number`
                                        }
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                />
                                {errors.password && (<p className='text-red-600 text-sm'>{errors.password.message} </p>)}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    {...register("confirmPassword", {
                                        required: "confirm password is required",
                                        validate: (value, formValues) => value === formValues.password || 'password not matching'
                                    })}
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                />
                                {errors.confirmPassword && (<p className='text-red-600 text-sm'>{errors.confirmPassword.message} </p>)}
                                {passwordReset && (<p className='text-green-600 text-sm'>Password reset successfully. </p>)}
                                {error && (<p className='text-red-600 text-sm'>Bad Request </p>)}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-themeBtnColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Reset password
                            </button>
                        </div>
                    </form>

                </div>
            </div> : <p>Incorrect Link</p>}
        </>
    );
}
