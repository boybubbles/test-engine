import "./App.scss";
import Login from "./pages/Login/Login";
import QuizContainer from "./pages/QuizContainer/QuizContainer";
import { Route, BrowserRouter } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import Thankyou from "./pages/Thankyou/Thankyou";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/info" component={Welcome} />
        <Route exact path="/test" component={QuizContainer} />
        <Route exact path="/thankyou" component={Thankyou} />
      </BrowserRouter>
    </div>
  );
}

export default App;
