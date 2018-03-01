import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HideNavMenuService } from '../../services/parent_comp_controls/hide-nav-menu.service';
import { HideFooterService } from '../../services/parent_comp_controls/hide-footer-service.service';
import { LoginService, Token } from '../../services/api-services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public showWaiting = false;
    public showForm = true;
    public showSuccess = false;
    public waitingMessage = 'waiting';
    public userName: string;
    public password: string;

    constructor(private titleService: Title,
              public menuService: HideNavMenuService,
              public footerService: HideFooterService,
              public loginService: LoginService,
              private router: Router) {

        this.titleService.setTitle("Login");
        this.menuService.hide();
        this.footerService.hide();

        this.loginService.checkIfTokenIsValid()
            .then ((isValid) => {
                if (isValid) {
                    console.log('isValid token in local');
                    this.setLoggedInState();
                }
            })
            .catch((error) => {
                this.setLogInFailedState();
                console.log(error);
            });
    }

    ngOnInit() {
    }

    setDefaultState () {
        this.waitingMessage = '';
        this.showSuccess = false;
        this.showWaiting = false;
        this.showForm = true;
    }
    setWaitingState () {
        this.waitingMessage = 'loading...';
        this.showSuccess = false;
        this.showForm = false;
        this.showWaiting = true;
    }

    setLoggedInState () {
        this.showWaiting = false;
        this.showSuccess = true;
        this.showForm = false;
        this.waitingMessage = 'Your Logged In!!!';
    }

    setLogInFailedState() {
        this.showWaiting = false;
        this.showForm = true;
        this.waitingMessage = 'login failed';
    }
    setUser(event) {
        this.userName = event.target.value;
    }

    setPassword(event) {
        this.password = event.target.value;
    }

    submit() {
        this.setWaitingState();
        this.loginService.getToken(this.userName, this.password)
            .then(() => {
                this.setLoggedInState ();
            })
            .catch((err) => {
                this.setLogInFailedState();
            });
    }
    signOut() {
        this.setDefaultState();
        this.loginService.signOut();
    }
}
