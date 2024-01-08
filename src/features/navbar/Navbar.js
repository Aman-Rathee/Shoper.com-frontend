import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectItems } from '../cart/cartSlice'
import { selectUserInfo } from '../user/userSlice'
import logo from '../../photos/shoper.com.png'


const navigation = [
    { name: 'Products', link: '/', current: true, user: true },
    { name: 'Admin', link: '/admin', current: false, admin: true },
    { name: 'Orders', link: '/admin/orders', current: false, admin: true },
]
const userNavigation = [
    { name: 'My Profile', link: '/profile' },
    { name: 'My Orders', link: '/my-orders' },
    { name: 'Sign out', link: '/logout' },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Navbar({ children }) {
    const items = useSelector(selectItems)
    const userInfo = useSelector(selectUserInfo)

    return (
        <>
            {userInfo && <div className="min-h-full">
                <Disclosure as="nav" className="bg-[#366869]">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-4 lg:px-6">
                                <div className="flex h-20 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8 w-40"
                                                src={logo}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                {navigation.map((item) =>
                                                    item[userInfo.role] ? (<Link
                                                        key={item.name}
                                                        to={item.link}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-gray-900 text-white'
                                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-sm font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </Link>) : null
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">

                                            <Link to="/cart" className='rounded-full'>
                                                <button
                                                    type="button"
                                                    className="relative rounded-full shadow-insetShadow bg-white p-1 text-themeOrngClr hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                                                >
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">View notifications</span>
                                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </Link>
                                            {items.length > 0 && <span className="inline-flex items-center mb-7 -ml-3 z-10 rounded-lg bg-red-50 px-2 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                                {items.length}
                                            </span>}

                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                                                        <span className="absolute -inset-1.5" />
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        {userNavigation.map((item) => (
                                                            <Menu.Item key={item.name}>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to={item.link}
                                                                        className={classNames(
                                                                            active ? 'bg-gray-100' : '',
                                                                            'block px-4 py-2 text-sm text-gray-700'
                                                                        )}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>
                                                        ))}
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                    {navigation.map((item) => (
                                        item[userInfo.role] ? (<Link
                                            key={item.name}
                                            as="a"
                                            to={item.link}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block rounded-md px-3 py-2 text-base font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>) : null
                                    ))}
                                </div>
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    {/* <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <img className="h-10 w-10 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
                                        </div>
                                        <div className="ml-3">
                                            name and email these should come from userInfo 
                                            <div className="text-base font-medium leading-none text-white">{userInfo.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{userInfo.email}</div>
                                        </div>
                                        <Link to="/cart">
                                            <button
                                                type="button"
                                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">View notifications</span>
                                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </Link>
                                        {items.length > 0 && <span className="inline-flex items-center mb-7 -ml-3 z-10 rounded-lg bg-red-50 px-2 py-0 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                            {items.length}
                                        </span>}
                                    </div> */}
                                    <div className="mt-3 space-y-1 px-2">
                                        {userNavigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                as="a"
                                                to={item.link}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl text-center px-4 py-2 sm:px-6 lg:px-8">
                        <h1 className="text-1xl font-bold tracking-tight text-themeOrngClr">Shoper.com: Your Ultimate Online Marketplace</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 ">{children}</div>
                </main>
            </div>}
        </>
    )
}

export default Navbar;