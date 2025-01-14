import { Result, Button } from "antd";
import { useRouter } from "next/router";

const AccessDeniedPage = ({}) => {
  const router = useRouter();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Maaf, Anda tidak memiliki akses ke halaman ini."
      extra={
        <Button type="primary" onClick={() => router.push("")}>
          Kembali ke Beranda
        </Button>
      }
    />
  );
};

export default AccessDeniedPage;
