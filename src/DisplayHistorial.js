// import React from "react";
// import React, { useState } from "react";
// import io from "socket.io-client";
import MaterialTable from "material-table";

// const socket = io.connect("http://localhost:3001");

function DisplayHistorial({ datas }) {
  // const [selectedData, setSelectedData] = useState(null);
  console.log("Dentro de DisplayHistorial");
  console.log(typeof datas);
  console.log(datas);
  // const data_to_show = datas.filter((data) => data.is_deleted);
  // console.log(data_to_show);

  const historial = []; 

  datas? (datas.forEach(element => {
    historial.push({
      fecha: element.date,
      nombre: element.nombre_cliente,
      prov: element.cliente.prov_transp,
      localidad: element.cliente.localidad_transp, 
      transporte: element.cliente.transporte,
      bulto: element.cant,  
  })} )): console.log("No hay datos");

  const columns = [
    { title: "Fecha", field: "fecha", align: "center", defaultSort: "asc" },
    {
      title: "Nombre",
      field: "nombre",
      align: "center",
    },
    { title: "Provincia", field: "prov" },
    { title: "Localidad", field: "localidad", emptyValue: () => <em>null</em> },
    { title: "Transporte", field: "transporte" },
    { title: "Bulto", field: "bulto" },
  ];
  return (
    <div>
      <MaterialTable
        columns={columns}
        data={historial}
        title="Historial de Impresiones de Envios"
        options={{
          search: false,
          paging: true,
          filtering: true,
          exportButton: true,
          pageSizeOptions: [3, 5, 10],
          pageSize: 10,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          paginationPosition: "top",
          exportAllData: true,
          exportFileName: "Student Information ACE",
          addRowPosition: "first",
          //   actionsColumnIndex: -1,
        }}
      />
    </div>
  );
}

export default DisplayHistorial;
