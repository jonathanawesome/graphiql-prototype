import{F as r}from"./FormControl.f5f67f5d.js";import{j as s,F as d,a as e,z as b}from"./index.062a7a25.js";const m=({formControls:n,formType:l,loading:a=!1})=>s(d,{onSubmit:t=>t.preventDefault(),children:[e("fieldset",{disabled:a,children:n.map((t,o)=>e(r,{control:t.control,label:t.label,labelAddOn:t.labelAddOn},`${o}-${t.label}`))}),l.type==="STATIC"&&e(b,{disabled:a,onClick:t=>{t.preventDefault(),l.submitHandler(t)},children:l.buttonCopy?l.buttonCopy:"Submit"})]});export{m as F};
