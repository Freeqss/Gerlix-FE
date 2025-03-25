import { ReactNode, memo, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Harness from "../harness/Harness";
import MainPage from "../pages/MainPage";

const AnimatedRoutes = memo(() => {
  const getElement = useCallback((children: ReactNode) => <Harness>{children}</Harness>, []);

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={getElement(<MainPage />)} />{" "}
      </Routes>
    </>
  );
});

export const Router = memo(() => (
  <BrowserRouter basename="/">
    <AnimatedRoutes />
  </BrowserRouter>
));
