import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Job } from '../job.model';
import { JobService } from '../job.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs : Job[] 
  fiveMinutes = 1000*60*5
  error : string ;
  errorTitle : string
  
  constructor(private jobService : JobService,
    private dataStorageService : DataStorageService) {
    if(!jobService.getJobs()){
      this.getData()
    }
    else {
        this.jobs = jobService.getJobs()
      }
   }

  ngOnInit(): void {
   setInterval(() => this.getData(), this.fiveMinutes);
   this.jobService.headerTitle.next("News reader")
  } 
  getData(){
    this.dataStorageService.fetchJobs().subscribe( 
      resJobs => {
      this.jobs = resJobs
      this.jobService.setloader.next(false)
      },
      error => {
       this.jobService.errorHappened.next(true)
        this.jobService.setloader.next(false)    
      })
  }

}
