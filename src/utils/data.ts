import { db } from "../../firebase";

export const getDocument = async <DataType>(
  docID: string
): Promise<DataType> => {
  let data: DataType | null = null;
  const userSnapshot = await db.collection("users").doc(docID).get();
  data = <DataType>userSnapshot.data();
  return data;
};
