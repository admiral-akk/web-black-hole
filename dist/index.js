(()=>{"use strict";var t="undefined"!=typeof Float32Array?Float32Array:Array;function a(){var a=new t(3);return t!=Float32Array&&(a[0]=0,a[1]=0,a[2]=0),a}function r(t){var a=t[0],r=t[1],n=t[2];return Math.hypot(a,r,n)}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,a=arguments.length;a--;)t+=arguments[a]*arguments[a];return Math.sqrt(t)}),a();const n=[0,0,0];function o(t){const n=a();var o,s,h;return o=n,s=t,h=1/r(t),o[0]=s[0]*h,o[1]=s[1]*h,o[2]=s[2]*h,function(t){if(Math.abs(1-r(t))>1e-6)throw console.log(`length: ${r(t)}`),new Error(`The vector: ${t} is not normalized`)}(n),n}const s=o([1,0,0]);o([0,1,0]),o([0,0,1]);class h{constructor(t=n,a=s){this.pos=t,this.dir=a}}class c{constructor(t=120,a=n,r=s){this.focalAngleRad=Math.PI*t/180,this.pos=a,this.dir=r}viewportToRay(a){const r=(a[0]-.5)*this.focalAngleRad/2,s=(c=this.dir,(e=new t(3))[0]=c[0],e[1]=c[1],e[2]=c[2],e);var c,e;!function(t,a,r,n){var o=[],s=[];o[0]=a[0]-r[0],o[1]=a[1]-r[1],o[2]=a[2]-r[2],s[0]=o[2]*Math.sin(n)+o[0]*Math.cos(n),s[1]=o[1],s[2]=o[2]*Math.cos(n)-o[0]*Math.sin(n),t[0]=s[0]+r[0],t[1]=s[1]+r[1],t[2]=s[2]+r[2]}(s,s,n,-r);const i=(a[1]-.5)*this.focalAngleRad/2;return function(t,a,r,n){var o=[],s=[];o[0]=a[0]-r[0],o[1]=a[1]-r[1],o[2]=a[2]-r[2],s[0]=o[0]*Math.cos(n)-o[1]*Math.sin(n),s[1]=o[0]*Math.sin(n)+o[1]*Math.cos(n),s[2]=o[2],t[0]=s[0]+r[0],t[1]=s[1]+r[1],t[2]=s[2]+r[2]}(s,s,n,-i),new h(this.pos,o(s))}}var e;function i(t){return t<0?0:t>255?255:t}function l(a){const r=(n=a,(o=new t(4))[0]=n[0],o[1]=n[1],o[2]=n[2],o[3]=n[3],o);var n,o;for(let t=0;t<4;t++)r[t]=i(r[t]);return function(t){if(t.filter((t=>t<0||t>255)).length>0)throw new Error(`The color: ${t} has out of bounds values!`)}(r),r}e=new t(4),t!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0);class u{constructor(){}castRay(t){return l([500*t.dir[2],500*t.dir[1],0,255])}sdf(t,a,r){return 1}getColor(t,a){return l([255,255,0,255])}}(new class{constructor(){const t=document.getElementById("gpu-canvas");this.ctx=t.getContext("2d"),this.ctx.canvas.width=400,this.ctx.canvas.height=400,this.camera=new c,this.raycaster=new u}sdf(t,a,r){return 1}getColor(t,a){return[Math.floor(255*a/this.ctx.canvas.height),Math.floor(255*t/this.ctx.canvas.width),0,255]}Render(){const t=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height),a=t.data;for(let t=0;t<a.length;t+=4){const r=Math.floor(Math.floor(t/4)%this.ctx.canvas.width),n=Math.floor(Math.floor(t/4)/this.ctx.canvas.width),o=[r/this.ctx.canvas.width,n/this.ctx.canvas.height],s=this.camera.viewportToRay(o);[a[t],a[t+1],a[t+2],a[t+3]]=this.raycaster.castRay(s)}this.ctx.putImageData(t,0,0)}}).Render()})();