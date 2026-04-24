  import { Component, inject, signal} from '@angular/core';
  import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
  import { Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
  import { IApiResponse, InitialLoginValue, IUser } from '../../core/classes/interface/interface';
  import { Subscription } from 'rxjs';
  import { HospitalService } from '../../core/services/hospital.service';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

  @Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
  })
  export class HeaderComponent {
    
    isLoading =  signal(false)
    loginForm!:FormGroup;
    loginservice = inject(HospitalService)
    router=inject(Router)

    private sub!:Subscription;

  ngOnInit(): void {
    
  this.loginvalidatin()
    
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    
  }

    loginvalidatin() {
      this.loginForm = new FormGroup({
        userName: new FormControl(InitialLoginValue.userName, [Validators.required]),
        password: new FormControl(InitialLoginValue.password, [Validators.required]),
      })
    }

    onlogin() {
      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        return;
      }

      if (this.isLoading()) return;

      const loginDetails = {
        userName: (this.loginForm.value.userName || '').trim(),
        password: (this.loginForm.value.password || '').trim()
      };
      this.isLoading.set(true);

      this.sub = this.loginservice.loginuser(loginDetails).subscribe({
        next: (res: IApiResponse<IUser>) => {
          this.isLoading.set(false);

          if (res.Result) {
            alert(res.Message);
            localStorage.setItem("loginUser", JSON.stringify(res.Data))
            this.loginservice.currectUser.set(res.Data)
            const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modal?.hide();
            this.onReset();
            this.router.navigateByUrl("/dashboard");        
          } else {
            alert(res.Message);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          const errorMsg = err.error?.Message || "Wrong Email or Password";
          alert(errorMsg);
          this.onReset();
        }
      });
    }

  onLogOut(){
      localStorage.removeItem("loginUser")
      this.loginservice.currectUser.set(null)
      this.router.navigateByUrl("/home")
  }

  onReset(){
  this.loginForm.reset(InitialLoginValue);
  }
  }
