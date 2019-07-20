export class Task {
  private readonly id: string;
  private name: string;
  private deadline: Date;
  private notes: string;

  private constructor(id: string, name: string, deadline: Date, notes: string) {
    this.id = id;
    this.name = name;
    this.deadline = deadline;
    this.notes = notes;
  }

  public static of(name: string, deadline: Date, notes: string) {
    return new Task(null, name, deadline, notes);
  }

  /**
   * Creates a task from a json object.
   * @param other
   */
  public static fromJson(other: JSON) {
    let deadlineStr = other['deadline'];
    let deadline: Date = deadlineStr ? new Date(deadlineStr) : null;
    return new Task(other['id'], other['name'], deadline, other['notes']);
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getDeadline() {
    return this.deadline;
  }

  getNotes() {
    return this.notes;
  }
}
