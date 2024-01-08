
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPasswordRequestAsync, selectEmailSent } from '../authSlice';

export default function ForgotPassword() {

    const emailSent = useSelector(selectEmailSent)
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-themeDrkTxtClr">
                        Enter your email to reset password
                    </h2>
                </div>

                <div className="mt-10 mx-auto sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
                        dispatch(resetPasswordRequestAsync(data.email))
                    })}
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email", {
                                        required: "Email is required", pattern: {
                                            /* eslint-disable-next-line no-useless-escape */
                                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                            message: "please enter a valid email"
                                        }
                                    })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                                />
                                {errors.email && (<p className='text-red-600 text-sm'>{errors.email.message} </p>)}
                                {emailSent && (<p className='text-green-600 text-sm'>Email send successfully. </p>)}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-themeBtnColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                Send Email
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Send me back to{' '}
                        <Link to="/login" className="font-semibold leading-6 text-themeTxtClr">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
