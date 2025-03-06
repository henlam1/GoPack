import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./components/navigation/PublicLayout";
import privateRoutes from "./routes/privateRoutes";
import publicRoutes from "./routes/publicRoutes";
import PrivateWrapper from "./components/navigation/PrivateWrapper";
import PublicHomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import PrivateHomePage from "./pages/private/HomePage";
import PackingListPage from "./pages/private/PackingListPage";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          {/* PUBLIC ROUTES */}
          <Route element={<PublicLayout />}>
            <Route index element={<PublicHomePage />} />
            <Route path={publicRoutes.login} element={<LoginPage />} />
            <Route path={publicRoutes.register} element={<RegisterPage />} />
          </Route>

          {/* PRIVATE ROUTES */}
          <Route element={<PrivateWrapper />}>
            <Route path={privateRoutes.home} element={<PrivateHomePage />} />
            <Route
              path={privateRoutes.createPackingLists}
              element={<PackingListPage />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
