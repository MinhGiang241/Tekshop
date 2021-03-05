import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Cart from "./screens/Cart";
import Login from "./screens/Login";
import Register from "./screens/Register";

function App() {
  const [value, setValue] = useState<number>(0);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header value={value} setValue={setValue} />
        <div style={{ minHeight: 500 }}>
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
          <Route
            path="/cart/"
            render={(routeProps) => <Cart {...routeProps} />}
            exact
          />
          <Route
            path="/cart/:id"
            render={(routeProps) => <Cart {...routeProps} />}
            exact
          />
          <Route
            path="/signin"
            render={(routeProps) => (
              <Login {...routeProps} value={value} setValue={setValue} />
            )}
            exact
          />
          <Route
            path="/signup"
            render={(routeProps) => (
              <Register {...routeProps} value={value} setValue={setValue} />
            )}
            exact
          />
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
