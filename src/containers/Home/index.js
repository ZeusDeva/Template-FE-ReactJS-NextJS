import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useEffect, useState } from "react";
// import { actionGetConfig } from "src/redux/actions/config";

// import { useRouter } from "next/router";
import AuthStorage from "src/utils/auth-storage";
// import IdStorage from "src/utils/id-storage";
import { useSession } from "next-auth/client";
// import { decode } from "next-auth/jwt";
import jwt_decode from "jwt-decode";

import Dashboard from "../Dashboard/index";
import Login from "../../containers/Login/index";
import DetailForm from "../DetailForm";
import applicationStorage from "src/utils/application-storage";
import idStorage from "src/utils/id-storage";
import { useDispatch, useSelector } from "react-redux";
import LandingPage from "../LandingPage"
import { setMenu } from "src/redux/actions/sidebarMenu";

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const propTypes = {};

const defaultProps = {};

const Index = (props) => {
  // const { query, asPath } = useRouter();
  // const [, token, params] = asPath.split("/");
  const [loading, setLoading] = useState(true);
  const [tokenLogin, setTokenLogin] = useState(null);
  // const { data } = useSession()
  const [session, loadingSession] = useSession()

  const application = applicationStorage.data;
  const { order_id } = application || {};

  const secret = process.env.NEXTAUTH_SECRET;

  // untuk handle kondisi after login (exp: catch token login, etc)
  useEffect(() => {
    // jika berhasil login
    if(session) {
    const token = session.jwt // ambil token jwt yang dikirim dari handler auth
    setTokenLogin(token) // set token ke dalam useState untuk bisa digunakan 

    try{
        const decoded = jwt_decode(token) // decoded token menjadi payload
        // takeout key exp dan iat karena expired time
        // karena sudah di setup di konfigurasi handler auth
        delete decoded.exp
        delete decoded.iat
      }catch(e) {
        console.log("Error pada saat decode token jwt: ", e)
      }
    }
  }, [session])

  const test = true;
  const test1 = true;
  const test2 = undefined;
  const test3 = false;
  const test4 = "sdfs";

  const dispatch = useDispatch();
	//for change view
	const stateMenuSidebar = useSelector((state) => state.setMenu);
	const selectedKey = stateMenuSidebar.selectedKey;

  //to keep value menu when open detailform
  useEffect(() => {
    if (idStorage.data) {
      dispatch(setMenu("2"))
    }
  }, [idStorage])

  return (
    <>
      {test3 ? (
        <Spin
          style={{
            fontSize: 400,
            width: "100vw",
            height: "100vh",
            alignContent: "center",
            alignItems: "center",
          }}
        />
      ) : test4 > 20 ? (
        <>
          {test3 ? (
            <>
              {selectedKey == "1" && <LandingPage/>}
              {selectedKey == "2" &&
              <>{test2 == undefined ? (
                    <DetailForm token={null} />
                  ) : (
                    <Dashboard token={null} />
                  )
                }
              </>
              }
            </>
          ) : (
            <Login token={tokenLogin} />
          )}
        </>
      ) : (
        <>
          {AuthStorage.loggedIn ? (
            <>
            {selectedKey == "1" && <LandingPage/>}
            {selectedKey == "2" && 
              <>
                {idStorage.data ? (
                          <DetailForm token={null} />
                        ) : (
                          <Dashboard token={null} />
                        )
                }
              </>
            }
            </>
            ) : (
              <Login token={tokenLogin} />
            )
          }
        </>
      )}
    </>
  );
};

Index.propTypes = propTypes;

Index.defaultProps = defaultProps;

export default Index;