!function(t){function n(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var i={};n.m=t,n.c=i,n.d=function(t,i,e){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=0)}([function(t,n,i){"use strict";i(1);var e=["A","B","C","D","E","F","G","H","I","J"],o=[1,2,3,4,5,6,7,8,9,10],s=[],r={easy:1/0,medium:100,hard:50},u=0,c=[{size:4,position:"",hitCount:0,positionsList:[]},{size:3,position:"",hitCount:0,positionsList:[]},{size:3,position:"",hitCount:0,positionsList:[]},{size:2,position:"",hitCount:0,positionsList:[]},{size:2,position:"",hitCount:0,positionsList:[]},{size:2,position:"",hitCount:0,positionsList:[]},{size:1,position:"",hitCount:0,positionsList:[]},{size:1,position:"",hitCount:0,positionsList:[]},{size:1,position:"",hitCount:0,positionsList:[]},{size:1,position:"",hitCount:0,positionsList:[]}];(function(){var t=document.getElementById("battleship"),n=t.getElementsByTagName("td"),i=function(){f(),a(),v(),d()},a=function(){for(var t=0;t<e.length;t++)for(var n=0;n<o.length;n++)s.push(e[t]+","+o[n])},l=function(){return Math.floor(9*Math.random())},f=function(){var t=document.getElementById("easy"),n=document.getElementById("medium"),i=document.getElementById("hard");t.addEventListener("click",function(t){return u=r.easy}),n.addEventListener("click",function(t){return u=r.medium}),i.addEventListener("click",function(t){return u=r.hard})},d=function(){for(var t=0;t<n.length;t++)n[t].addEventListener("click",function(t){if(0===--u)alert("game over, you lost");else{console.log(u);var n=t.target.dataset.column,i=t.target.parentElement.dataset.row,e=i+","+n;h(e)&&(g(e),L(e)?(t.srcElement.classList.add("hit"),alert("ship shinked")):t.srcElement.classList.add("hit"),p()&&alert("game over, you won"))}})},p=function(){return c.every(function(t){return t.size===t.hitCount})},h=function(t){return!s.includes(t)},m=function(t){for(var n=t.indexOf(":"),i=t.slice(0,1),e=t.slice(n-1,n),o=t.slice(n+3,t.length),r=[],u=e;u<=o;u++)s.includes(i+","+u)&&r.push(i+","+u);return r},v=function(){c.map(function(t){return y(t)})},g=function(t){c.some(function(n){n.positionsList.includes(t)&&n.hitCount++})},L=function(t){return c.some(function(n){return n.size===n.hitCount&&n.position.includes(t)})},y=function t(n){var i=e[l()],r=o[l()],u=i+","+r,c=u+":"+i+","+(r+n.size-1),a=m(c);if(a.length===n.size)return n.position=c,n.positionsList=a,a.forEach(function(t){var n=s.indexOf(t);s.splice(n,1)}),n;t(n)};return{init:i}})().init()},function(t,n){}]);