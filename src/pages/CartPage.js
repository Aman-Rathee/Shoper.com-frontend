import Cart from "../features/cart/Cart"
import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"

function CartPage() {
  return (
    <>
      <Navbar>
        <Cart />
      </Navbar>
      <Footer />
    </>
  )
}

export default CartPage
