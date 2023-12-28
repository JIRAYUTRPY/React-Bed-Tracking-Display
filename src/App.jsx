import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/signin";
import { useAuthContext } from "./context/authentication";

function App() {
  const auth = useAuthContext();

  return (
    <Routes>
      {auth.isAuthenicated ? (
        <>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/">
            <Route index element={<Signin />} />
            <Route path="home" element={<Home />} />
          </Route>
        </>
      )}
      {/* <Route path="/">
        <Route index element={<Signin />} />
      </Route> */}
    </Routes>
  );
}

export default App;
