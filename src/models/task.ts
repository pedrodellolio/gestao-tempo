export default interface Task {
  id: string;
  title: string;
  dueDate: Date;
  startTimeInMs: number;
  endTimeInMs: number;
  hexColor: string;
}
