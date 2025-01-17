import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom"; // BrowserRouter'ı ekliyoruz
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-screen">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
