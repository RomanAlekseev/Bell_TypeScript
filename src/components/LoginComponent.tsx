import * as React from "react";
import {Redirect} from "react-router-dom";
import {getCookie} from "../helpers/cookies";
import {IError, IUser} from '../helpers/Interfaces';

interface IPropsLoginComponent {
    error: IError;
    isLoading: boolean;
    login: string;
    password: string;
    loginHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    passwordHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    submitLogin: (login: string, password: string) => void;
    user: IUser;
}

export class LoginComponent extends React.Component<IPropsLoginComponent, any> {
    renderLoading()
    {
        return (
            <h1 className="col-2 vcenter mx-auto" style={{marginTop: "42vh"}}>
                Loading...
            </h1>
        );
    }

    renderLoginPage()
    {
        return (
            <div
                className="container col-md-3 col-sm-5 col-9"
                style={{ marginTop: "25vh" }}
            >
                <h2 className="text-center mb-3">Welcome</h2>
                <div className="border px-3">
                    <div className="form-group mt-2 ">
                        <label
                            htmlFor="login"
                            className={this.props.error.login ? "text-danger" : undefined}
                        >
                            Login
                        </label>
                        <input
                            name="login"
                            type="text"
                            className={
                                this.props.error.login
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="login"
                            aria-describedby="emailHelp"
                            placeholder="login"
                            onChange={(e) => this.props.loginHandleChange(e)}
                            value={this.props.login}
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="password"
                            className={this.props.error.password ? "text-danger" : undefined}
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            className={
                                this.props.error.password
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            id="password"
                            placeholder="Password"
                            onChange={(e) => this.props.passwordHandleChange(e)}
                            value={this.props.password}
                        />
                    </div>
                    <input onClick={() => this.props.submitLogin(this.props.login, this.props.password)} type="submit" className="btn btn-success col-12 mb-3" value={"Submit"}/>
                </div>
                <div id="info" className="container">
                    <div className="row">
                        <p className="mx-auto mt-3 mb-2 text-danger text-center col-12">
                            {this.props.error.login || this.props.error.password ? "Invalid data. Try again" : null}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    render()
    {
        let userCookie = getCookie('user');
        if((Object.keys(this.props.user).length > 0 && this.props.user.login) || (userCookie && Object.keys(userCookie).length > 0))
        {
            return <Redirect to={"/organization"}/>
        }

        if(this.props.isLoading)
        {
            return this.renderLoading();
        }
        else
        {
            return this.renderLoginPage();
        }
    }
}

export default LoginComponent;