import{d as X,r as x,j as e,aC as Y,u as L,a as ee,ae as te,z as se,aD as le,S as ae}from"./index-w2wx-x_X.js";import{u as xe}from"./useTableTheme-44lDDVWp.js";import{K as ne}from"./baseline-5AKzli58.js";import{s as re}from"./statusSwitch-xdtmFXm-.js";import{R as oe}from"./index.esm-y_8cUbAG.js";import"./emotion-react.browser.esm-kI5PoqX3.js";import"./hoist-non-react-statics.cjs-j2Vrlo-h.js";import"./extends-_9I-EFOp.js";import"./assertThisInitialized-4q6YPdh3.js";import"./memoize-one.esm-oV5jpQgL.js";import"./setPrototypeOf-ahVgEFUp.js";import"./iconBase-7AsOp5YA.js";const ce=({isDeleteModal:f,setIsDeleteModal:p,id:h,show:b=!0})=>{const j=X(),[N]=x.useState(!0),o=w=>{j(Y(h)),console.log("Deleting selected IDs:",w)};return e.jsx(e.Fragment,{children:f?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none\r
            \r
            `,children:e.jsx("div",{className:"relative w-auto my-6 mx-auto max-w-3xl",children:e.jsxs("div",{className:"border-0  shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none",children:[e.jsx("div",{className:"flex items-start justify-between p-4  rounded-t",children:e.jsx("button",{className:"p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none",onClick:()=>{p(!1)},children:e.jsx(oe,{})})}),N?e.jsxs("div",{className:"relative px-4 gap-5 flex-auto ",children:[e.jsx("h3",{className:"mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[20px]",children:"本気ですか？ ×"}),e.jsx("p",{className:"text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-2/3 mt-[4em] mb-[3em] mx-auto",children:"この oredr 情報を削除してもよろしいですか? [適用] をクリックして続行するか、[キャンセル] をクリックして戻ります"})]}):e.jsxs("div",{className:"relative px-4 gap-5 flex-auto ",children:[e.jsx("h3",{className:"mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[20px]",children:"本気ですか？ ×"}),e.jsx("p",{className:"text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-2/3 mt-[4em] mb-[3em] mx-auto",children:"この oredr 情報を削除してもよろしいですか? [適用] をクリックして続行するか、[キャンセル] をクリックして戻ります"})]}),e.jsxs("div",{className:"grid grid-cols-1 justify-center p-4 w-2/3 mx-auto mb-8 ",children:[b&&e.jsx("button",{className:"bg-[#FFAA00] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px]  outline-none  mx-auto mb-2",type:"submit",onClick:()=>{o(h),p(!1)},children:"適用する"}),e.jsx("button",{className:"bg-[#808080] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px] mx-auto  outline-none mb-1",type:"button",onClick:()=>p(!1),children:"戻る"})]})]})})}),e.jsx("div",{className:"opacity-25 fixed inset-0 z-40 bg-black"})]}):null})},ie=["商談中","受発注待ち","納品待ち","検収中","差戻し","取引完了","キャンセル","決済完了"],de={transactionId:"",sellerId:"",sellerName:"",buyerId:"",buyerName:"",status:"ステータス",processName:"",startDate:"",endDate:"",pageSize:5},me="http://localhost:8000",ke=()=>{const f=L(),{loading:p,deleteTransactions:h}=ee(te),b=se(),j=xe("1fr 1.2fr 2fr 2fr 2fr 2fr 2fr",7),N=[{id:"",no:"",Ordering_company_ID:"",Order_company_ID:"",Process_name:"",Status:"",Period:""}],[o,w]=x.useState({nodes:N}),[y,M]=x.useState({}),[u,v]=x.useState([]),[z,I]=x.useState(!1),[_,P]=x.useState(""),[B,U]=x.useState(!0),[a,V]=x.useState(de),[O,F]=x.useState(""),[c,R]=x.useState(null),C=new URLSearchParams(b.search).get("page"),[g,$]=x.useState(C?parseInt(C):1),T=10,S=Math.max(1,(c==null?void 0:c.currentPage)-Math.floor(T/2)),k=Math.min(c==null?void 0:c.totalPages,S+T-1),q=Array.from({length:k-S+1},(t,s)=>S+s);x.useEffect(()=>{K()},[B,g,h]);const J=async()=>{try{const t=y==null?void 0:y.csvTransactions;if(!t||t.length===0){console.error("No partner IDs available for download.");return}const s=await fetch(`${me}/admin/download/csv`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({order_Ids:t,formType:"order_info"})});if(!s.ok)throw new Error("Network response was not ok.");const n=await s.blob(),m=window.URL.createObjectURL(n),i=document.createElement("a");i.href=m,i.setAttribute("download","order_info_list.csv"),document.body.appendChild(i),i.click()}catch(t){console.error("Error downloading CSV:",t)}},D=async t=>{g===1&&U(!B),$(t),f(`/admin/dashboard/order-management?page=${t}`)};console.log("currentPage",g);const r=t=>{const{name:s,value:n}=t.target;V({...a,[s]:n})},K=async()=>{var s,n,m,i,A,E;a.status==="ステータス"&&(a.status=""),console.log("searchData",a);const t=await le(a,C);if(console.log("response",t),t!=null&&t.data&&M(t),t!=null&&t.data&&((s=t==null?void 0:t.data)==null?void 0:s.length)===0){console.log("reached"),F("No data found");return}w({nodes:t!=null&&t.data&&((n=t==null?void 0:t.data)==null?void 0:n.length)>0?(m=t==null?void 0:t.data)==null?void 0:m.map(l=>({no:l==null?void 0:l._id,Ordering_company_ID:l==null?void 0:l.customer_id,Order_company_ID:l==null?void 0:l.seller_id,Process_name:l==null?void 0:l.process_name,Status:re(l==null?void 0:l.transaction_status),Period:new Date(l==null?void 0:l.createdAt).toISOString().split("T")[0]})):[]}),R({currentPage:(i=t==null?void 0:t.pagination)==null?void 0:i.currentPage,totalPages:(A=t==null?void 0:t.pagination)==null?void 0:A.totalPages,totalTransactions:(E=t==null?void 0:t.pagination)==null?void 0:E.totalTransactions})},Z=t=>{t.preventDefault(),F(""),D(1)},d=()=>{const t=L();return s=>{t("/admin/dashboard/order-management-detail/"+s)}},G=t=>{v(s=>{const n=s.includes(t)?s.filter(m=>m!==t):[...s,t];return console.log("Updated selected IDs:",n),n})},H=t=>{if(t.target.checked){const s=(o==null?void 0:o.nodes.map(n=>n.no))||[];v(s),console.log("Selected all IDs:",s)}else v([])},Q=()=>{if(u.length===0){P("削除する注文を少なくとも 1 つ選択してください");return}I(!0),P("")},W=[{label:e.jsx("input",{type:"checkbox",onChange:H,checked:u.length===((o==null?void 0:o.nodes.length)||0)}),key:"checkbox",renderCell:t=>e.jsx("input",{type:"checkbox",checked:u.includes(t.no),onChange:()=>G(t.no)})},{label:e.jsx("span",{className:"flex justify-center",children:"No"}),key:"no",renderCell:t=>{const s=d();return e.jsx("div",{onClick:()=>{s(t.no)},className:"text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center ",style:{whiteSpace:"normal"},children:t.no})}},{label:"発注企業ID",key:"Ordering_company_ID",renderCell:t=>{const s=d();return e.jsx("div",{onClick:()=>{s(t.no)},className:"text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center ",style:{whiteSpace:"normal"},children:t.Ordering_company_ID})}},{label:"受注企業ID",key:"Order_company_ID",renderCell:t=>{const s=d();return e.jsx("div",{onClick:()=>{s(t.no)},className:"text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center ",style:{whiteSpace:"normal"},children:t.Order_company_ID})}},{label:"工程名",key:"Process_name",renderCell:t=>{const s=d();return e.jsx("div",{onClick:()=>{s(t.no)},className:"text-[#808080] text-[12px] font-[400] line-clamp-1 text-center ",style:{whiteSpace:"normal"},children:t.Process_name})}},{label:"ステータス",key:"Status",renderCell:t=>{const s=d();return e.jsx("div",{onClick:()=>{s(t.no)},className:"text-[#808080] text-[12px] font-[400] line-clamp-1 text-center ",style:{whiteSpace:"normal"},children:t.Status})}},{label:e.jsx("span",{className:"flex justify-center",children:"期間"}),key:"Period",renderCell:t=>{const s=d();return e.jsx("div",{onClick:()=>{s(t.no)},className:"text-[#808080] text-[12px] font-[400] line-clamp-1 text-center",style:{whiteSpace:"normal"},children:t.Period})}}];return e.jsxs(e.Fragment,{children:[p?e.jsx(ae,{}):e.jsxs("div",{className:"w-full mb-40",children:[e.jsxs("form",{onSubmit:Z,className:"lg:mx-20 md:mx-8 xs:mx-8 flex  flex-col xs:mt-[24px] md:mt-[50px]",children:[e.jsx("h1",{className:"text-[#808080] font-[700] text-[24px] mb-4",children:"受発注管理"}),e.jsxs("div",{className:"w-full p-4 bg-[#F8F8F8] text-[#808080]",children:["検索条件設定",e.jsxs("div",{className:"xs:w-full sm:w-full md:w-[18rem] lg:w-[20rem] flex  flex-col justify-start",children:[e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"発注No"}),e.jsx("input",{type:"text",name:"transactionId",value:a.transactionId,onChange:r,className:"border lg:text-[14px] xs:text-[12px]  xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"発注企業ID"}),e.jsx("input",{type:"text",name:"buyerId",value:a.buyerId,onChange:r,className:"border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"発注企業名"}),e.jsx("input",{type:"text",name:"buyerName",value:a.buyerName,onChange:r,className:"border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"受注企業ID"}),e.jsx("input",{type:"text",name:"sellerId",value:a.sellerId,onChange:r,className:"border lg:text-[14px] xs:text-[12px] xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px]"})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"受注企業名"}),e.jsx("input",{type:"text",name:"sellerName",value:a.sellerName,onChange:r,className:"border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"})]}),e.jsxs("div",{className:" flex lg:flex-row  lg:items-center lg:justify-between  md:justify-between mt-5  text-[#808080] ",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"ステータス"}),e.jsxs("select",{name:"status",value:a.status,onChange:r,className:"text-tertiary lg:text-[14px] xs:text-[12px] h-[25px] border-[1px] border-[#DCDCDC] lg:px-10 xs:px-10px  outline-0  text-sm ml-[3.5rem]  lg:mr-4  ",placeholder:"鋳造",children:[e.jsx("option",{className:"text-tertiary",value:"none",children:"ステータス"}),ie.map((t,s)=>e.jsx("option",{value:t,children:t},s))]})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row  lg:items-center justify-between mt-5",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"工程名"}),e.jsx("input",{type:"text",name:"processName",value:a.processName,onChange:r,className:"border lg:text-[14px] xs:text-[12px] xs:mt-[5px]   lg:h-[30px] md:h-[30px] xs:h-[39px]"})]}),e.jsxs("div",{className:"flex lg:flex-row md:flex-row md:w-[25.6rem] lg:w-[25.6rem]  items-center justify-between mt-5 ",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"期間指定"}),e.jsxs("div",{className:"flex flex-row  items-center justify-around  gap-2",children:[e.jsx("input",{type:"date",name:"startDate",value:a.startDate,onChange:r,className:"border w-[8rem]  lg:h-[25px] md:h-[30px] xs:h-[30px]  text-[#808080]  lg:text-[14px] xs:text-[12px] p-2",lang:"ja"}),"~",e.jsx("input",{type:"date",name:"endDate",value:a.endDate,onChange:r,className:"border  w-[8rem]  lg:h-[25px] md:h-[30px] xs:h-[30px] text-[#808080]  lg:text-[14px] xs:text-[12px] p-2",lang:"ja"})]})]}),e.jsxs("div",{className:"flex xs:flex-row lg:flex-col lg:items-center justify-between mb-3 text-[#808080] lg:text-[14px] xs:text-[12px] mt-5",children:[e.jsxs("div",{className:"flex flex-row lg:w-full lg:gap-[4.7rem] xs:gap-3",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px] xs:mt-[5px]",children:"表示件数"}),e.jsxs("div",{className:"flex flex-row md:flex-row  items-center  ",children:[e.jsx("select",{name:"pageSize",value:a.pageSize,onChange:r,className:"text-tertiary border-[1px] h-[25px]   border-[#DCDCDC] lg:px-4 xs:px-1 outline-0  lg:text-[14px] xs:text-[12px]  bg-white  focus:ring-0  focus:border",placeholder:"鋳造",children:[1,5,10,15,20,25,30,35,40,45,50].map((t,s)=>e.jsx("option",{value:t,children:t},s))}),e.jsx("span",{className:"ml-2",children:" 件"})]})]}),e.jsx("div",{className:"lg:w-full flex justify-end items-center  lg:hidden  xs:block lg:mt-2  lg:text-[14px] xs:text-[12px] ",children:e.jsx("button",{type:"submit",className:"text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 l",children:"この条件で検索する"})})]})]}),e.jsx("div",{className:"lg:w-full  flex justify-center items-center ",children:e.jsx("button",{className:"text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 lg:mt-2  lg:text-[14px] xs:text-[12px]  xs:hidden  lg:block",children:"この条件で検索する"})})]})]}),e.jsxs("div",{className:"lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem] lg:min-w-[900px]",children:[e.jsx("span",{className:"text-center text-[red] lg:text-[14px] xs:text-[12px] break-all   lg:hidden sm:hidden md:hidden ",children:_}),e.jsx("div",{className:"flex items-center justify-between sm:block ",children:e.jsxs("div",{className:"flex justify-end gap-2 text-center",children:[e.jsx("span",{className:"text-center text-[red] lg:text-[14px] xs:text-[12px] break-all md:block  sm:block xs:hidden lg:block",children:_}),e.jsx("button",{onClick:()=>{Q()},className:"text-white bg-[#808080] px-5 py-1 lg:text-[14px] xs:text-[12px]",children:"消去"}),e.jsx("button",{onClick:()=>J(),className:"text-white bg-[#FFAA00] px-5 py-1 lg:text-[14px] xs:text-[12px] ",children:"CSV出力"})]})}),e.jsx("div",{className:"mt-4 border-[1px] border-[#E6E6E6] overflow-x-auto",children:O?"The search does not return any results":e.jsx(ne,{data:o,columns:W,theme:j,layout:{custom:!0,horizontalScroll:!0}})}),e.jsxs("div",{className:"col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]",children:[e.jsx("div",{className:"flex gap-1",children:!O&&q.map((t,s)=>e.jsx("button",{className:`border w-[25px] ${g===t?"bg-primary text-white":"bg-white"} border-[#DCDCDC]`,onClick:()=>D(t),children:t},s))}),k<(c==null?void 0:c.totalPages)&&e.jsxs("div",{className:"flex gap-1 items-center cursor-pointer",onClick:()=>D(k+1),children:[e.jsx("div",{className:"font-[500] text-primary text-[16px] w-full",children:"次ページ"}),e.jsx("svg",{className:"",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"18",viewBox:"0 0 16 18",fill:"none",children:e.jsx("path",{d:"M15.4318 9L0.138137 17.6603L0.138138 0.339745L15.4318 9Z",fill:"#255BB3"})})]})]})]})]}),e.jsx(ce,{isDeleteModal:z,setIsDeleteModal:I,id:u})]})};export{ke as default};