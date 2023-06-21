// @refresh reload
import {
  Body,
  Head,
  Html,
  Meta,
  Scripts,
} from "solid-start";
import App from "./pages/app"
import "./root.css"

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <App />
        <Scripts />
      </Body>
    </Html>
  );
}
