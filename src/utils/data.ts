import { db } from "../../firebase";
import { WIDGET } from "../types/widghet";

// get single document from database
export const getDocument = async <T>(
  collection: string,
  docID: string
): Promise<T> => {
  let data: T | null = null;
  const userSnapshot = await db.collection(collection).doc(docID).get();
  data = <T>userSnapshot.data();

  if (data == null) throw new Error();

  return data;
};

// get collection from database
export const getCollection = async <T>(collection: string): Promise<T[]> => {
  let data: any[] = [];

  const usersSnapshot = await db.collection(collection).get();
  usersSnapshot.forEach((doc) => {
    const withId = { ...doc.data(), id: doc.id };
    data.push(withId);
  });

  if (data === null) throw new Error();

  return data as T[];
};

// add document to database collection
export const addDocument = async <T>(
  collection: string,
  doc: T
): Promise<T | null> => {
  let data: T | null = null;

  await db
    .collection(collection)
    .add(<FirebaseFirestore.DocumentData>doc)
    .then((userSnapshot) => {
      userSnapshot.get().then((user) => {
        data = <T>user.data();
      });
    });

  return data;
};

// get data for widgets
export const getWidget = async (type: string) => {
  const today = new Date();
  const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

  let users: number = 0;
  let difference: number = 0;

  const [lastMonthData, prevMonthData, alltimeData] = await Promise.all([
    db
      .collection(type === "users" ? "users" : "orders")
      .where("timeStamp", "<=", today)
      .where("timeStamp", ">", lastMonth)
      .get(),
    db
      .collection(type === "users" ? "users" : "orders")
      .where("timeStamp", "<=", lastMonth)
      .where("timeStamp", ">", prevMonth)
      .get(),
    db.collection(type === "users" ? "users" : "orders").get(),
  ]);

  // base on widget type decide what to do with data from database
  let sum = 0;
  let sumLast = 0;
  let sumPrev = 0;
  switch (type) {
    case "users":
    case "orders":
      users = lastMonthData.docs.length;
      difference =
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
        100;
      break;

    case "earnings":
      lastMonthData.docs.forEach((doc) => {
        sumLast += doc.data().total;
      });
      prevMonthData.docs.forEach((doc) => {
        sumPrev += doc.data().total;
      });
      users = sumLast;
      difference = Math.floor(((sumLast - sumPrev) / sumPrev) * 100);

      break;
    case "balance":
      alltimeData.docs.forEach((doc) => {
        sum += doc.data().total;
      });
      lastMonthData.docs.forEach((doc) => {
        sumLast += doc.data().total;
      });
      prevMonthData.docs.forEach((doc) => {
        sumPrev += doc.data().total;
      });

      users = sum;
      difference = Math.floor(((sumLast - sumPrev) / sumPrev) * 100);
      break;
    default:
      break;
  }

  return { users, difference };
};
