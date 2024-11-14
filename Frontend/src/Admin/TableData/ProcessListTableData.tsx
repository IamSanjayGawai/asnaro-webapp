
  
  export const COLUMNS = [
    {
        label: <span className="flex justify-center">工程ID</span>,
        key: "Process_ID",
        renderCell: (cell) => (
            <div
              className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
              style={{ whiteSpace: "normal" }}
            >
              {cell.Process_ID? cell.Process_ID : "NA"} 
            </div>
          ),

      },
      
    {
      label: "出品企業ID",
      key: "Exhibiting_company_ID",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
          {cell.Exhibiting_company_ID? cell.Exhibiting_company_ID : "NA"} 
        </div>
      ),
    },
    {
      label: "工程名",
      key: "Process_name",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400]  line-clamp-3 text-center "
          style={{ whiteSpace: "normal" }}
        >
                 {cell.Process_name? cell.Process_name : "NA"} 
      
        </div>
      ),
    },
    {
      label: "カテゴリ",
      key: "category",
      renderCell: (cell) => (
        <div
          className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
          style={{ whiteSpace: "normal" }}
        >
              {cell.category? cell.category : "NA"}
       
        </div>
      ),
    },
    {
        label: "タグ",
        key: "tag",
        renderCell: (cell) => (
          <div
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
            style={{ whiteSpace: "normal" }}
          >
                {cell.tag? cell.tag : "NA"}
         
          </div>
        ),
      },

      {
        label: "地域",
        key: "area",
        renderCell: (cell) => (
          <div
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
            style={{ whiteSpace: "normal" }}
          >
                {cell.area? cell.area : "NA"}
         
          </div>
        ),
      },

      {
        label: "ステータス",
        key: "status",
        renderCell: (cell) => (
          <div
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
            style={{ whiteSpace: "normal" }}
          >
                {cell.status? cell.status : "NA"}
         
          </div>
        ),
      },

      {
        label: "評価",
        key: "evaluation",
        renderCell: (cell) => (
          <div
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
            style={{ whiteSpace: "normal" }}
          >
                {cell.evaluation? cell.evaluation : "NA"}
         
          </div>
        ),
      },

      {
        label: "空き日数",
        key: "Number_of_free_days",
        renderCell: (cell) => (
          <div
            className="text-[#808080] text-[12px] font-[400] line-clamp-1 text-center "
            style={{ whiteSpace: "normal" }}
          >
                {cell.Number_of_free_days? cell.Number_of_free_days : "NA"}
         
          </div>
        ),
      },

   

  
  
  
  ];
  
  
  