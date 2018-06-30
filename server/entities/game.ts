import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Game {
  @PrimaryGeneratedColumn() public id: number;

  @Column() public name: string;

  @Column() public note: number;
}
