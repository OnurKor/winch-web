import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="h-screen">
        <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
