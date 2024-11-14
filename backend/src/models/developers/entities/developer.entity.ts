import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'developer' })
export class DeveloperEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  githubUsername: string;

  @Column()
  githubUrl: string;

  @Column()
  avatarUrl: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  education: string;

  @Column('simple-array')
  skills: string[];
}
