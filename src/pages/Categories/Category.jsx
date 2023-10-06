import { useEffect } from "react"
import { firstLetterToUpperCase } from "../../utils/util"
import { Link } from "react-router-dom"

const Category = function (props) {
    return (
        <Link to={`/products?category=${props.title}`} className="category">
            <div className="thumbnail-container">
                <img className='thumbnail' src={props.thumbnail} />
            </div>
            <div className="info">
                <h3>{firstLetterToUpperCase(props.title)}</h3>
                <p>Checkout our latest {props.title} products!</p>
            </div>
        </Link>
    )
}

export default Category