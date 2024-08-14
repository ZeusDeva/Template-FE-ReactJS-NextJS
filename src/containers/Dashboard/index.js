// Icons
import {
  CaretDownOutlined,
  EditOutlined,
  SlidersOutlined,
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  List,
  Row,
  Select,
  Spin,
  Layout,
  Menu
} from "antd";
// import moment from "moment";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Table from "src/components/Table";
import Title from "src/components/Title";
// import useApplicationType from "src/hooks/useApplicationType";
// import useApprovalRoleJob from "src/hooks/useApprovalRoleJob";

// // Hooks
// import useBranchList from "src/hooks/useBranchList";
// import ApplicationStorage from "src/utils/application-storage";

// // Actions
import { actionFetchApprovalData, actionSearchData } from "src/redux/actions/data";
import AuthStorage from "src/utils/auth-storage";
import IdStorage from "src/utils/id-storage";
// import { allowOnlyNumber, dateParser, showError } from "src/utils/tools";
import { dateParser } from "src/utils/tools";

// Style
import classes from "./style.module.less";

const propTypes = {};

const defaultProps = {};

const INPUT_STYLE = {
  width: "99%",
};

const columns = [
  {
    title: "JUDUL",
    dataIndex: "title",
    width: 80,
    key: "2",
  },
  {
    title: "DESKRIPSI",
    dataIndex: "description",
    width: 150,
    key: "3",
  },
  {
    title: "HARGA",
    dataIndex: "price",
    width: 50,
    key: "4",
  },
  {
    title: "DISCOUNT",
    dataIndex: "discountPercentage",
    width: 50,
    key: "5",
  },
  {
    title: "RATING",
    dataIndex: "rating",
    key: "6",
    width: 50,
  },
  {
    title: "STOCK",
    dataIndex: "stock",
    width: 50,
    key: "7",
  },
  {
    title: "BRAND",
    dataIndex: "brand",
    width: 50,
    key: "8",
  },
  {
    title: "AKSI",
    key: "id",
    fixed: "right",
    width: 30,
    render: (_data) => (
      <Row>
        <Col span={24} lg={0}>
          <Button
            className={classes.buttonRedirect}
            icon={<EditOutlined />}
            onClick={() => redirect(_data)}
          >
            Edit
          </Button>
        </Col>
        <Col span={0} lg={24}>
          <EditOutlined onClick={() => redirect(_data)} />
        </Col>
      </Row>
    ),
  },
];


const { Content } = Layout;

const redirect = (_data) => {
  IdStorage.value = _data.id;
  window.location.reload(false);
};

// const datas = JSON.stringify(data);
const Index = ({ token }) => {

  const auth = AuthStorage.data;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState();
  const selectorReset = false;

  const [query, setQuery] = useState("");
  
	const data = useSelector((state) => state.data);
  const rows = data?.products?.products.map((row) => ({
    id: row.id,
    title: row.title,
    description:row.description,
    price: row.price,
    discountPercentage: row.discountPercentage,
    rating: row.rating,
    stock: row.stock,
    brand: row.brand,
    category: row.category,
  }));

  const fetchData = async () => {
    try {
    	setPage(1);
    	setSize(10);
    	setTotal(true);
    	setLoading(true);
      await dispatch(
      await actionFetchApprovalData());
    } finally {
    	setLoading(false);
    }
  };

  const handleApplicationSearch = async (e) => {
    setQuery(e.target.value)
    try {
    	setPage(1);
    	setSize(10);
    	setTotal(true);
      await dispatch(
      await actionSearchData(query));
    } finally {
    	console.log('cari products');
    }
  };

  const resetData = async (e) => {
    setQuery(e.target.value)
    try {
      await dispatch(
      await actionSearchData(""));
    } finally {
    	console.log('delete');
    }
  };

  // first load
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <Layout>
      <Content style={{ minHeight: 280 }}>
      <div className={classes.filterWrapper}>
        <Card title={<Title text="Kriteria Filter" icon={<SlidersOutlined />} />} style={{
          padding: "0 5px"
        }}>
          <Row gutter={12}>
            <Col className={classes.inputColumn} lg={12} md={12} sm={24} xs={24}>
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="Sample Drop Down"
              />
            </Col>
            <Col className={classes.inputColumn} lg={12} md={12} sm={24} xs={24}>
              <Input
                placeholder="Cari"
                  onChange={handleApplicationSearch}
                  value={query}
                maxLength="14"
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col className={classes.inputWrapper} lg={12} md={12} sm={24} xs={24}>
              <Row gutter={12}>
                <Col
                  className={classes.inputColumn}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                >
                  <DatePicker
                    placeholder="Sample Date Picker"
                    showToday={false}
                  />
                </Col>
                <Col
                  className={classes.inputColumn}
                  lg={12}
                  md={12}
                  sm={24}
                  xs={24}
                >
                  <DatePicker
                    placeholder="Sample Date Picker"
                    showToday={false}
                  />
                </Col>
              </Row>
            </Col>
            <Col className={classes.inputColumn} lg={12} md={12} sm={24} xs={24}>
              <Input
                placeholder="Sample Field"
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col className={classes.inputColumn} lg={12} md={12} sm={24} xs={24}>
              <Select
                suffixIcon={<CaretDownOutlined />}
                placeholder="Sample Drop Down"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={8} md={8} sm={24} xs={24}></Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <Button
                type="secondary"
                shape="round"
                className={classes.button}
                  onClick={resetData}
              >
                Reset
              </Button>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24}>
              <Button
                type="primary"
                shape="round"
                className={classes.button}
                onClick={fetchData}
                loading={loading}
                disabled={loading}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Card>
        <Card className="table-full" style={{
          padding: "0 5px"
        }}>
          <Row>
            <Col span={24} lg={0}>
              <List
                pagination={{
                  showSizeChanger: true,
                }}
                dataSource={selectorReset ? [] : rows}
                itemLayout="vertical"
                grid={{
                  gutter: 16,
                  column: 1,
                  md: 2,
                }}
                renderItem={(item) => (
                  <Card
                    className={classes.wrapperListData}
                    title="Sample"
                    headStyle={{
                      backgroundColor: "#003d79",
                      color: "white",
                      textAlign: "center",
                    }}
                    bodyStyle={{ backgroundColor: "#e1e5e9" }}
                  >
                    <List.Item>
                      {columns.map((column) => (
                        <Row
                          key={column.title}
                          className={classes.rowTitleWrapper}
                        >
                          <Col xs={11}>
                            <b>{column.title}</b>
                          </Col>
                          <Col xs={12}>
                            {column.render
                              ? column.render(item)
                              : item[column.dataIndex]}
                          </Col>
                        </Row>
                      ))}
                    </List.Item>
                  </Card>
                )}
              ></List>
            </Col>
            <Col span={0} lg={24}>
              <Table
                columns={columns}
                dataSource={selectorReset ? [] : rows}
                loading={{
                  indicator: (
                    <div>
                      <Spin
                        style={{
                          fontSize: 400,
                          width: "100vw",
                          height: "100vh",
                          alignContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </div>
                  ),
                  spinning: loading,
                }}
                pagination={{
                  showSizeChanger: true,
                }}
                scroll={{ x: 1600 }}
              />
            </Col>
          </Row>
        </Card>
      </div>
      </Content>
      </Layout>
    </div>
  );
};

Index.propTypes = propTypes;

Index.defaultProps = defaultProps;

export default Index;
