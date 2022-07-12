import admin, { credential, ServiceAccount } from "firebase-admin";
import { IOrder, IProduct, IUser } from "./src/types/data";
import serviceAccount from "/Users/mladenovic13/Dev/keys/admin-dashboard-de6f9-firebase-adminsdk-p9r1n-4c6551ba76.json";

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const db = admin.firestore(app);
// export const storage = admin.storage(app);

export default admin;
