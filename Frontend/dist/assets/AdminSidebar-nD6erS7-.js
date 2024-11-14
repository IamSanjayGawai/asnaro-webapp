import{z as o,u as d,j as s,O as l}from"./index-w2wx-x_X.js";const c=()=>{const i=o(),a=d(),{pathname:n}=i,t=e=>{e==="パートナー管理"?a("/admin/dashboard/partner-management"):e==="企業情報一覧"?a("/admin/dashboard/company-information"):e==="受発注管理"?a("/admin/dashboard/order-management"):e==="工程一覧"?a("/admin/dashboard/process-management"):e==="お知らせ管理"?a("/admin/dashboard/notification-management"):e==="マスター管理"?a("/admin/dashboard/master-management"):e==="お問い合わせ管理"?a("/admin/dashboard/inquiry-management"):e==="外部連携管理"&&a("/admin/dashboard/external-collaboration-management")};return s.jsxs("div",{className:"flex w-full mx-auto justify-start h-full",children:[s.jsx("div",{className:"  bg-[#F8F8F8] h-screen sticky top-0",children:s.jsxs("div",{className:"xs:hidden mt-[6rem] md:block md:max-w-[200px] lg:max-w-[260px]  text-tertiary h-auto ",children:[s.jsx("p",{className:"font-bold mb-[18px] cursor-pointer ml-[3rem] ",onClick:()=>a("/admin/dashboard"),children:"TOP"}),["パートナー管理","企業情報一覧","受発注管理","工程一覧","お知らせ管理","マスター管理","お問い合わせ管理","外部連携管理"].map((e,r)=>s.jsx("div",{className:"flex flex-col justify-center items-center ",children:s.jsx("div",{className:`h-[50px] md:w-[200px] lg:w-[200px]  pl-[3rem]  flex items-center ${r===0?"border-y":"border-b "} ${e==="パートナー管理"&&n.includes("partner-management")?"bg-white":""} ${e==="企業情報一覧"&&n.includes("company-information")?"bg-white":""} ${e==="受発注管理"&&n.includes("order-management")?"bg-white":""}
              
                 ${e==="工程一覧"&&n.includes("process-management")?"bg-white":""}
                ${e==="お知らせ管理"&&n.includes("notification-management")?"bg-white":""}
                ${e==="マスター管理"&&n.includes("master-management")?"bg-white":""}
              
                ${e==="お問い合わせ管理"&&n.includes("inquiry-management")?"bg-white":""}
                  ${e==="外部連携管理"&&n.includes("external-collaboration-management")?"bg-white":""}
                  ${e===" 通知ポスト"&&n.includes("notification-post")?"bg-white":""}
                 

                 border-secondary relative cursor-pointer hover:bg-white`,onClick:()=>t(e),children:s.jsx("p",{children:e})})},r))]})}),s.jsx(l,{})]})};export{c as default};
