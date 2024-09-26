export default interface Task {
  id?: string;
  userId: string;
  title: string;
  dueDate: Date;
  startTimeInMs: number;
  endTimeInMs: number;
  hexColor: string;
}
