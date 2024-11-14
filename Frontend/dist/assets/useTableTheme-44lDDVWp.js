import{r as a,l as o}from"./baseline-5AKzli58.js";function n(e,t){return a([o(),{HeaderRow:`
        background-color: #808080;
        color: #fff;
        font-size: 12px;
        &:hover {
          background-color: #808080;
        }
  
      `,Table:`
        --data-table-library_grid-template-columns: ${e};
  
  
        @media (max-width: 1150px) {
          --data-table-library_grid-template-columns: repeat(${t}, minmax(10px, 500px));
          overflow-x: auto;
          width: 200% !important;
          white-space: nowrap;
        }
  
        @media (max-width: 500px) {
          --data-table-library_grid-template-columns: repeat(${t}, minmax(10px, 500px));
          overflow-x: auto;
          width: 200% !important;
          white-space: nowrap;
        }
      `,BaseCell:`
        &:nth-of-type(n) {
          font-weight: 500;
          text-align: center;
          align-items: start;
          cursor: pointer;
        }
  
        &:nth-of-type(6) {
          text-align: right;
        }
  
        &:nth-of-type(1) {
          text-align: left;
        }
      `,BaseRow:`
      &:hover {
        background-color: #F8F8F8;
      }
      `}])}export{n as u};
