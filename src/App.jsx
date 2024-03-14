import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.scss";
import "bootstrap/scss/bootstrap.scss";
import { ScrollRestoration } from "react-router-dom";
import ScrollToTop from "./components/ScrollRestore/ScrollRestore";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <wc-toast theme="light"></wc-toast>
      <AppRoutes />
    </div>
  );
}

export default App;
