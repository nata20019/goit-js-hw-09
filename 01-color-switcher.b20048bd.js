const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),r=document.querySelector("body");t.addEventListener("click",(function(){t.setAttribute("disabled",!0),e.removeAttribute("disabled"),d=setInterval((()=>{r.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}),1e3)})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),e.setAttribute("disabled",!0),clearInterval(d)}));let d=null;
//# sourceMappingURL=01-color-switcher.b20048bd.js.map
