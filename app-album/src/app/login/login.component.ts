import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username;
  pswd;
  errorMessage;
  private _error = new Subject<string>();
  constructor(private router: Router) { }

  ngOnInit(): void {
    this._error.subscribe(message => this.errorMessage = message);
    this._error.pipe(debounceTime(5000)).subscribe(() => this.errorMessage = '');
  }
  submit() {

    if (this.username === 'user1' && this.pswd === 'pa$$w0rd') {
      this.router.navigate(['/dashboard']);
      sessionStorage.setItem('isLoggedIn', 'true');
    }
    else
      this._error.next('Invalid Username/Password')
  }
}
