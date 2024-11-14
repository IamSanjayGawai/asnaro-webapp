import{m as s}from"./index-w2wx-x_X.js";const r="http://localhost:8000",e=async o=>{try{return(await s.post(`${r}/user/get-city`,{zipcode:o})).data}catch(t){throw t}};export{e as g};
