(()=>{"use strict";var t,s="undefined"!=typeof Float32Array?Float32Array:Array;function n(){var t=new s(3);return s!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function o(t){var n=new s(3);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n}function r(t){var s=t[0],n=t[1],o=t[2];return Math.hypot(s,n,o)}function i(t,s,n){return t[0]=s[0]+n[0],t[1]=s[1]+n[1],t[2]=s[2]+n[2],t}function a(t,s,n){return t[0]=s[0]-n[0],t[1]=s[1]-n[1],t[2]=s[2]-n[2],t}function e(t,s,n){return t[0]=s[0]*n,t[1]=s[1]*n,t[2]=s[2]*n,t}function h(t,s,n,o){var r=[],i=[];return r[0]=s[0]-n[0],r[1]=s[1]-n[1],r[2]=s[2]-n[2],i[0]=r[2]*Math.sin(o)+r[0]*Math.cos(o),i[1]=r[1],i[2]=r[2]*Math.cos(o)-r[0]*Math.sin(o),t[0]=i[0]+n[0],t[1]=i[1]+n[1],t[2]=i[2]+n[2],t}Math.random,Math.PI,Math.hypot||(Math.hypot=function(){for(var t=0,s=arguments.length;s--;)t+=arguments[s]*arguments[s];return Math.sqrt(t)}),t=new s(2),s!=Float32Array&&(t[0]=0,t[1]=0);var c=r;function l(t){return e(t,t,1/r(t)),function(t){if(Math.abs(1-r(t))>1e-6)throw console.log(`length: ${r(t)}`),new Error(`The vector: ${t} is not normalized`)}(t),t}function u(){return l([1,0,0])}n();class f{constructor(t=[0,0,0],s=u()){this.pos=t,this.dir=s}}class d{constructor(t=120,s=[0,0,0],n=u()){this.focalAngleRad=Math.PI*t/180,this.pos=s,this.dir=n}pan(t){const s=t[0]/200;t[1],h(this.dir,this.dir,[0,0,0],-s)}viewportToRay(t){const s=(t[0]-.5)*this.focalAngleRad/2,n=o(this.dir);return h(n,n,[0,0,0],-s),function(t,s,n,o){var r=[],i=[];r[0]=s[0]-n[0],r[1]=s[1]-n[1],r[2]=s[2]-n[2],i[0]=r[0]*Math.cos(o)-r[1]*Math.sin(o),i[1]=r[0]*Math.sin(o)+r[1]*Math.cos(o),i[2]=r[2],t[0]=i[0]+n[0],t[1]=i[1]+n[1],t[2]=i[2]+n[2]}(n,n,[0,0,0],-(t[1]-.5)*this.focalAngleRad/2),new f(o(this.pos),l(n))}}class p{constructor(t,s){this.sdf=t,this.lightPos=s}distance(t){return this.sdf.distance(t)}normal(t){return this.sdf.normal(t)}color(t){const s=this.sdf.normal(t);let o=n();o=a(o,this.lightPos,t);const r=l(o);let h=this.sdf.color(t);const c=Math.max(0,(f=r,(u=s)[0]*f[0]+u[1]*f[1]+u[2]*f[2]));var u,f;let d=n();return d=e(d,h,c),h=e(h,h,.5),d=i(d,h,d),d}}class v{constructor(t=[0,0,0],s=1){this.pos=t,this.rad=s,this.temp=n()}distance(t){return s=t,n=this.pos,o=n[0]-s[0],r=n[1]-s[1],i=n[2]-s[2],Math.hypot(o,r,i)-this.rad;var s,n,o,r,i}normal(t){return this.temp=a(this.temp,t,this.pos),this.temp=e(this.temp,this.temp,1/c(this.temp)),o(this.temp)}color(t){let s=this.normal(t);return s=i(s,s,[1,1,1]),e(s,s,127.5)}}function m(t){return t<0?0:t>255?255:t}function M(t){const n=function(t){var n=new s(4);return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}([t[0],t[1],t[2],255]);for(let t=0;t<3;t++)n[t]=m(n[t]);return function(t){if(t.filter((t=>t<0||t>255)).length>0)throw new Error(`The color: ${t} has out of bounds values!`)}(n),n}!function(){var t=new s(4);s!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0)}();class w{constructor(t=.01,s=10){this.rayCollisionDistance=t,this.sdf=new p(new v([1,0,0],.4),[1,1,1]),this.maxDistance=s}castRay(t){let s=[0,0,0],n=0;for(;n<this.maxDistance;){const o=this.sdf.distance(t.pos);if(o<this.rayCollisionDistance)return M(this.sdf.color(t.pos));s=e(s,t.dir,o),t.pos=i(t.pos,t.pos,s),n+=o}return M([0,0,0])}}const y=new class{constructor(){const t=document.getElementById("gpu-canvas");this.ctx=t.getContext("2d"),this.ctx.canvas.width=400,this.ctx.canvas.height=400,this.camera=new d,this.raycaster=new w}pan(t){this.camera.pan(t)}Render(){const t=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height),s=t.data;for(let t=0;t<s.length;t+=4){const n=Math.floor(Math.floor(t/4)%this.ctx.canvas.width),o=Math.floor(Math.floor(t/4)/this.ctx.canvas.width),r=[n/this.ctx.canvas.width,o/this.ctx.canvas.height],i=this.camera.viewportToRay(r);[s[t],s[t+1],s[t+2],s[t+3]]=this.raycaster.castRay(i)}this.ctx.putImageData(t,0,0)}};new class{constructor(t){this.previousPos=null,this.moveCallback=t,onmousedown=t=>this.handleMouse(t),onmouseup=t=>this.handleMouse(t),onmousemove=t=>this.handleMouse(t)}handleMouse(t){if(1==(1&t.buttons)){if(null!==this.previousPos){let s=[t.clientX,t.clientY];s=function(t,s,n){return t[0]=s[0]-n[0],t[1]=s[1]-n[1],t}(s,s,this.previousPos),this.moveCallback(s)}this.previousPos=[t.clientX,t.clientY]}else this.previousPos=null}}((t=>y.pan(t))),function t(){y.Render(),setTimeout((()=>t()),100)}()})();