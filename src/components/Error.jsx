import { useRouteError } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Error(props) {
  const error = useRouteError();

  return (
    <div className="vh-container vh-container--dark error">
      <div className="error__container container">
        <div className="error_content">
          {error.status && (
            <h2 className="status">
              {error.statusText} ({error.status})
            </h2>
          )}
          <p className="message">{error.message}</p>
        </div>
      </div>
    </div>
  );
}
