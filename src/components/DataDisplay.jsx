import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "../hook/FirebaseHook";
import { Menu, Table, Tag } from "antd";
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

const DataDisplay = () => {
  const [dataArray, setDataArray] = useState([]);
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
      }
    });
  }, []);
  return <Table columns={columns2} dataSource={dataArray} />;
};

export default DataDisplay;
