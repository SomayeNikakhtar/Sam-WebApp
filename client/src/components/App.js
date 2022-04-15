import { BrowserRouter, Route, Switch } from "react-router-dom";
import AdDetails from "./AdDetails";
import AdsList from "./AdsList";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import MyAds from "./MyAds";
import MyFavs from "./MyFavs";
import MyMsgs from "./MyMsgs";
import Post from "./Post";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { UserProvider } from "./UserContext";

function App() {
    return(
        <BrowserRouter>
            <GlobalStyles/>
            <UserProvider>
            <Header />
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/advertisement-details/:id">
                    <AdDetails />
                </Route>
                <Route exact path="/new">
                    <Post />
                </Route>
                <Route exact path="/motreal-ads">
                    <AdsList />
                </Route>
                <Route exact path="/sign-up">
                    <SignUp />
                </Route>
                <Route exact path="/sign-in">
                    <SignIn />
                </Route>
                <Route exact path="/my-messages">
                    <MyMsgs />
                </Route>
                <Route exact path="/my-ads">
                    <MyAds />
                </Route>
                <Route exact path="/my-favorites">
                    <MyFavs />
                </Route>
            </Switch>
            <Footer/>
            </UserProvider>
        </BrowserRouter>
    )
}
export default App;