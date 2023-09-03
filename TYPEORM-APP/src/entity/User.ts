import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

// User 테이블의 타입 정의 및 테이블 생성
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

}
