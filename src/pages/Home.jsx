import { NavLink } from "react-router-dom"
import shoppingCart from "../assets/black-friday-elements-assortment.jpg"

const Home = function () {
    return (
        <main className="home vh-container">
            <NavLink className="home__navlink" to="products">
                    <section className="intro section section--dark">
                        <div className="container intro__container">
                            <h2 className="intro__text">you want it? we have it.</h2>
                            <h1 className="intro__text">What will your next order be like?</h1>
                            <h3 className="intro__text">Discover the newest streetfashion and the best electronics for the lowest prices.</h3>
                        </div>
                    </section>

                    <div className="home__image">
                    </div>
            </NavLink>
        </main>
    )
}

export default Home