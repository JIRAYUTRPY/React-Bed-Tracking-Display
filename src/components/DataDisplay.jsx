import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
// import { DATABASE_CONTAINER } from "../hook/useFirebase";
import { db } from "../hook/useFirebaseAuth";
import { Table, Tag } from "antd";
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
    const dataLogsRef = ref(db, "logs");
    return onValue(dataLogsRef, (snapshot) => {
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
