import { useEffect } from "react"
import { firstLetterToUpperCase } from "../../utils/util"
import { Link } from "react-router-dom"

const Category = function (props) {
    useEffect(() => {
        props.loadThumbnail()
    }, [])

    return (
        <Link to={`/products?category=${props.item.title}`} className="category">
            <div className="thumbnail-container">
                <img className='thumbnail' src={props.item.thumbnail} />
            </div>
            <div className="info">
                <h3>{firstLetterToUpperCase(props.item.title)}</h3>
                <p>Checkout our latest {props.item.title} products!</p>
            </div>
        </Link>
    )
}

export default Category