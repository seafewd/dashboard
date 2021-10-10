import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

// animation styles
const baseStyles = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})

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
          baseStyles
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
          baseStyles
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
      ]),

      transition('* => secondary', [
        style({
          position: 'relative'
        }),

        // entering and leaving elements
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([

          // leaving component moving in from the right
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(.8)'
            }))
          ], { optional: true }),

          // entering component moving in from the right
          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('200ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative'
        }),

        // entering and leaving elements
        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([

          // leaving component moving in from the right
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),

          // entering component moving in from the right
          query(':enter', [
            style({
              transform: 'scale(.8)',
              opacity: 0
            }),
            animate('200ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),

    trigger('bgAnim', [
      transition(':leave', [
        animate(700, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({
          opacity: 0,
        }),
        animate(250, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(250, style({
          opacity: 0
        }))
      ])
    ])
  ]
})

export class AppComponent implements OnInit{
  title = 'dashboard';

  backgrounds: string[] = ['https://images.unsplash.com/photo-1626082610107-db2d7dac5481?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=2160&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzg2NTgyMw&ixlib=rb-1.2.1&q=80&w=3840'];

  loadingBGImage: boolean = false;

  dateTime?: Observable<Date>;

  ngOnInit() {
    this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date();
      })
    )
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) {
      const tab = outlet.activatedRouteData['tab'];
      if (!tab) return 'secondary';
      return tab;
    }
  }


  async changeBgImage() {
    this.loadingBGImage = true;

    const result = await fetch('https://source.unsplash.com/random/3840×2160', {
      method: 'HEAD'
    })

    const alreadyGot = this.backgrounds.includes(result.url)
    if (alreadyGot) {
      // this is the same image as we currently have so we re-run the function
      return this.changeBgImage();
    }

    this.backgrounds.push(result.url);
  }

  onBGImageLoad(imgEvent: Event) {
    // bg img has loaded, now remove the old bg image from backgrounds array
    const imgElement = imgEvent.target as HTMLImageElement;
    const src = imgElement.src;
    this.backgrounds = this.backgrounds.filter(b => b === src);

    this.loadingBGImage = false;
  }
}
