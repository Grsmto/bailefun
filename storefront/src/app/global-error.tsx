"use client";

import { useEffect } from "react"
import * as ObserverKit from "@maximebonhomme/observerkit-js"

export default function GlobalError({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        ObserverKit.captureException(error);
    }, [error]);
    return (
        <html>
            <body>
                <h1>Something went wrong!</h1>
            </body>
        </html>
    );
}