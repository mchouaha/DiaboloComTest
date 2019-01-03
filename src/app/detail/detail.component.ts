import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../services/master.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  detailForm = new FormGroup({
    callId: new FormControl('', Validators.required),
    callStart: new FormControl('', Validators.required),
    agent: new FormControl('', Validators.required),
    wrapupName: new FormControl('', Validators.required)
  });

  constructor(private masterService: MasterService,
              public dialogRef: MatDialogRef<DetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) {};

  ngOnInit() {
    this.detailForm.setValue({
          callId:[this.data.call.callId],
          callStart:[this.data.call.callStart],
          agent:[this.data.call.callWrapups[0].agent.login],
          wrapupName:[this.data.call.callWrapups[0].wrapupName]
        })
  }

  onSubmit(): void {
    this.data.call.callWrapups[0].agent.login = this.detailForm.value.agent;
    this.data.call.callWrapups[0].wrapupName = this.detailForm.value.wrapupName;
    this.masterService.replaceCall(this.data.call).subscribe();
    this.closeModal();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
