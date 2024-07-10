import "./App.css";
import io from "socket.io-client";
import { useEffect, useState, createContext } from "react";
import DisplayEnvioList from "./DisplayEnvioList1";
import DisplayHistorial from "./DisplayHistorial";
// const { Button } = require("@mui/material");

const socket = io.connect("http://localhost:3001");

function App() {
  // const datas1 = [];
  // const [datas, setDatas] = useState(null);
  const [is_print_date, setIsPrintDate] = useState(false);
  const [datas2print, setDatas2Print] = useState(null);
  const [datas2historial, setDatas2Historial] = useState(null);
  const IsPrintDateContext = createContext(is_print_date);
  // const tableRef = useRef();
  // const [messageReceived, setMessageReceived] = useState("");
  // const [room, setRoom] = useState("");

  useEffect(() => {
    socket.emit("get_data", "envio_imp");
    //    socket.emit("get_configuration");

    socket.emit("get_config", "envio_imp");
  }, []);

  // function readDatas() {
  //   socket.emit("get_data", "envio_imp");
  // };

  useEffect(() => {
    socket.on("configurations", (config1) => {
      console.log("Configurations");
      console.log( is_print_date);
      config1.is_print_date === "True"
        ? setIsPrintDate(true)
        : setIsPrintDate(false);
    });

    socket.on("receive_data", (datas1) => {
      // console.log("Receive Data on.... ");
      // console.log(datas1);
      // setDatas(datas1);

      const data_to_print = datas1.filter((data) => !data.is_deleted);
      console.log(data_to_print);
      setDatas2Print( data_to_print );

      const data_to_historial = datas1.filter((data) => data.is_deleted);
      console.log(data_to_historial);
      setDatas2Historial(data_to_historial);

      // setSelectedData(true)
    });
  }, [socket]);

  return (
    <div className="App">
      <h1>List of Envio</h1>
      {/* <IsPrintDateContext.Provider value={{ is_print_date }}> */}
        <DisplayEnvioList datas = {datas2print}  is_print_date = {is_print_date}/>
      {/* </IsPrintDateContext.Provider> */}
      <br />
      <DisplayHistorial datas={datas2historial} />
    </div>
  );
}

export default App;
