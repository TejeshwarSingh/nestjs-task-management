import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

//import { AppController } from './app.controller'; // removed as files are deleted
//import { AppService } from './app.service';       // removed as files are deleted

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task-management',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  // controllers: [AppController], // removed as files are deleted
  // providers: [AppService], // removed as files are deleted
})
export class AppModule {}
