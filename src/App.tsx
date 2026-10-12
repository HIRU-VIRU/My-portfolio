import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

const MainContainer = lazy(() => import("./components/MainContainer"));
const MyWorks = lazy(() => import("./pages/MyWorks"));
const Play = lazy(() => import("./pages/Play"));
import { LoadingProvider } from "./context/LoadingProvider";
import { PageTransitionProvider } from "./context/PageTransition";

const App = () => {
  return (
    <BrowserRouter>
      <PageTransitionProvider>
        <Routes>
          <Route
            path="/"
            element={
              <LoadingProvider>
                <Suspense>
                  <MainContainer />
                </Suspense>
              </LoadingProvider>
            }
          />
          <Route
            path="/myworks"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <MyWorks />
              </Suspense>
            }
          />
          <Route
            path="/play"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Play />
              </Suspense>
            }
          />
        </Routes>
      </PageTransitionProvider>
      <Analytics />
    </BrowserRouter>
  );
};

export default App;
