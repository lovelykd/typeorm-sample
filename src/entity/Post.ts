import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @ManyToOne(() => User, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'user_id'})
    user: User
}