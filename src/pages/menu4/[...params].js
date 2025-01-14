import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AccessDeniedPage from "../noAuth";

import { authToken } from "src/redux/actions/auth";
import { Spin } from "antd";
import InformasiPageMenuFour from "src/containers/MenuFour";

export default function MenuPage() {
  const router = useRouter();
  const { params } = router.query; // params = ['akusayangkamusayang', 'dada']

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params) return; // Tunggu hingga params tersedia

    if (params[1]) {
      const param1 = params[0];
      cekToken(param1);
    } else if (params[0]) {
      const param1 = params[0];
      cekToken(param1);
    } else {
      setContent(<h1>Halaman Menuuuuuuuuuuuuuuuuuuuuuuuuu</h1>);
    }
  }, [params]);

  const cekToken = (cek) => {
    if (cek.length > 20) {
      hitToken(cek);
    } else {
      setContent(<AccessDeniedPage />);
    }
  };

  const hitToken = async (token) => {
    try {
      setLoading(true);
      const auth = await authToken(token);
      if (auth.authData.status == 200) {
        setLoading(false);
        // setContent(<InformasiPageMenu />);
      }
    } catch {
      setError(true);
      // setContent(<AccessDeniedPage />);
    }
  };
  // Render konten berdasarkan state
  return (
    <div>
      {/* {content || <p>Loading...</p>} */}
      {loading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "30%",
            }}
          >
            {error ? (
              // <label>
              // 	Token akses tidak valid, mohon relogin!
              // </label>
              <AccessDeniedPage />
            ) : (
              <Spin />
            )}
          </div>
        </>
      ) : (
        <InformasiPageMenuFour />
      )}
    </div>
  );
}
