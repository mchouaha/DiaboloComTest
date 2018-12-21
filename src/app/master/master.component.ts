import { Component, OnInit} from '@angular/core';
import { MasterService } from '../services/master.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

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
  private loaded:boolean;

  constructor(private masterService: MasterService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.loaded = false;
    this.displayedColumns = ['position', 'callId', 'callStart', 'agent', 'wrapupName'];
    this.username = localStorage.getItem("username")
    this.callsObs$ = this.masterService.getAllCalls();
    this.callsObs$.subscribe(resp=>{
      if(resp)
        this.loaded = true;
    });
  }

  editCard(call):void {
    this.call = call;
  }

  logout():void {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
