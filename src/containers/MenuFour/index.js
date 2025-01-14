import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Select,
  Button,
  Divider,
  List,
  Space,
} from "antd";
import {
  CreditCardOutlined,
  HomeOutlined,
  HeartOutlined,
  SettingOutlined,
  LineChartOutlined,
  ShoppingOutlined,
  SearchOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

const InformasiPageMenuFour = ({}) => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#dce7f3" }}>
      <Content style={{ padding: "20px" }}>
        <Row gutter={[24, 24]} justify="center">
          {/* Kartu Informasi */}
          <Col xs={24} md={6}>
            <Card
              style={{
                borderRadius: "16px",
                background: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <Title level={5} style={{ margin: 0, color: "#34495e" }}>
                  Credit Card
                </Title>
                <Paragraph style={{ fontSize: "12px", color: "#7f8c8d" }}>
                  0000 0000 0000 0000
                </Paragraph>
                <Title
                  level={4}
                  style={{ color: "#2c3e50", marginBottom: "8px" }}
                >
                  $2798.25
                </Title>
                <Divider style={{ margin: "8px 0" }} />
                <List
                  dataSource={[
                    { text: "Net premium", value: "-69.245", color: "#e74c3c" },
                    {
                      text: "Augex inter",
                      value: "+278.005",
                      color: "#2ecc71",
                    },
                    { text: "Net force", value: "+765.155", color: "#2ecc71" },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "12px",
                        color: "#34495e",
                      }}
                    >
                      <span>{item.text}</span>
                      <span style={{ color: item.color }}>{item.value}</span>
                    </List.Item>
                  )}
                />
              </Space>
            </Card>
          </Col>

          {/* Ikon Navigasi */}
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]} justify="center">
              {[
                HomeOutlined,
                HeartOutlined,
                SettingOutlined,
                LineChartOutlined,
                ShoppingOutlined,
                SearchOutlined,
                WalletOutlined,
              ].map((Icon, index) => (
                <Col span={6} key={index}>
                  <Card
                    hoverable
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "16px",
                      background: "#ffffff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Icon style={{ fontSize: "24px", color: "#3498db" }} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Grafik */}
          <Col xs={24} md={6}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Card
                style={{
                  borderRadius: "16px",
                  background: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Title
                  level={5}
                  style={{ marginBottom: "8px", color: "#34495e" }}
                >
                  USD
                </Title>
                <Paragraph
                  style={{ fontSize: "14px", color: "#2ecc71", margin: 0 }}
                >
                  +74.32
                </Paragraph>
              </Card>
              <Card
                style={{
                  borderRadius: "16px",
                  background: "#ffffff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                bodyStyle={{ padding: "16px" }}
              >
                <Title
                  level={5}
                  style={{ marginBottom: "8px", color: "#34495e" }}
                >
                  EUR
                </Title>
                <Paragraph
                  style={{ fontSize: "14px", color: "#e74c3c", margin: 0 }}
                >
                  -69.25
                </Paragraph>
              </Card>
            </Space>
          </Col>
        </Row>
      </Content>

      <Sider width={240} style={{ background: "#f1f7fc", padding: "20px" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Select defaultValue="Popular Payments" style={{ width: "100%" }}>
            <Option value="new">New Payments</Option>
            <Option value="popular">Popular Payments</Option>
            <Option value="monthly">Monthly Payments</Option>
          </Select>
          <Button
            type="primary"
            block
            style={{ background: "#3498db", border: "none" }}
          >
            Dark Theme
          </Button>
          <Button block>Try Pro</Button>
        </Space>
      </Sider>
    </Layout>
  );
};

export default InformasiPageMenuFour;
