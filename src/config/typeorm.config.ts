import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {

    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'postgres',
    password: '123',
    database: 'taskDb',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true
}