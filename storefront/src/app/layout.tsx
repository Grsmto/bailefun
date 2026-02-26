import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import * as ObserverKit from "@maximebonhomme/observerkit-js"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

ObserverKit.init({
  apiKey: "ok_proj_b712058121ff46e2d36ca6b5d44aa130",
})

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="root relative">{props.children}</main>
      </body>
    </html>
  )
}
