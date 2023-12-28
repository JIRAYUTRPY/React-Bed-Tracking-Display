import { useState } from "react";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import DataDisplay from "../components/DataDisplay.jsx";
import ControllerSetting from "../components/ControllerSetting.jsx";
import EnvConfig from "../components/envConfig.jsx";
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
  getItem("Setting", "setting", <SettingOutlined />, [
    getItem("Controller setting", "controllerSetting"),
    getItem("Env Config", "envConfig"),
  ]),
  {
    type: "divider",
  },
];

function Home() {
  const [page, setPage] = useState("data");
  const onClick = (e) => {
    setPage(e.key);
  };

  return (
    <div className="flex">
      <Menu
        onClick={onClick}
        style={{
          width: "15%",
          height: "100vh",
        }}
        mode="inline"
        className="shadow-xl"
        items={items}
      />
      <div className="p-10 bg-gray-300 w-full">
        <div className={page == "data" ? "" : "hidden"}>
          <DataDisplay />
        </div>
        <div className={page == "controllerSetting" ? "" : "hidden"}>
          <ControllerSetting />
        </div>
        <div className={page == "envConfig" ? "" : "hidden"}>
          <EnvConfig />
        </div>
      </div>
    </div>
  );
}

export default Home;
