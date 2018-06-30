export default class GameDto {
  public name: string;
  public note: number;

  constructor(name: string, note: number) {
    this.name = name;
    this.note = note;
  }
}
