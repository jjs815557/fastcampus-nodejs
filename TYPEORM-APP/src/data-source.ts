import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

//DB 연결을 위한 설정값들
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
