import{i as e,n as t}from"./jsx-runtime-CXrijb2r.js";import{t as n}from"./createLucideIcon-_cRRr1oq.js";var r=n(`map-pin`,[[`path`,{d:`M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0`,key:`1r0f0z`}],[`circle`,{cx:`12`,cy:`10`,r:`3`,key:`ilqhr7`}]]),i=n(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),a={data:``},o=e=>{if(typeof window==`object`){let t=(e?e.querySelector(`#_goober`):window._goober)||Object.assign(document.createElement(`style`),{innerHTML:` `,id:`_goober`});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||a},s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,c=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,u=(e,t)=>{let n=``,r=``,i=``;for(let a in e){let o=e[a];a[0]==`@`?a[1]==`i`?n=a+` `+o+`;`:r+=a[1]==`f`?u(o,a):a+`{`+u(o,a[1]==`k`?``:t)+`}`:typeof o==`object`?r+=u(o,t?t.replace(/([^,])+/g,e=>a.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+` `+t:t)):a):o!=null&&(a=a[1]==`-`?a:a.replace(/[A-Z]/g,`-$&`).toLowerCase(),i+=u.p?u.p(a,o):a+`:`+o+`;`)}return n+(t&&i?t+`{`+i+`}`:i)+r},d={},f=e=>{if(typeof e==`object`){let t=``;for(let n in e)t+=n+f(e[n]);return t}return e},p=(e,t,n,r,i)=>{let a=f(e),o=d[a]||(d[a]=(e=>{let t=0,n=11;for(;t<e.length;)n=101*n+e.charCodeAt(t++)>>>0;return`go`+n})(a));if(!d[o]){let t=a===e?(e=>{let t,n,r=[{}];for(;t=s.exec(e.replace(c,``));)t[4]?r.shift():t[3]?(n=t[3].replace(l,` `).trim(),r.unshift(r[0][n]=r[0][n]||{})):r[0][t[1]]=t[2].replace(l,` `).trim();return r[0]})(e):e;d[o]=u(i?{[`@keyframes `+o]:t}:t,n?``:`.`+o)}let p=n&&d.g;return n&&(d.g=d[o]),((e,t,n,r)=>{r?t.data=t.data.replace(r,e):t.data.indexOf(e)===-1&&(t.data=n?e+t.data:t.data+e)})(d[o],t,r,p),o},m=(e,t,n)=>e.reduce((e,r,i)=>{let a=t[i];if(a&&a.call){let e=a(n),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;a=t?`.`+t:e&&typeof e==`object`?e.props?``:u(e,``):!1===e?``:e}return e+r+(a??``)},``);function h(e){let t=this||{},n=e.call?e(t.p):e;return p(n.unshift?n.raw?m(n,[].slice.call(arguments,1),t.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(t.p):n),{}):n,o(t.target),t.g,t.o,t.k)}var g,_,v;h.bind({g:1});var y=h.bind({k:1});function b(e,t,n,r){u.p=t,g=e,_=n,v=r}function x(e,t){let n=this||{};return function(){let r=arguments;function i(a,o){let s=Object.assign({},a),c=s.className||i.className;n.p=Object.assign({theme:_&&_()},s),n.o=/go\d/.test(c),s.className=h.apply(n,r)+(c?` `+c:``),t&&(s.ref=o);let l=e;return e[0]&&(l=s.as||e,delete s.as),v&&l[0]&&v(s),g(l,s)}return t?t(i):i}}var S=e(t(),1),ee=e=>typeof e==`function`,C=(e,t)=>ee(e)?e(t):e,w=(()=>{let e=0;return()=>(++e).toString()})(),T=(()=>{let e;return()=>{if(e===void 0&&typeof window<`u`){let t=matchMedia(`(prefers-reduced-motion: reduce)`);e=!t||t.matches}return e}})(),E=20,D=`default`,O=(e,t)=>{let{toastLimit:n}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return O(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:i}=t;return{...e,toasts:e.toasts.map(e=>e.id===i||i===void 0?{...e,dismissed:!0,visible:!1}:e)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}},k=[],A={toasts:[],pausedAt:void 0,settings:{toastLimit:E}},j={},M=(e,t=D)=>{j[t]=O(j[t]||A,e),k.forEach(([e,n])=>{e===t&&n(j[t])})},N=e=>Object.keys(j).forEach(t=>M(e,t)),te=e=>Object.keys(j).find(t=>j[t].toasts.some(t=>t.id===e)),P=(e=D)=>t=>{M(t,e)},F={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=D)=>{let[n,r]=(0,S.useState)(j[t]||A),i=(0,S.useRef)(j[t]);(0,S.useEffect)(()=>(i.current!==j[t]&&r(j[t]),k.push([t,r]),()=>{let e=k.findIndex(([e])=>e===t);e>-1&&k.splice(e,1)}),[t]);let a=n.toasts.map(t=>({...e,...e[t.type],...t,removeDelay:t.removeDelay||e[t.type]?.removeDelay||e?.removeDelay,duration:t.duration||e[t.type]?.duration||e?.duration||F[t.type],style:{...e.style,...e[t.type]?.style,...t.style}}));return{...n,toasts:a}},L=(e,t=`blank`,n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:`status`,"aria-live":`polite`},message:e,pauseDuration:0,...n,id:n?.id||w()}),R=e=>(t,n)=>{let r=L(t,e,n);return P(r.toasterId||te(r.id))({type:2,toast:r}),r.id},z=(e,t)=>R(`blank`)(e,t);z.error=R(`error`),z.success=R(`success`),z.loading=R(`loading`),z.custom=R(`custom`),z.dismiss=(e,t)=>{let n={type:3,toastId:e};t?P(t)(n):N(n)},z.dismissAll=e=>z.dismiss(void 0,e),z.remove=(e,t)=>{let n={type:4,toastId:e};t?P(t)(n):N(n)},z.removeAll=e=>z.remove(void 0,e),z.promise=(e,t,n)=>{let r=z.loading(t.loading,{...n,...n?.loading});return typeof e==`function`&&(e=e()),e.then(e=>{let i=t.success?C(t.success,e):void 0;return i?z.success(i,{id:r,...n,...n?.success}):z.dismiss(r),e}).catch(e=>{let i=t.error?C(t.error,e):void 0;i?z.error(i,{id:r,...n,...n?.error}):z.dismiss(r)}),e};var B=1e3,V=(e,t=`default`)=>{let{toasts:n,pausedAt:r}=I(e,t),i=(0,S.useRef)(new Map).current,a=(0,S.useCallback)((e,t=B)=>{if(i.has(e))return;let n=setTimeout(()=>{i.delete(e),o({type:4,toastId:e})},t);i.set(e,n)},[]);(0,S.useEffect)(()=>{if(r)return;let e=Date.now(),i=n.map(n=>{if(n.duration===1/0)return;let r=(n.duration||0)+n.pauseDuration-(e-n.createdAt);if(r<0){n.visible&&z.dismiss(n.id);return}return setTimeout(()=>z.dismiss(n.id,t),r)});return()=>{i.forEach(e=>e&&clearTimeout(e))}},[n,r,t]);let o=(0,S.useCallback)(P(t),[t]),s=(0,S.useCallback)(()=>{o({type:5,time:Date.now()})},[o]),c=(0,S.useCallback)((e,t)=>{o({type:1,toast:{id:e,height:t}})},[o]),l=(0,S.useCallback)(()=>{r&&o({type:6,time:Date.now()})},[r,o]),u=(0,S.useCallback)((e,t)=>{let{reverseOrder:r=!1,gutter:i=8,defaultPosition:a}=t||{},o=n.filter(t=>(t.position||a)===(e.position||a)&&t.height),s=o.findIndex(t=>t.id===e.id),c=o.filter((e,t)=>t<s&&e.visible).length;return o.filter(e=>e.visible).slice(...r?[c+1]:[0,c]).reduce((e,t)=>e+(t.height||0)+i,0)},[n]);return(0,S.useEffect)(()=>{n.forEach(e=>{if(e.dismissed)a(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[n,a]),{toasts:n,handlers:{updateHeight:c,startPause:s,endPause:l,calculateOffset:u}}},H=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,U=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,G=x(`div`)`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||`#ff4b4b`};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${U} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||`#fff`};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${W} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,K=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,q=x(`div`)`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||`#e0e0e0`};
  border-right-color: ${e=>e.primary||`#616161`};
  animation: ${K} 1s linear infinite;
`,J=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ne=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Y=x(`div`)`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||`#61d345`};
  position: relative;
  transform: rotate(45deg);

  animation: ${J} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ne} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||`#fff`};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,X=x(`div`)`
  position: absolute;
`,Z=x(`div`)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,re=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ie=x(`div`)`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${re} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,ae=({toast:e})=>{let{icon:t,type:n,iconTheme:r}=e;return t===void 0?n===`blank`?null:S.createElement(Z,null,S.createElement(q,{...r}),n!==`loading`&&S.createElement(X,null,n===`error`?S.createElement(G,{...r}):S.createElement(Y,{...r}))):typeof t==`string`?S.createElement(ie,null,t):t},oe=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,se=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,ce=`0%{opacity:0;} 100%{opacity:1;}`,Q=`0%{opacity:1;} 100%{opacity:0;}`,le=x(`div`)`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,ue=x(`div`)`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,de=(e,t)=>{let n=e.includes(`top`)?1:-1,[r,i]=T()?[ce,Q]:[oe(n),se(n)];return{animation:t?`${y(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},fe=S.memo(({toast:e,position:t,style:n,children:r})=>{let i=e.height?de(e.position||t||`top-center`,e.visible):{opacity:0},a=S.createElement(ae,{toast:e}),o=S.createElement(ue,{...e.ariaProps},C(e.message,e));return S.createElement(le,{className:e.className,style:{...i,...n,...e.style}},typeof r==`function`?r({icon:a,message:o}):S.createElement(S.Fragment,null,a,o))});b(S.createElement);var pe=({id:e,className:t,style:n,onHeightUpdate:r,children:i})=>{let a=S.useCallback(t=>{if(t){let n=()=>{let n=t.getBoundingClientRect().height;r(e,n)};n(),new MutationObserver(n).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,r]);return S.createElement(`div`,{ref:a,className:t,style:n},i)},me=(e,t)=>{let n=e.includes(`top`),r=n?{top:0}:{bottom:0},i=e.includes(`center`)?{justifyContent:`center`}:e.includes(`right`)?{justifyContent:`flex-end`}:{};return{left:0,right:0,display:`flex`,position:`absolute`,transition:T()?void 0:`all 230ms cubic-bezier(.21,1.02,.73,1)`,transform:`translateY(${t*(n?1:-1)}px)`,...r,...i}},he=h`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,$=16,ge=({reverseOrder:e,position:t=`top-center`,toastOptions:n,gutter:r,children:i,toasterId:a,containerStyle:o,containerClassName:s})=>{let{toasts:c,handlers:l}=V(n,a);return S.createElement(`div`,{"data-rht-toaster":a||``,style:{position:`fixed`,zIndex:9999,top:$,left:$,right:$,bottom:$,pointerEvents:`none`,...o},className:s,onMouseEnter:l.startPause,onMouseLeave:l.endPause},c.map(n=>{let a=n.position||t,o=me(a,l.calculateOffset(n,{reverseOrder:e,gutter:r,defaultPosition:t}));return S.createElement(pe,{id:n.id,key:n.id,onHeightUpdate:l.updateHeight,className:n.visible?he:``,style:o},n.type===`custom`?C(n.message,n):i?i(n):S.createElement(fe,{toast:n,position:a}))}))},_e=z;export{r as i,_e as n,i as r,ge as t};