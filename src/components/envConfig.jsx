import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../hook/useFirebaseAuth";

const EnvConfig = () => {
  const [config, setConfig] = useState({
    executeTimer: 0,
    waitingTimer: 0,
    readDistance: 0,
  });
  useEffect(() => {
    const settingRef = ref(db, "envConfig");
    return onValue(settingRef, (snapshot) => {
      const data = snapshot.val();
      if (snapshot.exists()) {
        config.executeTimer = data.EXECUTE_COMMAND_TIMER;
        config.waitingTimer = data.WAITING_COMMAND_TIMER;
        config.readDistance = data.READING_DISTANCE;
      }
    });
  }, []);
  return (
    <>
      <h1 className="text-3xl pb-5">Env Config</h1>
      <div className="bg-gray-500 w-[50%] p-5 rounded-xl shadow-xl">
        <h1 className="text-xl">
          EXECUTE COMMAND TIMER : {config.executeTimer}
        </h1>
        <h1 className="text-xl">
          WAITING COMMAND TIMER : {config.waitingTimer}
        </h1>
        <h1 className="text-xl">READING DISTANCE : {config.readDistance}</h1>
      </div>
      <h1>Not yet Implement to adjust</h1>
    </>
  );
};

export default EnvConfig;
