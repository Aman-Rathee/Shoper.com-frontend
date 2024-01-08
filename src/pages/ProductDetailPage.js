import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"
import ProductDetail from "../features/productlist/component/ProductDetail"

function ProductDetailPage() {
  return (
    <>
      <Navbar>
        <ProductDetail />
      </Navbar>
      <Footer />
    </>
  )
}

export default ProductDetailPage
