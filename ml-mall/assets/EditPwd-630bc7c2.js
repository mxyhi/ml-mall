import{_ as v,r as n,o as b,E as w,a as o,ai as u,q as l,s as g}from"./user-0dd1e069.js";/* empty css              */import{C as y}from"./index-7d45a195.js";import"./index-d4ce09a5.js";import{F as V,a as x,s as B}from"./index-a35333a5.js";import{N as k}from"./index-17d6a68d.js";import{r as E}from"./auth-a612d56d.js";import"./index-7293a37a.js";import{B as N}from"./index-c1d7c59c.js";import"./use-route-f9688e52.js";import"./use-id-d165ec44.js";const h={class:"container"},C={class:"content"},P={style:{margin:"16px"}},$={__name:"EditPwd",setup(q){const d=n(""),i=n(""),r=n(!1),_=async({secret_answer:a,password:e})=>{r.value=!0;try{const t=await E(e,a);console.log(t),t.code===1&&B({message:"修改成功",duration:1500})}catch(t){console.error(t)}r.value=!1};return(a,e)=>{const t=k,m=V,c=y,p=N,f=x;return b(),w("main",h,[o(t,{title:a.$route.meta.title,placeholder:"",fixed:"","left-arrow":"",onClickLeft:e[0]||(e[0]=s=>a.$router.back())},null,8,["title"]),u("div",C,[o(f,{onSubmit:_},{default:l(()=>[o(c,{inset:""},{default:l(()=>[o(m,{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=s=>d.value=s),modelModifiers:{trim:!0},name:"secret_answer",label:"密保",placeholder:"密保",rules:[{required:!0,message:"请填写密保"}]},null,8,["modelValue"]),o(m,{modelValue:i.value,"onUpdate:modelValue":e[2]||(e[2]=s=>i.value=s),modelModifiers:{trim:!0},type:"password",name:"password",label:"新密码",placeholder:"新密码",rules:[{required:!0,message:"请填写密码"},{pattern:/^[-_a-zA-Z0-9]{6,16}$/,message:"只能包含6-16位字母数字下划线减号"}]},null,8,["modelValue"])]),_:1}),u("div",P,[o(p,{loading:r.value,round:"",block:"",type:"primary","native-type":"submit"},{default:l(()=>[g(" 提交 ")]),_:1},8,["loading"])])]),_:1})])])}}},j=v($,[["__scopeId","data-v-bb00bd4f"]]);export{j as default};
