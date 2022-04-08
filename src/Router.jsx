import { BrowserRouter, Route, Switch } from "react-router-dom";
import CoinDetail from "./routes/CoinDetail";
import Coins from "./routes/Coins";

function Router({ toggleMode }) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path={"/"} exact component={() => Coins({ toggleMode })} />
        <Route path={"/:coinId"} component={() => CoinDetail({ toggleMode })} />
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
