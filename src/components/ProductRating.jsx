import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

const ProductRating = function (props) {
    return (
        <div className="product-rating">
            {getStarIcons(props.rating)}
            <span className="rating-value">{props.rating.toFixed(1)}</span>
        </div>
    )
}

const getStarIcons = function (rating) {
    const starIcons = []

    const float = parseFloat(rating)

    const intPrecision = parseInt(float, 10)
    const floatPrecision = float - parseInt(float, 10)

    for (let i = 0; i < intPrecision; i++) {
        starIcons.push(<StarIcon />)
    }

    if (floatPrecision < .25) {
        starIcons.push(<StarOutlineIcon />)
    } else if (floatPrecision >= .75) {
        starIcons.push(<StarIcon />)
    } else {
        starIcons.push(<StarHalfIcon />)
    }

    for (let i = starIcons.length; i < 5; i++) {
        starIcons.push(<StarOutlineIcon />)
    }

    return starIcons
}

export default ProductRating

