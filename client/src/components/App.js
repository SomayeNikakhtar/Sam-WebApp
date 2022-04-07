import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdDetails from "./AdDetails";
import GlobalStyles from "./GlobalStyles";

function App() {
    return(
        <BrowserRouter>
            <GlobalStyles/>
                <Switch>
                    <Route exact path="/">
                        {/* <HomePage /> */}
                    </Route>
                    <Route exact path="/advertisement-details/:id">
                        <AdDetails />
                    </Route>
                </Switch>

        </BrowserRouter>
    )
}
export default App;