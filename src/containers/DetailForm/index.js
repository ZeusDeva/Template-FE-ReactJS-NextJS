import {
  Button,
  Card,
  Collapse,
  Form,
  Modal,
  notification,
  Table,
  Tabs,
  Spin,
  Menu,
} from "antd";
// import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// //coba
// import { setBtnSubmit, setValid } from "src/redux/actions/financeObject";

// Components

// Constants
import {
  TAB_FORM_1,
  TAB_FORM_2,
  TAB_FORM_3,
  TAB_FORM_4,
} from "src/constants/tab-forms";
// Containers
import ApplicationDetail from "src/containers/DetailForm/ApplicationDetail";
import {actionFetchDataById} from "src/redux/actions/data";
import { actionGetProductCategoryList } from "src/redux/actions/categorySelector";

import ApplicationStorage from "src/utils/application-storage";
// import authStorage from "src/utils/auth-storage";
import IdStorage from "src/utils/id-storage";
// import { checkRtreMandatory, timeout, intermittenRtre } from "src/utils/tools";
import CollapseForm from "./CollapseForm";

// Icons
import {
  CaretDownOutlined,
  EditOutlined,
  SlidersOutlined,
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined
} from "@ant-design/icons";

// Style
import classes from "./style.module.less";
import applicationStorage from "src/utils/application-storage";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

//menu sidebar
const items = [
  {
    key: "1",
    label: 'Detail Application',
    icon: <HomeOutlined color="#fff" />,
  },
  {
    key: "2",
    label: 'TAB 1',
    icon: <AppstoreOutlined />,
  },
  {
    key: "3",
    label: 'TAB 2',
    icon: <AppstoreOutlined />,
    
  },
];

const tab1 = [
  {
    tab: "Input",
    collapses: TAB_FORM_1,
  },
  {
    tab: "Picker",
    collapses: TAB_FORM_2,
  }
];

const tab2 = [
  {
    tab: "List",
    collapses: TAB_FORM_3,
  },
  {
    tab: "Info",
    collapses: TAB_FORM_4,
  },
];

const DetailForm = () => {
  const dispatch = useDispatch();
  const id = IdStorage.data;
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  //for change view
  const [selectedKey, setSelectedKey] = useState('1');
  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
    console.log(e)
  };

  useEffect( () => {
		console.log(selectedKey);
	}, [selectedKey]);

  const columns = [
    { title: "Nama Field", dataIndex: "field", key: "field" },
    { title: "Tab", dataIndex: "tab", key: "tab" },
    { title: "Sub Tab", dataIndex: "subTab", key: "subTab" },
  ];

   const application = applicationStorage.data;

  const [form] = Form.useForm();

  const btnSubmit = async () => {
    // reloadPage();
    backToDashboard();
  };

  const backToDashboard = () => {
    IdStorage.value = {};
    ApplicationStorage.value = {};
    window.location.reload(false);
  };

  const data = useSelector((state) => state.data);
  const products = data?.products?.products;
  ApplicationStorage.value = data
  console.log("data", data);

  const fetchData = async () => {
		try {
			setLoading(true);
			await dispatch(await actionFetchDataById(id));
      await dispatch(await actionGetProductCategoryList());
		} finally {
			setLoading(false);
		}
	};

	useEffect(async () => {
		fetchData({id: id});
	}, [id]);

  useEffect(() => {
    console.log('data id', localStorage.getItem("ORDERID"))
  }, [])

  return (
    <Form layout="vertical">
      {!loading ? (
        <>
          <Layout>
            <Sider
                // className="sidebar"
                // breakpoint={"lg"}
                className={classes.sidebar}
                theme="light"
                collapsedWidth={0}
                trigger={null}
                width={250}
            >
              <Menu
                mode="inline"
                items={items}
                onClick={handleMenuClick}
                selectedKeys={[selectedKey]}
              />
            </Sider>
            <Content className={classes.detail}>
              <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {selectedKey == '1' && <ApplicationDetail application={data} personal={data} />}
                  {selectedKey == '2' && <CollapseForm tabs={tab1}></CollapseForm>}
                  {selectedKey == '3' && <CollapseForm tabs={tab2}></CollapseForm>}
                </Content>
              </Layout>
              <Card className={classes.card}>
                <Button
                  className={classes.cancelButton}
                  type="secondary"
                  onClick={backToDashboard}
                  loading={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="success"
                  onClick={btnSubmit}
                  loading={loadingSubmit || loading}
                  // disabled={submitButton}
                >
                  Submit
                </Button>
              </Card>
              <Modal
                title="Data Sedang Di Proses Mohon Ditunggu"
                // visible={getModal}
                footer={false}
                closable={false}
              ></Modal>
            </Content>
          </Layout>
        </>
      ) : (
        <div className={classes.spinneroverlay}>
          <Spin size="large"></Spin>
        </div>
      )}
    </Form>
  );
};

DetailForm.propTypes = {};

export default DetailForm;