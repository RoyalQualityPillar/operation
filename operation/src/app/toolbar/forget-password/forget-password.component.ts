import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarService } from '../../service/toolbar.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: false,
})
export class ForgetPasswordComponent implements OnInit {
  hide = true;
  LoginForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private route: Router,
    private toolbarService: ToolbarService,
    private authService: AuthService
  ) {
    this.LoginForm = this.fb.group({
      userid: [''],
    });
  }
  ngOnInit(): void {
    console.log('working forget');
  }

  onSubmit() {
    this.authService
      .forgetPasswordDetail(this.LoginForm.controls['userid'].value)
      .subscribe((data) => {
        console.log(data);
        this.route.navigate(['./login']);
      });
  }
  onReset() {
    console.log('reset working');
    this.LoginForm.reset();
  }
}
