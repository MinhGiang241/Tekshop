import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home";
import Product from "./screens/Product";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Route
          path="/"
          render={(routeProps) => <Home {...routeProps} />}
          exact
        />
        <Route
          path="/product/:id"
          render={(routeProps) => <Product {...routeProps} />}
          exact
        />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
