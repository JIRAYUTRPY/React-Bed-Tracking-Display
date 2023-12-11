import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu, Table, Tag } from "antd";
import env from "react-dotenv";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Data Infomation", "data", <AppstoreOutlined />),
  {
    type: "divider",
  },
  getItem("Controller Setting", "setting", <SettingOutlined />),
];
const columns = [
  {
    title: "Buadrate",
    dataIndex: "buadrate",
    key: "buadrate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Hz",
    dataIndex: "hz",
    key: "hz",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Power",
    key: "power",
    dataIndex: "power",
    render: (text) => <a>{text}</a>,
  },
];
const columns2 = [
  {
    title: "Tag No",
    dataIndex: "key",
    key: "key",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "EPC",
    dataIndex: "EPC",
    key: "EPC",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "CurrentFloor",
    dataIndex: "CurrentFloor",
    key: "CurrentFloor",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Status",
    dataIndex: "Status",
    key: "Status",
    render: (status, index) => {
      if (status) {
        return (
          <Tag color="green" key={index}>
            Entry
          </Tag>
        );
      } else {
        return (
          <Tag color="red" key={index}>
            Exist
          </Tag>
        );
      }
    },
  },
];
var settingData = [
  {
    key: "1",
    buadrate: 0,
    region: "null",
    hz: 0,
    power: 0,
  },
];
const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  databaseURL:
    "https://bed-tracking-90a24-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGE_SENDER_ID,
  appId: import.meta.env.APP_ID,
  measurementId: import.meta.env.MEASUREMENT_ID,
};
function App() {
  const [setting, setSetting] = useState([]);
  const [dataArray, setDataArray] = useState([]);
  const [page, setPage] = useState("data");
  const onClick = (e) => {
    if (e.key === "data") {
      setPage("data");
    } else {
      setPage("setting");
    }
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const settingRef = ref(db, "SETTING");
    return onValue(settingRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setSetting([]);
        Object.values(data).map((rawData) => {
          setSetting((setting) => [...setting, rawData]);
        });
      }
    });
  }, []);
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const settingRef = ref(db, "DATA");
    return onValue(settingRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        setDataArray([]);
        Object.values(data).map((rawData, index) => {
          setDataArray((dataArray) => [
            ...dataArray,
            { key: String(index + 1), ...rawData },
          ]);
        });
        console.log(dataArray);
      }
    });
  }, []);
  settingData[0].buadrate = setting[0];
  settingData[0].hz = setting[1];
  settingData[0].power = setting[2];
  settingData[0].region = setting[3];

  return (
    <div className="flex">
      <Menu
        onClick={onClick}
        style={{
          width: "15%",
          height: "100vh",
        }}
        // defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        className="shadow-xl"
        items={items}
      />
      <div className="p-10 bg-gray-300 w-full">
        <div className={page == "data" ? "" : "hidden"}>
          <Table columns={columns2} dataSource={dataArray} />;
        </div>
        <div className={page == "setting" ? "" : "hidden"}>
          <Table columns={columns} dataSource={settingData} />;
        </div>
      </div>
    </div>
  );
}

export default App;
