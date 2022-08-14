import "./App.scss";
import QuizContainer from "./pages/QuizContainer/QuizContainer";
import Welcome from "./pages/Welcome/Welcome";
import Thankyou from "./pages/Thankyou/Thankyou";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/info" component={Welcome} />
          <Route exact path="/test" component={QuizContainer} />
          <Route exact path="/thankyou" component={Thankyou} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
