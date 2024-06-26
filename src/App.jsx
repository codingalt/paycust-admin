import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.scss";
import { ScrollRestoration } from "react-router-dom";
import ScrollToTop from "./components/ScrollRestore/ScrollRestore";
import { MainProvider } from "./context/MainContext";

function App() {
  return (
    <MainProvider>
      <div className="App">
        <ScrollToTop />
        <wc-toast theme="light"></wc-toast>
        <AppRoutes />
      </div>
    </MainProvider>
  );
}

export default App;
