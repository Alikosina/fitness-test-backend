import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
//   CreateDateColumn,
//   DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
//   UpdateDateColumn,
} from 'typeorm';
import { fromHash, toHash } from './password.transformer';

@Exclude()
@Entity()
export class Users extends BaseEntity {
  constructor(args: any = {}) {
    super();
    Object.assign(this, args);
  }

  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

//   @DeleteDateColumn()
//   deleted_at: Date;

  @Expose()
  @Column()
  username: string;

  @Column({ unique: true })
  normalizedUsername: string;

//   @Expose()
//   @Column()
//   email: string;

//   @Column({
//     unique: true,
//   })
//   normalizedEmail: string;

//   @Expose()
//   @Column({
//     default: false,
//   })
//   hasVerifiedEmail: boolean;

  @Column({
    nullable: true,
    transformer: {
      from: fromHash,
      to: toHash,
    },
  })
  password?: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;

  @Column({ nullable: true })
  google?: string;

  @Column({ nullable: true })
  facebook?: string;

  @Column({ nullable: true })
  github?: string;

  @Column({ nullable: true })
  twitter?: string;

  @Column('json', { nullable: true })
  tokens?: Record<string, unknown>;

  @BeforeInsert()
  @BeforeUpdate()
  normalize(): void {
    this.normalizedUsername = this.username.toLowerCase();
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}