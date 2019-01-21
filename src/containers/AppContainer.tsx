import * as React from "react";
import {Route} from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import LoginContainer from "./LoginContainer";
import OrganizationContainer from "./OrganizationContainer";

export class AppContainer extends React.Component {

    render() {
        return (
            <ScrollToTop className={"appRoutes"}>
                <Route exact path='/' name={"main"} component={LoginContainer}/>
                <Route exact path={"/organization"} name={"contact"} component={OrganizationContainer}/>
            </ScrollToTop>
        );
    }
}