import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HideNavMenuService } from '../../services/parent_comp_controls/hide-nav-menu.service';
import { HideFooterService } from '../../services/parent_comp_controls/hide-footer-service.service';
import { LoginService, Token} from '../../services/api-services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private titleService: Title,
              public menuService: HideNavMenuService,
              public footerService: HideFooterService,
              public loginService: LoginService,
              private router: Router) {

        this.titleService.setTitle("Login");
        this.menuService.hide();
        this.footerService.hide();
      this.loginService.getToken('mavrick', 'dangerzoneF14')
          .then((token: Token) => {
              console.log(token);
          });

  }

  ngOnInit() {
  }

  submit() {
      console.log('submit clicked');

  }
}
