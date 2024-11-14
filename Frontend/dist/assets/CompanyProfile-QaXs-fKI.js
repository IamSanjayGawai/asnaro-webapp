import{u as Bt,d as At,r,j as e,p as Wt,z as qt,n as Zt,a as $t,s as Ut,B as Vt,a2 as Yt,a3 as Ot,S as Qt}from"./index-w2wx-x_X.js";import{S as Xt}from"./StatCalender-wz3wZoHT.js";import{F as Jt}from"./index.esm-3p37yvGm.js";import{N as Kt}from"./No_Image_Available-oKBWNq14.js";import{R as te}from"./RatingSystem-xm_1z6H-.js";import{F as ee,I as ae}from"./index.esm-6lvFD6lQ.js";import{r as m}from"./replaceWithAnchorTags-XOtmbr99.js";import{R as le}from"./Rating-jxWQdIu8.js";import"./dayjs.min-5rCsLmx2.js";import"./cn-hWSFJXCx.js";import"./iconBase-7AsOp5YA.js";import"./objectWithoutPropertiesLoose-9Q1jwsKS.js";import"./extends-_9I-EFOp.js";import"./emotion-react.browser.esm-kI5PoqX3.js";import"./hoist-non-react-statics.cjs-j2Vrlo-h.js";const o="/assets/processImg-IXgQ5MWj.png";function se({grid:s,process:a}){var t,E;const h=Bt(),f=At(),[v,d]=r.useState(a==null?void 0:a.img1),y=()=>{h(`/process/details/${a==null?void 0:a._id}`)},c=i=>{const u=i.target;u.src=Kt};return e.jsxs("div",{className:` w-full   border-[1px] border-[#E6E6E6] p-0 sm:p-4 shadow-sm   ${s?"flex flex-col justify-between sm:justify-start ":"grid md:grid-cols-[2fr,3fr,2fr] lg:grid-cols-[1fr,3fr,1fr] sm:gap-3"}`,children:[e.jsxs("div",{children:[e.jsx("img",{src:v||o,alt:"ProcessImg",className:"w-full object-cover",onError:c}),e.jsxs("div",{className:s?"hidden":" hidden sm:grid grid-cols-3 gap-[6px] mt-[6px] ",children:[e.jsx("img",{src:(a==null?void 0:a.img1)||o,alt:"ProcessImg",onClick:()=>d((a==null?void 0:a.img1)||o),className:"cursor-pointer",onError:c}),e.jsx("img",{src:(a==null?void 0:a.img2)||o,onClick:()=>d((a==null?void 0:a.img2)||o),alt:"ProcessImg",className:"cursor-pointer",onError:c}),e.jsx("img",{src:(a==null?void 0:a.img3)||o,onClick:()=>d((a==null?void 0:a.img3)||o),alt:"ProcessImg",className:"cursor-pointer",onError:c})]})]}),e.jsxs("div",{className:s?"sm:px-0 px-4 mt-4":"p-4",children:[e.jsx("h1",{className:`text-[#255BB3] no-underline sm:text-[20px] text-[16px] font-[700]  cursor-pointer  line-clamp-1 ${s?"":"sm:underline"}`,onClick:y,children:a==null?void 0:a.name}),e.jsxs("div",{className:`flex lg:flex-row xs:flex-col ${s?"lg:gap-10 xs:gap-2":"lg:gap-8 xs:gap-2"} mt-2 `,children:[e.jsx("h1",{className:`sm:text-[16px] text-[12px] text-[#808080] font-[500] underline cursor-pointer  line-clamp-1 ${s?"sm:block hidden":""}`,onClick:()=>{var i;return h(`/process/company-profile/${(i=a==null?void 0:a.user)==null?void 0:i._id}`)},children:(t=a==null?void 0:a.user)==null?void 0:t.name01}),e.jsxs("div",{className:"flex gap-2 items-center",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16",fill:"none",children:[e.jsx("g",{"clip-path":"url(#clip0_1241_5287)",children:e.jsx("path",{d:"M6.57895 7.71333C6.97368 7.71333 7.31497 7.57884 7.59457 7.30591C7.87418 7.03298 8.01809 6.70862 8.01809 6.32493C8.01809 5.94124 7.87829 5.61689 7.59457 5.34791C7.31086 5.07893 6.97368 4.94049 6.57484 4.94049C6.17599 4.94049 5.83882 5.07498 5.55921 5.34791C5.27961 5.62084 5.13569 5.9452 5.13569 6.32889C5.13569 6.71258 5.27549 7.03693 5.55921 7.30591C5.84293 7.57489 6.1801 7.71333 6.57895 7.71333ZM6.57895 15.8222C4.37089 14.0145 2.72204 12.3374 1.6324 10.7868C0.542763 9.23622 0 7.80431 0 6.48711C0 4.50933 0.662007 2.93502 1.98602 1.76022C3.30592 0.585422 4.83964 0 6.57895 0C8.31826 0 9.85197 0.585422 11.176 1.76022C12.5 2.93502 13.162 4.50933 13.162 6.48711C13.162 7.80431 12.6151 9.24018 11.5255 10.7908C10.4359 12.3413 8.78701 14.0185 6.57895 15.8262V15.8222Z",fill:"#808080"})}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_1241_5287",children:e.jsx("rect",{width:"13.1579",height:"15.8222",fill:"white"})})})]}),e.jsx("h1",{className:"sm:text-[16px] text-[12px] text-[#808080] font-[400] ",children:`${a!=null&&a.pref?(a==null?void 0:a.pref)+", ":""}${a!=null&&a.mun?a==null?void 0:a.mun:""}`})]})]}),e.jsxs("div",{className:" grid grid-cols-1 gap-2 sm:pb-0 pb-4 w-full sm:w-fit mt-2",children:[e.jsx(te,{averageRating:(a==null?void 0:a.totalRatingSum)||0,totalRatings:(a==null?void 0:a.totalReviews)||0}),e.jsx("div",{className:`flex flex-wrap gap-2 row-start-2 ${s?"":"sm:row-start-2"}`,children:(a==null?void 0:a.tags)&&((E=a==null?void 0:a.tags)==null?void 0:E.map((i,u)=>e.jsx("h2",{className:`text-[12px] ${s&&"text-[10px] sm:text-[12px]"}  text-[#FA0] font-[700]  py-[1px]  px-[15px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1 cursor-pointer`,onClick:()=>{f(Wt({keyword:i,pageSize:12})),h(`/process/search-results?keyword=${i}`)},children:i},u)))})]}),e.jsxs("div",{className:`flex items-start gap-3 sm:mt-4 ${s?"hidden sm:flex":"flex"}`,children:[e.jsx("h2",{className:"bg-[#E6E6E6] text-center font-[500] p-1 sm:text-[14px] text-[12px] text-[#808080] w-[60px]",children:"工程"}),e.jsx("h2",{className:"sm:text-[14px] text-[12px] text-[#808080] font-[400] w-4/5 line-clamp-3 ",children:a==null?void 0:a.process_explanation})]}),e.jsxs("div",{className:`flex items-start gap-3 mt-4 ${s?"hidden sm:flex":"flex"}`,children:[e.jsx("h2",{className:"bg-[#E6E6E6] text-center font-[500] p-1 sm:text-[14px] text-[12px] text-[#808080] w-[60px]  ",children:"能力"}),e.jsx("h2",{className:"sm:text-[14px] text-[12px] text-[#808080] font-[400] w-4/5 line-clamp-3 ",children:a==null?void 0:a.capacity})]}),e.jsxs("div",{className:`flex items-center gap-3 mt-4 ${s?"hidden sm:flex":"flex"}`,children:[e.jsx("h2",{className:"bg-[#E6E6E6] text-center font-[500] p-1 sm:text-[14px] text-[12px] text-[#808080] w-[60px]",children:"納期"}),e.jsx("h2",{className:"sm:text-[14px] text-[12px] text-[#808080] font-[400] w-4/5  line-clamp-3",children:a==null?void 0:a.delivery_date})]})]}),e.jsx("div",{className:s?"hidden":" hidden sm:block md:pt-4",children:e.jsx(Xt,{value:a})}),e.jsx("div",{className:"w-full px-2 pb-2 sm:hidden",children:e.jsxs("button",{className:"bg-[#255BB3] text-center w-full text-[#fff] p-2 flex items-center justify-center gap-2 font-bold",children:["空き状況 ",e.jsx(Jt,{})]})})]})}const Pt=({averageRating:s,totalRatings:a})=>e.jsxs("div",{className:"flex items-center text-[#FFAA00] sm:text-[24px] text-[12px] font-[700] sm:w-[90%] w-[95%] mx-auto mt-1 gap-1 ",children:[e.jsx(le,{name:"process-rating",precision:.5,value:s,size:"large",className:"ml-1",readOnly:!0}),s,e.jsxs("span",{className:"text-[#808080] sm:text-[14px] lg:text-[16px]  font-[700] ml-1",children:["(",a,")"]})]}),be=()=>{var P,B,A,H,R,T,z,G,W,q,Z,U,V,Y,O,Q,X,J,K,tt,et,at,lt,st,it,nt,xt,mt,rt,dt,ct,ot,ht,ft,ut,gt,pt,wt,jt,bt,Nt,Et,vt,yt,_t,Ct,Ft,St,kt;const s=qt(),h=new URLSearchParams(s.search).get("page"),[f,v]=r.useState(h?parseInt(h):1),{uid:d}=Zt(),y=Bt(),c=At(),{process:t,loading:E}=$t(Ut),{getRatings_Seller:i}=$t(Vt),u=(i==null?void 0:i.averageRating)||0,Ht=(i==null?void 0:i.ratingCount)||0,[_,M]=r.useState([(P=t==null?void 0:t.user)==null?void 0:P.img1,(B=t==null?void 0:t.user)==null?void 0:B.img2,(A=t==null?void 0:t.user)==null?void 0:A.img3]),C=new Date((H=t==null?void 0:t.user)==null?void 0:H.open_time),F=new Date((R=t==null?void 0:t.user)==null?void 0:R.close_time),[S,Rt]=r.useState([]),I=10,k=Math.max(1,((T=t==null?void 0:t.pagination)==null?void 0:T.currentPage)-Math.floor(I/2)),D=Math.min((z=t==null?void 0:t.pagination)==null?void 0:z.totalPages,k+I-1),Tt=Array.from({length:D-k+1},(l,x)=>k+x),$=async l=>{v(l),y(`/process/company-profile/${d}?page=${l}`)};r.useEffect(()=>{window.scrollTo(0,0)},[f]),r.useEffect(()=>{c(Yt({uid:d,currentPage:f}))},[c,d,f]),r.useEffect(()=>{c(Ot(d))},[c,d]),r.useEffect(()=>{var l,x,w,j,b,N;t&&(t!=null&&t.user)&&((l=t==null?void 0:t.user)!=null&&l.img1)&&((x=t==null?void 0:t.user)!=null&&x.img2)&&((w=t==null?void 0:t.user)!=null&&w.img3)?M([(j=t==null?void 0:t.user)==null?void 0:j.img1,(b=t==null?void 0:t.user)==null?void 0:b.img2,(N=t==null?void 0:t.user)==null?void 0:N.img3]):M(["https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"])},[t]),r.useEffect(()=>{var x,w,j,b,N,Dt,Lt,Mt,It;const l=[];((x=t==null?void 0:t.user)==null?void 0:x.holiday_flg1)==="1"&&l.push("月曜日"),((w=t==null?void 0:t.user)==null?void 0:w.holiday_flg2)==="2"&&l.push("火曜日"),((j=t==null?void 0:t.user)==null?void 0:j.holiday_flg3)==="3"&&l.push("水曜日"),((b=t==null?void 0:t.user)==null?void 0:b.holiday_flg4)==="4"&&l.push("木曜日"),((N=t==null?void 0:t.user)==null?void 0:N.holiday_flg5)==="5"&&l.push("金曜日"),((Dt=t==null?void 0:t.user)==null?void 0:Dt.holiday_flg6)==="6"&&l.push("土曜日"),((Lt=t==null?void 0:t.user)==null?void 0:Lt.holiday_flg7)==="7"&&l.push("日曜日"),(Mt=t==null?void 0:t.user)!=null&&Mt.regular_holiday&&l.push((It=t==null?void 0:t.user)==null?void 0:It.regular_holiday),Rt(l)},[t]);const[n,g]=r.useState(0),[p,L]=r.useState(!1);console.log("Grid => ",p);const zt=()=>{n!==2?g(n+1):n===2&&g(0)},Gt=()=>{n!==0?g(n-1):n===0&&g(2)};return console.log("process",t),e.jsx(e.Fragment,{children:E?e.jsx(Qt,{}):e.jsx("div",{className:"flex justify-center flex-col  items-center border-b border-secondary",children:e.jsxs("div",{className:"md:block max-w-[1200px] w-full xs:px-4 sm:px-6 md:px-8 xs:py-3 md:py-5 lg:py-6",children:[e.jsx("div",{className:`\r
          flex justify-start items-end\r
          `,style:{backgroundImage:`url(${_[n]})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",width:"100%",height:"437px"},children:e.jsxs("div",{className:"w-full flex justify-evenly  overflow-hidden px-5 py-2 bg-[#00000080]",children:[e.jsx("div",{className:"w-fit p-3 my-auto bg-[#00000080] rounded-[50%] cursor-pointer",onClick:Gt,children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"15",viewBox:"0 0 13 21",fill:"none",children:[e.jsx("g",{"clip-path":"url(#clip0_396_25261)",children:e.jsx("path",{d:"M11.7888 1.22838C12.0612 1.51178 12.205 1.83993 12.2153 2.22277C12.2256 2.60561 12.0817 2.93376 11.7888 3.21716L4.00332 10.7497L11.7888 18.2822C12.0612 18.5507 12.2051 18.8788 12.2256 19.2666C12.2462 19.6544 12.1023 19.9925 11.8145 20.271C11.537 20.5544 11.1978 20.6985 10.7867 20.7085C10.3756 20.7184 10.0313 20.5792 9.75892 20.2958L0.714404 11.57C0.596209 11.4557 0.503708 11.3264 0.442041 11.1822C0.380374 11.038 0.34954 10.8939 0.34954 10.7447C0.34954 10.5955 0.380374 10.4514 0.44204 10.3072C0.503708 10.163 0.59107 10.0387 0.714404 9.91935L9.73322 1.20352C10.0056 0.940006 10.3448 0.805765 10.7507 0.805765C11.1567 0.805765 11.501 0.944979 11.7939 1.22838L11.7888 1.22838Z",fill:"white"})}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_396_25261",children:e.jsx("rect",{width:"11.8709",height:"19.9027",fill:"white",transform:"translate(12.2253 20.708) rotate(180)"})})})]})}),e.jsx("div",{className:"w-full ",children:e.jsxs("div",{className:"flex sm:justify-start justify-center mx-[5em]  duration-700 gap-[21px] ",children:[e.jsx("img",{src:_[n===0?2:n-1],onClick:()=>g(n===0?2:n-1),className:"w-full max-w-[126px] h-[76px] object-cover cursor-pointer",alt:"img_9"}),e.jsx("img",{src:_[n===2?0:n+1],onClick:()=>g(n===2?0:n+1),className:"w-full max-w-[126px] h-[76px] object-cover cursor-pointer",alt:"img_8"})]})}),e.jsx("div",{className:" p-3  bg-[#00000080] rounded-[50%] my-auto w-fit cursor-pointer",onClick:zt,children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"15",viewBox:"0 0 13 21",fill:"none",children:[e.jsx("g",{"clip-path":"url(#clip0_396_25256)",children:e.jsx("path",{d:"M1.05007 19.6124C0.777706 19.329 0.633816 19.0009 0.623538 18.618C0.61326 18.2352 0.75715 17.9071 1.05007 17.6237L8.83555 10.0912L1.05007 2.55865C0.777706 2.29016 0.633816 1.96201 0.61326 1.5742C0.592705 1.18639 0.736595 0.848294 1.02437 0.569865C1.30188 0.286464 1.64105 0.142277 2.05216 0.132333C2.46327 0.122389 2.80758 0.261604 3.07995 0.545005L12.1245 9.27078C12.2427 9.38513 12.3352 9.51441 12.3968 9.65859C12.4585 9.80278 12.4893 9.94697 12.4893 10.0961C12.4893 10.2453 12.4585 10.3895 12.3968 10.5337C12.3352 10.6778 12.2478 10.8021 12.1245 10.9215L3.10564 19.6373C2.83328 19.9008 2.49411 20.0351 2.08813 20.0351C1.68216 20.0351 1.33785 19.8958 1.04493 19.6124H1.05007Z",fill:"white"})}),e.jsx("defs",{children:e.jsx("clipPath",{id:"clip0_396_25256",children:e.jsx("rect",{width:"11.8709",height:"19.9027",fill:"white",transform:"translate(0.613281 0.132812)"})})})]})})]})}),e.jsxs("div",{className:"w-full items-center mx-auto mt-[31px]  inline-grid inline-grid-cols-2   justify-center gap-3",children:[e.jsx("img",{src:((G=t==null?void 0:t.user)==null?void 0:G.profile_img)||"https://static.thenounproject.com/png/1559146-200.png",className:"w-full  sm:max-w-[145px] max-w-[69px] rounded-full row-start-1 row-end-2 md:row-end-3  h-auto sm:mr-4",alt:"logo"}),e.jsxs("div",{className:"flex mt-3 flex-col row-start-1 row-end-2  col-span-1",children:[e.jsx("h1",{className:"text-[#255BB3] my-auto sm:text-[24px] text-[14px] font-[700]",dangerouslySetInnerHTML:{__html:((W=t==null?void 0:t.user)==null?void 0:W.name01)&&m((q=t==null?void 0:t.user)==null?void 0:q.name01)}}),u?e.jsx(Pt,{averageRating:u,totalRatings:Ht}):e.jsx(Pt,{averageRating:0,totalRatings:0})]}),e.jsx("p",{className:"text-[12px] sm:text-[14px] col-span-3 text-[#808080] md:col-start-2 sm:col-end-3 md:row-start-2 sm:mt-2 max-w-[660px] w-full break-all",children:((Z=t==null?void 0:t.user)==null?void 0:Z.business_content)&&e.jsx("span",{dangerouslySetInnerHTML:{__html:m(((U=t==null?void 0:t.user)==null?void 0:U.business_content)||"エレベータ部品、工作機械部品の製造を主として、板金、製缶加工から機械加工、塗装、組み立てまで大型構造物を社内にて一括加工を行います。 10tまでの製缶構造物の対応、最大2500*5000の大型五面加工機を保有するなど大型製品の対応が可能です。")}})}),e.jsx("div",{className:"col-span-3 md:col-start-2 md:row-start-4 ",children:e.jsxs("div",{className:"border-[1px] sm:mt-0  mt-[16px] p-4  border-[#E6E6E6] w-full max-w-[660px] ",children:[e.jsxs("div",{className:"inline-grid items-start inline-grid-cols-2 sm:gap-[40px] gap-[20px] border-b-[1px] border-[#E6E6E6] sm:border-b-0 sm:pb-0 pb-4 w-full sm:w-fit",children:[e.jsx("h2",{className:"sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] row-start-1 text-left sm:w-[70px]",children:"加工分類"}),e.jsxs("div",{className:"flex flex-wrap gap-[10px] col-span-2 row-start-2 sm:row-start-1",children:[((V=t==null?void 0:t.user)==null?void 0:V.classified01)&&e.jsxs("h2",{className:"text-[12px]  text-[#FA0] font-[700]  py-[2px]  px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1 ",children:[" ",((Y=t==null?void 0:t.user)==null?void 0:Y.classified01)||""]}),((O=t==null?void 0:t.user)==null?void 0:O.classified02)&&e.jsx("h2",{className:"text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1   ",children:((Q=t==null?void 0:t.user)==null?void 0:Q.classified02)||""}),((X=t==null?void 0:t.user)==null?void 0:X.classified03)&&e.jsx("h2",{className:"text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1  ",children:((J=t==null?void 0:t.user)==null?void 0:J.classified03)||""}),((K=t==null?void 0:t.user)==null?void 0:K.classified04)&&e.jsx("h2",{className:"text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1  ",children:((tt=t==null?void 0:t.user)==null?void 0:tt.classified04)||""}),((et=t==null?void 0:t.user)==null?void 0:et.classified05)&&e.jsx("h2",{className:"text-[12px] text-[#FA0] font-[700] py-[2px] px-[13px] text-center my-auto rounded-full bg-[#FFF4DF] line-clamp-1  ",children:((at=t==null?void 0:t.user)==null?void 0:at.classified05)||""})]})]}),e.jsxs("div",{className:"grid mt-[16px] sm:mt-[20px] grid-cols-6 sm:items-center items-start sm:gap-[40px] gap-5  border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit",children:[e.jsx("h2",{className:"sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2 sm:col-span-1 ",children:"営業時間"}),C||F?e.jsxs("h2",{className:"text-[14px] text-[#808080] font-[400] col-span-2  sm:row-start-1 row-start-2 sm:line-clamp-2",children:[C.getHours(),":",C.getMinutes().toString().padStart(2,"0")," ~"," ",F.getHours(),":",F.getMinutes().toString().padStart(2,"0")," "]}):e.jsx("h2",{className:"text-[14px] text-[#808080] font-[400] col-span-2  sm:row-start-1 row-start-2 sm:line-clamp-2",children:"ー"}),e.jsx("h2",{className:"sm:bg-[#E6E6E6] sm:text-center font-[500] sm:col-start-4  col-start-5 p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2",children:"定休日"}),e.jsx("h2",{className:" font-[400] p-1 text-[14px]  col-start-5 col-end-8 text-left  text-[#808080] sm:row-start-1 row-start-2 sm:line-clamp-2 ",children:S&&S.length>0?S.join(", "):"ー"})]}),e.jsxs("div",{className:"grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit",children:[e.jsx("h2",{className:"sm:bg-[#E6E6E6] text-left sm:text-center font-[500] p-1 text-[14px] text-[#808080]  row-start-1 col-span-6 sm:col-span-1 sm:w-[70px]",children:"所在地"}),e.jsxs("h2",{className:"text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 col-span-6 sm:line-clamp-3",children:["〒",(lt=t==null?void 0:t.user)!=null&&lt.zip01?(st=t==null?void 0:t.user)==null?void 0:st.zip01:"ー"," -"," ",(it=t==null?void 0:t.user)!=null&&it.zip02?(nt=t==null?void 0:t.user)==null?void 0:nt.zip02:"ー"," ",(xt=t==null?void 0:t.user)!=null&&xt.pref?(mt=t==null?void 0:t.user)==null?void 0:mt.pref:"ー"," ",(rt=t==null?void 0:t.user)!=null&&rt.addr01?(dt=t==null?void 0:t.user)==null?void 0:dt.addr01:"ー"," ",(ct=t==null?void 0:t.user)!=null&&ct.addr02?(ot=t==null?void 0:t.user)==null?void 0:ot.addr02:"ー"]})]}),e.jsxs("div",{className:"grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit",children:[e.jsx("h2",{className:"sm:bg-[#E6E6E6] text-left sm:text-center font-[500] p-1 text-[14px] text-[#808080] col-span-3 sm:row-start-1 sm:col-span-1 sm:w-[70px] ",children:"URL"}),(ht=t==null?void 0:t.user)!=null&&ht.corporate_url?e.jsx("a",{target:"_blank",href:t.user.corporate_url.startsWith("http://")||t.user.corporate_url.startsWith("https://")?t.user.corporate_url:`https://${t.user.corporate_url}`,className:"text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 col-span-6 underline cursor-pointer",children:t.user.corporate_url}):e.jsx("span",{className:"text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 col-span-6 cursor-default",children:"ー"})]}),e.jsxs("div",{className:"grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-5  border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit",children:[e.jsxs("h2",{className:"sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2 sm:col-span-1 ",children:["設立日"," "]}),e.jsx("h2",{className:"text-[14px] text-[#808080] font-[400] col-span-2  sm:row-start-1 row-start-2 sm:line-clamp-2",children:(ft=t==null?void 0:t.user)!=null&&ft.establishment_date?new Date(t.user.establishment_date).toLocaleDateString():"ー"}),e.jsxs("h2",{className:"sm:bg-[#E6E6E6] sm:text-center font-[500]  sm:col-start-4  col-start-5 p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1  col-span-2 sm:col-span-1",children:["資本金"," "]}),e.jsx("h2",{className:"font-[400] p-1 text-[14px] col-start-5 col-end-8 text-left text-[#808080] sm:row-start-1 row-start-2 sm:line-clamp-2",dangerouslySetInnerHTML:{__html:(ut=t==null?void 0:t.user)!=null&&ut.capital?m(`${t.user.capital}  万円`):m("ー")}})]}),e.jsxs("div",{className:"grid mt-[16px] sm:mt-[4px] grid-cols-6 sm:items-center items-start gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4  w-full sm:w-fit",children:[e.jsx("h2",{className:"sm:bg-[#E6E6E6] sm:text-center font-[500] p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 ",children:"代表"}),e.jsx("h2",{className:"text-[14px] text-[#808080] font-[400] sm:col-span-2 sm:row-start-1 row-start-2 col-span-3 sm:line-clamp-2 ml-3",dangerouslySetInnerHTML:{__html:(((gt=t==null?void 0:t.user)==null?void 0:gt.delegate_name01)||((pt=t==null?void 0:t.user)==null?void 0:pt.delegate_name02))&&m(`${(wt=t==null?void 0:t.user)==null?void 0:wt.delegate_name01}  ${(jt=t==null?void 0:t.user)==null?void 0:jt.delegate_name02}`)}}),e.jsx("h2",{className:"sm:bg-[#E6E6E6] sm:text-center font-[500] sm:col-start-4  col-start-5 p-1 text-[14px] text-[#808080] sm:w-[70px] row-start-1 col-span-2 ml-8",children:"従業員数"}),e.jsx("h2",{className:" font-[400] p-1 text-[14px]  col-start-5 col-end-8 text-left  text-[#808080] sm:row-start-1 row-start-2 sm:line-clamp-2 ml-8",dangerouslySetInnerHTML:{__html:(bt=t==null?void 0:t.user)!=null&&bt.employees_number?m(`${(Nt=t==null?void 0:t.user)==null?void 0:Nt.employees_number} 名`):m("ー")}})]}),e.jsxs("div",{className:"grid mt-[16px] sm:mt-[4px] grid-cols-5 items-center gap-[20px] border-[#E6E6E6] sm:border-b-0 border-b-[1px] pb-4 w-full sm:w-fit",children:[e.jsx("h2",{className:"sm:bg-[#E6E6E6] text-left sm:text-center font-[500] col-start-1 col-end-3 p-1 text-[14px] text-[#808080] row-start-1 w-[220px] ",children:"適格請求書発行事業者登録番号"}),e.jsx("h2",{className:"text-[14px] text-[#808080] font-[400] sm:row-start-1 row-start-2 sm:line-clamp-2",dangerouslySetInnerHTML:{__html:(Et=t==null?void 0:t.user)!=null&&Et.business_id?m((vt=t==null?void 0:t.user)==null?void 0:vt.business_id):m("ー")}})]}),e.jsxs("div",{className:"grid mt-[16px] sm:mt-[4px] grid-cols-6 items-center sm:gap-[40px] gap-[20px] w-fit",children:[e.jsx("h2",{className:"sm:bg-[#E6E6E6] text-center font-[500] p-1 text-[14px] text-[#808080] row-start-1 w-[80px]  ",children:"主要取引先"}),e.jsx("h2",{className:"text-[14px] text-[#808080] font-[400] col-span-3 sm:row-start-1 row-start-2 sm:col-span-2 sm:line-clamp-2 ",dangerouslySetInnerHTML:{__html:(yt=t==null?void 0:t.user)!=null&&yt.main_customer?m((_t=t==null?void 0:t.user)==null?void 0:_t.main_customer):m("ー")}})]})]})})]}),e.jsxs("div",{className:"mt-[58px]",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("h1",{className:"text-[#255BB3] text-[24px] hidden sm:block  font-[700] pr-4",children:["取り扱い工程一覧"," "]}),e.jsxs("span",{className:"text-[#808080] text-[16px] font-[700] ml-4",children:["該当件数：",(Ct=t==null?void 0:t.pagination)==null?void 0:Ct.totalItems,"件"]})]}),e.jsxs("div",{className:"flex gap-3 items-center",children:[e.jsx(ee,{className:"cursor-pointer",onClick:()=>L(!1),size:20,color:p&&"#808080"}),e.jsx(ae,{className:"cursor-pointer",onClick:()=>L(!0),size:20,color:!p&&"#808080"})]})]}),e.jsx("div",{className:`grid mt-[30px] ${p?"grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4":"grid-cols-1 gap-4"}`,children:(t==null?void 0:t.processes)&&((Ft=t==null?void 0:t.processes)==null?void 0:Ft.map((l,x)=>e.jsx(se,{grid:p,setGrid:L,process:l},x)))}),((St=t==null?void 0:t.processes)==null?void 0:St.length)>0&&e.jsxs("div",{className:"col-span-12 bg-[#F5F5F5] h-[60px] flex justify-center items-center gap-2 mt-[50px]",children:[e.jsx("div",{className:"flex gap-1",children:Tt.map((l,x)=>e.jsx("button",{className:`border w-[25px] ${f===l?"bg-primary text-white":"bg-white"} border-[#DCDCDC]`,onClick:()=>$(l),children:l},x))}),D<((kt=t==null?void 0:t.pagination)==null?void 0:kt.totalPages)&&e.jsxs("div",{className:"flex gap-1 items-center cursor-pointer",onClick:()=>$(D+1),children:[e.jsx("div",{className:"font-[500] text-primary text-[16px] w-full",children:"次ページ"}),e.jsx("svg",{className:"",xmlns:"http://www.w3.org/2000/svg",width:"16",height:"18",viewBox:"0 0 16 18",fill:"none",children:e.jsx("path",{d:"M15.4318 9L0.138137 17.6603L0.138138 0.339745L15.4318 9Z",fill:"#255BB3"})})]})]})]})]})})})};export{be as default};