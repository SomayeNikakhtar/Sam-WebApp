import { BrowserRouter, Route, Switch } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

function App() {
    return(
        <BrowserRouter>
            <GlobalStyles/>
                <Switch>
                    <Route exact path="/">
                        {/* <HomePage /> */}
                    </Route>
                </Switch>

        </BrowserRouter>
    )
}