class Person {
  public name: string;
  private marks: number;

  constructor(name: string, marks: number) {
    this.name = name;
    this.marks = marks;
  }
  public showDetails(): void {
    console.log(`Team: ${this.name}, Marks: ${this.marks}`);
  }
}
