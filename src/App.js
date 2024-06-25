import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import DisplayEnvioList from "./DisplayEnvioList1";
import DisplayHistorial from "./DisplayHistorial";
// const { Button } = require("@mui/material");

const socket = io.connect("http://localhost:3001");

function App() {
  // const datas1 = [];
  const [datas, setDatas] = useState(null);
  const [datas2print, setDatas2Print] = useState(null);
  const [datas2historial, setDatas2Historial] = useState(null);
  // const tableRef = useRef();
  // const [messageReceived, setMessageReceived] = useState("");
  // const [room, setRoom] = useState("");

  useEffect(() => {
    socket.emit("get_data", "envio_imp");
  }, []);

  // function readDatas() {
  //   socket.emit("get_data", "envio_imp");
  // };

  useEffect(() => {
    socket.on("receive_data", (datas1) => {
      console.log(datas1)
      setDatas(datas1);

      const data_to_print = datas1.filter((data) => !data.is_deleted );
      // console.log(data_to_print);   
      setDatas2Print(data_to_print);   

      const data_to_historial = datas1.filter((data) => data.is_deleted );
      // console.log(data_to_historial);   
      setDatas2Historial(data_to_historial);   

      // setSelectedData(true)
    });
  }, [socket]);

  return (
    <div className="App">
      {/* <button onClick={readDatas}>Get List to print</button> */}
      <h1>List of Envio</h1>
      <DisplayEnvioList datas={datas2print} />
      <br />
      <DisplayHistorial datas={datas2historial} />
    </div>
  );
}

export default App;
