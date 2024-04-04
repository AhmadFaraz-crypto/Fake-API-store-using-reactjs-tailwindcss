import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetailPage from "./pages/ProductDerailPage";

export default function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route path="/product/:id">
            <ProductDetailPage />
          </Route>
          <Route path="/">
            <ProductListPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}
