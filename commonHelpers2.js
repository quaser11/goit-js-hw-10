import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as o}from"./assets/vendor-77e16229.js";const i=document.querySelector(".form");i.addEventListener("submit",s);function s(r){r.preventDefault();const t=Object.fromEntries(new FormData(i));new Promise((e,m)=>{t.state==="fulfilled"&&e(t.delay),m(t.delay)}).then(e=>{setTimeout(()=>{o.show({color:"green",title:`Fulfilled promise in ${e}ms`})},Number(e))}).catch(e=>setTimeout(()=>{o.show({color:"red",title:`❌ Rejected promise in ${e}ms`})},Number(e)))}
//# sourceMappingURL=commonHelpers2.js.map
