import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogModel } from '../model/log.model';
import { LogsService } from './logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  @Input() uniqueIdentifier: string
  isFetching = false;
  logs: LogModel[] = [];
  logsServiceGetLogsSubscription: Subscription

  constructor(private logService: LogsService) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.logsServiceGetLogsSubscription = this.logService.getLogs(this.uniqueIdentifier).subscribe(data => {
      this.logs = data;
      console.log(this.logs)
      this.isFetching = false;
    })
  }



}
