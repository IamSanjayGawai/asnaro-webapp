import{d as v,r,a as b,f as y,j as e,S as w,C as E,u as C}from"./index-w2wx-x_X.js";import{u as S}from"./index.esm-aRdTVIgd.js";const T=({showContactModal:p,setShowContactModal:c,contactForm:l})=>{const d=v(),[x,o]=r.useState(!1),{loading:m}=b(y),t=async g=>{g.preventDefault(),o(!0);const a=new FormData;a.append("name",l.FullName),a.append("email",l.Email),a.append("company",l.CompanyName),a.append("phone",l.TelephoneNumber),a.append("subject",l.Title),a.append("message",l.Message),a.append("file",l.ContactFile);for(let i of a.entries())console.log(i[0]+", "+i[1]);await d(E(a))};return e.jsx(e.Fragment,{children:p?e.jsx("form",{onSubmit:t,children:e.jsx("div",{className:`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none\r
            bg-[#00000080]\r
            `,children:x?e.jsx("div",{className:"relative w-auto my-6 mx-auto max-w-3xl bg-white",children:e.jsxs("div",{className:"px-[180px] pt-[85px] pb-[105px]",children:[e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  text-center mb-[43px] font-bold text-[#255BB3]",children:"お問い合わせありがとうございます"}),e.jsx("p",{className:"text-tertiary mb-[43px]",children:"お問い合わせ内容を送信しました。追って担当者よりご連絡いたしますので、いましばらくお待ちください。"}),e.jsx("div",{className:"flex justify-center ",children:e.jsx("button",{type:"button",onClick:()=>c(!1),className:"bg-tertiary text-white w-[200px] py-2  font-[700] lg:text-[18px] xs:text-[14px] ",children:"戻る"})})]})}):e.jsx("div",{className:"relative  xs:w-4/4 sm:w-3/4  md:w-3/4   my-6 mx-auto max-w-3xl",children:e.jsxs("div",{className:"border-0  shadow-lg relative flex gap-5 flex-col  p-8 bg-white outline-none focus:outline-none ",children:[e.jsxs("div",{className:"grid grid-cols-24   ",children:[e.jsx("div",{className:"col-span-24 lg:text-[18px] xs:text-[14px]  text-center mb-[43px] font-bold text-[#255BB3]",children:"内容確認"}),e.jsxs("div",{className:"col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8  ",children:[e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white",children:"氏名"}),e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]",children:l.FullName})]}),e.jsxs("div",{className:"col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ",children:[e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white",children:"会社名"}),e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]",children:l.CompanyName})]}),e.jsxs("div",{className:"col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ",children:[e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white",children:"Email"}),e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-17 lg:col-span-18 flex flex-col justify-center xs:p-[16px]",children:e.jsx("div",{className:"text-[#808080]",children:l.Email})})]}),e.jsxs("div",{className:"col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ",children:[e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white",children:"電話番号"}),e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]",children:l.TelephoneNumber})]}),e.jsxs("div",{className:"col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ",children:[e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white",children:"タイトル"}),e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  text-[#808080] xs:col-span-17 lg:col-span-18 flex items-center xs:p-[16px]",children:l.Title})]}),e.jsxs("div",{className:"col-span-24 grid grid-cols-24 xs:gap-x-4 lg:gap-x-8 ",children:[e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-7 lg:col-span-6 p-2 flex justify-center items-center bg-primary text-white",children:"メッセージ"}),e.jsx("div",{className:"lg:text-[18px] xs:text-[14px]  xs:col-span-17 text-[#808080] lg:col-span-18 flex flex-wrap items-center break-all xs:p-[16px]",children:l.Message})]})]}),e.jsxs("div",{className:"mt-[50px] gap-4 flex justify-center items-center",children:[e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{type:"button",onClick:()=>c(!1),className:"bg-[#808080] text-white xs:w-[150px] md:w-[200px] w-[200px] font-[700] py-2  lg:text-[18px] xs:text-[14px] ",children:"戻る"})}),e.jsx("div",{className:"flex justify-center ",children:e.jsx("button",{type:"submit",className:"bg-[#FFAA00] text-white xs:w-[150px] md:w-[200px] w-[200px] py-2  font-[700] lg:text-[18px] xs:text-[14px] ",children:m?e.jsx("div",{className:"w-full justify-center items-center",children:e.jsx(w,{className:"h-full",contactSpinner:!0})}):"送信する"})})]})]})})})}):null})},q=()=>{const[p,c]=r.useState({FullName:"",CompanyName:"",Email:"",TelephoneNumber:"",Title:"",Message:"",ContactFile:null}),[l,d]=r.useState(null),{register:x,reset:o,handleSubmit:m,formState:{errors:t,isSubmitSuccessful:g}}=S(),[a,i]=r.useState(!1),[u,h]=r.useState(null),f=C();r.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})},[]);const N=s=>{const n={...s,ContactFile:l};c(n),console.log(n),i(!0),o()},j=()=>{f("/")};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex justify-center flex-col  items-center border-b border-secondary",children:e.jsxs("div",{className:"md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6 mb-[8em]",children:[e.jsx("h1",{className:"text-2xl  text-[#255BB3] font-bold  text-center my-[2em]",children:"お問い合わせ"}),e.jsx("form",{encType:"multipart/form-data",onSubmit:m(N),children:e.jsxs("div",{className:"sm:w-[80%] w-full mx-auto flex flex-col gap-4 ",children:[e.jsxs("div",{className:"grid grid-cols-[130px,auto] items-center   sm:gap-x-6",children:[e.jsx("h1",{className:"lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]",children:"氏名"}),e.jsx("input",{...x("FullName",{required:!0,validate:s=>s!=="null"}),className:"border border-[#E6E6E6]  outline-none p-2 w-4/5"}),t.FullName&&e.jsxs("span",{className:"text-red-500 col-start-2 row-start-2",children:[t.FullName.type!=="validate"&&"回答必須項目です",t.FullName.type==="validate"&&"Please provide a valid Name"]})]}),e.jsxs("div",{className:"grid grid-cols-[130px,auto] items-center   sm:gap-x-6",children:[e.jsx("h1",{className:"lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]",children:"会社名"}),e.jsx("input",{...x("CompanyName",{required:!0,validate:s=>s!=="null"}),type:"text",className:"border border-[#E6E6E6]  outline-none p-2 w-4/5"}),t.CompanyName&&e.jsxs("span",{className:"text-red-500 col-start-2 row-start-2",children:[t.CompanyName.type!=="validate"&&"回答必須項目です",t.CompanyName.type==="validate"&&"Please provide a valid CompanyName"]})]}),e.jsxs("div",{className:"grid grid-cols-[130px,auto] items-center   sm:gap-x-6",children:[e.jsx("h1",{className:"lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]",children:"メールアドレス"}),e.jsx("input",{...x("Email",{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,validate:s=>s!=="null"}),type:"email",className:"border border-[#E6E6E6]  outline-none p-2 w-4/5"}),t.Email&&e.jsxs("span",{className:"text-red-500 col-start-2 row-start-2",children:[t.Email.type!=="validate"&&"回答必須項目です",t.Email.type==="validate"&&"Please provide a valid Email"]})]}),e.jsxs("div",{className:"grid grid-cols-[130px,auto] items-center   sm:gap-x-6",children:[e.jsx("h1",{className:"lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]",children:"電話番号"}),e.jsx("input",{...x("TelephoneNumber",{required:!0,validate:s=>/^[0-9]+$/.test(s)&&s!=="null"||"Only numeric values are allowed"}),type:"text",className:"border border-[#E6E6E6]  outline-none p-2 w-4/5"}),t.TelephoneNumber&&e.jsx("span",{className:"text-red-500 col-start-2 row-start-2",children:t.TelephoneNumber.message})]}),e.jsxs("div",{className:"grid grid-cols-[130px,auto] items-center   sm:gap-x-6",children:[e.jsx("h1",{className:"lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]",children:"件名"}),e.jsx("input",{...x("Title",{required:!0,validate:s=>s!=="null"}),type:"text",className:"border border-[#E6E6E6]  outline-none p-2 w-4/5"}),t.Title&&e.jsxs("span",{className:"text-red-500 col-start-2 row-start-2",children:[t.Title.type!=="validate"&&"回答必須項目です",t.Title.type==="validate"&&"Please provide a valid Title"]})]}),e.jsxs("div",{className:"grid lg:grid-cols-[130px,auto] xs:grid-cols-[100px,auto] items-center sm:gap-x-6",children:[e.jsx("h1",{className:`${u?"lg:mb-0 xs:mb-5":"mb-0"} lg:text-[18px] xs:text-[14px] font-[500] text-[#808080] `,children:"添付ファイル"}),e.jsxs("div",{className:"flex lg:gap-4 xs:gap-1 xs:flex-col lg:flex-row items-center",children:[e.jsxs("label",{htmlFor:"fileInput",className:"cursor-pointer border lg:text-[18px] xs:text-[14px] font-[500] text-[#808080] p-2",children:["ファイルを選択する",e.jsx("input",{...x("ContactFile",{required:!0,validate:s=>s!==null}),onChange:s=>{if(s.target.files.length>0){const n=s.target.files[0];if(n.size>6*1024*1024){alert("ファイルサイズが6MBの制限を超えています");return}d(n),h(n.name)}},type:"file",id:"fileInput",className:"hidden",accept:".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,image/*"})]}),u&&e.jsx("span",{className:"  text-xs font-[500] text-[#808080]",children:u})]}),t.ContactFile&&e.jsxs("span",{className:"lg:ml-0 xs:ml-5 text-red-500 col-start-2 row-start-2",children:[t.ContactFile.type!=="validate"&&"回答必須項目です",t.ContactFile.type==="validate"&&"有効なファイルを指定してください"]})]}),e.jsxs("div",{className:"grid grid-cols-[130px,auto] items-start  sm:gap-6",children:[e.jsx("h1",{className:"lg:text-[18px] xs:text-[14px] font-[500] text-[#808080]",children:"メッセージ"}),e.jsx("textarea",{...x("Message",{required:!1}),className:"border border-[#E6E6E6]  outline-none p-2 w-4/5  resize-none h-[360px] "})]}),e.jsx("div",{className:"flex justify-center mt-5",children:e.jsx("button",{type:"submit",onClick:()=>i(!0),className:"bg-[#FFAA00] text-white px-[6em] py-2 w-[348px]  font-[700] lg:text-[18px] xs:text-[14px]",children:"送信する"})}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{type:"button",onClick:j,className:"bg-[#808080] text-white px-[3.5em] font-[700] py-2 w-[348px]  lg:text-[18px] xs:text-[14px]",children:"トップページに戻る"})})]})}),g&&e.jsx(T,{showContactModal:a,setShowContactModal:i,contactForm:p})]})})})};export{q as default};
