import getStyles from "api/hoc/getStyles";
import store from "pages/UI/AdminLTE/store/store";
import {Outlet} from 'react-router-dom';
import {Provider} from 'react-redux';
import ControlSidebar from './AdminLTE/modules/main/control-sidebar/ControlSidebar';
import Header from './AdminLTE/modules/main/header/Header';
import MenuSidebar from './AdminLTE/modules/main/menu-sidebar/MenuSidebar';
import Footer from './AdminLTE/modules/main/footer/Footer';
export const ADMIN_LTE = 'AdminLTE/';


const AdminLTE = () => {

    console.log('AdminLTE Rendered');

    const styles = getStyles()

    return <div className={"wrapper"}>
            <Header/>

            <MenuSidebar/>

            <div className={"content-wrapper"}>
                <div className={styles.pt3}/>
                <section className="content">
                    <Outlet/>
                </section>
            </div>
            <Footer/>
            <ControlSidebar/>
        </div>
};

export default () => <Provider store={store}><AdminLTE/></Provider>;
