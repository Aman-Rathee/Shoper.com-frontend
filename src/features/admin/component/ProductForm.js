import React, { useEffect, useState } from 'react'
import { clearSelectedProduct, createProductAsync, fetchProductByIdAsync, selectBrands, selectCategory, selectProductById, updateProductAsync } from '../../productlist/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import Modal from '../../common/Modal'
import { useAlert } from 'react-alert'




const ProductForm = () => {
  const [openModal, setOpenModal] = useState(false)

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const brands = useSelector(selectBrands)
  const category = useSelector(selectCategory)
  const dispatch = useDispatch()
  const params = useParams()
  const selectedProduct = useSelector(selectProductById)
  const alert = useAlert();

  const colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400', id: 'white' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400', id: 'gray' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900', id: 'black' },
  ];

  const sizes = [
    { name: 'XXS', inStock: true, id: 'xxs' },
    { name: 'XS', inStock: true, id: 'xs' },
    { name: 'S', inStock: true, id: 's' },
    { name: 'M', inStock: true, id: 'm' },
    { name: 'L', inStock: true, id: 'l' },
    { name: 'XL', inStock: true, id: 'xl' },
    { name: '2XL', inStock: true, id: '2xl' },
    { name: '3XL', inStock: true, id: '3xl' },
  ];

  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    }
    else {
      dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue('title', selectedProduct.title);
      setValue('description', selectedProduct.description);
      setValue('price', selectedProduct.price);
      setValue('discountPercentage', selectedProduct.discountPercentage)
      setValue('stock', selectedProduct.stock);
      setValue('brand', selectedProduct.brand);
      setValue('category', selectedProduct.category);
      setValue('thumbnail', selectedProduct.thumbnail);
      setValue('image1', selectedProduct.images[0]);
      setValue('image2', selectedProduct.images[1]);
      setValue('image3', selectedProduct.images[2]);
      setValue('image4', selectedProduct.images[3]);
      setValue('highlight1', selectedProduct.highlights[0]);
      setValue('highlight2', selectedProduct.highlights[1]);
      setValue('highlight3', selectedProduct.highlights[2]);
      setValue('highlight4', selectedProduct.highlights[3]);
      setValue('sizes', selectedProduct.sizes.map(size => size.id));
      setValue('colors', selectedProduct.colors.map(color => color.id));

    }
  }, [selectedProduct, params.id, setValue]);

  const handleDelete = () => {
    const product = { ...selectedProduct }
    product.deleted = true
    dispatch(updateProductAsync(product))
  }



  return (
    <>
      <form noValidate onSubmit={handleSubmit((data) => {
        const product = { ...data };
        product.images = [product.image1, product.image2, product.image3, product.image4, product.thumbnail]
        product.rating = 0
        product.highlights = [product.highlight1, product.highlight2, product.highlight3, product.highlight4];
        product.colors = product.colors.map(color => colors.find(clr => clr.id === color));
        product.sizes = product.sizes.map(size => sizes.find(sz => sz.id === size));
        delete product['image1']
        delete product['image2']
        delete product['image3']
        delete product['image4']
        product.price = +product.price
        product.discountPercentage = +product.discountPercentage
        product.stock = +product.stock

        if (params.id) {
          product.id = params.id
          product.rating = selectedProduct.rating || 0;
          dispatch(updateProductAsync({ product, alert }));
          reset()
        }
        else {
          dispatch(createProductAsync({ product, alert }));
          reset()
        }

      })} >
        <div className="space-y-12 bg-white p-14">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold leading-7 text-gray-900">Add Product</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              {selectedProduct && selectedProduct.deleted && <h2 className='text-red-500 sm:col-span-4'>This product is deleted</h2>}
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('title', {
                        required: 'Name is required',
                      })}
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register('description', {
                      required: 'Description is required'
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-themeBluClr sm:text-sm sm:leading-6"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Write few sentences about product.</p>
              </div>

              <div className="col-span-2">
                <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                  Brand
                </label>
                <div className="mt-2">
                  <select className='rounded-md focus:ring-themeBluClr appearance-none '
                    {...register('brand', {
                      required: 'Brand is required'
                    })}>
                    <option disabled selected value="">--choose brand--</option>
                    {brands.map((brand) => <option key={brand.value} value={brand.value}>{brand.label} </option>)}
                  </select>
                </div>
              </div>

              <div className="col-span-2">
                <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                  Category
                </label>
                <div className="mt-2">
                  <select className='rounded-md focus:ring-themeBluClr'
                    {...register('category', {
                      required: 'Category is required'
                    })}>
                    <option disabled selected value="">--choose category--</option>
                    {category.map((category) => <option key={category.value} value={category.value}>{category.label} </option>)}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="colors" className="block text-sm font-medium leading-6 text-gray-900">
                  Colors
                </label>
                <div className="mt-2">
                  {colors.map((color) => <span> <input className='text-themeBluClr focus:ring-themeBluClr'
                    {...register('colors', {
                    })}
                    type='checkbox' key={color.id} value={color.id} />{color.name}</span>)}
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="sizes" className="block text-sm font-medium leading-6 text-gray-900">
                  Sizes
                </label>
                <div className="mt-2">
                  {sizes.map((size) => <span> <input className='text-themeBluClr focus:ring-themeBluClr'
                    {...register('sizes', {
                    })}
                    type='checkbox' key={size.id} value={size.id} />{size.name}</span>)}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr">
                    <input
                      type="number"
                      {...register('price', {
                        required: 'Price is required',
                        min: 0,
                        max: 100000,
                      })}
                      id="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                  DiscountPercentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr">
                    <input
                      type="number"
                      {...register('discountPercentage', {
                        required: 'DiscountPercentage is required',
                        min: 0,
                        max: 99
                      })}
                      id="discountPercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="number"
                      {...register('stock', {
                        required: 'Stock is required',
                        min: 0,
                      })}
                      id="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                  Thumbnail
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('thumbnail', {
                        required: 'Thumbnail is required',
                      })}
                      id="thumbnail"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('image1', {
                        required: 'Image1 is required',
                      })}
                      id="image1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('image2', {
                        required: 'Image2 is required',
                      })}
                      id="image2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('image3', {
                        required: 'Image3 is required',
                      })}
                      id="image3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                  Image 4
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('image4', {
                        required: 'Image4 is required',
                      })}
                      id="image4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="highlight1" className="block text-sm font-medium leading-6 text-gray-900">
                  Highlight 1
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('highlight1', {
                      })}
                      id="highlight1"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="highlight2" className="block text-sm font-medium leading-6 text-gray-900">
                  Highlight 2
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('highlight2', {
                      })}
                      id="highlight2"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="highlight3" className="block text-sm font-medium leading-6 text-gray-900">
                  Highlight 3
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('highlight3', {
                      })}
                      id="highlight3"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="highlight4" className="block text-sm font-medium leading-6 text-gray-900">
                  Highlight 4
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-themeBluClr ">
                    <input
                      type="text"
                      {...register('highlight4', {
                      })}
                      id="highlight4"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-themeBluClr focus:ring-themeBluClr"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-themeBluClr focus:ring-themeBluClr"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="candidates" className="font-medium text-gray-900">
                        Candidates
                      </label>
                      <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-themeBluClr focus:ring-themeBluClr"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div> */}
        </div>

        <div className="mt-6 mb-16 mr-10 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          {selectedProduct && !selectedProduct.deleted && <button
            onClick={(e) => { e.preventDefault(); setOpenModal(true) }}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete
          </button>}
          <button
            type="submit"
            className="rounded-md bg-themeBtnColor px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-themeBtnColorHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Save
          </button>
        </div>
      </form>
      {selectedProduct && selectedProduct.deleted && <h2 className='text-red-500 sm:col-span-4'>This product is deleted</h2>}
      {selectedProduct && <Modal title={`Delete (${selectedProduct.title})`} message='Are you sure you want to delete this product.' action='Delete' cancelOption='cancel' dangerAction={handleDelete} cancelAction={() => setOpenModal(false)} showModal={openModal} />}
    </>
  )
}

export default ProductForm
