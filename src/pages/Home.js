import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/productlist/component/ProductList";
import Footer from "../features/common/Footer";

function Home() {
    return (
        <>
            <Navbar>
                <ProductList></ProductList>
            </Navbar>
            <Footer />
        </>
    )
}

export default Home;