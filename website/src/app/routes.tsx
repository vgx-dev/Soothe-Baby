import { createBrowserRouter } from "react-router";
import { MarketingPage } from "./App";
import { AppStart } from "./components/AppStart";
import { InteractiveCanvas } from "./components/InteractiveCanvas";

export const router = createBrowserRouter([
  { path: "/", Component: MarketingPage },
  { path: "/play", Component: AppStart },
  { path: "/play/canvas", Component: InteractiveCanvas },
]);
