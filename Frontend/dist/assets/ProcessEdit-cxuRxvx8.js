import{u as ts,n as cs,d as rs,a as is,s as ns,R as t,H as os,j as e,S as ds,m,a0 as xs}from"./index-w2wx-x_X.js";import{D as y}from"./Dropzone-MJ6J4G2E.js";import{C as ps}from"./Calender-os5MV0Yd.js";import{u as ms}from"./index.esm-aRdTVIgd.js";import{B as h}from"./baseUrl-KJcG7PYP.js";import"./tslib.es6-8dbh_m2m.js";import"./dayjs.min-5rCsLmx2.js";import"./cn-hWSFJXCx.js";const Es=()=>{var W,X,ee,se,ae,le,te,ce,re,ie,ne;const je=ts(),{processId:E}=cs(),g=rs(),{process:s,appErr:u,loading:ve}=is(ns),[b,Ne]=t.useState(!0),[w,ye]=t.useState(!0),[S,Ee]=t.useState(!0),[D,be]=t.useState(null),[_,we]=t.useState(!0),[C,Se]=t.useState(null),[k,De]=t.useState(!0),[P,_e]=t.useState(null),[q,Ce]=t.useState(!0),[ke,Pe]=t.useState((W=s==null?void 0:s.processData)==null?void 0:W.years_type),[F,qe]=t.useState(!0),[I,Fe]=t.useState(!0),[R,Ie]=t.useState(!0),[$,Re]=t.useState(!0),[B,$e]=t.useState(!0),[M,Be]=t.useState(!0),[L,Me]=t.useState(!0),[A,Le]=t.useState(!0),[Ae,Te]=t.useState(!0),[f,ze]=t.useState(!0),[T,z]=t.useState(((X=s==null?void 0:s.processData)==null?void 0:X.mun)||""),[U,Y]=t.useState(((ee=s==null?void 0:s.processData)==null?void 0:ee.child_category)||""),[Ue,Ye]=t.useState(""),[O,Oe]=t.useState(!0),[He,Je]=t.useState([]),[Ve,H]=t.useState([]),[Ze,Ge]=t.useState([]),[J,V]=t.useState([]),[x,Z]=t.useState(!0),[p,j]=t.useState(""),[G,Ke]=t.useState(!1),[v,Qe]=t.useState(!1);t.useEffect(()=>{(async()=>{try{const l=await m.get(`${h}/areas/states`);console.log(l==null?void 0:l.data,"************"),Ge(l==null?void 0:l.data)}catch(l){console.error("Error fetching categories:",l)}})()},[]),t.useEffect(()=>{(async()=>{var l;try{const i=await m.get(`${h}/areas/cities/${encodeURIComponent((l=s==null?void 0:s.processData)==null?void 0:l.pref)}`);console.log(i==null?void 0:i.data,"************"),V(i==null?void 0:i.data)}catch(i){console.error("Error fetching categories:",i)}})()},[s]),t.useEffect(()=>{(async()=>{try{const l=await m.get(`${h}/categories/all`);Je(l.data)}catch(l){console.error("Error fetching categories:",l)}})()},[s]),t.useEffect(()=>{(async()=>{var l,i;try{if((l=s==null?void 0:s.processData)!=null&&l.parent_category){const o=await m.get(`${h}/categories/subcategories/${(i=s==null?void 0:s.processData)==null?void 0:i.parent_category}`);H(o==null?void 0:o.data)}}catch(o){console.error("Error fetching subcategories:",o)}})()},[s]),t.useEffect(()=>{var a,l,i,o,d,oe,de,xe,pe,me,he,ge,ue,fe;b&&((a=s==null?void 0:s.processData)!=null&&a.name)&&n("name",s.processData.name),w&&((l=s==null?void 0:s.processData)!=null&&l.maker_name)&&n("maker_name",s.processData.maker_name),q&&((i=s==null?void 0:s.processData)!=null&&i.years_type)&&n("years_type",s.processData.years_type),F&&((o=s==null?void 0:s.processData)!=null&&o.pref)&&n("pref",s.processData.pref),I&&((d=s==null?void 0:s.processData)!=null&&d.mun)&&(n("mun",s.processData.mun),z(s.processData.mun)),R&&((oe=s==null?void 0:s.processData)!=null&&oe.capacity)&&n("capacity",s.processData.capacity),$&&((de=s==null?void 0:s.processData)!=null&&de.process_explanation)&&n("process_explanation",s.processData.process_explanation),B&&((xe=s==null?void 0:s.processData)!=null&&xe.equipment_size)&&n("equipment_size",s.processData.equipment_size),M&&((pe=s==null?void 0:s.processData)!=null&&pe.delivery_date)&&n("delivery_date",s.processData.delivery_date),L&&((me=s==null?void 0:s.processData)!=null&&me.unit_price)&&n("unit_price",s.processData.unit_price),A&&((he=s==null?void 0:s.processData)!=null&&he.parent_category)&&n("parent_category",s.processData.parent_category),Ae&&((ge=s==null?void 0:s.processData)!=null&&ge.child_category)&&(n("child_category",s.processData.child_category),Y(s.processData.child_category)),f&&((ue=s==null?void 0:s.processData)!=null&&ue.tags)&&n("tags",s.processData.tags.join(",")),O&&((fe=s==null?void 0:s.processData)!=null&&fe.remarks_column)&&n("remarks_column",s.processData.remarks_column)},[s,b,w,q,F,I,R,$,B,M,L,A,f,O,T,U]),t.useEffect(()=>{var a;x&&((a=s==null?void 0:s.processData)!=null&&a.status)&&j(s.processData.status)},[x,p,s]),t.useEffect(()=>{r("availability")},[]),t.useEffect(()=>{g(os(E))},[g]),t.useEffect(()=>{(s==null?void 0:s.message)==="Process updated successfully"&&G&&je("/dashboard/process-list")},[s,G,u]);let K=[];const We=new Date().getFullYear();for(let a=We;a>=1874;a--)K.push(a);const{register:r,handleSubmit:Xe,reset:es,setValue:n,formState:{errors:c,isSubmitting:Q}}=ms();console.log("Process details:",s),console.log(J,"************");const N=(a,l)=>{l===1?be(a):l===2?Se(a):l===3&&_e(a)},ss=async a=>{try{qe(!1);const l=await m.get(`${h}/areas/cities/${encodeURIComponent(a)}`);console.log("Cities fetched:",l==null?void 0:l.data),V(l==null?void 0:l.data)}catch(l){console.error("Error fetching cities:",l)}},as=async a=>{try{Le(!1);const l=await m.get(`${h}/categories/subcategories/${a}`);H(l==null?void 0:l.data)}catch(l){console.error("Error fetching subcategories:",l)}},ls=async a=>{const l=a.tags.split(","),i={...a,tags:l,status:p},o=new FormData;Object.keys(i).forEach(d=>{d!=="img1"&&d!=="img2"&&d!=="img3"&&(d==="availability"||d==="tags"?o.append(d,JSON.stringify(i[d])):o.append(d,i[d]))}),D&&o.append("img1",D),C&&o.append("img2",C),P&&o.append("img3",P),await g(xs({formData:o,id:E}));for(let d of o.entries())console.log(d[0]+", "+d[1]);Ke(!0),es(),Qe(!0)};return e.jsx(e.Fragment,{children:ve?e.jsx(ds,{}):e.jsx("div",{className:"px-[45px] xl:px-0 xl:pl-[50px] xl:pr-[70px] md:max-w-[800px] mx-auto w-full text-base text-tertiary",children:e.jsxs("form",{className:"form",encType:"multipart/form-data",onSubmit:Xe(ls),id:"processForm",children:[e.jsxs("div",{className:"grid grid-cols-12 xs:gap-y-2 md:gap-y-3",children:[e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsx("p",{className:"xs:col-span-5 xs:flex xs:items-center md:col-span-3 text-[24px] text-primary font-bold",children:"工程登録"}),e.jsx("div",{className:"xs:col-span-7 md:col-span-9 flex items-center",children:e.jsx("span",{className:"text-[10px] text-fifth",children:"※は回答必須"})})]}),u&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:u})]}),e.jsx("div",{className:"xs:hidden md:block col-span-12"}),e.jsx("div",{className:"xs:hidden md:block col-span-12"}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:["工程名",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 relative",children:[e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"工程名",...r("name",{required:"プロセス名は必須です",onChange:()=>{Ne(!1)},minLength:{value:3,message:"Process name must be at least 3 characters"}})}),c.name&&e.jsx("p",{className:"text-fifth",children:c.name.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:["地域",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2",children:[e.jsxs("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2",children:[e.jsx("label",{className:"col-span-4 md:col-span-5 flex items-center",children:"都道府県"}),e.jsx("div",{className:"col-span-8 md:col-span-7 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",...r("pref",{required:"都道府県は必須です",onChange:a=>ss(a.target.value)}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"都道府県"}),Ze.map(a=>e.jsx("option",{value:a,children:a},a))]})})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2",children:[e.jsx("label",{className:"col-span-4 md:col-span-5 flex items-center",children:"市区町村"}),e.jsx("div",{className:"col-span-8 md:col-span-7 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",value:T,...r("mun",{required:"市区町村は必須です",onChange:a=>{z(a.target.value),Fe(!1)}}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"市町村"}),J.map(a=>e.jsx("option",{value:a,children:a},a))]})})]})]}),(c.pref||c.mun)&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"都道府県と市区町村の両方が必要です"})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12 ",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3",children:["工程画像",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 xs:gap-x-2 grid grid-cols-12 md:col-span-9 md:gap-x-3",children:[e.jsxs("div",{className:"bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:[S?e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx("img",{className:"w-full h-full",src:(se=s==null?void 0:s.processData)==null?void 0:se.img1,alt:"image1"})}):e.jsx("div",{className:"w-full h-full cursor-pointer",children:e.jsx(y,{setValue:n,id:1,onFileSelect:a=>N(a,1),isReset:v,...r("img1",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),S&&e.jsxs("svg",{className:"absolute top-0 right-0 mr-[2px] cursor-pointer",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:()=>Ee(!1),children:[e.jsx("circle",{cx:"10",cy:"10",r:"10",fill:"black","fill-opacity":"0.5"}),e.jsx("line",{x1:"14.3536",y1:"5.35355",x2:"5.35355",y2:"14.3536",stroke:"white"}),e.jsx("line",{y1:"-0.5",x2:"12.7279",y2:"-0.5",transform:"matrix(0.707107 0.707107 0.707107 -0.707107 6 5)",stroke:"white"})]})]}),e.jsxs("div",{className:"bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:[_?e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx("img",{className:"w-full h-full",src:(ae=s==null?void 0:s.processData)==null?void 0:ae.img2,alt:"image1"})}):e.jsx("div",{className:"w-full h-full cursor-pointer",children:e.jsx(y,{setValue:n,id:2,onFileSelect:a=>N(a,2),isReset:v,...r("img2",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),_&&e.jsxs("svg",{className:"absolute top-0 right-0 mr-[2px] cursor-pointer",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:()=>we(!1),children:[e.jsx("circle",{cx:"10",cy:"10",r:"10",fill:"black","fill-opacity":"0.5"}),e.jsx("line",{x1:"14.3536",y1:"5.35355",x2:"5.35355",y2:"14.3536",stroke:"white"}),e.jsx("line",{y1:"-0.5",x2:"12.7279",y2:"-0.5",transform:"matrix(0.707107 0.707107 0.707107 -0.707107 6 5)",stroke:"white"})]})]}),e.jsxs("div",{className:"bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:[k?e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx("img",{className:"w-full h-full",src:(le=s==null?void 0:s.processData)==null?void 0:le.img3,alt:"image1"})}):e.jsx("div",{className:"w-full h-full cursor-pointer",children:e.jsx(y,{setValue:n,id:3,onFileSelect:a=>N(a,3),isReset:v,...r("img3",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),k&&e.jsxs("svg",{className:"absolute top-0 right-0 mr-[2px] cursor-pointer",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:()=>De(!1),children:[e.jsx("circle",{cx:"10",cy:"10",r:"10",fill:"black","fill-opacity":"0.5"}),e.jsx("line",{x1:"14.3536",y1:"5.35355",x2:"5.35355",y2:"14.3536",stroke:"white"}),e.jsx("line",{y1:"-0.5",x2:"12.7279",y2:"-0.5",transform:"matrix(0.707107 0.707107 0.707107 -0.707107 6 5)",stroke:"white"})]})]})]})]}),(c.img1||c.img2||c.img2)&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"3 つの画像フィールドはすべて必須です"})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["工程説明",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 relative",children:[e.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",...r("process_explanation",{required:"プロセスの説明は必須です",onChange:()=>{Re(!1)}}),placeholder:`　記入例）〇〇製△△加工機です。\r
　　　　　普段は工作機械の部品加工に使用しており、...`}),c.process_explanation&&e.jsx("p",{className:"text-fifth",children:c.process_explanation.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["能力",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 relative",children:[e.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",...r("capacity",{required:"容量が必要です",onChange:()=>{Ie(!1)}}),placeholder:`　記入例）加工可能な製品サイズ 〇〇×〇〇×〇〇\r
　　　　　回転数〇〇rpm\r
　　　　　加工精度〇〇μ\r
　　　　　本設備には〇〇の加工が可能です。\r
`}),c.capacity&&e.jsx("p",{className:"text-fifth",children:c.capacity.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:["設備サイズ",e.jsx("span",{className:"ml-1 text-fifth"})]}),e.jsx("div",{className:"xs:col-span-12 md:col-span-9 relative",children:e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",...r("equipment_size",{onChange:()=>{$e(!1)}})})})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsx("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:"メーカー"}),e.jsx("div",{className:"xs:col-span-12 md:col-span-9 relative",children:e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"〇〇社製",...r("maker_name",{onChange:()=>{ye(!1)}})})})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsx("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:"年式"}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-x-2",children:[e.jsx("div",{className:"col-span-5 flex items-center relative",children:e.jsx("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer",value:ke,...r("years_type",{onChange:a=>{Ce(!1),Pe(parseInt(a.target.value))}}),children:K.map(a=>e.jsx("option",{value:a,children:a},a))})}),e.jsx("div",{className:"col-span-7 flex items-center",children:"年製"})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:["納期の目安",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-5 relative",children:[e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"　最短翌日～",...r("delivery_date",{required:"お届け日は必須です",onChange:()=>{Be(!1)}})}),c.delivery_date&&e.jsx("p",{className:"text-fifth",children:c.delivery_date.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:["単価(税別)",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-5 relative",children:[e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"テーブルサイズ〇〇×〇〇×〇〇",...r("unit_price",{required:"単価は必須です",onChange:()=>{Me(!1)}})}),c.unit_price&&e.jsx("p",{className:"text-fifth",children:c.unit_price.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:["カテゴリー",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2",children:[e.jsx("div",{className:"xs:col-span-12 md:col-span-5 lg:col-span-4 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",...r("parent_category",{required:"カテゴリは必須です",onChange:a=>as(a.target.value)}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"カテゴリー"}),He.map(a=>e.jsx("option",{className:"text-tertiary",value:a.category_id,children:a.category_name},a.category_id))]})}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-7 lg:col-span-6 grid grid-cols-12 gap-x-2",children:[e.jsx("label",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 flex items-center",children:"サブカテゴリー"}),e.jsx("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-7 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",value:U,...r("child_category",{onChange:a=>{Y(a.target.value),Te(!1)}}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"サブカテゴリー"}),Ve.map(a=>e.jsx("option",{className:"text-tertiary",value:a.category_id,children:a.category_name},a.category_id))]})})]})]}),(c.parent_category||c.child_category)&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"カテゴリとサブカテゴリの両方が必要です"})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["タグ",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 ",children:[e.jsx("textarea",{value:f?(te=s==null?void 0:s.processData)==null?void 0:te.tags.join(","):Ue,...r("tags",{required:"工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)",onChange:a=>{ze(!1),Ye(a.target.value)}}),className:"block h-[70px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 py-1",placeholder:"　レーザー,三次元,形鋼,パイプ,マザック"}),c.tags?e.jsxs("p",{className:"text-fifth",children:["※",c.tags.message]}):e.jsx("p",{className:"text-tertiary",children:"※工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)"})]})]}),e.jsx("div",{className:"col-span-12"}),e.jsx("div",{className:"col-span-12"}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 ",children:["空き状況",e.jsx("span",{className:"ml-1 text-fifth"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-y-4",children:[e.jsx("div",{className:"lg:col-span-8 xs:col-span-12",children:e.jsx(ps,{register:r,errors:c,setValue:n})}),e.jsx("div",{className:"lg:col-span-4 xs:col-span-12 flex justify-center items-center w-full ",children:e.jsxs("div",{className:"xs:grid xs:grid-cols-12 xs:gap-y-2 xs:gap-x-2 lg:flex lg:flex-col gap-2 lg:basis-3/4 text-white  w-full",children:[e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-fifth h-[36px] flex items-center justify-center gap-2",children:[e.jsx("svg",{className:"",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("circle",{cx:"7",cy:"7",r:"6",stroke:"white","stroke-width":"2"})}),e.jsx("p",{className:"",children:"空きあり"})]}),e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-[#FA0] h-[36px] flex items-center justify-center gap-5",children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("rect",{x:"1",y:"1",width:"14",height:"14",stroke:"white","stroke-width":"2"})}),e.jsx("p",{children:"調整可能"})]}),e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-primary h-[36px] flex items-center justify-center gap-2",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 18 15",fill:"none",children:e.jsx("path",{d:"M9 2L15.9282 14H2.0718L9 2Z",stroke:"white","stroke-width":"2"})}),e.jsx("p",{children:"要相談"})]}),e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-tertiary h-[36px] flex items-center justify-center gap-2",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 14 16",fill:"none",children:[e.jsx("path",{d:"M12.5118 1.00011L1.48817 15.0001",stroke:"white","stroke-width":"2"}),e.jsx("path",{d:"M1.48817 1.00011L12.5118 15.0001",stroke:"white","stroke-width":"2"})]}),e.jsx("p",{children:"空きなし"})]})]})})]})]}),e.jsx("div",{className:"col-span-12"}),e.jsx("div",{className:"col-span-12"}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["備考",e.jsx("span",{className:"ml-1 text-fifth"})]}),e.jsx("div",{className:"xs:col-span-12 md:col-span-9 ",children:e.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",...r("remarks_column",{onChange:()=>{Oe(!1)}})})})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-5 flex items-center",children:["公開ステータス",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-7 grid grid-cols-12",children:[e.jsxs("div",{className:"col-span-6 flex xs:justify-center md:justify-start items-center gap-1",children:[e.jsx("input",{className:"h-[16px]",type:"radio",value:x?(ce=s==null?void 0:s.processData)==null?void 0:ce.status:p,onClick:()=>{Z(!1),j("release")},...r("status"),checked:x?((re=s==null?void 0:s.processData)==null?void 0:re.status)==="release":p==="release"}),e.jsx("div",{children:"公開"})]}),e.jsxs("div",{className:"col-span-6 flex xs:justify-center md:justify-start  items-center gap-1",children:[e.jsx("input",{className:"h-[16px]",type:"radio",value:x?(ie=s==null?void 0:s.processData)==null?void 0:ie.status:p,onClick:()=>{Z(!1),j("private")},...r("status"),checked:x?((ne=s==null?void 0:s.processData)==null?void 0:ne.status)==="private":p==="private"}),e.jsx("div",{children:"非公開"})]})]})]}),c.status&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block md:col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:c.status.message})]})]}),e.jsx("div",{className:"flex justify-center items-center xs:gap-2 md:gap-10 w-full h-[45px] my-[75px]",children:e.jsx("button",{type:"submit",className:"xs:basis-1/2 md:basis-1/3 xl:basis-1/4 h-full bg-fourth text-white",disabled:Q,children:Q?"Loading...":"この内容で登録する"})})]})})})};export{Es as default};
