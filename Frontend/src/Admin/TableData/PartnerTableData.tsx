export const nodes = [
  {
    id: "1",
    admit: false,
    partner_status: "受発注待ち",
    Enterprise_ID: "XXXXXXXXX",
    Registered_Date: "2023/7/1",
    Company_name: "受発注待ち",
   
  },
  {
      id: "2",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "3",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "4",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "5",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "6",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "7",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "8",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "9",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
    {
      id: "10",
      admit: false,
      partner_status: "受発注待ち",
      Enterprise_ID: "XXXXXXXXX",
      Registered_Date: "2023/7/1",
      Company_name: "受発注待ち",
     
    },
];

export const COLUMNS = [
  {
      label: "承認",
      key: "admit",
      renderCell: (cell) => (
        <div className="flex items-center ">
          <input
            type="checkbox"
            checked={cell.admit}
      
          />
        </div>
      ),
    },
    
  {
    label: "パートナー状態",
    key: "partner_status",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.partner_status} 
      </div>
    ),
  },
  {
    label: "企業ID",
    key: "Enterprise_ID",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
        style={{ whiteSpace: "normal" }}
      >
               {cell.Enterprise_ID} 
    
      </div>
    ),
  },
  {
    label: "Registered_Date",
    key: "status",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
        style={{ whiteSpace: "normal" }}
      >
            {cell.Registered_Date}
     
      </div>
    ),
  },
  {
    label: "Company_name",
    key: "status",
    renderCell: (cell) => (
      <div
        className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
        style={{ whiteSpace: "normal" }}
      >
        {cell.Company_name}
      </div>
    ),
  },



];


