import { Component, OnInit} from '@angular/core';
import { MasterService } from '../services/master.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MatDialog } from '@angular/material';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-home',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {

  public callsObs$: Observable<Object>;
  public displayedColumns: string[];
  private username: string;
  public call: Object;
  private loaded: boolean;

  constructor(private masterService: MasterService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loaded = false;
    this.displayedColumns = ['position', 'callId', 'callStart', 'agent', 'wrapupName'];
    this.username = localStorage.getItem('username');
    this.callsObs$ = this.masterService.getAllCalls();
    this.callsObs$.subscribe(resp => {
      if (resp) {
        this.loaded = true;
      }

    });
  }

  openDetailModal(call): void {
    this.call = call;
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '100vw',
      data: {call: this.call}
    });
    dialogRef.afterClosed().subscribe();
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
