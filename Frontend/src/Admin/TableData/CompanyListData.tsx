export const nodes = [
    {
      id: "1",
      company_id: "xxxxxx",
      company_name: "受発注待ち",
      representative_name: "受発注待ち",
      person_incharge_name: "XXXXXXXXX",
    },

   
   
  ];
  
  export const COLUMNS = [
    {
        label: <span className="flex justify-center">企業ID</span>,
        key: "company_id",
        renderCell: (cell) => (
            <div
              className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
              style={{ whiteSpace: "normal" }}
            >
              {cell.company_id} 
            </div>
          ),

      },
      
    {
      label: "企業名",
      key: "company_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.company_name} 
        </div>
      ),
    },
    {
      label: "代表者名",
      key: "representative_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
                 {cell.representative_name} 
      
        </div>
      ),
    },
    {
      label: "担当者名",
      key: "person_incharge_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
          style={{ whiteSpace: "normal" }}
        >
              {cell.person_incharge_name}
       
        </div>
      ),
    },

  
  
  
  ];
  
  
  