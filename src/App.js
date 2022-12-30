import React, { Component, createRef, useRef } from "react";
import PropTypes from "prop-types";

import { Anchor } from "ual-anchor";
import { UALProvider, withUAL } from "ual-reactjs-renderer";
import LoginPage from "./components/LoginPage/LoginPage";
import BackgroundImage from "./components/BackgroundImage/BackgroundImage";
import { useSelector } from "react-redux";
import Game from "./components/Game/Game";
//import CheckUserScreen from "./components/CheckUserScreen/CheckUserScreen";

export const GameContext = React.createContext(null)
class TestApp extends Component {
    constructor(props) {
        super(props);
    }


    renderLoginPage = () => <LoginPage>{this.props}</LoginPage>;

    renderGame = () => {
        return <Game>{this.props}</Game>;
    };

    render() {
        const { activeUser } = this.props.ual;
        return activeUser ? <GameContext.Provider value={this.props.ual}>{this.renderGame()}</GameContext.Provider> : this.renderLoginPage();
    }
}

class UALWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chainId: props.chainId.chainId,
        };
        this.ref = React.createRef();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ chainId: nextProps.chainId });
    }

    // setAppWrapperHeight() {
    //     this.ref.current.style.height = `${window.innerWidth / 1.7}px`;
    //     // this.ref.current.style.width = `${this.ref.current.offsetHeight * 1.7}px`
    //     // this.ref.current.style.margin = `0 auto`
    // }
    //
    // componentDidMount() {
    //     this.setAppWrapperHeight();
    // }

    render() {
        const { chainId } = this.state;
        const { available } = this.props;
        const [chain] = available.filter((c) => c.chainId == chainId);
        if (!chain) {
            return <div>Invalid Chain ID</div>;
        }
        const anchor = new Anchor([chain], {
            appName: "ual-anchor",
            service: "https://cb.anchor.link",
        });
        //window.onresize = () => this.setAppWrapperHeight();
        return (
            <div ref={this.ref} className="app-wrapper">
                {/*<BackgroundImage></BackgroundImage>*/}
                <UALProvider
                    appName="Funny Rangers"
                    authenticators={[anchor]}
                    chains={[chain]}
                    key={chain.chainId}
                >
                    <AppConsumer />
                </UALProvider>
            </div>
        );
    }
}

const AppConsumer = withUAL(TestApp);

const App = () => {
    const { chains, chainId } = useSelector((state) => state.chains);
    return <UALWrapper available={chains} chainId={chainId} />;
};

export default App;
