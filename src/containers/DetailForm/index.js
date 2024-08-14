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

// Style
import classes from "./style.module.less";
import applicationStorage from "src/utils/application-storage";

//redux

const { TabPane } = Tabs;
const { Panel } = Collapse;

const tabs = [
  {
    tab: "Home",
    collapses: TAB_FORM_1,
  },
  {
    tab: "Customer Handling",
    collapses: TAB_FORM_2,
  },
  {
    tab: "Data Entry Completion",
    collapses: TAB_FORM_3,
  },
  {
    tab: "Simulation",
    collapses: TAB_FORM_4,
  },
];

const subtabs = [
  {
    key: "telesurvey",
    subtab: "Tele Survey",
    // subcollapses: TELE_SURVEY_FORMS,
  },
  {
    key: "silentsurvey",
    subtab: "Silent Survey",
    // subcollapses: SILENT_SURVEY_FORMS,
  },
];

const ReturnSurveyKYC = () => {
  const dispatch = useDispatch();
  //   const state = useSelector((state) => state.debitur);
  const id = IdStorage.data;
  const [loading, setLoading] = useState(false);
  //   const { validasiKonfirmasi } = useSelector((state) => state.rtre);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const columns = [
    { title: "Nama Field", dataIndex: "field", key: "field" },
    { title: "Tab", dataIndex: "tab", key: "tab" },
    { title: "Sub Tab", dataIndex: "subTab", key: "subTab" },
  ];

   const application = applicationStorage.data;

  const [form] = Form.useForm();

  //   let { calculation_structure_credit } = object_pembiayaan || {};

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

  return (
    <Form layout="vertical">
      {!loading ? (
        <>
          <ApplicationDetail application={data} personal={data} />
          <CollapseForm
            tabs={tabs}
            // subtabs={subtabs}
            // state={state}
            // personal={personal}
            // application={application}
          />
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

          <Modal></Modal>

          <Modal
            title="Data Sedang Di Proses Mohon Ditunggu"
            // visible={getModal}
            footer={false}
            closable={false}
          ></Modal>
        </>
      ) : (
        <div className={classes.spinneroverlay}>
          <Spin size="large"></Spin>
        </div>
      )}
    </Form>
  );
};

ReturnSurveyKYC.propTypes = {};

export default ReturnSurveyKYC;