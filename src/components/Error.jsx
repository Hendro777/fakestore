import { useRouteError } from "react-router-dom"

export default function Error(props) {
    const error = useRouteError()

    return(
        <div className="error">{error.message}</div>
    )
}