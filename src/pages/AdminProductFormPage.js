import ProductForm from "../features/admin/component/ProductForm"
import Footer from "../features/common/Footer"
import Navbar from "../features/navbar/Navbar"

function AdminProductFormPage() {
    return (
        <>
            <Navbar>
                <ProductForm />
            </Navbar>
            <Footer />
        </>
    )
}

export default AdminProductFormPage
