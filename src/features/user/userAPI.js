
export function fetchLoggedInUserOrder() {
  return new Promise(async (resolve) => {
    const response = await fetch('/orders/my')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('/user/my')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('/user/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  }
  );
}
