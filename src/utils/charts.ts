import { db } from "../../firebase";
import { month, months } from "./chartsHelpers";

export const getChartData = async () => {
  let chartData = new Array(6).fill(0);
  let returnData = [];
  try {
    const data = await db
      .collection("orders")
      .where("timeStamp", ">", months[months.length - 1])
      .get();
    data.forEach((doc) => {
      if (
        doc.createTime.toDate() < months[0] &&
        doc.createTime.toDate() > months[1]
      ) {
        chartData[0] += doc.data().total;
      } else if (
        doc.createTime.toDate() < months[1] &&
        doc.createTime.toDate() > months[2]
      ) {
        chartData[1] += doc.data().total;
      } else if (
        doc.createTime.toDate() < months[2] &&
        doc.createTime.toDate() > months[3]
      ) {
        chartData[2] += doc.data().total;
      } else if (
        doc.createTime.toDate() < months[3] &&
        doc.createTime.toDate() > months[4]
      ) {
        chartData[3] += doc.data().total;
      } else if (
        doc.createTime.toDate() < months[4] &&
        doc.createTime.toDate() > months[5]
      ) {
        chartData[4] += doc.data().total;
      } else if (
        doc.createTime.toDate() < months[5] &&
        doc.createTime.toDate() > months[6]
      ) {
        chartData[5] += doc.data().total;
      }
    });
  } catch (error) {
    console.log(error);
  }

  // Create array of objects {month, value}
  for (let i = 0; i < chartData.length; i++) {
    returnData.push({ [month[months[i].getMonth()]]: chartData[i] });
  }
  // Reverse array order
  for (let i = 0, j = returnData.length - 1; i < j; i++, j--) {
    [returnData[i], returnData[j]] = [returnData[j], returnData[i]];
  }

  return returnData;
};
