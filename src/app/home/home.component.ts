import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import AOS from 'aos'
import { stagger } from '@angular/animations';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading = false;
  userLogged = false;
  error: string = null;
  private authServiceActiveUserSub: Subscription;
  private authServiceLogInSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authServiceActiveUserSub = this.authService.activeUser.subscribe(
      (user) => {
        this.userLogged = !!user;
      }
    );
    AOS.init();
    this.animateFirsSection();
  }

  ngOnDestroy() {
    this.authServiceActiveUserSub.unsubscribe();
    if (this.authServiceLogInSub) this.authServiceLogInSub.unsubscribe();
  }

  animateFirsSection() {
    gsap.from('#main-header-text', {
      duration: 5,
      opacity: 0,
    });
    gsap.from('#main-header-slogan-text', {
      yPercent: -150,
      opacity: 0,
      ease: 'sine.out',
      duration: 3,
      delay: 1,
    });
    gsap.from('#main-section-loginbtn', {
      opacity: 0,
      duration: 4,
      delay: 1.5,
    });
    const tl = gsap.timeline();
    tl.from('#section-two-panel-1', { yPercent: -100 });
    tl.from('#section-two-panel-1', { opacity: 0 });
    ScrollTrigger.create({
      animation: tl,
      trigger: '.section-two-container',
      start: 'top top',
      end: '+=3000',
      scrub: true,
      pin: true,
      anticipatePin: 1,
    });
    gsap.from('#footer-header', {
      scrollTrigger: '.section-three',
      duration: 5,
      opacity: 0,
      delay: 1
    });
    gsap.from('#footer-text', {
      scrollTrigger: '.section-three',
      yPercent: -120,
      opacity: 0,
      ease: 'sine.out',
      duration: 2,
      delay: 1.5,
    });
  }
}
