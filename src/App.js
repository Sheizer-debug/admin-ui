import { Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './Landing';

function App() {
  return (
    <div className="App">
        <Switch>
          {/* switch helps choose the first matched path */}
          <Route exact path="/" component={Landing}/>
        </Switch>
    </div>
  );
}

export default App;
