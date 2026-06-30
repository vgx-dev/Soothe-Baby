import { createBrowserRouter } from "react-router";
import { Landing } from "./components/Landing";
import { InteractiveCanvas } from "./components/InteractiveCanvas";
import { ProductHuntPreview } from "./components/ProductHuntPreview";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/play",
    Component: InteractiveCanvas,
  },
  {
    path: "/preview",
    Component: ProductHuntPreview,
  },
]);