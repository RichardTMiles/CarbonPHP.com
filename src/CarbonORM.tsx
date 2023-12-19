import {CarbonReact, initialRequiredCarbonORMState, CarbonWebSocket} from "@carbonorm/carbonreact";
import Notifications from "@material-ui/icons/Notifications";
import Carbons from "api/rest/Carbons";
import {initialRestfulObjectsState} from "api/rest/C6";
import {Routes, Route, Navigate} from 'react-router-dom';

import {ppr} from "api/hoc/passPropertiesAndRender";
//import Public from 'layouts/Public';
//import Private from 'layouts/Private';
//import PrivateRoutes from "routes/privateRoutes";
//import PublicRoutes from "routes/publicRoutes";
// This is our ajax class
import {authenticateUser, iAuthenticate, initialAuthenticateState} from "state/authenticate";
import {initialUiState, iUi} from "state/ui";
import {initialVersionsState, iVersions} from "state/versions";
import {ToastContainer} from "react-toastify";
import DashboardPage, {DASHBOARD} from "views/Dashboard/Dashboard";
import Documentation from "views/Documentation/Documentation";
import CarbonPHP from "views/Documentation/Sections/CarbonPHP";
import Changelog from "views/Documentation/Sections/Changelog";
import Dependencies from "views/Documentation/Sections/Dependencies";
import Implementations from "views/Documentation/Sections/Implementations";
import License from "views/Documentation/Sections/License";
import Support from "views/Documentation/Sections/Support";
import Icons, {ICONS} from "views/Icons/Icons";
import LandingPage from "views/LandingPage/LandingPage";
import Maps, {MAPS} from "views/Maps/Maps";
import {NOTIFICATIONS} from "views/Notifications/Notifications";
import TableList, {TABLES} from "views/TableList/TableList";
import Typography, {TYPOGRAPHY} from "views/Typography/Typography";
import Dashboard, {DASHBOARD_LAYOUT, UI} from "views/UI/Dashboard";
import MaterialKit, {MATERIAL_KIT} from "views/UI/MaterialKit";
import SectionBasics from "views/UI/Sections/SectionBasics";
import SectionCompletedExamples from "views/UI/Sections/SectionCompletedExamples";
import SectionDownload from "views/UI/Sections/SectionDownload";
import SectionJavascript from "views/UI/Sections/SectionJavascript";
import SectionLogin from "views/UI/Sections/SectionLogin";
import SectionNavbars from "views/UI/Sections/SectionNavbars";
import SectionNotifications from "views/UI/Sections/SectionNotifications";
import SectionPills from "views/UI/Sections/SectionPills";
import SectionTabs from "views/UI/Sections/SectionTabs";
import SectionTypography from "views/UI/Sections/SectionTypography";
import UpgradeToPro, {UPGRADE_TO_PRO} from "views/UpgradeToPro/UpgradeToPro";
import UserProfile, {USER_PROFILE} from "views/UserProfile/UserProfile";


export const initialCarbonORMState: typeof initialRestfulObjectsState
    & typeof initialRequiredCarbonORMState
    & iAuthenticate
    & iVersions
    & iUi
    & {} = {
    ...initialVersionsState,
    ...initialRestfulObjectsState,
    ...initialRequiredCarbonORMState,
    ...initialAuthenticateState,
    ...initialUiState,
}


export default class CarbonORM extends CarbonReact<{ browserRouter?: boolean }, typeof initialCarbonORMState> {

    static instance: CarbonORM;

    state = initialCarbonORMState;

    constructor(props) {
        super(props);
        CarbonORM.instance = this;
        CarbonReact.instance = this;
    }

    componentDidMount() {

        Carbons.Get()

        authenticateUser()
    }

    render() {
        console.log("CarbonORM TSX RENDER");

        const {isLoaded} = this.state;

        if (!isLoaded) {

            return <h2>Loading...</h2>;

        }


        return <>
            <CarbonWebSocket url={'ws://localhost:8888/ws'}/>
            <Routes>
                <Route path={UI + "*"}>
                    <Route path={DASHBOARD_LAYOUT + "*"} element={ppr(Dashboard, {})}>
                        <Route path={DASHBOARD + '*'} element={ppr(DashboardPage, {})}/>
                        <Route path={USER_PROFILE + '*'} element={ppr(UserProfile, {})}/>
                        <Route path={TABLES + '*'} element={ppr(TableList, {})}/>
                        <Route path={TYPOGRAPHY + '*'} element={ppr(Typography, {})}/>
                        <Route path={ICONS + '*'} element={ppr(Icons, {})}/>
                        <Route path={MAPS + '*'} element={ppr(Maps, {})}/>
                        <Route path={NOTIFICATIONS + '*'} element={ppr(Notifications, {})}/>
                        <Route path={UPGRADE_TO_PRO + '*'} element={ppr(UpgradeToPro, {})}/>
                        <Route path={'*'} element={<Navigate to={'/' + UI + DASHBOARD_LAYOUT + DASHBOARD}/>}/>
                    </Route>
                    <Route path={MATERIAL_KIT + "*"} element={ppr(MaterialKit, {})}>
                        <Route path={'SectionNavbars/*'} element={ppr(SectionNavbars, {})}/>
                        <Route path={'SectionBasics/*'} element={ppr(SectionBasics, {})}/>
                        <Route path={'SectionTabs/*'} element={ppr(SectionTabs, {})}/>
                        <Route path={'SectionPills/*'} element={ppr(SectionPills, {})}/>
                        <Route path={'SectionNotifications/*'} element={ppr(SectionNotifications, {})}/>
                        <Route path={'SectionTypography/*'} element={ppr(SectionTypography, {})}/>
                        <Route path={'SectionJavascript/*'} element={ppr(SectionJavascript, {})}/>
                        <Route path={'SectionCompletedExamples/*'} element={ppr(SectionCompletedExamples, {})}/>
                        <Route path={'SectionLogin/*'} element={ppr(SectionLogin, {})}/>
                        <Route path={'Landing/*'} element={ppr(LandingPage, {})}/>
                        <Route path={'SectionDownload/*'} element={ppr(SectionDownload, {})}/>
                        <Route path={'*'} element={<Navigate to={'/' + UI + MATERIAL_KIT + 'SectionNavbars'}/>}/>
                    </Route>
                    <Route path={'*'} element={<Navigate to={'/' + UI + DASHBOARD_LAYOUT}/>}/>
                </Route>
                <Route path="/documentation/*" element={ppr(Documentation, {})}>
                    <Route path="Support/" element={ppr(Support, {})}/>
                    <Route path="CarbonPHP/" element={ppr(CarbonPHP, {})}/>
                    <Route path="Dependencies/*" element={ppr(Dependencies, {})}/>
                    <Route path="BrowserOSSupport/*" element={ppr(Changelog, {})}/>
                    <Route path="Implementations/*" element={ppr(Implementations, {})}/>
                    <Route path="License/*" element={ppr(License, {})}/>
                    <Route path={'*'} element={<Navigate to={'/Documentation/CarbonPHP'}/>}/>
                </Route>
                <Route path="/landing-page" element={ppr(LandingPage, {})}/>
                <Route path={'*'} element={<Navigate to={'/documentation'}/>}/>
            </Routes>
            <ToastContainer
                autoClose={3000}
                draggable={false}
                position="top-right"
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnHover
            />
        </>

    }
}

