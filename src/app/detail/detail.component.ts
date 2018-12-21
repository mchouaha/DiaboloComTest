import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnChanges {

  @Input() call:any;
  private show:boolean;

  detailForm = new FormGroup({
    callId: new FormControl('', Validators.required),
    callStart: new FormControl('', Validators.required),
    agent: new FormControl('', Validators.required),
    wrapupName: new FormControl('', Validators.required)
  });

  constructor(private masterService: MasterService) {};

  ngOnInit() {
    this.show = false;
  }

  ngOnChanges(changes) {
    if(changes.call.currentValue) {
      this.show = true;
      console.log(this.call);
      this.detailForm.setValue({
        callId:[this.call.callId],
        callStart:[this.call.callStart],
        agent:[this.call.callWrapups[0].agent.login],
        wrapupName:[this.call.callWrapups[0].wrapupName]
      })
    }
  }

  onSubmit():void {
    this.call.callId = this.detailForm.value.callId;
    this.call.callStart = this.detailForm.value.callStart;
    this.call.callWrapups[0].agent.login = this.detailForm.value.agent;
    this.call.callWrapups[0].wrapupName = this.detailForm.value.wrapupName;
    this.masterService.replaceCall(this.call).subscribe();
  }
}
