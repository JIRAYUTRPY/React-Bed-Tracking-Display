import { Route, Routes } from "react-router-dom";
import Main from "./pages/main";
import Signin from "./pages/signin";
import { useAuthContext } from "./context/authentication";

function App() {
  const auth = useAuthContext();

  return (
    <Routes>
      {auth.isAuthenicated ? (
        <>
          <Route path="/">
            <Route index element={<Main />} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/">
            <Route index element={<Signin />} />
            <Route path="home" element={<Main />} />
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
