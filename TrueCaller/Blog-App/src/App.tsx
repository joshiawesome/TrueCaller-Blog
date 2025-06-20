import { store } from "./store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Header } from "./components/reusables/Header";
import { HomePage } from "./components/content/HomePage";
import { ArticlePage } from "./components/content/Article/ArticlePage";

import { DataFetchService } from "./services/DataFetchService";

import "./App.css";

function App() {
  useEffect(() => {
    // calling the fetchData() method on app mount
    DataFetchService.fetchData();

    // calling the fetchData() on pressing the browser back button
    const handleBackButton = () => {
      DataFetchService.fetchData();
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="blog-app-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
