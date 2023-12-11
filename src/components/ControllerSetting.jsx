import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../hook/FirebaseHook";
import { Menu, Table, Tag } from "antd";
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
var settingData = [
  {
    key: "1",
    buadrate: 0,
    region: "null",
    hz: 0,
    power: 0,
  },
];
const ControllerSetting = () => {
  const [setting, setSetting] = useState([]);
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
  settingData[0].buadrate = setting[0];
  settingData[0].hz = setting[1];
  settingData[0].power = setting[2];
  settingData[0].region = setting[3];
  return <Table columns={columns} dataSource={settingData} />;
};

export default ControllerSetting;
