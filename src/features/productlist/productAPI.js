

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/' + id)
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchAllProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category": ["smartphone", "laptops"]}
  // sort = {.sort:"price", _order= "desc"}
  // pagination = {_page:"1", _limit=10}

  let queryString = '';
  for (let key in filter) {
    const categoryValue = filter[key];
    if (categoryValue.length) {
      queryString += `${key}=${categoryValue}&`
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  if (admin) {
    queryString += `admin=true`
  }
  return new Promise(async (resolve) => {
    const response = await fetch('/products?' + queryString)
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    resolve({ data: { products: data, totalItems: +totalItems } })
  }
  );
}

export function fetchAllCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch('/category')
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('/brands')
    const data = await response.json()
    resolve({ data })
  }
  );
}