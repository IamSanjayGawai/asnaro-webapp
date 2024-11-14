import{u as X,d as ss,a as k,s as es,f as ls,R as r,D as as,K as cs,j as s,S as rs,m,M as is}from"./index-w2wx-x_X.js";import{D as u}from"./Dropzone-MJ6J4G2E.js";import{C as ts}from"./Calender-os5MV0Yd.js";import{u as ns}from"./index.esm-aRdTVIgd.js";import{B as h}from"./baseUrl-KJcG7PYP.js";import"./tslib.es6-8dbh_m2m.js";import"./dayjs.min-5rCsLmx2.js";import"./cn-hWSFJXCx.js";const js=()=>{var C;const F=X(),d=ss(),{process:o,appErr:g}=k(es),{other:x,partnerResponse:q,loading:R}=k(ls),[f,A]=r.useState(!1),[N,B]=r.useState(null),[v,D]=r.useState(null),[E,P]=r.useState(null),[I,L]=r.useState([]),[$,M]=r.useState([]),[b,w]=r.useState(""),[y,U]=r.useState(!1),[O,T]=r.useState([]),[Y,z]=r.useState([]),[J,H]=r.useState(2024);r.useEffect(()=>{d(as({})),d(cs(!0))},[d,q]),r.useEffect(()=>{(async()=>{try{const l=await m.get(`${h}/areas/states`);T(l==null?void 0:l.data)}catch(l){console.error("Error fetching categories:",l)}})()},[]),r.useEffect(()=>{(async()=>{try{const l=await m.get(`${h}/categories/all`);L(l.data)}catch(l){console.error("Error fetching categories:",l)}})()},[]),r.useEffect(()=>{c("availability")},[]),r.useEffect(()=>{(o==null?void 0:o.message)==="Process added successfully"&&y&&F("/dashboard/process-list")},[o,y,g]);let S=[];const K=new Date().getFullYear();for(let e=K;e>=1874;e--)S.push(e);const{register:c,handleSubmit:V,reset:Z,setValue:p,formState:{errors:a,isSubmitting:_}}=ns(),j=(e,l)=>{l===1?B(e):l===2?D(e):l===3&&P(e)},G=async e=>{try{const l=await m.get(`${h}/categories/subcategories/${e}`);console.log("Subcategories fetched:",l.data),M(l.data)}catch(l){console.error("Error fetching subcategories:",l)}},Q=async e=>{try{const l=await m.get(`${h}/areas/cities/${encodeURIComponent(e)}`);console.log("Cities fetched:",l.data),z(l.data)}catch(l){console.error("Error fetching cities:",l)}},W=async e=>{const l=e.tags.split(","),n={...e,tags:l},t=new FormData;Object.keys(n).forEach(i=>{i!=="img1"&&i!=="img2"&&i!=="img3"&&(i==="availability"||i==="tags"?t.append(i,JSON.stringify(n[i])):t.append(i,n[i]))}),N&&t.append("img1",N),v&&t.append("img2",v),E&&t.append("img3",E),console.log(n),await d(is(t));for(let i of t.entries())console.log(i[0]+", "+i[1]);console.log(n),U(!0),Z(),A(!0)};return s.jsx(s.Fragment,{children:R?s.jsx(rs,{}):x&&((C=x==null?void 0:x.user)!=null&&C.partner_flg)?s.jsx("div",{className:"px-[45px] xl:px-0 xl:pl-[50px] xl:pr-[70px] md:max-w-[800px] mx-auto w-full text-base text-tertiary",children:s.jsxs("form",{className:"form",encType:"multipart/form-data",onSubmit:V(W),id:"processForm",children:[s.jsxs("div",{className:"grid grid-cols-12 xs:gap-y-2 md:gap-y-3",children:[s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsx("p",{className:"xs:col-span-5 xs:flex xs:items-center md:col-span-3 text-[24px] text-primary font-bold",children:"工程登録"}),s.jsx("div",{className:"xs:col-span-7 md:col-span-9 flex items-center",children:s.jsx("span",{className:"text-[10px] text-fifth",children:"※は回答必須"})})]}),g&&s.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[s.jsx("div",{className:"xs:hidden md:block col-span-3"}),s.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:g})]}),s.jsx("div",{className:"xs:hidden md:block col-span-12"}),s.jsx("div",{className:"xs:hidden md:block col-span-12"}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:["工程名",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9",children:[s.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"工程名",...c("name",{required:"プロセス名は必須です",minLength:{value:3,message:"Process name must be at least 3 characters"}})}),a.name&&s.jsx("p",{className:"text-fifth",children:a.name.message})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:["地域",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2",children:[s.jsxs("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2",children:[s.jsx("label",{className:"col-span-4 md:col-span-5 flex items-center",children:"都道府県"}),s.jsx("div",{className:"col-span-8 md:col-span-7 flex items-center relative",children:s.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] text-tertiary placeholder-[#E6E6E6] px-1 cursor-pointer",...c("pref",{required:" 都道府県は必須です"}),onChange:e=>Q(e.target.value),children:[s.jsx("option",{className:"text-tertiary",value:"",children:"都道府県"}),O.map(e=>s.jsx("option",{value:e,children:e},e))]})})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 grid grid-cols-12 gap-x-2",children:[s.jsx("label",{className:"col-span-4 md:col-span-5 flex items-center",children:"市区町村"}),s.jsx("div",{className:"col-span-8 md:col-span-7 flex items-center relative",children:s.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer",...c("mun",{required:"市区町村は必須です"}),children:[s.jsx("option",{className:"text-tertiary",value:"",children:"市町村"}),Y.map(e=>s.jsx("option",{value:e,children:e},e))]})})]})]}),(a.pref||a.mun)&&s.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[s.jsx("div",{className:"xs:hidden md:block col-span-3"}),s.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"都道府県と市区町村の両方が必要です"})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12 ",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3",children:["工程画像",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 xs:gap-x-2 grid grid-cols-12 md:col-span-9 md:gap-x-3",children:[s.jsx("div",{className:"bg-light cursor-pointer col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:s.jsx(u,{setValue:p,id:1,onFileSelect:e=>j(e,1),isReset:f,...c("img1",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),s.jsx("div",{className:"bg-light cursor-pointer col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:s.jsx(u,{setValue:p,id:2,onFileSelect:e=>j(e,2),isReset:f,...c("img2",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})}),s.jsx("div",{className:"bg-light cursor-pointer col-span-4 flex justify-center items-center w-full border border-secondary xs:h-[116px] md:h-[140px]",children:s.jsx(u,{setValue:p,id:3,onFileSelect:e=>j(e,3),isReset:f,...c("img3",{required:"   3 つの画像フィールドはすべて必須です"}),isProcess:!0})})]})]}),(a.img1||a.img2||a.img2)&&s.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[s.jsx("div",{className:"xs:hidden md:block col-span-3"}),s.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"3 つの画像フィールドはすべて必須です"})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["工程説明",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9 ",children:[s.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",...c("process_explanation",{required:"プロセスの説明は必須です"}),placeholder:`記入例）〇〇製△△加工機です。\r
　　　　　普段は工作機械の部品加工に使用しており、...`}),a.process_explanation&&s.jsx("p",{className:"text-fifth",children:a.process_explanation.message})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["能力",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9 ",children:[s.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",...c("capacity",{required:"容量が必要です"}),placeholder:`記入例）加工可能な製品サイズ 〇〇×〇〇×〇〇\r
　　　　　回転数〇〇rpm\r
　　　　　加工精度〇〇μ\r
　　　　　本設備には〇〇の加工が可能です。\r
`}),a.capacity&&s.jsx("p",{className:"text-fifth",children:a.capacity.message})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:["設備サイズ",s.jsx("span",{className:"ml-1 text-fifth"})]}),s.jsx("div",{className:"xs:col-span-12 md:col-span-9 ",children:s.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"テーブルサイズ〇〇×〇〇×〇〇",...c("equipment_size",{})})})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsx("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:"メーカー"}),s.jsx("div",{className:"xs:col-span-12 md:col-span-9",children:s.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"〇〇社製",...c("maker_name")})})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsx("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:"年式"}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-x-2",children:[s.jsx("div",{className:"col-span-5 flex items-center relative",children:s.jsx("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer",...c("years_type"),value:J,onChange:e=>H(parseInt(e.target.value)),children:S.map(e=>s.jsx("option",{value:e,children:e},e))})}),s.jsx("div",{className:"col-span-7 flex items-center",children:"年製"})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:["納期の目安",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-5 ",children:[s.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"最短翌日～",...c("delivery_date",{required:"お届け日は必須です"})}),a.delivery_date&&s.jsx("p",{className:"text-fifth",children:a.delivery_date.message})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3  flex items-center",children:["単価(税別)",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-5 ",children:[s.jsx("input",{type:"text",className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"テーブルサイズ〇〇×〇〇×〇〇",...c("unit_price",{required:"単価は必須です"})}),a.unit_price&&s.jsx("p",{className:"text-fifth",children:a.unit_price.message})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex items-center",children:["カテゴリー",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 xs:gap-y-2 gap-x-2",children:[s.jsx("div",{className:"xs:col-span-12 md:col-span-5 lg:col-span-4 flex items-center relative",children:s.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer",...c("parent_category",{required:"カテゴリは必須です"}),onChange:e=>G(e.target.value),children:[s.jsx("option",{className:"text-tertiary",value:"",children:"カテゴリー"}),I.map(e=>s.jsx("option",{className:"text-tertiary",value:e==null?void 0:e.category_id,children:e==null?void 0:e.category_name},e.category_id))]})}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-7 lg:col-span-6 grid grid-cols-12 gap-x-2",children:[s.jsx("label",{className:"xs:col-span-12 md:col-span-6 lg:col-span-5 flex items-center",children:"サブカテゴリー"}),s.jsx("div",{className:"xs:col-span-12 md:col-span-6 lg:col-span-7 flex items-center relative",children:s.jsxs("select",{className:"h-[36px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] text-tertiary px-1 cursor-pointer",...c("child_category"),children:[s.jsx("option",{className:"text-tertiary",value:"",children:"サブカテゴリー"}),$.map(e=>s.jsx("option",{className:"text-tertiary",value:e==null?void 0:e.category_id,children:e==null?void 0:e.category_name},e==null?void 0:e.category_id))]})})]})]}),(a.parent_category||a.child_category)&&s.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[s.jsx("div",{className:"xs:hidden md:block col-span-3"}),s.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:"カテゴリとサブカテゴリの両方が必要です"})]})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["タグ",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9 ",children:[s.jsx("textarea",{...c("tags",{required:"工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)"}),className:"block h-[70px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1 py-1",placeholder:"レーザー,三次元,形鋼,パイプ,マザック"}),a.tags?s.jsxs("p",{className:"text-fifth",children:["※",a.tags.message]}):s.jsx("p",{className:"text-tertiary",children:"※工程に関連するキーワードをカンマ(,)で区切ってご登録ください(最大80字)"})]})]}),s.jsx("div",{className:"col-span-12"}),s.jsx("div",{className:"col-span-12"}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 ",children:["空き状況",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-12 md:col-span-9  grid grid-cols-12 gap-y-4",children:[s.jsxs("div",{className:"lg:col-span-8 xs:col-span-12",children:[s.jsx(ts,{register:c,errors:a,setValue:p}),s.jsx("span",{className:"w-[100%]  text-[red] ",children:"※   最大3ヶ月まで登録可能です。"})]}),s.jsx("div",{className:"lg:col-span-4 xs:col-span-12 flex justify-center items-center w-full ",children:s.jsxs("div",{className:"xs:grid xs:grid-cols-12 xs:gap-y-2 xs:gap-x-2 lg:flex lg:flex-col gap-2 lg:basis-3/4 text-white  w-full",children:[s.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-fifth h-[36px] flex items-center justify-center gap-2",children:[s.jsx("svg",{className:"",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",children:s.jsx("circle",{cx:"7",cy:"7",r:"6",stroke:"white","stroke-width":"2"})}),s.jsx("p",{className:"",children:"空きあり"})]}),s.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-[#FA0] h-[36px] flex items-center justify-center gap-5",children:[s.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:s.jsx("rect",{x:"1",y:"1",width:"14",height:"14",stroke:"white","stroke-width":"2"})}),s.jsx("p",{children:"調整可能"})]}),s.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-primary h-[36px] flex items-center justify-center gap-2",children:[s.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 18 15",fill:"none",children:s.jsx("path",{d:"M9 2L15.9282 14H2.0718L9 2Z",stroke:"white","stroke-width":"2"})}),s.jsx("p",{children:"要相談"})]}),s.jsxs("div",{className:"xs:col-span-6 lg:w-full bg-tertiary h-[36px] flex items-center justify-center gap-2",children:[s.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 14 16",fill:"none",children:[s.jsx("path",{d:"M12.5118 1.00011L1.48817 15.0001",stroke:"white","stroke-width":"2"}),s.jsx("path",{d:"M1.48817 1.00011L12.5118 15.0001",stroke:"white","stroke-width":"2"})]}),s.jsx("p",{children:"空きなし"})]})]})})]})]}),s.jsx("div",{className:"col-span-12"}),s.jsx("div",{className:"col-span-12"}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-12 md:col-span-3 flex",children:["備考",s.jsx("span",{className:"ml-1 text-fifth"})]}),s.jsx("div",{className:"xs:col-span-12 md:col-span-9 ",children:s.jsx("textarea",{className:"block h-[126px] w-full outline-none border border-[#E6E6E6] placeholder-[#E6E6E6] px-1",placeholder:"備考",...c("remarks_column",{})})})]}),s.jsxs("div",{className:"col-span-12 grid grid-cols-12",children:[s.jsxs("label",{className:"xs:col-span-5 flex items-center",children:["公開ステータス",s.jsx("span",{className:"ml-1 text-fifth",children:"※"})]}),s.jsxs("div",{className:"xs:col-span-7 grid grid-cols-12",children:[s.jsxs("div",{className:"col-span-6 flex xs:justify-center md:justify-start items-center gap-1",children:[s.jsx("input",{className:"h-[16px]",type:"radio",value:b,onClick:()=>w("release"),...c("status",{validate:e=>e==="release"||e==="private"?!0:"Required"})}),s.jsx("div",{children:"公開"})]}),s.jsxs("div",{className:"col-span-6 flex xs:justify-center md:justify-start  items-center gap-1",children:[s.jsx("input",{className:"h-[16px]",type:"radio",value:b,onClick:()=>w("private"),...c("status",{validate:e=>e==="release"||e==="private"?!0:"公開ステータスを選択してください"})}),s.jsx("div",{children:"非公開"})]})]})]}),a.status&&s.jsxs("div",{className:"text-fifth grid grid-cols-12 col-span-12",children:[s.jsx("div",{className:"xs:hidden md:block md:col-span-3"}),s.jsx("p",{className:"xs:col-span-12 md:col-span-9",children:a.status.message})]})]}),s.jsx("div",{className:"flex justify-center items-center xs:gap-2 md:gap-10 w-full h-[45px] my-[75px]",children:s.jsx("button",{type:"submit",className:"xs:basis-1/2 md:basis-1/3 xl:basis-1/4 h-full bg-fourth text-white",disabled:_,children:_?"Loading...":"この内容で登録する"})})]})}):s.jsx("div",{className:"flex justify-center xs:gap-2 md:gap-10 w-full h-screen my-[75px]",children:"Become a partner to view this page"})})};export{js as default};