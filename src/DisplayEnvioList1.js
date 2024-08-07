// import React from "react";
// import React, { useState } from "react";
import io from "socket.io-client";
import image_logo from "./logo_remito.png";
import image_envio from "./envio.png";
import jsPDF from "jspdf";
import React, {useContext} from "react";

const socket = io.connect("http://localhost:3001");
const {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} = require("@mui/material");

function DisplayEnvioList( {datas, is_print_date} ) {
  // const [selectedData, setSelectedData] = useState(null);
  
  console.log("Dentro de DisplayEnvioList");
  // console.log(typeof datas );
  // console.log(typeof datas.datas );
  console.log(is_print_date );
  
  // const newArray = null;
  
  // console.log(newArray);

  // Arial Black 폰트의 base64 인코딩된 문자열 (일부 생략됨)
  const arialBlackBase64 = "data:font/ttf;base64,..."; // 여기에 base64 데이터를 추가하세요.

  const generatePDF = (data1) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a5",
    });

    // Arial Black 폰트 추가
    doc.addFileToVFS("ArialBlack.ttf", arialBlackBase64);
    doc.addFont("ArialBlack.ttf", "ArialBlack", "normal");

    // 이미지 로드
    //  const img = await loadImage(process.env.PUBLIC_URL + '/client/src/logo_remito.png');
    // console.log("Dentro de generatePDF");
    // console.log(data1);

    Array.from({ length: data1.cant }).forEach((_, i) => {
      // 3번 이상 찍게 될 때 새 페이지를 추가...
      if (i !== 0 && i % 2 === 0) doc.addPage();
      // console.log(i);
      addPageContent(doc, data1, i + 1, (i % 2) * 100, is_print_date);
    });
    // // 두 번째 내용 추가
    // addPageContent(doc, 100); // yOffset을 이용해 아래에 배치

    // PDF 저장
    doc.save("output.pdf");

    // PDF 인쇄
    window.open(doc.output("bloburl"), "_blank");

    deleteData(data1.id_envio_imp);
  };

  let lengthPerStr = 40;

  function splitStringByLength(str, length) {
    let result = [];
    let words = str.split(" ");
    let currentStr = "";

    for (let word of words) {
      if ((currentStr + word).length > length) {
        result.push(currentStr.trim());
        currentStr = word + " ";
      } else {
        currentStr += word + " ";
      }
    }

    // 마지막 문자열 추가
    if (currentStr.length > 0) {
      result.push(currentStr.trim());
    }

    return result;
  }
  // 페이지에 내용 추가 함수
  const addPageContent = (doc, cliente_data, current_index, yOffset = 0, is_print_date) => {
    // 로고 추가
    console.log(`Dentro de AddPageContent`);
    console.log(is_print_date);
    // const is_print_date = useContext(IsPrintDateContext);

    // cutter line
    if (current_index % 2 === 0)
      doc.text(
        "-----------------------------------------------------------------------------------",
        0,
        4 + yOffset
      );

    doc.addImage(image_logo, "PNG", 30, 10 + yOffset, 70, 25);
    doc.addImage(image_envio, "PNG", 10, 35 + yOffset, 15, 60);

    // 날짜 추가
    doc.setFont("ArialBlack");
    doc.setFontSize(20);
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    // console.log(`${date}.${month}.${year}`);
    if (is_print_date)
    doc.text(
      `${String(date).padStart(2, "0")}.${String(month).padStart(
        2,
        "0"
      )}.${year}`,
      100,
      25 + yOffset
    );

    // 사각형 추가
    doc.rect(30, 40 + yOffset, 110, 10); // nombre
    doc.rect(30, 51 + yOffset, 110, 10); // direccion
    doc.rect(30, 62 + yOffset, 110, 10); // localidad y prov
    doc.rect(30, 73 + yOffset, 110, 10); // transporte
    doc.rect(30, 84 + yOffset, 110, 10); // Bulto

    // // "Hola" 텍스트 추가 (Arial Black 폰트 사용)
    doc.setFont("ArialBlack");
    doc.setFontSize(10);

    doc.text("Nombre     ", 32, 46 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text("Dirección  ", 32, 57 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text("Localidad  ", 32, 68 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text("Provincia  ", 32, 79 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text("Cod.Post ", 102, 79 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text("Transporte ", 32, 90 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text("Bulto      ", 112, 90 + yOffset); // 사각형 내부에 텍스트 추가

    // // "Hola" 텍스트 추가 (Arial Black 폰트 사용)
    // doc.setFont("ArialBlack");
    doc.setFontSize(14);

    doc.text(cliente_data.nombre_cliente, 52, 47 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text(cliente_data.cliente.localidad_transp, 52, 69 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text(cliente_data.cliente.prov_transp, 52, 80 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text(cliente_data.cliente.codigo_postal, 122, 80 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text(cliente_data.cliente.transporte, 52, 91 + yOffset); // 사각형 내부에 텍스트 추가
    doc.text(
      `${current_index}/${cliente_data.cant.toString()}`,
      122,
      91 + yOffset
    ); // 사각형 내부에 텍스트 추가

    // const direccion_length_limit = 30;

    if (cliente_data.cliente.direccion_transp.length > lengthPerStr) {
      doc.setFontSize(10);
      let splitStrings = splitStringByLength(cliente_data.cliente.direccion_transp, lengthPerStr);
      const direc1 = splitStrings[0];
      const direc2 = splitStrings[1];

      console.log(`addPageContent] direc1 : ${direc1}, direc2 : ${direc2}`);

      // const direc1 = cliente_data.cliente.direccion_transp.substring(
      //   0,
      //   direccion_length_limit
      // );
      // const direc2 = cliente_data.cliente.direccion_transp.substring(
      //   direccion_length_limit,
      //   cliente_data.cliente.direccion_transp.length
      // );
      doc.text(direc1, 52, 55 + yOffset); // 사각형 내부에 텍스트 추가
      doc.text(direc2, 52, 60 + yOffset); // 사각형 내부에 텍스트 추가
    } else {
      doc.text(cliente_data.cliente.direccion_transp, 52, 58 + yOffset); // 사각형 내부에 텍스트 추가
    }
    // doc.text("Hola", 20, 80 + yOffset); // 사각형 내부에 텍스트 추가
  };
  const deleteData = (id) => {
    console.log(id);
    const data = { id_envio_imp: id };
    socket.emit("cancel_data", data);
  };

  return (
    <div>
      <TableContainer component={Paper} id="print-content">
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell>Check</TableCell> */}
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Provincia</TableCell>
              <TableCell>Transporte</TableCell>
              <TableCell>Cant</TableCell>
              <TableCell>Orden</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datas  ?
              datas.map((data) => (
                  <TableRow key={data.id_envio_imp}>
                    <TableCell>{data.id_envio_imp}</TableCell>
                    <TableCell>{data.nombre_cliente}</TableCell>
                    <TableCell>{data.cliente.prov_transp}</TableCell>
                    <TableCell>{data.cliente.transporte}</TableCell>
                    <TableCell>{data.cant}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // setSelectedData(data);
                          console.log(data);
                          generatePDF(data);
                        }}
                      >
                        Print
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteData(data.id_envio_imp)}
                      >
                        Delete
                      </Button>{" "}
                      {/* 각 행에 출력 버튼 추가 */}
                    </TableCell>{" "}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Button variant="contained" color="primary" onClick={handlePrint}>Print to PDF</Button> */}
      {/* <br />
      <div>
        {selectedData && (
          <TableComponent selectedData={selectedData} />
        )}
      </div>

      <ReactToPrint
        trigger={() => <button onClick={handlePrint}>Print</button>}
        content={() => tableRef.current}
        pageStyle="@page { size: A5 }"
      /> */}
    </div>
  );
}

export default DisplayEnvioList;
