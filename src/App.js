import "./App.css";
import io from "socket.io-client";
import { useEffect,  useState, useRef } from "react";
import DisplayEnvioList from "./DisplayEnvioList1"

const socket = io.connect("http://localhost:3001");

function App() {
  // const datas1 = []; 
  const [datas, setDatas] = useState(null);
  // const [selectedData, setSelectedData] = useState();
  // const tableRef = useRef();
  // const [messageReceived, setMessageReceived] = useState("");
  // const [room, setRoom] = useState("");

  const readDatas = () => {
    socket.emit("get_data", "envio_imp")  
  }

  useEffect(() => {
    socket.on("receive_data", (datas1) => {
      // console.log(datas1)
      setDatas(datas1)
      // setSelectedData(true)
    }); 
  }, [socket]); 

  return (
    <div className="App">
      <button onClick={readDatas}>Get List to print</button>
      <h1>List of Envio</h1>
      <DisplayEnvioList datas = {datas}/>
      <br />
    </div>
  );
}

export default App;
