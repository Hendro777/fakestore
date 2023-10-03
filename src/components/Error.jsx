import { useRouteError } from "react-router-dom"

export default function Error(props) {
    const error = useRouteError()

    return (
        <div className="vh-container error">
            <div className="container">
                {error.status &&
                    <h2 className="status">
                        {error.statusText} ({error.status})
                    </h2>}
                <p className="message">{error.message}</p>
            </div>
        </div>
    )
}