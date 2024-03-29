import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiStatus } from 'src/app/shared/data-access/api.model';
import { SeoService } from 'src/app/shared/utils/seo.service';

interface SignupForm {
  username: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
}

@Component({
  selector: 'app-signup',
  template: `
    <app-navbar></app-navbar>

    <div class="mt-10">
      <img
        class="mx-auto h-12 w-12"
        src="/assets/logo.webp"
        alt="Your Company"
      />
      <h1
        class="text-center font-extrabold text-3xl  leading-9 tracking-tight mt-4 text-white"
      >
        Sign up for an account
      </h1>
    </div>

    <div class="mt-10 mx-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div
        class="backdrop-blur-lg bg-white/10 p-12 rounded-xl shadow-xl bg-opacity-10 "
      >
        <form
          class="space-y-6"
          [formGroup]="signupForm"
          (ngSubmit)="onSubmit()"
        >
          <div
            *ngIf="signupError$ | async as loginError"
            class="border-2 border-white/10 rounded"
          >
            <div class="text-red-400 text-center my-2">
              {{ loginError }}
            </div>
          </div>

          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-white"
            >
              Username
            </label>
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="username"
                autocomplete="username"
                formControlName="username"
                required
                class="text-white block w-full px-3 focus:border-violet-400 focus:ring-violet-400 focus:outline-none focus:ring-1 rounded-md py-1.5 bg-slate-900/25 ring-0 background-blur border-white/20 border-2 bg-opacity-50 background-blur sm:text-sm sm:leading-6"
              />
            </div>
            <label
              *ngIf="
                signupForm.get('username')?.touched &&
                signupForm.get('username')?.hasError('required')
              "
              class="text-sm text-red-400"
            >
              Username is required.
            </label>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-white"
            >
              Password
            </label>
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="password"
                formControlName="password"
                required
                class="text-white block w-full focus:border-violet-400 focus:ring-violet-400 focus:outline-none focus:ring-1 rounded-md py-1.5 bg-slate-900/25 ring-0 background-blur border-white/20 border-2 bg-opacity-50 background-blur sm:text-sm sm:leading-6"
              />
            </div>
            <label
              *ngIf="
                signupForm.get('password')?.touched &&
                signupForm.get('password')?.hasError('required')
              "
              class="text-sm text-red-400"
            >
              Password is required.
            </label>
            <label
              *ngIf="
                signupForm.get('password')?.touched &&
                signupForm.get('password')?.hasError('minlength')
              "
              class="text-sm text-red-400"
            >
              Password must be at least 8 characters.
            </label>
          </div>

          <div>
            <label
              for="passwordConfirm"
              class="block text-sm font-medium leading-6 text-white"
            >
              Confirm password
            </label>
            <div class="mt-2">
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autocomplete="passwordConfirm"
                formControlName="passwordConfirm"
                required
                class="text-white block w-full focus:border-violet-400 focus:ring-violet-400 focus:outline-none focus:ring-1 rounded-md py-1.5 bg-slate-900/25 ring-0 background-blur border-white/20 border-2 bg-opacity-50 background-blur sm:text-sm sm:leading-6"
              />
            </div>
            <label
              *ngIf="
                signupForm.get('passwordConfirm')?.touched &&
                signupForm.get('passwordConfirm')?.hasError('required')
              "
              class="text-sm text-red-400"
            >
              Confirm password is required.
            </label>
            <label
              *ngIf="signupForm.get('passwordConfirm')?.touched && !signupForm.get('passwordConfirm')?.hasError('required') && signupForm.errors?.['notMatching']"
              class="text-sm text-red-400"
            >
              Passwords must match.
            </label>
          </div>

          <div>
            <div class="relative inline-block w-full mt-2">
              <div
                class="absolute translate-y-1 inset-0 bg-lime-600 rounded-xl"
              ></div>
              <button
                class="relative w-full h-full bg-lime-500 text-white font-bold py-2 px-4 rounded-xl active:translate-y-1 active:bg-lime-500"
              >
                Sign up
              </button>
            </div>
          </div>

          <div>
            <div class="flex justify-center items-center mt-10">
              <hr class="h-0.5 w-full border-0 bg-white/20 opacity-90 " />
              <div class="mx-4 min-w-fit text-white text-sm font-medium">
                Or continue with
              </div>
              <hr class="h-0.5 w-full border-0 bg-white/20 opacity-90 " />
            </div>
          </div>
          <div class="mt-6 grid grid-cols-2 gap-4">
            <button
              class="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              title="OAuth login coming soon"
              disabled
            >
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
              <span class="text-sm font-semibold leading-6">Twitter</span>
            </button>

            <button
              class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
              title="OAuth login coming soon"
              disabled
            >
              <svg
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm font-semibold leading-6">GitHub</span>
            </button>
          </div>
        </form>
      </div>
      <h2 class="text-center text-slate-300 mt-8">
        Already have an account?
        <a class="text-violet-400" routerLink="/auth/signin"> Sign in </a>
      </h2>
    </div>
  `,
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  private signupErrorSubject = new Subject<string>();
  signupError$ = this.signupErrorSubject.asObservable();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private seoService: SeoService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group<SignupForm>(
      {
        username: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(8)],
        }),
        passwordConfirm: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      { validators: this.matchPasswords }
    );

    this.seoService.setPageTags({
      title: 'Join EarthTraverse - Start Your Global Adventure Today!',
      description:
        'Ready to explore? Sign up for EarthTraverse and embark on a thrilling journey to discover hidden gems and iconic landmarks around the world. Become a part of our community of explorers!',
    });
  }

  onSubmit() {
    Object.keys(this.signupForm.controls).forEach((field) => {
      const control = this.signupForm.get(field);
      control?.markAsTouched();
    });

    if (this.signupForm.valid) {
      this.authService
        .signup({
          username: this.signupForm.value.username as string,
          password: this.signupForm.value.password as string,
        })
        .subscribe((response) => {
          if (response.status === ApiStatus.SUCCESS) {
            this.router.navigate(['/']);
          } else if (response.status === ApiStatus.ERROR) {
            this.signupErrorSubject.next(response.error.message);
          }
        });
    }
  }

  matchPasswords: ValidatorFn = (
    formGroup: AbstractControl
  ): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('passwordConfirm')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  };
}
