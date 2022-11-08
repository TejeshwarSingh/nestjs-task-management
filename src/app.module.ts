import { Module } from '@nestjs/common';
//import { AppController } from './app.controller'; // removed as files are deleted
//import { AppService } from './app.service';       // removed as files are deleted
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
 // controllers: [AppController], // removed as files are deleted
 // providers: [AppService], // removed as files are deleted
})
export class AppModule {}
