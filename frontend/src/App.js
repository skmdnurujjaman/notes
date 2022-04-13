/** @format */

import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";

function ErrorHandler({ error }) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <ErrorBoundary FallbackComponent={ErrorHandler}>
      <BrowserRouter>
        <Header setSearch={setSearch} />
        <main>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="/login" exact element={<LoginScreen />} />
            <Route path="/register" exact element={<RegisterScreen />} />
            <Route path="/createnote" exact element={<CreateNote />} />
            <Route path="/note/:id" element={<SingleNote />} />
            <Route path="/mynotes" element={<MyNotes search={search} />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
