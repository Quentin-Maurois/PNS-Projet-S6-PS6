import { Component } from '@angular/core';
import {UserService} from "../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../models/quizz.models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-management-users',
  templateUrl: './admin-management-users.component.html',
  styleUrls: ['./admin-management-users.component.scss']
})
export class AdminManagementUsersComponent {
  title = "Gestion des patients";
  users: any[] = [];
  usersList: any[] = [];
  id_user: string | null ="";
  public currentQuiz?: Quiz;
  public UService : UserService;
  formulaire: FormGroup;
  id_admin: string | null ="";
  deleteVisible = false;
  public user_to_delete : Observable<User> | null;

  constructor(private userService: UserService, private route: ActivatedRoute,private formBuilder: FormBuilder,private router: Router) {
    this.UService=userService;
    this.user_to_delete = null;
    this.formulaire = this.formBuilder.group({},{});
  }

  ngOnInit(){
    this.id_user = this.route.snapshot.paramMap.get('id_user');
    this.id_admin = this.route.snapshot.paramMap.get('id_user');
    /**this.userService.getUsers().subscribe((users)=> {
      this.users = users;
    });

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].isAdmin) {
        //
      }else{
        this.usersList.push(this.users[i]);
      }
    }*/
    this.userService.getPatients().subscribe((patients) => {
      this.usersList = patients;
    });

  }

  closeDelete() {
    this.deleteVisible = false;
  }
  openDelete(id:string) {
    this.deleteVisible=true;
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.id_user=id;
    this.user_to_delete = this.userService.getUserById(parseInt(id));
  }

  onSubmit() {
    if(this.id_user!=null){
      this.usersList = this.usersList.filter(u => u.id !== this.id_user);
      this.UService.deleteUser(this.id_user);
      this.deleteVisible=false;
    }
  }
}
