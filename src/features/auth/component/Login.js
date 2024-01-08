import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { loginUserAsync, selectError, selectLoggedInUser, } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const user = useSelector(selectLoggedInUser)
  const { register, handleSubmit, formState: { errors } } = useForm();


  return (
    <>
      {user && <Navigate to='/' replace={true} />}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-themeDrkTxtClr">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full mx-auto sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
            dispatch(loginUserAsync({ email: data.email, password: data.password }))
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
                    required: "email is required", pattern: {
                      /* eslint-disable-next-line no-useless-escape */
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "please enter a valid email"
                    }
                  })}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                />
                {errors.email && (<p className='text-red-600 text-sm'>{errors.email.message} </p>)}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-semibold text-themeTxtClr">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "password is required",
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                />
                {errors.password && (<p className='text-red-600 text-sm'>{errors.password.message} </p>)}
              </div>
              {error && (<p className='text-red-600 text-sm'>{error || error.message} </p>)}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-themeBtnColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Create an account?{' '}
            <Link to="/signup" className="font-semibold leading-6 text-themeTxtClr ">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
