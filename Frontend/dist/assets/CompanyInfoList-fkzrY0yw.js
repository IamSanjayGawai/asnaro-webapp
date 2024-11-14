import{d as Z,r as n,j as e,aA as fe,a as ge,ae as ue,z as be,u as je,S as we,aB as Ne}from"./index-w2wx-x_X.js";import{K as ye}from"./baseline-5AKzli58.js";import{u as ve}from"./useTableTheme-44lDDVWp.js";import{R as _e}from"./index.esm-y_8cUbAG.js";import"./emotion-react.browser.esm-kI5PoqX3.js";import"./hoist-non-react-statics.cjs-j2Vrlo-h.js";import"./extends-_9I-EFOp.js";import"./assertThisInitialized-4q6YPdh3.js";import"./memoize-one.esm-oV5jpQgL.js";import"./setPrototypeOf-ahVgEFUp.js";import"./iconBase-7AsOp5YA.js";const ke=({isDeleteModal:s,setIsDeleteModal:i,id:d,show:m=!0})=>{const g=Z(),[I]=n.useState(!0),p=x=>{g(fe(d)),console.log("Deleting selected IDs:",x)};return e.jsx(e.Fragment,{children:s?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none\r
            \r
            `,children:e.jsx("div",{className:"relative w-auto my-6 mx-auto max-w-3xl",children:e.jsxs("div",{className:"border-0  shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none",children:[e.jsx("div",{className:"flex items-start justify-between p-4  rounded-t",children:e.jsx("button",{className:"p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none",onClick:()=>{i(!1)},children:e.jsx(_e,{})})}),I?e.jsxs("div",{className:"relative px-4 gap-5 flex-auto ",children:[e.jsx("h3",{className:"mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[20px]",children:"本気ですか？ ×"}),e.jsx("p",{className:"text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-2/3 mt-[4em] mb-[3em] mx-auto",children:"この会社情報を削除してもよろしいですか? [適用] をクリックして続行するか、[キャンセル] をクリックして戻ります"})]}):e.jsxs("div",{className:"relative px-4 gap-5 flex-auto ",children:[e.jsx("h3",{className:"mb-6 text-[#255BB3] text-center font-noto-sans-jp font-bold text-[20px]",children:"本気ですか？ ×"}),e.jsx("p",{className:"text-[#808080] text-sm font-noto-sans-jp px-8 text-base font-[500]  w-2/3 mt-[4em] mb-[3em] mx-auto",children:"この会社情報を削除してもよろしいですか? [適用] をクリックして続行するか、[キャンセル] をクリックして戻ります"})]}),e.jsxs("div",{className:"grid grid-cols-1 justify-center p-4 w-2/3 mx-auto mb-8 ",children:[m&&e.jsx("button",{className:"bg-[#FFAA00] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px]  outline-none  mx-auto mb-2",type:"submit",onClick:()=>{p(d),i(!1)},children:"適用する"}),e.jsx("button",{className:"bg-[#808080] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px] mx-auto  outline-none mb-1",type:"button",onClick:()=>i(!1),children:"戻る"})]})]})})}),e.jsx("div",{className:"opacity-25 fixed inset-0 z-40 bg-black"})]}):null})},Se="http://localhost:8000",Me=()=>{var M,O,z,V,q;const{searchCompanyData:s,loading:i,deleteUsers:d}=ge(ue),m=Z(),g=be(),p=new URLSearchParams(g.search).get("page"),[x,A]=n.useState(p?parseInt(p):1),[u,B]=n.useState(""),[b,J]=n.useState(""),[j,K]=n.useState(""),[w,G]=n.useState(""),[N,H]=n.useState(""),[y,E]=n.useState(""),[v,Q]=n.useState(5),W=ve("1fr 2fr  2fr 3fr 3fr 3fr",6),[P,c]=n.useState(""),[h,_]=n.useState([]),[X,F]=n.useState(!1),[L,$]=n.useState(""),Y=t=>{const{value:l}=t.target;/^[a-zA-Z0-9]+$/.test(l)?(B(l),c("")):(c("半角英数字で入力してください"),B(l),l===""&&c(""))},D=t=>J(t.target.value),ee=t=>K(t.target.value),te=t=>G(t.target.value),se=t=>H(t.target.value),le=t=>{const{value:l}=t.target;/^\d{0,10}$/.test(l)?(E(l),c("")):(c("無効な電話番号"),E(l))},ne=t=>{Q(parseInt(t.target.value))},T=(t,l,a=!1)=>{const r={company_Id:u,company_name:b,representative_name:j,person_incharge_name:w,email:N,phone:y,currentPage:t,limit:l};a&&A(1),m(Ne(r))},k=t=>{t.preventDefault(),S(1),c(""),T(1,v,!0)};n.useEffect(()=>{T(x,v)},[m,x,d]);const S=async t=>{A(t),o(`/admin/dashboard/company-information?page=${t}`)},o=je(),R=10,U=(M=s==null?void 0:s.pagination)==null?void 0:M.totalPages,C=Math.max(1,x-Math.floor(R/2)),ae=Math.min(U,C+R-1),xe=Array.from({length:ae-C+1},(t,l)=>C+l),oe=async()=>{var t;try{const l=(t=s==null?void 0:s.csvUsers)==null?void 0:t.map(he=>he._id);if(!l||l.length===0){console.log("No partner IDs available for download.");return}const a=await fetch(`${Se}/admin/download/csv`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({company_infoIds:l,formType:"company_info"})});if(!a.ok)throw new Error("Network response was not ok.");const r=await a.blob(),pe=window.URL.createObjectURL(r),f=document.createElement("a");f.href=pe,f.setAttribute("download","company_info_list.csv"),document.body.appendChild(f),f.click()}catch(l){console.error("Error downloading CSV:",l)}},ce={nodes:((s==null?void 0:s.data)||[]).map(t=>({company_id:t._id,company_name:t.name01,company_createdAt:t.createdAt?new Date(t.createdAt).toISOString().split("T")[0]:"",representative_name:t.delegate_name01,person_incharge_name:t.charge_name01}))},ie=t=>{_(l=>{const a=l.includes(t)?l.filter(r=>r!==t):[...l,t];return console.log("Updated selected IDs:",a),a})},re=t=>{if(t.target.checked){const l=(s==null?void 0:s.data.map(a=>a._id))||[];_(l),console.log("Selected all IDs:",l)}else _([])},de=()=>{if(h.length===0){$("削除する会社を少なくとも 1 つ選択してください。");return}F(!0),$("")},me=[{label:e.jsx("input",{type:"checkbox",onChange:re,checked:h.length===(((O=s==null?void 0:s.data)==null?void 0:O.length)||0)}),key:"checkbox",renderCell:t=>e.jsx("input",{type:"checkbox",checked:h.includes(t.company_id),onChange:()=>ie(t.company_id)})},{label:e.jsx("span",{className:"flex justify-center",children:"企業ID"}),key:"company_id",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[12px] font-[400] line-clamp-3 text-center",style:{whiteSpace:"normal"},onClick:()=>o(`/admin/dashboard/company-information-detail/${t.company_id}`),children:t.company_id})},{label:"企業名",key:"company_name",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[12px] font-[400] line-clamp-3 text-center",style:{whiteSpace:"normal"},onClick:()=>o(`/admin/dashboard/company-information-detail/${t.company_id}`),children:t.company_name})},{label:"登録日時",key:"company_createdAt",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[12px] font-[400] line-clamp-3 text-center",style:{whiteSpace:"normal"},onClick:()=>o(`/admin/dashboard/company-information-detail/${t.company_id}`),children:t.company_createdAt})},{label:"代表者名",key:"representative_name",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[12px] font-[400] line-clamp-3 text-center",style:{whiteSpace:"normal"},onClick:()=>o(`/admin/dashboard/company-information-detail/${t.company_id}`),children:t.representative_name})},{label:e.jsx("span",{className:"flex justify-center",children:"担当者名"}),key:"person_incharge_name",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[12px] font-[400] line-clamp-1 text-center ",style:{whiteSpace:"normal"},onClick:()=>o(`/admin/dashboard/company-information-detail/${t.company_id}`),children:t.person_incharge_name})}];return e.jsxs(e.Fragment,{children:[i?e.jsx(we,{}):e.jsxs("div",{className:"mb-40",children:[e.jsxs("form",{onSubmit:k,className:"lg:mx-20 md:mx-8 xs:mx-8 flex flex-col xs:mt-[24px] md:mt-[50px]",children:[e.jsx("h1",{className:"text-[#808080] font-[700] text-[24px] mb-4",children:"企業情報一覧"}),e.jsxs("div",{className:"w-full p-4 bg-[#F8F8F8] text-[#808080]",children:["検索条件設定",e.jsxs("div",{className:"xs:w-full sm:w-full md:w-[23rem] lg:w-[23rem] flex flex-col justify-start gap-3",children:[e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-5 ",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"企業ID"}),e.jsx("input",{type:"text",className:"border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]",value:u,onChange:Y})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2 ",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"企業名"}),e.jsx("input",{type:"text",className:"border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]",value:b,onChange:D})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"代表者名"}),e.jsx("input",{type:"text",className:"border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]",value:j,onChange:ee})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"担当者名"}),e.jsx("input",{type:"text",className:"border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]",value:w,onChange:te})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"メールアドレス"}),e.jsx("input",{type:"text",className:"border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]",value:N,onChange:se})]}),e.jsxs("div",{className:"flex lg:flex-row xs:flex-col md:flex-row lg:items-center justify-between mt-2",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px]",children:"電話番号"}),e.jsx("input",{type:"text",className:"border xs:mt-[5px] lg:h-[30px] md:h-[30px] xs:h-[39px] px-2 text-[#808080]",value:y,onChange:le})]}),e.jsxs("div",{className:"flex xs:flex-row lg:flex-col lg:items-center justify-between mt-2 mb-3 text-[#808080] lg:text-[14px] xs:text-[12px]",children:[e.jsxs("div",{className:"flex flex-row lg:w-full lg:gap-20 xs:gap-3",children:[e.jsx("label",{className:"text-[#808080] lg:text-[14px] xs:text-[12px] xs:mt-[5px]",children:"表示件数"}),e.jsxs("div",{className:"flex flex-row md:flex-row items-center",children:[e.jsx("select",{id:"first_name",className:"text-tertiary border-[1px] h-[25px] border-[#DCDCDC] lg:px-4 xs:px-1 outline-0 lg:text-[14px] xs:text-[12px] bg-white focus:ring-0 focus:border",placeholder:"鋳造",value:v,onChange:ne,children:[1,5,10,15,20,25,30,35,40,45,50].map((t,l)=>e.jsx("option",{value:t,children:t},l))}),e.jsx("span",{className:"ml-2",children:" 件"})]})]}),e.jsx("div",{className:"lg:w-full flex justify-end items-center lg:hidden xs:block lg:mt-2 lg:text-[14px] xs:text-[12px]",children:e.jsx("button",{className:"text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 l",type:"submit",onClick:k,children:"この条件で検索する"})})]}),P&&e.jsx("p",{className:"text-fifth",children:P})]}),e.jsx("div",{className:"lg:w-full flex justify-center items-center",children:e.jsx("button",{className:"text-white bg-[#255BB3] lg:px-10 xs:px-2 py-1 lg:mt-2 lg:text-[14px] xs:text-[12px] xs:hidden lg:block",type:"submit",onClick:k,children:"この条件で検索する"})})]})]}),e.jsxs("div",{className:"lg:mx-20 md:mx-8 xs:mx-8 mt-[3rem] lg:min-w-[900px]   ",children:[e.jsx("span",{className:"text-center text-[red] lg:text-[14px] xs:text-[12px] break-all   lg:hidden sm:hidden md:hidden ",children:L}),e.jsx("div",{className:"flex items-center justify-between sm:block ",children:e.jsxs("div",{className:"flex justify-end gap-2 text-center",children:[e.jsx("span",{className:"text-center text-[red] lg:text-[14px] xs:text-[12px] break-all md:block  sm:block xs:hidden lg:block",children:L}),e.jsx("button",{onClick:()=>{de()},className:"text-white bg-[#808080] px-5 py-1 lg:text-[14px] xs:text-[12px]",children:"消去"}),e.jsx("button",{onClick:()=>o("/admin/dashboard/member-registration"),className:"text-white bg-[#255BB3] px-5 py-1 lg:text-[14px] xs:text-[12px]",children:"新規登録"}),e.jsx("button",{onClick:oe,className:"text-white bg-[#FFAA00] px-5 py-1 lg:text-[14px] xs:text-[12px]",children:"CSV出力"})]})}),e.jsx("div",{className:`mt-4  overflow-x-auto  ${s&&(s!=null&&s.data)&&((z=s==null?void 0:s.data)==null?void 0:z.length)===0?"flex justify-center items-center":"border-[1px] border-[#E6E6E6]"}`,children:s&&(s!=null&&s.data)&&((V=s==null?void 0:s.data)==null?void 0:V.length)===0?`${u||b||j||w||N||y}」に一致する結果はありません。別のキーワードをお試しください`:e.jsx(ye,{data:ce,columns:me,theme:W,layout:{custom:!0,horizontalScroll:!0}})}),e.jsxs("div",{className:"col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]",children:[e.jsx("div",{className:"flex gap-1",children:s&&(s==null?void 0:s.data)&&((q=s==null?void 0:s.data)==null?void 0:q.length)!==0&&xe.map((t,l)=>e.jsx("button",{className:`border w-[25px] lg:text-[14px] xs:text-[12px] ${x===t?"bg-primary text-white":"bg-white"} border-[#DCDCDC]`,onClick:()=>S(t),children:t},l))}),x<U&&e.jsxs("div",{className:"flex gap-1 items-center cursor-pointer",onClick:()=>S(x+1),children:[e.jsx("div",{className:"font-[500] text-primary text-[16px] w-full",children:"次ページ"}),e.jsx("svg",{className:"",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"18",viewBox:"0 0 16 18",fill:"none",children:e.jsx("path",{d:"M15.4318 9L0.138137 17.6603L0.138138 0.339745L15.4318 9Z",fill:"#255BB3"})})]})]})]})]}),e.jsx(ke,{isDeleteModal:X,setIsDeleteModal:F,id:h})]})};export{Me as default};