import{u as ls,n as cs,d as rs,a as is,s as ns,R as l,H as os,K as ds,j as e,S as xs,m,b2 as ps}from"./index-w2wx-x_X.js";import{D as y}from"./Dropzone-MJ6J4G2E.js";import{C as ms}from"./Calender-os5MV0Yd.js";import{u as hs}from"./index.esm-aRdTVIgd.js";import{B as h}from"./baseUrl-KJcG7PYP.js";import"./tslib.es6-8dbh_m2m.js";import"./dayjs.min-5rCsLmx2.js";import"./cn-hWSFJXCx.js";const Es=()=>{var ae,te,le,ce,re,ie,ne,oe,de,xe,pe,me;const be=ls(),{processId:f}=cs(),g=rs(),{process:s,appErr:b,loading:Ee}=is(ns),[E,we]=l.useState(!0),[w,De]=l.useState(!0),[D,S]=l.useState(!0),[_,Se]=l.useState(null),[C,k]=l.useState(!0),[P,_e]=l.useState(null),[q,F]=l.useState(!0),[I,Ce]=l.useState(null),[R,ke]=l.useState(!0),[Pe,qe]=l.useState((ae=s==null?void 0:s.processData)==null?void 0:ae.years_type),[$,Fe]=l.useState(!0),[B,Ie]=l.useState(!0),[A,Re]=l.useState(!0),[M,$e]=l.useState(!0),[L,Be]=l.useState(!0),[T,Ae]=l.useState(!0),[z,Me]=l.useState(!0),[U,Le]=l.useState(!0),[Te,ze]=l.useState(!0),[j,Ue]=l.useState(!0),[Y,Ye]=l.useState(((te=s==null?void 0:s.processData)==null?void 0:te.pref)||""),[O,H]=l.useState(((le=s==null?void 0:s.processData)==null?void 0:le.mun)||""),[J,K]=l.useState(((ce=s==null?void 0:s.processData)==null?void 0:ce.child_category)||""),[Oe,He]=l.useState(""),[V,Je]=l.useState(!0),[Ke,Ve]=l.useState([]),[Ze,Z]=l.useState([]),[Ge,Qe]=l.useState([]),[G,Q]=l.useState([]),[x,W]=l.useState(!0),[p,v]=l.useState(""),[X,We]=l.useState({});l.useEffect(()=>{(async()=>{try{const t=await m.get(`${h}/areas/states`);console.log(t==null?void 0:t.data,"************"),Qe(t==null?void 0:t.data)}catch(t){console.error("Error fetching categories:",t)}})()},[]),l.useEffect(()=>{(async()=>{var t;try{const i=await m.get(`${h}/areas/cities/${encodeURIComponent((t=s==null?void 0:s.processData)==null?void 0:t.pref)}`);console.log(i==null?void 0:i.data,"************"),Q(i==null?void 0:i.data)}catch(i){console.error("Error fetching categories:",i)}})()},[s]),l.useEffect(()=>{(async()=>{try{const t=await m.get(`${h}/categories/all`);Ve(t.data)}catch(t){console.error("Error fetching categories:",t)}})()},[s]),l.useEffect(()=>{(async()=>{var t,i;try{if((t=s==null?void 0:s.processData)!=null&&t.parent_category){const o=await m.get(`${h}/categories/subcategories/${(i=s==null?void 0:s.processData)==null?void 0:i.parent_category}`);Z(o==null?void 0:o.data)}}catch(o){console.error("Error fetching subcategories:",o)}})()},[s]),l.useEffect(()=>{var a,t,i,o,u,d,he,ge,ue,fe,je,ve,Ne,ye;E&&((a=s==null?void 0:s.processData)!=null&&a.name)&&n("name",s.processData.name),w&&((t=s==null?void 0:s.processData)!=null&&t.maker_name)&&n("maker_name",s.processData.maker_name),R&&((i=s==null?void 0:s.processData)!=null&&i.years_type)&&n("years_type",s.processData.years_type),$&&((o=s==null?void 0:s.processData)!=null&&o.pref)&&(n("pref",s.processData.pref),Ye(s.processData.pref)),B&&((u=s==null?void 0:s.processData)!=null&&u.mun)&&(n("mun",s.processData.mun),H(s.processData.mun)),A&&((d=s==null?void 0:s.processData)!=null&&d.capacity)&&n("capacity",s.processData.capacity),M&&((he=s==null?void 0:s.processData)!=null&&he.process_explanation)&&n("process_explanation",s.processData.process_explanation),L&&((ge=s==null?void 0:s.processData)!=null&&ge.equipment_size)&&n("equipment_size",s.processData.equipment_size),T&&((ue=s==null?void 0:s.processData)!=null&&ue.delivery_date)&&n("delivery_date",s.processData.delivery_date),z&&((fe=s==null?void 0:s.processData)!=null&&fe.unit_price)&&n("unit_price",s.processData.unit_price),U&&((je=s==null?void 0:s.processData)!=null&&je.parent_category)&&n("parent_category",s.processData.parent_category),Te&&((ve=s==null?void 0:s.processData)!=null&&ve.child_category)&&(n("child_category",s.processData.child_category),K(s.processData.child_category)),j&&((Ne=s==null?void 0:s.processData)!=null&&Ne.tags)&&n("tags",s.processData.tags.join(",")),V&&((ye=s==null?void 0:s.processData)!=null&&ye.remarks_column)&&n("remarks_column",s.processData.remarks_column)},[s,E,w,R,$,B,A,M,L,T,z,U,j,V,Y,O,J,X]),l.useEffect(()=>{var a;x&&((a=s==null?void 0:s.processData)!=null&&a.status)&&v(s.processData.status)},[x,p,s]),l.useEffect(()=>{r("availability")},[]),l.useEffect(()=>{g(os(f)),g(ds(!0))},[g,X]),console.log("processId details:",f);let ee=[];const Xe=new Date().getFullYear();for(let a=Xe;a>=1874;a--)ee.push(a);const{register:r,handleSubmit:es,setValue:n,formState:{errors:c,isSubmitting:se}}=hs();console.log("Process details:",s),console.log(G,"************");const N=(a,t)=>{t===1?Se(a):t===2?_e(a):t===3&&Ce(a)},ss=async a=>{try{Fe(!1);const t=await m.get(`${h}/areas/cities/${encodeURIComponent(a)}`);console.log("Cities fetched:",t==null?void 0:t.data),Q(t==null?void 0:t.data)}catch(t){console.error("Error fetching cities:",t)}},as=async a=>{try{Le(!1);const t=await m.get(`${h}/categories/subcategories/${a}`);Z(t==null?void 0:t.data)}catch(t){console.error("Error fetching subcategories:",t)}},ts=async a=>{const t=a.tags.split(","),i={...a,tags:t,status:p},o=new FormData;Object.keys(i).forEach(d=>{d!=="img1"&&d!=="img2"&&d!=="img3"&&(d==="availability"||d==="tags"?o.append(d,JSON.stringify(i[d])):o.append(d,i[d]))}),_&&o.append("img1",_),P&&o.append("img2",P),I&&o.append("img3",I);const u=await g(ps({formData:o,id:f}));for(let d of o.entries())console.log(d[0]+", "+d[1]);S(!0),k(!0),F(!0),We(u)};return e.jsx(e.Fragment,{children:Ee?e.jsx(xs,{}):e.jsxs("form",{className:"form",encType:"multipart/form-data",onSubmit:es(ts),id:"processForm",children:[e.jsxs("div",{className:"lg:mx-20 md:mx-8 sm:mx-20 xs:mx-8 xs:mt-[24px] md:mt-[50px] grid grid-cols-12 xs:gap-y-2 md:gap-y-3 ",children:[e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsx("p",{className:"xs:col-span-5 xs:flex xs:items-center md:col-span-3 text-[24px] text-primary font-bold",children:"工程登録"}),e.jsx("div",{className:"xs:col-span-7 md:col-span-9 flex items-center",children:e.jsx("span",{className:"text-[10px] text-fifth",children:"※は回答必須"})})]}),b&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:b})]}),e.jsx("div",{className:"xs:hidden md:block col-span-12"}),e.jsx("div",{className:"xs:hidden md:block col-span-12"}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center text-[#808080]",children:["工程名",e.jsx("span",{className:" text-fifth ml-12",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 relative ",children:[e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",placeholder:"工程名",...r("name",{required:"プロセス名は必須です",onChange:()=>{we(!1)},minLength:{value:3,message:"Process name must be at least 3 characters"}})}),c.name&&e.jsx("p",{className:"text-fifth",children:c.name.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center text-[#808080]",children:["地域",e.jsx("span",{className:" text-fifth ml-16",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2",children:[e.jsxs("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2",children:[e.jsx("label",{className:"col-span-4 md:col-span-5 flex items-center text-[#808080]",children:"都道府県"}),e.jsx("div",{className:"col-span-8 md:col-span-7 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",value:Y,...r("pref",{required:"都道府県は必須です",onChange:a=>ss(a.target.value)}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"都道府県"}),Ge.map(a=>e.jsx("option",{value:a,children:a},a))]})})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2",children:[e.jsx("label",{className:"col-span-4 md:col-span-5 flex items-center text-[#808080]",children:"市区町村"}),e.jsx("div",{className:"col-span-8 md:col-span-7 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",value:O,...r("mun",{required:"市区町村は必須です",onChange:a=>{H(a.target.value),Ie(!1)}}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"市町村"}),G.map(a=>e.jsx("option",{value:a,children:a},a))]})})]})]}),(c.pref||c.mun)&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"都道府県と市区町村の両方が必要です"})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12 ",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 text-[#808080]",children:["工程画像",e.jsx("span",{className:" text-fifth ml-8",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 xs:gap-x-2 grid grid-cols-12 md:col-span-9 md:gap-x-3",children:[e.jsxs("div",{className:"bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:[D?e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx("img",{className:"w-full h-full",src:(re=s==null?void 0:s.processData)==null?void 0:re.img1,alt:"image1"})}):e.jsx("div",{className:"w-full h-full cursor-pointer",children:e.jsx(y,{setValue:n,id:1,onFileSelect:a=>N(a,1),...r("img1",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),D&&e.jsxs("svg",{className:"absolute top-0 right-0 mr-[2px] cursor-pointer",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:()=>S(!1),children:[e.jsx("circle",{cx:"10",cy:"10",r:"10",fill:"black","fill-opacity":"0.5"}),e.jsx("line",{x1:"14.3536",y1:"5.35355",x2:"5.35355",y2:"14.3536",stroke:"white"}),e.jsx("line",{y1:"-0.5",x2:"12.7279",y2:"-0.5",transform:"matrix(0.707107 0.707107 0.707107 -0.707107 6 5)",stroke:"white"})]})]}),e.jsxs("div",{className:"bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:[C?e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx("img",{className:"w-full h-full",src:(ie=s==null?void 0:s.processData)==null?void 0:ie.img2,alt:"image1"})}):e.jsx("div",{className:"w-full h-full cursor-pointer",children:e.jsx(y,{setValue:n,id:2,onFileSelect:a=>N(a,2),...r("img2",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),C&&e.jsxs("svg",{className:"absolute top-0 right-0 mr-[2px] cursor-pointer",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:()=>k(!1),children:[e.jsx("circle",{cx:"10",cy:"10",r:"10",fill:"black","fill-opacity":"0.5"}),e.jsx("line",{x1:"14.3536",y1:"5.35355",x2:"5.35355",y2:"14.3536",stroke:"white"}),e.jsx("line",{y1:"-0.5",x2:"12.7279",y2:"-0.5",transform:"matrix(0.707107 0.707107 0.707107 -0.707107 6 5)",stroke:"white"})]})]}),e.jsxs("div",{className:"bg-light relative col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:[q?e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx("img",{className:"w-full h-full",src:(ne=s==null?void 0:s.processData)==null?void 0:ne.img3,alt:"image1"})}):e.jsx("div",{className:"w-full h-full cursor-pointer",children:e.jsx(y,{setValue:n,id:3,onFileSelect:a=>N(a,3),...r("img3",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),q&&e.jsxs("svg",{className:"absolute top-0 right-0 mr-[2px] cursor-pointer",width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",onClick:()=>F(!1),children:[e.jsx("circle",{cx:"10",cy:"10",r:"10",fill:"black","fill-opacity":"0.5"}),e.jsx("line",{x1:"14.3536",y1:"5.35355",x2:"5.35355",y2:"14.3536",stroke:"white"}),e.jsx("line",{y1:"-0.5",x2:"12.7279",y2:"-0.5",transform:"matrix(0.707107 0.707107 0.707107 -0.707107 6 5)",stroke:"white"})]})]})]})]}),(c.img1||c.img2||c.img3)&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"3 つの画像フィールドはすべて必須です"})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex text-[#808080]",children:["工程説明",e.jsx("span",{className:" text-fifth ml-8",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 relative",children:[e.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",...r("process_explanation",{required:"プロセスの説明は必須です",onChange:()=>{$e(!1)}}),placeholder:`　記入例）〇〇製△△加工機です。\r
　　　　　普段は工作機械の部品加工に使用しており、...`}),c.process_explanation&&e.jsx("p",{className:"text-fifth",children:c.process_explanation.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex text-[#808080]",children:["能力",e.jsx("span",{className:" text-fifth ml-16",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 relative",children:[e.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",...r("capacity",{required:"容量が必要です",onChange:()=>{Re(!1)}}),placeholder:`　記入例）加工可能な製品サイズ 〇〇×〇〇×〇〇\r
　　　　　回転数〇〇rpm\r
　　　　　加工精度〇〇μ\r
　　　　　本設備には〇〇の加工が可能です。\r
`}),c.capacity&&e.jsx("p",{className:"text-fifth",children:c.capacity.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center text-[#808080]",children:["設備サイズ",e.jsx("span",{className:"ml-1 text-[#808080] "})]}),e.jsx("div",{className:"xs:col-span-12 md:col-span-9 relative",children:e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",...r("equipment_size",{onChange:()=>{Be(!1)}})})})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsx("label",{className:"xs:col-span-12 md:col-span-3 flex items-center text-[#808080]",children:"メーカー"}),e.jsx("div",{className:"xs:col-span-12 md:col-span-9 relative",children:e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",placeholder:"〇〇社製",...r("maker_name",{onChange:()=>{De(!1)}})})})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsx("label",{className:"xs:col-span-12 md:col-span-3  flex items-center text-[#808080]",children:"年式"}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-x-2",children:[e.jsx("div",{className:"col-span-5 flex items-center relative",children:e.jsx("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer",value:Pe,...r("years_type",{onChange:a=>{ke(!1),qe(parseInt(a.target.value))}}),children:ee.map(a=>e.jsx("option",{value:a,children:a},a))})}),e.jsx("div",{className:"col-span-7 flex items-center text-[#808080]",children:"年製"})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center text-[#808080]",children:["納期の目安",e.jsx("span",{className:" text-fifth ml-4",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-5 relative",children:[e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",placeholder:"　最短翌日～",...r("delivery_date",{required:"お届け日は必須です",onChange:()=>{Ae(!1)}})}),c.delivery_date&&e.jsx("p",{className:"text-fifth",children:c.delivery_date.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center text-[#808080]",children:["単価(税別)",e.jsx("span",{className:" text-fifth ml-5",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-5 relative",children:[e.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",placeholder:"テーブルサイズ〇〇×〇〇×〇〇",...r("unit_price",{required:"単価は必須です",onChange:()=>{Me(!1)}})}),c.unit_price&&e.jsx("p",{className:"text-fifth",children:c.unit_price.message})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center text-[#808080]",children:["カテゴリー",e.jsx("span",{className:" text-fifth ml-4",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2",children:[e.jsx("div",{className:"xs:col-span-12 md:col-span-5 lg:col-span-4 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",...r("parent_category",{required:"カテゴリは必須です",onChange:a=>as(a.target.value)}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"カテゴリー"}),Ke.map(a=>e.jsx("option",{className:"text-tertiary",value:a.category_id,children:a.category_name},a.category_id))]})}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-7 lg:col-span-6 grid grid-cols-12 gap-x-2",children:[e.jsx("label",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 flex items-center text-[#808080]",children:"サブカテゴリー"}),e.jsx("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-7 flex items-center relative",children:e.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1  cursor-pointer",value:J,...r("child_category",{onChange:a=>{K(a.target.value),ze(!1)}}),children:[e.jsx("option",{className:"text-tertiary",value:"",children:"サブカテゴリー"}),Ze.map(a=>e.jsx("option",{className:"text-tertiary",value:a.category_id,children:a.category_name},a.category_id))]})})]})]}),(c.parent_category||c.child_category)&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"カテゴリとサブカテゴリの両方が必要です"})]})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex text-[#808080]",children:["タグ",e.jsx("span",{className:" text-fifth ml-16",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9 ",children:[e.jsx("textarea",{value:j?(oe=s==null?void 0:s.processData)==null?void 0:oe.tags.join(","):Oe,...r("tags",{required:"工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)",onChange:a=>{Ue(!1),He(a.target.value)}}),className:"block h-[70px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 py-1 text-[#808080]",placeholder:"　レーザー,三次元,形鋼,パイプ,マザック"}),c.tags?e.jsxs("p",{className:"text-fifth",children:["※",c.tags.message]}):e.jsx("p",{className:"text-tertiary",children:"※工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)"})]})]}),e.jsx("div",{className:"col-span-12"}),e.jsx("div",{className:"col-span-12"}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 text-[#808080]",children:["空き状況",e.jsx("span",{className:"ml-1 text-fifth"})]}),e.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-y-4",children:[e.jsx("div",{className:"lg:col-span-8 xs:col-span-12",children:e.jsx(ms,{register:r,errors:c,setValue:n})}),e.jsx("div",{className:"lg:col-span-4 xs:col-span-12 flex justify-center items-center w-full ",children:e.jsxs("div",{className:"xs:grid xs:grid-cols-12 xs:gap-y-2 xs:gap-x-2 lg:flex lg:flex-col gap-2 lg:basis-3/4 text-white  w-full",children:[e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-fifth h-[36px] flex items-center justify-center gap-2",children:[e.jsx("svg",{className:"",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:e.jsx("circle",{cx:"7",cy:"7",r:"6",stroke:"white","stroke-width":"2"})}),e.jsx("p",{className:"",children:"空きあり"})]}),e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-[#FA0] h-[36px] flex items-center justify-center gap-5",children:[e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("rect",{x:"1",y:"1",width:"14",height:"14",stroke:"white","stroke-width":"2"})}),e.jsx("p",{children:"調整可能"})]}),e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-primary h-[36px] flex items-center justify-center gap-2",children:[e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 18 15",fill:"none",children:e.jsx("path",{d:"M9 2L15.9282 14H2.0718L9 2Z",stroke:"white","stroke-width":"2"})}),e.jsx("p",{children:"要相談"})]}),e.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-tertiary h-[36px] flex items-center justify-center gap-2",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 14 16",fill:"none",children:[e.jsx("path",{d:"M12.5118 1.00011L1.48817 15.0001",stroke:"white","stroke-width":"2"}),e.jsx("path",{d:"M1.48817 1.00011L12.5118 15.0001",stroke:"white","stroke-width":"2"})]}),e.jsx("p",{children:"空きなし"})]})]})})]})]}),e.jsx("div",{className:"col-span-12"}),e.jsx("div",{className:"col-span-12"}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex text-[#808080]",children:["備考",e.jsx("span",{className:"ml-1 text-fifth"})]}),e.jsx("div",{className:"xs:col-span-12 md:col-span-9 ",children:e.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 text-[#808080]",...r("remarks_column",{onChange:()=>{Je(!1)}})})})]}),e.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[e.jsxs("label",{className:"xs:col-span-5 flex items-center text-[#808080]",children:["公開ステータス",e.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),e.jsxs("div",{className:"xs:col-span-7 grid grid-cols-12",children:[e.jsxs("div",{className:"col-span-6 flex xs:justify-center md:justify-start items-center gap-1 text-[#808080]",children:[e.jsx("input",{className:"h-[16px] text-[#808080]",type:"radio",value:x?(de=s==null?void 0:s.processData)==null?void 0:de.status:p,onClick:()=>{W(!1),v("release")},...r("status"),checked:x?((xe=s==null?void 0:s.processData)==null?void 0:xe.status)==="release":p==="release"}),e.jsx("div",{children:"公開"})]}),e.jsxs("div",{className:"col-span-6 flex xs:justify-center md:justify-start  items-center gap-1 text-[#808080]",children:[e.jsx("input",{className:"h-[16px text-[#808080]",type:"radio",value:x?(pe=s==null?void 0:s.processData)==null?void 0:pe.status:p,onClick:()=>{W(!1),v("private")},...r("status"),checked:x?((me=s==null?void 0:s.processData)==null?void 0:me.status)==="private":p==="private"}),e.jsx("div",{children:"非公開"})]})]})]}),c.status&&e.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[e.jsx("div",{className:"xs:hidden md:block md:col-span-3"}),e.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:c.status.message})]})]}),e.jsxs("div",{className:"flex justify-center items-center xs:gap-2 md:gap-10 w-full h-[45px] my-[75px]",children:[e.jsx("button",{className:"xs:basis-1/2 md:basis-1/3 xl:basis-1/4 h-full bg-[#808080] text-white",onClick:()=>be("/admin/dashboard/process-management"),children:"戻る"}),e.jsx("button",{type:"submit",className:"xs:basis-1/2 md:basis-1/3 xl:basis-1/4 h-full bg-fourth text-white",disabled:se,children:se?"Loading...":"この内容で登録する"})]})]})})};export{Es as default};