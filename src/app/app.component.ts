import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

  // animations for changing routes
  animations: [
    trigger('routeAnim', [
      transition(':increment', [
        // host component style
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        // entering and leaving elements
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),

        group([

          // leaving component moving in from the right
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),

          // entering component moving in from the right
          query(':enter', [
            style({
              transform: 'translateX(50px)',
              opacity: 0
            }),
            animate('200ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),

      transition(':decrement', [
        // host component style
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        // entering and leaving elements
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),

        group([

          // leaving component moving in from the right
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),

          // entering component moving in from the right
          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('200ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})

export class AppComponent {
  title = 'dashboard';

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated)
      return outlet.activatedRouteData['tab'];
    return null; // TOOD FIX!!!!
  }
}
