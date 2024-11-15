import { Route, Routes } from "react-router-dom";
import Header from "./components/fragments/header";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider, useUser } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

const AppRoutes = () => {
  const { authedUser } = useUser(); 

  return (
    <>
      <Header />
      <Routes>
        {authedUser === null ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/products" element={<Products />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;
