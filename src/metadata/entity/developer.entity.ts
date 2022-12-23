import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';


@Entity()
export class Developer
{
    @PrimaryGeneratedColumn({ name: "developerID" })
    id: number;

    @Column()
    firstName: string;

    @Column()
    familyName: string;

    @Column()
    userName: string;

    @Column()
    birthday: Date;

    @Column()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    phoneNumber: string;

    @Column()
    mobileNumber: string;

    @CreateDateColumn()
    createdOn: Date;

    @Column()
    @Exclude()
    refreshToken: string;
}