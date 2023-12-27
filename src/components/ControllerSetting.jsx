import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
// import { DATABASE_CONTAINER } from "../hook/useFirebase";
import { db } from "../hook/useFirebaseAuth";
import { Table } from "antd";
const columns = [
  {
    title: "MECHINE IDENTITY",
    dataIndex: "mechinenumber",
    key: "mechinenumber",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "EEPROM ADDRESS",
    dataIndex: "EEPROM",
    key: "EEPROM",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "BUAD RATE",
    dataIndex: "buadrate",
    key: "buadrate",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "REGION",
    dataIndex: "region",
    key: "region",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Power",
    key: "power",
    dataIndex: "power",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "RFCH",
    key: "rfch",
    dataIndex: "rfch",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Floor",
    key: "floor",
    dataIndex: "floor",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "STATUS",
    key: "status",
    dataIndex: "status",
    render: (value) => {
      if (value - Date.now() / 1000 > 10) {
        return (
          <div className="h-[10px] w-[10px] bg-red-500 rounded-full"></div>
        );
      } else {
        return (
          <div className="h-[10px] w-[10px] bg-green-500 rounded-full"></div>
        );
      }
    },
  },
];
const ControllerSetting = () => {
  const [setting, setSetting] = useState([]);
  useEffect(() => {
    const settingRef = ref(db, "setting");
    return onValue(settingRef, (snapshot) => {
      setSetting([]);
      const data = snapshot.val();
      if (snapshot.exists()) {
        var index = 0;
        for (let name in data) {
          const dataArrrange = {
            key: `${index + 1}`,
            mechinenumber: name,
            EEPROM: data[name]["EEPROM address"],
            buadrate: data[name].BuadRate,
            region: data[name].Region,
            power: data[name].PA,
            floor: data[name].Floor,
            status: new Date(data[name].LastTimePing).getTime(),
          };
          setSetting([...setting, dataArrrange]);
          index++;
        }
      }
    });
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={setting} />
    </>
  );
};

export default ControllerSetting;
