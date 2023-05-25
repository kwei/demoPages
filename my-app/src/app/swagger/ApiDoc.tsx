import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import "./swagger-ui.css";

export default function ApiDoc({url}: {url: string}) {
    return (
        <SwaggerUI url={url} />
    )
}