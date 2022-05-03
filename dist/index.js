(()=>{"use strict";var t="undefined"!=typeof Float32Array?Float32Array:Array;function s(){var s=new t(3);return t!=Float32Array&&(s[0]=0,s[1]=0,s[2]=0),s}function n(s){var n=new t(3);return n[0]=s[0],n[1]=s[1],n[2]=s[2],n}function r(t){var s=t[0],n=t[1],r=t[2];return Math.hypot(s,n,r)}function o(t,s,n){return t[0]=s[0]+n[0],t[1]=s[1]+n[1],t[2]=s[2]+n[2],t}function a(t,s,n){return t[0]=s[0]-n[0],t[1]=s[1]-n[1],t[2]=s[2]-n[2],t}function i(t,s,n){return t[0]=s[0]*n,t[1]=s[1]*n,t[2]=s[2]*n,t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,s=arguments.length;s--;)t+=arguments[s]*arguments[s];return Math.sqrt(t)});var e,h=r;function c(t){return i(t,t,1/r(t)),function(t){if(Math.abs(1-r(t))>1e-6)throw console.log(`length: ${r(t)}`),new Error(`The vector: ${t} is not normalized`)}(t),t}function l(){return c([1,0,0])}s();class u{constructor(t=[0,0,0],s=l()){this.pos=t,this.dir=s}}class f{constructor(t=120,s=[0,0,0],n=l()){this.focalAngleRad=Math.PI*t/180,this.pos=s,this.dir=n}viewportToRay(t){const s=(t[0]-.5)*this.focalAngleRad/2,r=n(this.dir);var o,a,i,e,h,l;return o=r,i=[0,0,0],e=-s,l=[],(h=[])[0]=(a=r)[0]-i[0],h[1]=a[1]-i[1],h[2]=a[2]-i[2],l[0]=h[2]*Math.sin(e)+h[0]*Math.cos(e),l[1]=h[1],l[2]=h[2]*Math.cos(e)-h[0]*Math.sin(e),o[0]=l[0]+i[0],o[1]=l[1]+i[1],o[2]=l[2]+i[2],function(t,s,n,r){var o=[],a=[];o[0]=s[0]-n[0],o[1]=s[1]-n[1],o[2]=s[2]-n[2],a[0]=o[0]*Math.cos(r)-o[1]*Math.sin(r),a[1]=o[0]*Math.sin(r)+o[1]*Math.cos(r),a[2]=o[2],t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2]}(r,r,[0,0,0],-(t[1]-.5)*this.focalAngleRad/2),new u(n(this.pos),c(r))}}class d{constructor(t,s){this.sdf=t,this.lightPos=s}distance(t){return this.sdf.distance(t)}normal(t){return this.sdf.normal(t)}color(t){const n=this.sdf.normal(t);let r=s();r=a(r,this.lightPos,t);const e=c(r);let h=this.sdf.color(t);const l=Math.max(0,(f=e,(u=n)[0]*f[0]+u[1]*f[1]+u[2]*f[2]));var u,f;let d=s();return d=i(d,h,l),h=i(h,h,.5),d=o(d,h,d),d}}class p{constructor(t=[0,0,0],n=1){this.pos=t,this.rad=n,this.temp=s()}distance(t){return s=t,n=this.pos,r=n[0]-s[0],o=n[1]-s[1],a=n[2]-s[2],Math.hypot(r,o,a)-this.rad;var s,n,r,o,a}normal(t){return this.temp=a(this.temp,t,this.pos),this.temp=i(this.temp,this.temp,1/h(this.temp)),n(this.temp)}color(t){let s=this.normal(t);return s=o(s,s,[1,1,1]),i(s,s,127.5)}}function m(t){return t<0?0:t>255?255:t}function v(s){const n=(r=[s[0],s[1],s[2],255],(o=new t(4))[0]=r[0],o[1]=r[1],o[2]=r[2],o[3]=r[3],o);var r,o;for(let t=0;t<3;t++)n[t]=m(n[t]);return function(t){if(t.filter((t=>t<0||t>255)).length>0)throw new Error(`The color: ${t} has out of bounds values!`)}(n),n}e=new t(4),t!=Float32Array&&(e[0]=0,e[1]=0,e[2]=0,e[3]=0);class w{constructor(t=.01,s=10){this.rayCollisionDistance=t,this.sdf=new d(new p([1,0,0],.4),[1,1,1]),this.maxDistance=s}castRay(t){let s=[0,0,0],n=0;for(;n<this.maxDistance;){const r=this.sdf.distance(t.pos);if(r<this.rayCollisionDistance)return v(this.sdf.color(t.pos));s=i(s,t.dir,r),t.pos=o(t.pos,t.pos,s),n+=r}return v([0,0,0])}}const M=new class{constructor(){const t=document.getElementById("gpu-canvas");this.ctx=t.getContext("2d"),this.ctx.canvas.width=400,this.ctx.canvas.height=400,this.camera=new f,this.raycaster=new w}Render(){const t=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height),s=t.data;for(let t=0;t<s.length;t+=4){const n=Math.floor(Math.floor(t/4)%this.ctx.canvas.width),r=Math.floor(Math.floor(t/4)/this.ctx.canvas.width),o=[n/this.ctx.canvas.width,r/this.ctx.canvas.height],a=this.camera.viewportToRay(o);[s[t],s[t+1],s[t+2],s[t+3]]=this.raycaster.castRay(a)}this.ctx.putImageData(t,0,0)}};!function t(){const s=Date.now();M.Render(),console.log(`render time: ${Date.now()-s}ms`),setTimeout((()=>t()),100)}()})();