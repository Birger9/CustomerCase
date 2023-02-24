import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn({
    name: 'email_address',
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  rights: number; // 0 = Read, 1 = Read and Write, 2 = Read, Write and create new employee.
}
