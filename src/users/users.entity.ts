import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity()
export class Users extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        type: "varchar",
        unique: true,
        nullable: false
    })
    public username: string;

    @Column({
        type: "varchar",
        unique: true,
        nullable: false
    })
    public email: string;

    @Column({
        type: "varchar",
        nullable: false
    })
    public password: string;

    @Column()
    @CreateDateColumn()
    public createdAt: Date;

    @Column()
    @CreateDateColumn()
    public updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}