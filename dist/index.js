(()=>{"use strict";class t{constructor(t=0,s=0,h=0){this.x=t,this.y=s,this.z=h}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}normalize(){const t=this.length();this.x=this.x/t,this.y=this.y/t,this.z=this.z/t}}class s{constructor(s=new t,h=new t){this.pos=s,this.dir=h}}class h{constructor(s=30){this.pos=new t,this.dir=new t(1,0,0),this.focalAngle=s}viewportToRay(t){return new s}}(new class{constructor(){const t=document.getElementById("gpu-canvas");this.ctx=t.getContext("2d"),this.ctx.canvas.width=400,this.ctx.canvas.height=400,this.camera=new h}sdf(t,s,h){return 1}getColor(t,s){return[Math.floor(255*s/this.ctx.canvas.height),Math.floor(255*t/this.ctx.canvas.width),0,255]}Render(){const t=this.ctx.getImageData(0,0,this.ctx.canvas.width,this.ctx.canvas.height);let s=t.data;for(var h=0;h<s.length;h+=4){var i=Math.floor(Math.floor(h/4)%this.ctx.canvas.width),a=Math.floor(Math.floor(h/4)/this.ctx.canvas.width);[s[h],s[h+1],s[h+2],s[h+3]]=this.getColor(i,a)}this.ctx.putImageData(t,0,0)}}).Render()})();