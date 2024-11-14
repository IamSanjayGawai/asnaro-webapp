import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

export const theme = useTheme([
  getTheme(),
  {
    HeaderRow: `
        background-color: #255BB3;
        color: #fff;
        font-size: 12px;
        z-index: -1;
      `,
    Table: `
        --data-table-library_grid-template-columns: 1.2fr  2fr  1fr 1fr 1fr 1fr ;
        z-index: -1;
  
        @media (max-width: 1150px) {
          --data-table-library_grid-template-columns: repeat(6, minmax(10px, 500px));
          overflow-x: auto;
        width: 200% !important;
          white-space: nowrap;
        }
  
        @media (max-width: 500px) {
          --data-table-library_grid-template-columns: repeat(6, minmax(10px, 500px));
          overflow-x: auto;
        width: 200% !important;
          white-space: nowrap;
        }
      `,
    BaseCell: `
        &:nth-of-type(n) {
          font-weight: 500;
          text-align: center;
          align-items: start;
          border-bottom: 1px solid #e0e0e0;
        }
  
        &:nth-of-type(6) {
          text-align: right;
        }
  
        &:nth-of-type(1) {
          text-align: left;
        }
      `,
  },
]);

export const defaultRow = {
  nodes: [
    {
      content: " ",
      drawingNumber: "",
      deadline: "",
      unitPrice: "",
      quantity: "",
      unit: "",
      amount: " ",
    },
  ],
};

export const defaultRefundRow = {
  nodes: [
    {
      content: " ",
      amount: " ",
    },
  ],
};

export const dashed = {
  nodes: [
    {
      content: "",
      drawingNumber: "",
      deadline: "",
      unitPrice: "",
      quantity: "",
      unit: "",
      amount: "",
    },
  ],
};
