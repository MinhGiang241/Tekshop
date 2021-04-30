import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/Theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./screens/Home";
import Product from "./screens/Product";
import Cart from "./screens/CartForm";
import CssBaseline from "@material-ui/core/CssBaseline";
import Checkout from "./screens/Checkout";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Profile from "./screens/Profile";
import OrderDetails from "./screens/OrderDetails";
import background from "./assets/images/background.jpg";
import { PublicRoute, PrivateRoute } from "./PublicAndPrivateRoute";
import { RouteComponentProps } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const [value, setValue] = useState<number>(0);
  const isAuthenticated = Boolean(
    useSelector((state: any) => state.userLogin.userInfo)
  );
  console.log("isAuthenticated", isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div
          style={{
            minHeight: 900,
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-no-repeat",
            backgroundSize: "cover",
            paddingBottom: "2rem",
          }}
        >
          <Header value={value} setValue={setValue} />

          <Route
            isAuthenticated={isAuthenticated}
            path="/"
            render={(routeProps: RouteComponentProps) => (
              <Home {...routeProps} />
            )}
            exact
          />
          <Route
            isAuthenticated={isAuthenticated}
            path="/product/:id"
            render={(routeProps: RouteComponentProps) => (
              <Product {...routeProps} />
            )}
            exact
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/cart/"
            render={(routeProps: RouteComponentProps) => (
              <Cart {...routeProps} />
            )}
            exact
          />

          <PublicRoute
            isAuthenticated={isAuthenticated}
            path="/signin"
            render={(routeProps: RouteComponentProps) => (
              <SignIn {...routeProps} setValue={setValue} />
            )}
            exact
          />
          <PublicRoute
            isAuthenticated={isAuthenticated}
            path="/signup"
            render={(routeProps: RouteComponentProps) => (
              <SignUp {...routeProps} setValue={setValue} />
            )}
            exact
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/profile"
            render={(routeProps: RouteComponentProps) => (
              <Profile {...routeProps} setValue={setValue} />
            )}
            exact
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/order/:id"
            render={(routeProps: RouteComponentProps) => (
              <OrderDetails {...routeProps} setValue={setValue} />
            )}
            exact
          />
          <PrivateRoute
            isAuthenticated={isAuthenticated}
            path="/checkout"
            render={(routeProps: RouteComponentProps) => (
              <Checkout {...routeProps} setValue={setValue} />
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
