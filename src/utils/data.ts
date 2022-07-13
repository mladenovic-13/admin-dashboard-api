import { db } from "../../firebase";

// get single document from database
export const getDocument = async <T>(docID: string): Promise<T> => {
  let data: T | null = null;
  const userSnapshot = await db.collection("users").doc(docID).get();
  data = <T>userSnapshot.data();

  if (data == null) throw new Error();

  return data;
};

// get collection from database
export const getCollection = async <T>(
  collectionName: string
): Promise<T[]> => {
  let data: T[] = [];

  const usersSnapshot = await db.collection("users").get();
  usersSnapshot.forEach((doc) => {
    data.push(<T>doc.data());
  });

  if (data === null) throw new Error();

  return data;
};

// add document to database collection
export const addDocument = async <T>(
  collectionName: string,
  doc: T
): Promise<T | null> => {
  let data: T | null = null;

  await db
    .collection("users")
    .add(<FirebaseFirestore.DocumentData>doc)
    .then((userSnapshot) => {
      userSnapshot.get().then((user) => {
        data = <T>user.data();
      });
    });

  return data;
};
