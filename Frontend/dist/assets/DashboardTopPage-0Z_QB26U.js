import{d as y,a as f,f as _,r as d,j as e,A as B,S as w,u as F,B as L,D as T,E as D,F as R,T as N}from"./index-w2wx-x_X.js";import{R as M}from"./index.esm-y_8cUbAG.js";import{r as U,l as z,K as g}from"./baseline-5AKzli58.js";import{o as b}from"./status-transaction-jP2MLjuh.js";import"./iconBase-7AsOp5YA.js";import"./emotion-react.browser.esm-kI5PoqX3.js";import"./hoist-non-react-statics.cjs-j2Vrlo-h.js";import"./extends-_9I-EFOp.js";import"./assertThisInitialized-4q6YPdh3.js";import"./memoize-one.esm-oV5jpQgL.js";import"./setPrototypeOf-ahVgEFUp.js";const C=({showModal:a,setShowModal:n,show:l=!0,confirmationMessage:x,headerMessage:c})=>{const m=y(),{otherLoading:o}=f(_),[r,i]=d.useState(!1);return e.jsx(e.Fragment,{children:a?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none\r
            \r
            `,children:e.jsx("div",{className:"relative w-auto my-6 mx-auto max-w-3xl",children:e.jsxs("div",{className:"border-0  shadow-lg relative flex gap-5 flex-col w-full bg-white outline-none focus:outline-none",children:[e.jsx("div",{className:"flex items-start justify-between p-4  rounded-t",children:e.jsx("button",{className:"p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none",onClick:()=>n(!1),children:e.jsx(M,{})})}),r?e.jsxs("div",{className:"relative px-4 gap-5 flex-auto ",children:[e.jsx("h3",{className:"mb-6 text-[#808080] text-center font-noto-sans-jp font-bold text-[20px]",children:c||"パートナー申請を受け付けました"}),e.jsx("p",{className:"text-[#808080] text-sm font-noto-sans-jp xs:px-2 lg:px-10 text-base font-[500]  w-full mt-[4em] mb-[3em] mx-auto ",children:x||e.jsxs("div",{className:"-full   lg:px-[8rem]  xs:px-[2rem]",children:[e.jsx("p",{className:"lg:text-[14px] xs:text-[12px]  text-[#808080]",children:"パートナー申請を受け付けました"}),e.jsx("p",{className:"lg:text-[14px] xs:text-[12px]  text-[#808080]",children:"事務局による審査を行いますので、今しばらくお待ちください"})]})})]}):e.jsxs("div",{className:"relative px-4 gap-5 flex-auto ",children:[e.jsx("h3",{className:"mb-6 text-[#808080] text-center font-noto-sans-jp font-bold text-[20px]",children:"パートナー申請をしてください"}),e.jsxs("div",{className:" w-full   lg:px-[8rem]  xs:px-[2rem]",children:[e.jsx("p",{className:"lg:text-[14px] xs:text-[12px] text-[#808080]",children:"工程を登録するには、パートナー登録をする必要があります"}),e.jsx("p",{className:"lg:text-[14px] xs:text-[12px] text-[#808080]",children:"下記ボタンから、パートナー申請をお願いいたします"})]})]}),e.jsxs("div",{className:"grid grid-cols-1 justify-center p-4 w-full mx-auto mb-8 ",children:[!r&&l&&e.jsx("button",{className:"bg-[#FFAA00] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px]  outline-none  mx-auto mb-2",type:"submit",onClick:p=>{p.preventDefault(),i(!0),m(B())},children:o?e.jsx(w,{className:"w-full h-full"}):"パートナー申請をする"}),e.jsx("button",{className:"bg-[#808080] text-white  font-bold uppercase text-sm px-6 py-3 w-[348px] mx-auto  outline-none mb-1",type:"button",onClick:()=>n(!1),children:"戻る"})]})]})})}),e.jsx("div",{className:"opacity-25 fixed inset-0 z-40 bg-black"})]}):null})},v=({data:a,partner_flag:n})=>{const[l,x]=d.useState(!1);return e.jsxs("div",{className:"lg:p-4 xs:p-2 mt-4 border-[1px] border-[#E6E6E6] grid grid-cols-2 sm:grid-cols-3 sm:gap-10 gap-5 bg-[#f2f1f1] text-center",children:[n?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"p-4 bg-[#fff] border-[#E6E6E6]",children:[e.jsx("h1",{className:"text-[#808080] font-[500] text-[16px]",children:a.val_1.name}),e.jsxs("h1",{className:"text-[#255BB3] font-[700] text-[32px]",children:[a.val_1.value,e.jsx("span",{className:"text-[16px] font-[700] ml-2",children:"円"})]})]}),e.jsxs("div",{className:"p-4 bg-[#fff] border-[#E6E6E6]",children:[e.jsx("h1",{className:"text-[#808080] font-[500] text-[16px]",children:a.val_2.name}),e.jsxs("h1",{className:"text-[#255BB3] font-[700] text-[32px]",children:[a.val_2.value,e.jsx("span",{className:"text-[16px] font-[700] ml-2",children:" 件"})]})]}),e.jsxs("div",{className:"p-4 bg-[#fff] border-[#E6E6E6] col-span-2 sm:col-span-1",children:[e.jsxs("h1",{className:"text-[#808080] font-[500] text-[16px]",children:[" ",a.val_3.name]}),e.jsxs("h1",{className:"text-[#255BB3] font-[700] text-[32px] ",children:[" ",a.val_3.value,e.jsx("span",{className:"text-[16px] font-[700] ml-2",children:"件"})]})]})]}):e.jsx(e.Fragment,{children:e.jsxs("div",{className:"col-span-3 lg:mx-[6rem]  xs:mx-[0.5rem] p-4 bg-[#fff]",children:[e.jsx("button",{onClick:()=>x(!0),className:"bg-[#FA0] text-[14px] text-[#fff] px-4 py-2 w-full",children:"パートナー申請をする"}),e.jsx("h1",{className:"text-[#808080] font-[500] lg:text-[16px] xs:text-[12px]  mt-2",children:"※工程を登録するには、パートナー登録をする必要があります"})]})}),l&&e.jsx(C,{showModal:l,setShowModal:x})]})},V=()=>{var u,j;const a=y(),n=F(),{other:l,loading:x}=f(_),[c,m]=d.useState(!1),{buyerNotification:o,sellerNotification:r}=f(L),i=U([z(),{HeaderRow:`
        background-color: #255BB3;
        color: #fff;
        font-size: 14px;
  
      `,Table:`
    --data-table-library_grid-template-columns:1.2fr 2fr 2fr 1fr 2fr 1fr ;
  
    @media (max-width: 1150px) {
      --data-table-library_grid-template-columns:repeat(6,minmax(10px,500px));
        overflow-x: auto;
        width: 200% !important;
        white-space: nowrap;
      } 
      @media (max-width: 500px) {
        --data-table-library_grid-template-columns:repeat(6,minmax(10px,500px));
        overflow-x: auto;
        width: 300% !important;
        white-space: nowrap;
      }    
      `,BaseCell:`
         &:nth-of-type(n) {
          font-weight: 500;
          text-align:center;
            align-items:start;
          }
        &:nth-of-type(6) {
            text-align:right;
        }
         &:nth-of-type(1) {
            text-align:left;
          }
  
      `}]);d.useEffect(()=>{a(T({})),a(D({})),a(R({}))},[a]);let p=[];if(o&&o.data)for(let t=0;t<o.data.length;t++){const s=o.data[t];p.push({transaction_no:s==null?void 0:s._id,seller_id:s==null?void 0:s.seller_id,project:s==null?void 0:s.process_name,company_name:s==null?void 0:s.sellerName,transaction_status:s==null?void 0:s.transaction_status,detailed:"詳細",message:s==null?void 0:s.latest_note,__v:s==null?void 0:s.__v})}let h=[];if(r&&r.data)for(let t=0;t<r.data.length;t++){const s=r.data[t];h.push({transaction_no:s==null?void 0:s._id,seller_id:s==null?void 0:s.seller_id,project:s==null?void 0:s.process_name,company_name:"株式会社丸菱製作所",transaction_status:s==null?void 0:s.transaction_status,detailed:"詳細",message:s==null?void 0:s.latest_note,__v:s.__v})}const k={nodes:p},S={nodes:h},E=[{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px] ",children:"取引No"}),key:"transaction_no",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] break-all",style:{whiteSpace:"normal"},children:t.transaction_no?t.transaction_no:"NA"})},{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"工程"}),key:"project",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400]  line-clamp-3 text-center",style:{whiteSpace:"normal"},children:t.project?t.project:"NA"})},{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"企業名"}),key:"company_name",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] line-clamp-3 text-center",style:{whiteSpace:"normal"},children:t.company_name?t.company_name:"NA"})},{label:e.jsx("span",{className:"lg:text-[16px] xs:text-[14px]",children:"ステータス"}),key:"transaction_status",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] line-clamp-3",style:{whiteSpace:"normal"},children:b[t.transaction_status]||"NA"})},,{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"メッセージ"}),key:"message",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] break-all text-center",style:{whiteSpace:"normal"},children:t.message?t.message:"NA"})},{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"詳細"}),key:"detailed",renderCell:t=>e.jsxs("button",{onClick:()=>{a(N({transaction_id:t.transaction_no,userRole:"buyer"})),n(`/transaction/${t.transaction_no}`)},className:"text-[#fff] text-[14px] font-[400] bg-[#FFAA00] px-2 py-1 flex gap-2 items-center  justify-end mx-auto ",style:{whiteSpace:"normal"},children:[t.detailed,e.jsx("span",{className:"",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"5",height:"8",viewBox:"0 0 5 8",fill:"none",children:e.jsx("path",{d:"M0.184686 7.38979C0.0700362 7.28623 0.00946618 7.16632 0.00513976 7.02643C0.00081333 6.88654 0.0613833 6.76663 0.184686 6.66308L3.46196 3.91066L0.184686 1.15825C0.0700362 1.06015 0.00946618 0.940239 0.00081333 0.798531C-0.00783952 0.656822 0.0527305 0.533282 0.17387 0.431542C0.290684 0.327986 0.433456 0.2753 0.606513 0.271666C0.77957 0.268033 0.924506 0.318902 1.03916 0.422458L4.84641 3.6109C4.89617 3.65268 4.9351 3.69992 4.96106 3.7526C4.98702 3.80529 5 3.85798 5 3.91248C5 3.96698 4.98702 4.01967 4.96106 4.07236C4.9351 4.12504 4.89833 4.17046 4.84641 4.21407L1.04997 7.39887C0.935322 7.49516 0.792549 7.54421 0.621656 7.54421C0.450762 7.54421 0.305826 7.49334 0.182523 7.38979H0.184686Z",fill:"white"})})})]})}],A=[{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"取引No"}),key:"transaction_no",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] break-all",style:{whiteSpace:"normal"},children:t.transaction_no?t.transaction_no:"NA"})},{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"工程"}),key:"project",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400]  line-clamp-3  text-center",style:{whiteSpace:"normal"},children:t.project?t.project:"NA"})},{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"企業名"}),key:"company_name",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] text-left line-clamp-3",style:{whiteSpace:"normal"},children:t.company_name?t.company_name:"NA"})},{label:e.jsx("span",{className:"lg:text-[16px] xs:text-[14px]",children:"ステータス"}),key:"transaction_status",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] line-clamp-3",style:{whiteSpace:"normal"},children:b[t.transaction_status]||"NA"})},,{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"メッセージ"}),key:"message",renderCell:t=>e.jsx("div",{className:"text-[#808080] text-[14px] font-[400] break-all",style:{whiteSpace:"normal"},children:t.message?t.message:"NA"})},{label:e.jsx("span",{className:"flex justify-center lg:text-[16px] xs:text-[14px]",children:"詳細"}),key:"detailed",renderCell:t=>e.jsxs("button",{onClick:()=>{a(N({transaction_id:t.transaction_no,userRole:"seller"})),n(`/transaction/${t.transaction_no}
           }
          `)},className:"text-[#fff] text-[14px] font-[400] bg-[#FFAA00] px-2 py-1 flex gap-2 items-center  justify-center mx-auto",style:{whiteSpace:"normal"},children:[t.detailed,e.jsx("span",{className:"",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"5",height:"8",viewBox:"0 0 5 8",fill:"none",children:e.jsx("path",{d:"M0.184686 7.38979C0.0700362 7.28623 0.00946618 7.16632 0.00513976 7.02643C0.00081333 6.88654 0.0613833 6.76663 0.184686 6.66308L3.46196 3.91066L0.184686 1.15825C0.0700362 1.06015 0.00946618 0.940239 0.00081333 0.798531C-0.00783952 0.656822 0.0527305 0.533282 0.17387 0.431542C0.290684 0.327986 0.433456 0.2753 0.606513 0.271666C0.77957 0.268033 0.924506 0.318902 1.03916 0.422458L4.84641 3.6109C4.89617 3.65268 4.9351 3.69992 4.96106 3.7526C4.98702 3.80529 5 3.85798 5 3.91248C5 3.96698 4.98702 4.01967 4.96106 4.07236C4.9351 4.12504 4.89833 4.17046 4.84641 4.21407L1.04997 7.39887C0.935322 7.49516 0.792549 7.54421 0.621656 7.54421C0.450762 7.54421 0.305826 7.49334 0.182523 7.38979H0.184686Z",fill:"white"})})})]})}];return e.jsxs(e.Fragment,{children:[x?e.jsx(w,{}):e.jsxs("div",{className:"w-full mx-10",children:[e.jsxs("div",{className:"flex justify-between items-center mb-10 sm:mb-0",children:[e.jsx("h1",{className:"sm:text-[#255BB3] text-[#808080] font-[700] sm:text-[24px] text-[18px] sm:mb-4 md:mb-0",children:"売上・受注件数"}),l&&((u=l==null?void 0:l.user)==null?void 0:u.partner_flg)&&e.jsx("button",{onClick:()=>n("/dashboard/process-list/registration"),className:"bg-[#FA0] lg:text-[18px] xs:text-[14px] text-[#fff] sm:px-4 sm:py-1 p-2",children:"工程を登録する"})]}),e.jsx("h1",{className:"mt-4 text-[#808080]  font-[700] text-[18px]",children:"受注情報"}),e.jsx(v,{data:{val_1:{name:"入金予定金額",value:100},val_2:{name:"未完了案件",value:200},val_3:{name:"未発注案件",value:300}},partner_flag:l&&((j=l==null?void 0:l.user)==null?void 0:j.partner_flg)}),e.jsx("h1",{className:"mt-4 text-[#808080]  font-[700] text-[18px]",children:"最新情報"}),e.jsx("div",{className:"border-[1px] border-[#808080] min-h-[169px] mt-4",children:e.jsx("div",{className:" border-[1px] border-[#E6E6E6] overflow-x-auto",children:e.jsx(g,{data:k,columns:E,theme:i})})}),e.jsx("h1",{className:"mt-4 text-[#808080]  font-[700] text-[18px]",children:"発注情報"}),e.jsx(v,{data:{val_1:{name:"未発注案件",value:100},val_2:{name:"仮払い待ち案件",value:200},val_3:{name:"納品待ち案件",value:300}},partner_flag:!0}),e.jsx("h1",{className:"mt-4 text-[#808080]  font-[700] text-[18px]",children:"発注情報"}),e.jsx("div",{className:"border-[1px] border-[#808080] min-h-[169px] mt-4",children:e.jsx("div",{className:"border-[1px] border-[#E6E6E6] overflow-x-auto",children:e.jsx(g,{data:S,columns:A,theme:i})})})]}),c?e.jsx(C,{showModal:c,setShowModal:m}):null]})};export{V as default};
