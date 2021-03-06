import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../_services/user.service';
import { User } from './../../_models/User';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
   ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

}
