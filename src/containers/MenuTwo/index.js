import { Card, Col, Row, Typography, Layout, Button } from "antd";
import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const data = [
  {
    title: "Informasi A Menu 2",
    description: "Ini adalah deskripsi untuk informasi A.",
    link: "/noAuth",
  },
  {
    title: "Informasi B Menu 2",
    description: "Ini adalah deskripsi untuk informasi B.",
    link: "/noAuth",
  },
  {
    title: "Informasi C Menu 2",
    description: "Ini adalah deskripsi untuk informasi C.",
    link: "/noAuth",
  },
  {
    title: "Informasi D Menu 2",
    description: "Ini adalah deskripsi untuk informasi D.",
    link: "/noAuth",
  },
  {
    title: "Informasi E Menu 2",
    description: "Ini adalah deskripsi untuk informasi E.",
    link: "/noAuth",
  },
  {
    title: "Informasi F Menu 2",
    description: "Ini adalah deskripsi untuk informasi F.",
    link: "/noAuth",
  },
  {
    title: "Informasi G Menu 2",
    description: "Ini adalah deskripsi untuk informasi G.",
    link: "/noAuth",
  },
  {
    title: "Informasi H Menu 2",
    description: "Ini adalah deskripsi untuk informasi H.",
    link: "/noAuth",
  },
  {
    title: "Informasi I Menu 2",
    description: "Ini adalah deskripsi untuk informasi I.",
    link: "/noAuth",
  },
];

const InformasiPageMenuTwo = ({}) => {
  // export default function InformasiPage() {
  return (
    <Layout>
      <Header
        style={{
          background: "#FF8C00",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title style={{ color: "white", margin: 0 }} level={3}>
          Menu 2
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
          <Title level={4}>Daftar Informasi Menu 2</Title>
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

export default InformasiPageMenuTwo;
