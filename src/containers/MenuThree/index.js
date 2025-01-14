import { Card, Col, Row, Typography, Layout, Button } from "antd";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const data = [
  {
    title: "Informasi A Menu 3",
    description: "Ini adalah deskripsi untuk informasi A.",
    link: "/detail/a",
  },
  {
    title: "Informasi B Menu 3",
    description: "Ini adalah deskripsi untuk informasi B.",
    link: "/detail/b",
  },
  {
    title: "Informasi C Menu 3",
    description: "Ini adalah deskripsi untuk informasi C.",
    link: "/detail/c",
  },
];

const InformasiPageMenuThree = ({}) => {
  // export default function InformasiPage() {
  return (
    <Layout>
      <Header
        style={{
          background: "#001529",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title style={{ color: "white", margin: 0 }} level={3}>
          Menu 3
        </Title>
      </Header>
      <Content style={{ padding: "20px 50px", minHeight: "80vh" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <Title level={4}>Daftar Informasi Menu 3</Title>
        </div>
        <Row gutter={[16, 16]}>
          {data.map((item, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                title={
                  <span>
                    <InfoCircleOutlined style={{ marginRight: "8px" }} />
                    {item.title}
                  </span>
                }
                extra={
                  <Button
                    type="link"
                    href={item.link}
                    icon={<EditOutlined />}
                    size="small"
                  >
                    Lihat
                  </Button>
                }
                bordered={true}
                hoverable
              >
                <Paragraph>{item.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>
        © {new Date().getFullYear()} Mandiri Utama Finance
      </Footer> */}
    </Layout>
  );
};

export default InformasiPageMenuThree;
