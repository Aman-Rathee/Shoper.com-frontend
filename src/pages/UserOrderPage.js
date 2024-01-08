import Navbar from "../features/navbar/Navbar"
import UserOrders from "../features/user/component/UserOrders"
import Footer from "../features/common/Footer";


function UserOrderPage() {
  return (
    <>
      <Navbar>
        <UserOrders />
      </Navbar>
      <Footer />
    </>
  )
}

export default UserOrderPage
