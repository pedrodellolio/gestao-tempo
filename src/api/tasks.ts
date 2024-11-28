import { db } from "@/lib/firebase";
import Task from "@/models/task";
import {
  collection,
  getDocs,
  limitToLast,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export async function fetchTodayTasks(
  userId?: string,
  limit: number = 10
): Promise<Task[]> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0); // Define para meia-noite
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999); // Define para 23:59:59

  const tasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId),
    where("dueDate", ">=", todayStart),
    where("dueDate", "<=", todayEnd),
    limitToLast(limit),
    orderBy("dueDate")
  );

  const tasksSnapshot = await getDocs(tasksQuery);
  return tasksSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      dueDate: data.dueDate.toDate(),
      startTimeInMs: data.startTimeInMs,
      endTimeInMs: data.endTimeInMs,
      hexColor: data.hexColor,
      userId: data.userId,
    };
  });
}

export async function fetchTasks(userId?: string): Promise<Task[]> {
  const tasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  return tasksSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      dueDate: data.dueDate.toDate(),
      startTimeInMs: data.startTimeInMs,
      endTimeInMs: data.endTimeInMs,
      hexColor: data.hexColor,
      userId: data.userId,
    };
  });
}

export async function fetchTask(
  userId?: string,
  taskId?: string
): Promise<Task | undefined> {
  const tasksQuery = query(
    collection(db, "tasks"),
    where("userId", "==", userId)
  );
  const tasksSnapshot = await getDocs(tasksQuery);
  const taskDoc = tasksSnapshot.docs.find((doc) => doc.id === taskId);
  const data = taskDoc?.data();

  return (
    taskDoc &&
    data && {
      id: taskDoc.id,
      title: data.title,
      dueDate: data.dueDate.toDate(),
      startTimeInMs: data.startTimeInMs,
      endTimeInMs: data.endTimeInMs,
      hexColor: data.hexColor,
      userId: data.userId,
    }
  );
}
