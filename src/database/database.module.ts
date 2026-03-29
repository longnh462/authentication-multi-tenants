import { Module } from '@nestjs/common';
import { databaseProviders } from './database.datasource';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule {}
