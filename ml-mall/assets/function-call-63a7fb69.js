import{c as F,n as B,t as M,d as N,u as _,aN as $,a0 as q,b as m,am as U,w as D,Y as O,b3 as Y,az as E,G as T,E as G,b4 as H,p as z,ah as K,aI as R,I as W,a5 as J,a8 as Q,f as x,q as X,aa as Z,b5 as ee,r as te,b6 as ne,j as ae}from"./user-29809695.js";const[oe,se]=F("form"),le={colon:Boolean,disabled:Boolean,readonly:Boolean,showError:Boolean,labelWidth:B,labelAlign:String,inputAlign:String,scrollToError:Boolean,validateFirst:Boolean,submitOnEnter:M,showErrorMessage:M,errorMessageAlign:String,validateTrigger:{type:[String,Array],default:"onBlur"}};var ie=N({name:oe,props:le,emits:["submit","failed"],setup(e,{emit:r,slots:s}){const{children:l,linkChildren:d}=_($),u=t=>t?l.filter(n=>t.includes(n.name)):l,g=t=>new Promise((n,o)=>{const f=[];u(t).reduce((A,L)=>A.then(()=>{if(!f.length)return L.validate().then(I=>{I&&f.push(I)})}),Promise.resolve()).then(()=>{f.length?o(f):n()})}),b=t=>new Promise((n,o)=>{const f=u(t);Promise.all(f.map(c=>c.validate())).then(c=>{c=c.filter(Boolean),c.length?o(c):n()})}),h=t=>{const n=l.find(o=>o.name===t);return n?new Promise((o,f)=>{n.validate().then(c=>{c?f(c):o()})}):Promise.reject()},v=t=>typeof t=="string"?h(t):e.validateFirst?g(t):b(t),S=t=>{typeof t=="string"&&(t=[t]),u(t).forEach(o=>{o.resetValidation()})},i=()=>l.reduce((t,n)=>(t[n.name]=n.getValidationStatus(),t),{}),a=(t,n)=>{l.some(o=>o.name===t?(o.$el.scrollIntoView(n),!0):!1)},p=()=>l.reduce((t,n)=>(n.name!==void 0&&(t[n.name]=n.formValue.value),t),{}),w=()=>{const t=p();v().then(()=>r("submit",t)).catch(n=>{r("failed",{values:t,errors:n}),e.scrollToError&&n[0].name&&a(n[0].name)})},P=t=>{U(t),w()};return d({props:e}),q({submit:w,validate:v,getValues:p,scrollToField:a,resetValidation:S,getValidationStatus:i}),()=>{var t;return m("form",{class:se(),onSubmit:P},[(t=s.default)==null?void 0:t.call(s)])}}});const we=D(ie);let k=0;function re(e){e?(k||document.body.classList.add("van-toast--unclickable"),k++):k&&(k--,k||document.body.classList.remove("van-toast--unclickable"))}const[ce,y]=F("toast"),ue=["show","overlay","teleport","transition","overlayClass","overlayStyle","closeOnClickOverlay"],de={icon:String,show:Boolean,type:O("text"),overlay:Boolean,message:B,iconSize:B,duration:Y(2e3),position:O("middle"),teleport:[String,Object],wordBreak:String,className:E,iconPrefix:String,transition:O("van-fade"),loadingType:String,forbidClick:Boolean,overlayClass:E,overlayStyle:Object,closeOnClick:Boolean,closeOnClickOverlay:Boolean};var fe=N({name:ce,props:de,emits:["update:show"],setup(e,{emit:r,slots:s}){let l,d=!1;const u=()=>{const i=e.show&&e.forbidClick;d!==i&&(d=i,re(d))},g=i=>r("update:show",i),b=()=>{e.closeOnClick&&g(!1)},h=()=>clearTimeout(l),v=()=>{const{icon:i,type:a,iconSize:p,iconPrefix:w,loadingType:P}=e;if(i||a==="success"||a==="fail")return m(W,{name:i||a,size:p,class:y("icon"),classPrefix:w},null);if(a==="loading")return m(J,{class:y("loading"),size:p,type:P},null)},S=()=>{const{type:i,message:a}=e;if(s.message)return m("div",{class:y("text")},[s.message()]);if(Q(a)&&a!=="")return i==="html"?m("div",{key:0,class:y("text"),innerHTML:String(a)},null):m("div",{class:y("text")},[a])};return T(()=>[e.show,e.forbidClick],u),T(()=>[e.show,e.type,e.message,e.duration],()=>{h(),e.show&&e.duration>0&&(l=setTimeout(()=>{g(!1)},e.duration))}),G(u),H(u),()=>m(R,z({class:[y([e.position,e.wordBreak==="normal"?"break-normal":e.wordBreak,{[e.type]:!e.icon}]),e.className],lockScroll:!1,onClick:b,onClosed:h,"onUpdate:show":g},K(e,ue)),{default:()=>[v(),S()]})}});const me={icon:"",type:"text",message:"",className:"",overlay:!1,onClose:void 0,onOpened:void 0,duration:2e3,teleport:"body",iconSize:void 0,iconPrefix:void 0,position:"middle",transition:"van-fade",forbidClick:!1,loadingType:void 0,overlayClass:"",overlayStyle:void 0,closeOnClick:!1,closeOnClickOverlay:!1};let C=[],ge=!1,V=x({},me);const ve=new Map;function j(e){return X(e)?e:{message:e}}function he(){const{instance:e,unmount:r}=ee({setup(){const s=te(""),{open:l,state:d,close:u,toggle:g}=ne(),b=()=>{},h=()=>m(fe,z(d,{onClosed:b,"onUpdate:show":g}),null);return T(s,v=>{d.message=v}),ae().render=h,{open:l,close:u,message:s}}});return e}function ye(){if(!C.length||ge){const e=he();C.push(e)}return C[C.length-1]}function be(e={}){if(!Z)return{};const r=ye(),s=j(e);return r.open(x({},V,ve.get(s.type||V.type),s)),r}const pe=e=>r=>be(x({type:e},j(r))),Ce=pe("success");export{we as F,be as a,Ce as b,fe as s};
