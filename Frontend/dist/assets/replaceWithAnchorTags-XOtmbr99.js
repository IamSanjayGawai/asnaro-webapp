const c=r=>{const n=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;let t=r.replace(n,function(e){return`<a href="${e}" target="_blank">${e}</a>`});const a=/(\bwww\.[\S]+(\b|$))/ig;return t=t.replace(a,function(e){return`<a href="http://${e}" target="_blank">${e}</a>`}),t};export{c as r};
