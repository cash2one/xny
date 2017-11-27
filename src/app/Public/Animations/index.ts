import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const animations = {

	accordion:trigger('accordion', [
	    state('in', style({height: '*'})),
	    state('out', style({height: 0})),
	    transition('in => out', [
	      style({height: '*'}),
	      animate(250, style({height: 0}))
	    ]),
	    transition('out => in', [
	      style({height: 0}),
	      animate(250, style({height: "*"}))
	    ])
	  ]),


	flyIn :trigger('flyInOut', [
	  state('in', style({transform: 'translateY(0)'})),
	  transition('void => *', [
	       animate(700, keyframes([
	        style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
	        style({opacity: 0.7, transform: 'translateY(25px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translateY(0)',     offset: 0.7})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(500, keyframes([
	        style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
	        style({opacity: 1, transform: 'translateY(25px)', offset: 0.5}),
	        style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
	      ]))
	  ])
	]),


	fadeIn :trigger('fadeIn', [
	    state('in', style({opacity: '1'})),
	    transition('void => *', [
	         animate(900, keyframes([
	          style({opacity: 1,  offset: 0.5})
	        ]))
	    ]),
	    transition('* => void', [
	          animate(900, keyframes([
	          style({opacity: 0,  offset: 0.5})
	        ]))
	    ])
	  ]),

	rightIn :trigger('rightIn', [
	  state('in', style({transform: 'translateX(0)'})),
	  transition('void => *', [
	       animate(500, keyframes([
	        style({opacity: 0.8, transform: 'translateX(100%)', offset: 0}),
	        style({opacity: 0.9, transform: 'translateX(-15px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translateX(0)',     offset: 0.7})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(500, keyframes([
	        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
	        style({opacity: 0.9, transform: 'translateX(-15px)', offset: 0.5}),
	        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
	      ]))
	  ])
	]),

	shake : trigger('shake', [
	  state('in', style({transform: 'translate(50%,50%)'})),
	  transition('void => *', [
	       animate(150, keyframes([
	        style({opacity: 0, transform: 'translate(50%,-100%)', offset: 0}),
	        style({opacity: 1, transform: 'translate(50%,50%)',     offset: 1})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(500, keyframes([
	        style({opacity: 1, transform: 'translate(50%,50%)',     offset: 0}),
	        style({opacity: 0, transform: 'translate(50%,-100%)',  offset: 1.0})
	      ]))
	  ])
	]),

	smallBig : trigger('smallBig', [
	  state('in', style({transform: 'translateY(0) scale(1)'})),
	  transition('void => *', [
	       animate(500, keyframes([
	        style({opacity: 0.7, transform: 'scale(0.8)', offset: 0}),
	        style({opacity: 0.9, transform: 'scale(1.1)',  offset: 0.2}),
	        style({opacity: 1, transform: 'scale(1)',     offset: 0.5})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(300, keyframes([
	        style({opacity: 1, transform: 'scale(1.1)',     offset: 0}),
	        style({opacity: 0.9, transform: 'scale(1)', offset: 0.2}),
	        style({opacity: 0, transform: 'scale(0.8)',  offset: 0.5})
	      ]))
	  ])
	]),

	flyTop : trigger('flyTop', [
	  state('in', style({transform: 'translateY(0)'})),
	  transition('void => *', [
	       animate(400, keyframes([
	        style({opacity: 0.8, transform: 'translateY(-100%)', offset: 0}),
	        // style({opacity: 0.9, transform: 'translateX(-15px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translateY(0)',     offset: 0.7})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(400, keyframes([
	        style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
	        // style({opacity: 0.9, transform: 'translateX(-15px)', offset: 0.5}),
	        style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
	      ]))
	  ])
	]),

	flyLeft : trigger('flyLeft', [
	  state('in', style({transform: 'translateX(0)'})),
	  transition('void => *', [
	       animate(200, keyframes([
	        style({opacity: 0.9, transform: 'translateX(-101%)', offset: 0}),
	        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(200, keyframes([
	        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
	        style({opacity: 0, transform: 'translateX(-101%)',  offset: 1.0})
	      ]))
	  ])
	])

}