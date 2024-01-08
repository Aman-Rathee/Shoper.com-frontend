import AdminProductList from "../features/admin/component/AdminProductList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";

function AdminHome() {
    return (
        <>
            <Navbar>
                <AdminProductList />
            </Navbar>
            <Footer />
        </>
    )
}

export default AdminHome;