import{u as x,a as i,f as c,R as s,j as e}from"./index-w2wx-x_X.js";import{k as n,Q as m}from"./react-toastify.esm-DWx9woOs.js";/* empty css                      */const f=()=>{const t=x(),{passwordReset:r}=i(c),a=s.useRef(!0),o=()=>{m.success("Email Sent Successfully for Password Reset!",{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light"})};s.useEffect(()=>{a.current&&(o(),a.current=!1)},[]),s.useEffect(()=>{r||t("/password-reset")},[r]);const l=()=>{t(-1)};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"md:mx-auto md:w-[600px] bg-light my-[130px] xs:mx-4",children:e.jsx("div",{className:"h-full",children:e.jsx("div",{className:"md:w-[590px] md:mx-auto md:py-[50px] xs:py-[26px] xs:mx-4 text-base",children:e.jsxs("div",{className:"w-full md:px-[70px] flex flex-col items-center",children:[e.jsx("div",{className:"text-primary font-bold text-center xs:text-[20px] md:text-2xl ",children:"パスワード再設定のご案内を 送信しました"}),e.jsx("div",{className:"text-tertiary text-center text-base xs:mt-[28px] md:mt-[50px]",children:"ご入力いただいたメールアドレス宛てにパスワード再設定のご案内をお送りいたしました。確認いただき、パスワード再設定をお願いいたします。"}),e.jsx("button",{className:"xs:w-full btn p-2 flex items-center justify-center	bg-tertiary text-white xs:mt-[32px] md:mt-[47px] h-[45px] font-bold xs:rounded md:rounded-md",onClick:l,children:"戻る"})]})})})}),e.jsx(n,{position:"bottom-right",autoClose:5e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"})]})};export{f as default};