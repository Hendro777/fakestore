import { useOutletContext } from "react-router-dom"

const ProductDescription = function() {
    const product = useOutletContext()

    return(
        <p className="description">{product.description}</p>
    )
}

export default ProductDescription