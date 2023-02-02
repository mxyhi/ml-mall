import{aH as ge,aI as me,aJ as he,aK as be,o as ve,c as ye,n as B,X as k,m as Ie,f as Ce,av as Se,d as xe,am as Ve,r as P,i as Ee,aL as Me,j as C,a6 as ke,$ as we,aM as Te,E as Le,a1 as M,C as Pe,a0 as Re,b as u,a5 as I,aN as $,ah as Ae,aj as H,I as R,aO as Be,l as _e,v as Ne,ai as Oe,w as De}from"./user-0aef1c91.js";import{c as Fe,C as je}from"./index-517c6840.js";import{u as ze}from"./use-id-90fe8789.js";function J(t){return Array.isArray(t)?!t.length:t===0?!1:!t}function We(t,a){if(J(t)){if(a.required)return!1;if(a.validateEmpty===!1)return!0}return!(a.pattern&&!a.pattern.test(String(t)))}function $e(t,a){return new Promise(l=>{const d=a.validator(t,a);if(he(d)){d.then(l);return}l(d)})}function K(t,a){const{message:l}=a;return be(l)?l(t,a):l||""}function He({target:t}){t.composing=!0}function q({target:t}){t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}function Ke(t,a){const l=ge();t.style.height="auto";let d=t.scrollHeight;if(ve(a)){const{maxHeight:i,minHeight:c}=a;i!==void 0&&(d=Math.min(d,i)),c!==void 0&&(d=Math.max(d,c))}d&&(t.style.height=`${d}px`,me(l))}function qe(t){return t==="number"?{type:"text",inputmode:"decimal"}:t==="digit"?{type:"tel",inputmode:"numeric"}:{type:t}}function v(t){return[...t].length}function A(t,a){return[...t].slice(0,a).join("")}const[Je,g]=ye("field"),Ue={id:String,name:String,leftIcon:String,rightIcon:String,autofocus:Boolean,clearable:Boolean,maxlength:B,formatter:Function,clearIcon:k("clear"),modelValue:Ie(""),inputAlign:String,placeholder:String,autocomplete:String,errorMessage:String,enterkeyhint:String,clearTrigger:k("focus"),formatTrigger:k("onChange"),error:{type:Boolean,default:null},disabled:{type:Boolean,default:null},readonly:{type:Boolean,default:null}},Ye=Ce({},Fe,Ue,{rows:B,type:k("text"),rules:Array,autosize:[Boolean,Object],labelWidth:B,labelClass:Se,labelAlign:String,showWordLimit:Boolean,errorMessageAlign:String,colon:{type:Boolean,default:null}});var Xe=xe({name:Je,props:Ye,emits:["blur","focus","clear","keypress","clickInput","endValidate","startValidate","clickLeftIcon","clickRightIcon","update:modelValue"],setup(t,{emit:a,slots:l}){const d=ze(),i=Ve({status:"unvalidated",focused:!1,validateMessage:""}),c=P(),_=P(),w=P(),{parent:m}=Ee(Me),y=()=>{var e;return String((e=t.modelValue)!=null?e:"")},h=e=>{if(I(t[e]))return t[e];if(m&&I(m.props[e]))return m.props[e]},U=C(()=>{const e=h("readonly");if(t.clearable&&!e){const r=y()!=="",n=t.clearTrigger==="always"||t.clearTrigger==="focus"&&i.focused;return r&&n}return!1}),N=C(()=>w.value&&l.input?w.value():t.modelValue),Y=e=>e.reduce((r,n)=>r.then(()=>{if(i.status==="failed")return;let{value:o}=N;if(n.formatter&&(o=n.formatter(o,n)),!We(o,n)){i.status="failed",i.validateMessage=K(o,n);return}if(n.validator)return J(o)&&n.validateEmpty===!1?void 0:$e(o,n).then(s=>{s&&typeof s=="string"?(i.status="failed",i.validateMessage=s):s===!1&&(i.status="failed",i.validateMessage=K(o,n))})}),Promise.resolve()),S=()=>{i.status="unvalidated",i.validateMessage=""},O=()=>a("endValidate",{status:i.status,message:i.validateMessage}),D=(e=t.rules)=>new Promise(r=>{S(),e?(a("startValidate"),Y(e).then(()=>{i.status==="failed"?(r({name:t.name,message:i.validateMessage}),O()):(i.status="passed",r(),O())})):r()}),T=e=>{if(m&&t.rules){const{validateTrigger:r}=m.props,n=$(r).includes(e),o=t.rules.filter(s=>s.trigger?$(s.trigger).includes(e):n);o.length&&D(o)}},X=e=>{var r;const{maxlength:n}=t;if(I(n)&&v(e)>n){const o=y();if(o&&v(o)===+n)return o;const s=(r=c.value)==null?void 0:r.selectionEnd;if(i.focused&&s){const f=[...e],b=f.length-+n;return f.splice(s-b,b),f.join("")}return A(e,+n)}return e},x=(e,r="onChange")=>{const n=e;e=X(e);const o=v(n)-v(e);if(t.type==="number"||t.type==="digit"){const f=t.type==="number";e=Ae(e,f,f)}let s=0;if(t.formatter&&r===t.formatTrigger){const{formatter:f,maxlength:b}=t;if(e=f(e),I(b)&&v(e)>b&&(e=A(e,+b)),c.value&&i.focused){const{selectionEnd:E}=c.value,W=A(n,E);s=v(f(W))-v(W)}}if(c.value&&c.value.value!==e)if(i.focused){let{selectionStart:f,selectionEnd:b}=c.value;if(c.value.value=e,I(f)&&I(b)){const E=v(e);o?(f-=o,b-=o):s&&(f+=s,b+=s),c.value.setSelectionRange(Math.min(f,E),Math.min(b,E))}}else c.value.value=e;e!==t.modelValue&&a("update:modelValue",e)},G=e=>{e.target.composing||x(e.target.value)},L=()=>{var e;return(e=c.value)==null?void 0:e.blur()},Q=()=>{var e;return(e=c.value)==null?void 0:e.focus()},V=()=>{const e=c.value;t.type==="textarea"&&t.autosize&&e&&Ke(e,t.autosize)},Z=e=>{i.focused=!0,a("focus",e),M(V),h("readonly")&&L()},p=e=>{h("readonly")||(i.focused=!1,x(y(),"onBlur"),a("blur",e),T("onBlur"),M(V),Oe())},F=e=>a("clickInput",e),ee=e=>a("clickLeftIcon",e),te=e=>a("clickRightIcon",e),ne=e=>{H(e),a("update:modelValue",""),a("clear",e)},j=C(()=>{if(typeof t.error=="boolean")return t.error;if(m&&m.props.showError&&i.status==="failed")return!0}),ae=C(()=>{const e=h("labelWidth");if(e)return{width:ke(e)}}),re=e=>{e.keyCode===13&&(!(m&&m.props.submitOnEnter)&&t.type!=="textarea"&&H(e),t.type==="search"&&L()),a("keypress",e)},z=()=>t.id||`${d}-input`,ie=()=>i.status,le=()=>{const e=g("control",[h("inputAlign"),{error:j.value,custom:!!l.input,"min-height":t.type==="textarea"&&!t.autosize}]);if(l.input)return u("div",{class:e,onClick:F},[l.input()]);const r={id:z(),ref:c,name:t.name,rows:t.rows!==void 0?+t.rows:void 0,class:e,disabled:h("disabled"),readonly:h("readonly"),autofocus:t.autofocus,placeholder:t.placeholder,autocomplete:t.autocomplete,enterkeyhint:t.enterkeyhint,"aria-labelledby":t.label?`${d}-label`:void 0,onBlur:p,onFocus:Z,onInput:G,onClick:F,onChange:q,onKeypress:re,onCompositionend:q,onCompositionstart:He};return t.type==="textarea"?u("textarea",r,null):u("input",_e(qe(t.type),r),null)},oe=()=>{const e=l["left-icon"];if(t.leftIcon||e)return u("div",{class:g("left-icon"),onClick:ee},[e?e():u(R,{name:t.leftIcon,classPrefix:t.iconPrefix},null)])},se=()=>{const e=l["right-icon"];if(t.rightIcon||e)return u("div",{class:g("right-icon"),onClick:te},[e?e():u(R,{name:t.rightIcon,classPrefix:t.iconPrefix},null)])},ce=()=>{if(t.showWordLimit&&t.maxlength){const e=v(y());return u("div",{class:g("word-limit")},[u("span",{class:g("word-num")},[e]),Ne("/"),t.maxlength])}},ue=()=>{if(m&&m.props.showErrorMessage===!1)return;const e=t.errorMessage||i.validateMessage;if(e){const r=l["error-message"],n=h("errorMessageAlign");return u("div",{class:g("error-message",n)},[r?r({message:e}):e])}},de=()=>{const e=h("colon")?":":"";if(l.label)return[l.label(),e];if(t.label)return u("label",{id:`${d}-label`,for:z()},[t.label+e])},fe=()=>[u("div",{class:g("body")},[le(),U.value&&u(R,{ref:_,name:t.clearIcon,class:g("clear")},null),se(),l.button&&u("div",{class:g("button")},[l.button()])]),ce(),ue()];return we({blur:L,focus:Q,validate:D,formValue:N,resetValidation:S,getValidationStatus:ie}),Te(Be,{customValue:w,resetValidation:S,validateWithTrigger:T}),Le(()=>t.modelValue,()=>{x(y()),S(),T("onChange"),M(V)}),Pe(()=>{x(y(),t.formatTrigger),M(V)}),Re("touchstart",ne,{target:C(()=>{var e;return(e=_.value)==null?void 0:e.$el})}),()=>{const e=h("disabled"),r=h("labelAlign"),n=oe(),o=()=>{const s=de();return r==="top"?[n,s].filter(Boolean):s||[]};return u(je,{size:t.size,class:g({error:j.value,disabled:e,[`label-${r}`]:r}),center:t.center,border:t.border,isLink:t.isLink,clickable:t.clickable,titleStyle:ae.value,valueClass:g("value"),titleClass:[g("label",[r,{required:t.required}]),t.labelClass],arrowDirection:t.arrowDirection},{icon:n&&r!=="top"?()=>n:null,title:o,value:fe,extra:l.extra})}}});const pe=De(Xe);export{pe as F};