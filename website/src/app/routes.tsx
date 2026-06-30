import { useEffect } from "react";
import { createBrowserRouter, Outlet, useLocation } from "react-router";
import { MarketingPage } from "./App";
import { AppStart } from "./components/AppStart";
import { InteractiveCanvas } from "./components/InteractiveCanvas";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // `overflow-x: hidden` on html/body (index.html) forces overflow-y to
    // `auto` on both per spec, making <body> the real scroll container
    // instead of the window — so it must be reset directly here too.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", Component: MarketingPage },
      { path: "/play", Component: AppStart },
      { path: "/play/canvas", Component: InteractiveCanvas },
    ],
  },
]);
