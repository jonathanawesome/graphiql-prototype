import{r,a as n,$ as o,a0 as s,a1 as a}from"./index.6c64e9ae.js";const i=()=>{const[t,e]=r.exports.useState("");return n(o,{currentValue:t,handleChange:({name:y,value:l})=>{e(l)},name:"FormControl FieldInput",placeholder:"placeholder"})};i.storyName="FieldInput";const u=()=>n(s,{currentValue:"false",handleChange:({name:t,value:e})=>console.log({name:t,value:e}),name:"FormControl FieldSelect",options:[{value:"true",name:"True"},{value:"false",name:"False"}]});u.storyName="FieldSelect";const m=()=>n(a,{currentValue:["1","2","3","4"],handleChange:({name:t,value:e})=>{console.log(e)},name:"FieldList",typeNameValue:"Int"});m.storyName="FieldList - Int";const d=()=>n(a,{currentValue:["strings","are","fun"],handleChange:({name:t,value:e})=>{console.log(e)},name:"FieldList",typeNameValue:"String"});d.storyName="FieldList - String";const c=()=>n(a,{currentValue:["1.2","1.23","1.234"],handleChange:({name:t,value:e})=>{console.log(e)},name:"FieldList",typeNameValue:"Float"});c.storyName="FieldList - Float";const F=()=>n(a,{currentValue:["cwef7w38ncfgwingh","934wmgh283w7gnw8374gc","2q7cfgn9n237g8qgcf"],handleChange:({name:t,value:e})=>{console.log(e)},name:"FieldList",typeNameValue:"ID"});F.storyName="FieldList - Id";const g=()=>n(a,{currentValue:["RED","GREEN","BLUE"],handleChange:({name:t,value:e})=>{console.log(e)},name:"FieldList",typeNameValue:"TestEnum"});g.storyName="FieldList - Enum";export{i as FieldInputStory,g as FieldListEnumStory,c as FieldListFloatStory,F as FieldListIDStory,m as FieldListIntStory,d as FieldListStringStory,u as FieldSelectStory};