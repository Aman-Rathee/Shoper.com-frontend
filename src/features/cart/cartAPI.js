
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts/' + itemId, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data: { id: itemId } })
  }
  );
}

export function resetCart() {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId()
    const items = response.data
    for (let item of items) {
      await deleteItemFromCart(item.id)
    }
    resolve({ status: 'success' })
  }
  );
}