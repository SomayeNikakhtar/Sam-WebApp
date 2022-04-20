import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AdProvider } from "./AdContext";
import AdDetails from "./AdDetails";
import AdsList from "./AdsList";
import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import { MsgProvider } from "./MsgContext";
import MyAds from "./MyAds";
import MyFavs from "./MyFavs";
import MyMsgs from "./MyMsgs";
import Post from "./Post";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleConversations from "./SingleConversation";
import { UserProvider } from "./UserContext";
import en from 'javascript-time-ago/locale/en.json'
import TimeAgo from 'javascript-time-ago';


TimeAgo.addDefaultLocale(en)

function App() {
    return(
        <BrowserRouter>
            <GlobalStyles/>
            <UserProvider>
            <AdProvider>
            <MsgProvider>
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
                <Route exact path="/motreal-ads/:page">
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
                <Route exact path="/my-messages/:id">
                    <SingleConversations />
                </Route>
                <Route exact path="/my-ads">
                    <MyAds />
                </Route>
                <Route exact path="/under-construction">
                    <MyFavs />
                </Route>
            </Switch>
            <Footer/>
            </MsgProvider>
            </AdProvider>    
            </UserProvider>
        </BrowserRouter>
    )
}

export default App;