import { BackTop, Image, Layout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

// components
import AvatarDropDown from "src/components/AvatarDropDown";
import Header from "src/components/Layout/Header";
import Navbar from "src/components/Layout/Navbar";
import Notifications from "src/components/Notifications";
import AuthStorage from "src/utils/auth-storage";

// icons
import ArrowLeftIcon from "public/svg/arrow-left.svg";
// constants
// import { ROUTES, SUB_ROUTES } from "src/constants/routes";

// style
import classes from "./style.module.less";
import { useEffect, useState } from "react";

//sidebar
import Sidebar from "../Sidebar";
import { setMenu } from "src/redux/actions/sidebarMenu";
import { useDispatch, useSelector } from "react-redux";
import { sidebarMenu } from "src/constants/sidebarMenu";

// Data
const { Content } = Layout;

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const MainLayout = (props) => {
  const dispatch = useDispatch();
  const { children } = props;
  const { query, asPath } = useRouter();
  const [, token, params] = asPath.split("/");

  //for change view
  const stateMenuSidebar = useSelector((state) => state.setMenu);
  const selectedKey = stateMenuSidebar.selectedKey;
  const statePath = stateMenuSidebar.page;
  const [statePage, setStatePage] = useState(false);

  const auth = AuthStorage.loggedIn;

  useEffect(() => {
    if (auth && statePath) {
      setStatePage(true);
    } else {
      setStatePage(false);
    }
  }, [auth, statePath]);

  console.log(statePage, statePath);
  // const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   if (darkMode){
  //     document.body.classList.add('dark-mode')
  //   } else {
  //     document.body.classList.remove('dark-mode')
  //   }
  // }, [darkMode])

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode)
  // }

  console.log("apa nih? ", AuthStorage.loggedIn ? "muncul" : "oora");

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
        // className={`${classes.root} ${darkMode ? 'dark-mode' : ''}`}
      >
        {!token && (
          <>
            <Header>
              <Link href="/">
                <a>
                  <div className={classes.logo}>
                    <Image src={"/svg/muf_logo.svg"} preview={false} />
                  </div>
                </a>
              </Link>
              {AuthStorage.loggedIn && (
                <div className={classes.headerRight}>
                  <Notifications />
                  <AvatarDropDown />
                </div>
              )}
            </Header>
          </>
        )}
        {AuthStorage.loggedIn && (
          <>
            <Sidebar />
          </>
        )}
        <Content
          className={!statePage ? classes.contentlogin : classes.content}
        >
          {children}
        </Content>
      </Layout>
      <BackTop />
    </>
  );
};

MainLayout.propTypes = propTypes;
MainLayout.defaultProps = defaultProps;

export default MainLayout;
