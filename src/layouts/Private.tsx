import React from "react";
import cx from "classnames";
// creates a beautiful scrollbar
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";

import privateRoutes from "routes/privateRoutes";

import appStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle";

import image from "assets/img/Carbon-teal-180.png";
import logo from "assets/img/reactlogo.png";

class Private extends React.Component<any, any> {
    state = {
        mobileOpen: false,
        miniActive: false
    };

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    componentDidUpdate(e) {
        if (e.history?.location?.pathname !== e?.location?.pathname) {
            // @ts-ignore
            //this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({mobileOpen: false})
            }
        }
    }

    sidebarMinimize() {
        this.setState({miniActive: !this.state.miniActive});
    }

    render() {

        console.log("Private RENDER");
        const {classes} = this.props;
        const mainPanel =
            classes.mainPanel +
            " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive,
                [classes.mainPanelWithPerfectScrollbar]:
                navigator.platform.indexOf("Win") > -1
            });
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={privateRoutes}
                    logoText={"CarbonPHP"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    miniActive={this.state.miniActive}
                />
                <div className={mainPanel}>
                    <Header
                        sidebarMinimize={this.sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        routes={privateRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                    />
                    {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {(this.props.location?.pathname !== "/maps/full-screen-maps") ? (
                        <>
                            <div className={classes.content}>
                                <div className={classes.container}>
                                    {this.props.children}
                                </div>
                            </div>
                            <Footer fluid/>
                        </>
                    ) : (
                        <div className={classes.map}>
                            {this.props.children}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}


export default withStyles(appStyle)(Private);
