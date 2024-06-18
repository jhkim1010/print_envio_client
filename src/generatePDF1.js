// import makeStyles from "@material-ui/core/styles";
import image_logo from "./logo_remito.png";
import {
  Box,
  Typography,
} from "@mui/material";
import ReactDOMServer from "react-dom/server";

// Arial Black 폰트의 base64 인코딩된 문자열 (일부 생략됨)
const arialBlackBase64 = 'data:font/ttf;base64,...'; // 여기에 base64 데이터를 추가하세요.



const GenerateTableHTML = (clientInfo) => {
  // const classes = useStyles();

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} / ${
    currentDate.getMonth() + 1
  } / ${currentDate.getFullYear()}`;

  const table = (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "20px", width : "250px"}}>
      <Box sx = {{width : "150px"}}>
        <img
          src={image_logo}
          alt="logo"
          style={{ width: "50%", height: "auto" }}
        />
      </Box>
      <Box sx={{ marginLeft: "20px", flexShrink: 0 }}>
        <Typography variant="h6">{formattedDate}</Typography>
      </Box>
    </Box>

  );

  return table;
  // const html = ReactDOMServer.renderToString(table);

  // return html;
};

// Export the functions
export default GenerateTableHTML;
// module.exports.generatePDF = generatePDF;
// module.exports = { generatePDF, printPDF };
