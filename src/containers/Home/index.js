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
import ReturnSurveyKYC from "../DetailForm";
import applicationStorage from "src/utils/application-storage";
import idStorage from "src/utils/id-storage";

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const propTypes = {};

const defaultProps = {};

const Index = (props) => {
  // const { query, asPath } = useRouter();
  // const [, token, params] = asPath.split("/");
  const [loading, setLoading] = useState(true);
  // const { data } = useSession()
  const [session, loadingSession] = useSession()

  const application = applicationStorage.data;
  const { order_id } = application || {};

  const secret = process.env.NEXTAUTH_SECRET;

  console.log("data", application);

  useEffect(() => {
    // jika berhasil login
    if(session) {
      const token = session.jwt // ambil token jwt yang dikirim dari handler auth

      // console.log("data login: ", session);    

      // set data ke local storage ketika proses dari auth login valid
      AuthStorage.value = {
        "firstName": "Hafid",
        "gender": "Male",
        "token": token
      }
    }
  }, [session])

  console.log("bab", AuthStorage.loggedIn);

  const test = true;
  const test1 = true;
  const test2 = undefined;
  const test3 = false;
  const test4 = "sdfs";

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
              {test2 == undefined ? (
                <ReturnSurveyKYC token={token} />
              ) : (
                <Dashboard token={token} />
              )}
            </>
          ) : (
            <Login />
          )}
        </>
      ) : (
        <>
          {AuthStorage.loggedIn ? (
            <>
              {idStorage.data ? (
                <ReturnSurveyKYC token={null} />
              ) : (
                <Dashboard token={null} />
              )}
            </>
          ) : (
            <Login />
          )}
        </>
      )}
    </>
  );
};

Index.propTypes = propTypes;

Index.defaultProps = defaultProps;

export default Index;