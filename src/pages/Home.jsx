import { NavLink } from "react-router-dom"
import shoppingCart from "../assets/black-friday-elements-assortment.jpg"

const Home = function () {
    return (
        <main className="home">
            <NavLink className="navlink" to="products?page=1">
                <div className="vh-container">
                    <section className="intro">
                        <h2>you want it? we have it.</h2>
                        <h1>What will your next order be like?</h1>
                        <h3>Discover the newest streetfashion and the best electronics for the lowest prices.</h3>
                    </section>

                    <div className="img-container">
                    </div>
                </div>
            </NavLink>
        </main>
    )
}

export default Home