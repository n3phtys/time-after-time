(this["webpackJsonptime-after-time"]=this["webpackJsonptime-after-time"]||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},15:function(t,e,n){"use strict";n.r(e);n(7);var i=n(1),o=n.n(i),s=n(6),r=n.n(s),c=(n(12),n(5)),a=n(2),u=n(3),l=(n.p,n(13),n(0)),h=function(){function t(e){if(Object(a.a)(this,t),this.hours=8,this.minutes=0,e){var n=e.split(":");n[0]&&(this.hours=n[0]?parseInt(n[0]):8,this.minutes=n[1]?parseInt(n[1]):0)}}return Object(u.a)(t,[{key:"addDuration",value:function(t){var e=t.minutesCeil()+this.minutes,n=Math.floor(e/60);return(""+(this.hours+t.hours()+n)).padStart(2,"")+":"+(""+Math.ceil(e%60)).padStart(2,"0")}},{key:"toSeconds",value:function(){return 60*(60*this.hours+this.minutes)}},{key:"secondsToTime",value:function(t){return t.toSeconds()-this.toSeconds()}},{key:"toString",value:function(){return"".concat((""+this.hours).padStart(2,"0"),":").concat((""+this.minutes).padStart(2,"0"))}}]),t}(),d=function(){function t(e){Object(a.a)(this,t),isNaN(e)?this.seconds=e?g(e):28440:this.seconds=e,console.log(this.seconds)}return Object(u.a)(t,[{key:"hours",value:function(){return Math.floor(this.seconds/3600)}},{key:"minutesCeil",value:function(){return Math.ceil(this.seconds%3600/60)}},{key:"toString",value:function(){var t=this.seconds,e=Math.floor(t/3600);t-=3600*e;var n=Math.floor(t/60);t-=60*n;var i=Math.floor(t),o="";return e&&(o+=e+"h"),n&&(o+=n+"m"),i&&(o+=i+"s"),o||(o+=0),o}}]),t}(),j=function(){function t(e){Object(a.a)(this,t),e||(e="p/7h54m/8:00");var n=e.split("/"),i=(n.shift(),n.shift());console.log(i),this.duration=new d(i),console.log(this.duration.toString()),console.log(n),this.timesteps=n.map((function(t){return new h(t)}))}return Object(u.a)(t,[{key:"writeToUrl",value:function(){window.location.hash=this.asUrlFragment()}},{key:"asUrlFragment",value:function(){var t="p/";return t+=this.duration.toString(),this.timesteps.forEach((function(e){t+="/"+e.toString()})),t}}]),t}();function f(t){var e=t.appState,n=function(t){var e=0;console.log([t,e]);for(var n=0;n<t.length-1;n+=2)e+=t[n].secondsToTime(t[n+1]),console.log([n,e]);return console.log("durSeconds: "+e),new d(e)}(e.timesteps),i=e.duration;if(e.timesteps.length%2==0)return Object(l.jsxs)("p",{children:["You have worked ",Object(l.jsx)("b",{children:n.toString()})," of your total of"," ",i.toString()," for today. That is",Object(l.jsxs)("b",{children:[(n.seconds/i.seconds*100).toFixed(2)," %"]})," ","of your SHOULD time."]});var o=new d(i.seconds-n.seconds),s=e.timesteps[e.timesteps.length-1].addDuration(o);return Object(l.jsxs)("p",{children:["You will be finished with work for today at",Object(l.jsx)("b",{children:s.toString()}),"."]})}function p(t){var e=t.appState,n=e.timesteps.map((function(t,n){return Object(l.jsxs)("li",{children:[n%2===0?"IN":"OUT"," ",Object(l.jsx)("input",{type:"time",value:t,onChange:function(t){e.timesteps[n]=new h(t.target.value),e.writeToUrl(),window.location.reload()}}),Object(l.jsx)("button",{onClick:function(t){e.timesteps.splice(n,1),e.writeToUrl(),window.location.reload()},children:"X"})]},n)})),o=Object(i.useState)(function(){var t=new Date;return new h((""+t.getHours()).padStart(2,"0")+":"+(""+t.getMinutes()).padStart(2,"0"))}()),s=Object(c.a)(o,2),r=s[0],a=s[1],u=Object(i.useState)(e.duration),j=Object(c.a)(u,2),f=j[0],p=j[1];return Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"My in / out times"}),Object(l.jsx)("ul",{children:n}),Object(l.jsxs)("div",{children:[Object(l.jsx)("label",{children:"Add:"}),Object(l.jsx)("input",{type:"time",value:r.toString(),onChange:function(t){return a(new h(t.target.value))}}),Object(l.jsx)("button",{onClick:function(){e.timesteps.push(r),e.timesteps.sort((function(t,e){return 60*t.hours+t.minutes-(60*e.hours+e.minutes)})),e.writeToUrl(),window.location.reload()},children:"+"})]}),Object(l.jsxs)("div",{children:[Object(l.jsx)("hr",{}),Object(l.jsx)("input",{type:"text",value:f.toString(),onChange:function(t){p(new d(t.target.value))}}),Object(l.jsx)("button",{onClick:function(){e.duration=f,e.writeToUrl(),window.location.reload()},children:"SET"})]})]})}var b=function(){var t=window.location.hash?window.location.hash.substring(1):"",e=new j(t);return e.writeToUrl(),console.log(e),Object(l.jsx)("div",{className:"App",children:Object(l.jsxs)("div",{children:[Object(l.jsx)("hr",{}),Object(l.jsx)(f,{appState:e}),Object(l.jsx)("hr",{}),Object(l.jsx)(p,{appState:e})]})})};function g(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3600;if(console.log("parsing: "+t),!t)return 0;var n=t.indexOf("h"),i=t.indexOf("m"),o=t.indexOf("s");return n>=0?3600*parseInt(t.substring(0,n))+g(t.substring(n+1),e/60):i>=0?60*parseInt(t.substring(0,i))+g(t.substring(i+1),e/60):o>=0?1*parseInt(t.substring(0,o))+g(t.substring(o+1),e/60):parseInt(t)*e}var v=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(e){var n=e.getCLS,i=e.getFID,o=e.getFCP,s=e.getLCP,r=e.getTTFB;n(t),i(t),o(t),s(t),r(t)}))};r.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(b,{})}),document.getElementById("root")),v()}},[[15,1,2]]]);
//# sourceMappingURL=main.5176adc0.chunk.js.map