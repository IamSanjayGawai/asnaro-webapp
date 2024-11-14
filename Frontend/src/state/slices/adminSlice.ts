import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  adminLoginThunk,
  adminLogOutThunk,
  getAllCompanyInfoThunk,
  admitPartnersAprrovalThunk,
  adminGetAllProcessThunk,
  searchCompanyInfoThunk,
  serachProcessForAdminThunk,
  currentPartnerInfoThunk,
  allApprovedPartnersThunk,
  adminGetAllInquriesThunk,
  adminDeleteInquiryThunk,
  getUserByIdforAdminThunk,
  createNewsThunk,
  createusagefeeMasterThunk,
  createUpperLimitRateThunk,
  createTaxRateThunk,
  getAllTaxRateThunk,
  getAllUsageFeeThunk,
  updateAllUsageFeeThunk,
  deleteUsageFeeThunk,
  getAllCategoriesThunk,
  getUpperlimitThunk,
  getCommercialActThunk,
  getTransactionDetailsAdminThunk,
  updateUserByIdforAdminThunk,
  fetchTransactionForAdminViewThunk,
  getMailTemplatesThunk,
  admitREmovePartnersAprrovalThunk,
  createCommerciaActThunk,
  createParentCategoryThunk,
  createSubCategoryThunk,
  deleteCategoryThunk,
  updateCategoryThunk,
  makeDefaultUsageFeeThunk,
  deleteCompanyInfoThunk,
  deleteOrderInfoThunk,
  deleteProcessInfoThunk,
} from "../thunks/adminThunks";
import type { RootState } from "../store";

export interface UserState {
  loading?: boolean;
  companyLoading?: boolean;
  processLoading?: boolean;
  partnerListLoading?: boolean;
  transaction?: any | null;
  transactionAdmin?: any | null;
  tranErr?: any | null;
  admin?: any | null;
  other?: any | null;
  appErr?: any | null;
  loginErr?: any | null;
  serverErr?: any | null;
  approval?: any | null;
  login?: any | null;
  allProcess?: any | null;
  searchCompanyData?: any | null;
  searchProcessData?: any | null;
  usagefee?: any | null;
  usageFeeCreated?: any | null;
  usageFeeUpdated?: any | null;
  usageFeeDeleted?: any | null;
  makeDefaultUsage?: any | null;
  parentCategoryCreated?: any | null;
  subcategoryCreated?: any | null;
  deletedCategory?: any | null;
  updatedCategory?: any | null;
  mailTemplate?: any | null;
  upperlimitRate?: any | null;
  taxRates?: any | null;
  allpartnersData?: any | null;
  AllCompanyInfo?: { partners: any[]; pagination: any } | null;
  allinquiryData?: any | null;
  allApprovedPartners?: any | null;
  adminNewsDetails?: any | null;
  getAllCategories?: any | null;
  commercialAct?: any | null;
  deleteUsers?: any | null;
  deleteUsersErr?: any | null;
  deleteTransactions?: any | null;
  deleteTransactionsErr?: any | null;
  deleteProcesses?: any | null;
  deleteProcessesErr?: any | null;
}

const localStorageUser = localStorage.getItem("adminInfo");
const adminInfo = localStorageUser ? JSON.parse(localStorageUser) : null;

const initialState: UserState = {
  login: adminInfo,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLoginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      adminLoginThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.login = action.payload;
      }
    );
    builder.addCase(
      adminLoginThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.loginErr = action.payload;
      }
    );
    builder.addCase(adminLogOutThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminLogOutThunk.fulfilled, (state) => {
      state.loading = false;
      state.login = null;
      state.appErr = null;
      state.loginErr = null;
    });
    builder.addCase(
      adminLogOutThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getAllCompanyInfoThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllCompanyInfoThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.AllCompanyInfo = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllCompanyInfoThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.AllCompanyInfo = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getTransactionDetailsAdminThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getTransactionDetailsAdminThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transactionAdmin = action.payload;
        state.tranErr = null;
      }
    );
    builder.addCase(
      getTransactionDetailsAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transactionAdmin = null;
        state.tranErr = action.payload;
      }
    );

    builder.addCase(makeDefaultUsageFeeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      makeDefaultUsageFeeThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.makeDefaultUsage = action.payload;
      }
    );
    builder.addCase(
      makeDefaultUsageFeeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(createParentCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createParentCategoryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.parentCategoryCreated = action.payload;
      }
    );
    builder.addCase(
      createParentCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(createSubCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createSubCategoryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.subcategoryCreated = action.payload;
      }
    );
    builder.addCase(
      createSubCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(deleteCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteCategoryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.deletedCategory = action.payload;
      }
    );
    builder.addCase(
      deleteCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(updateCategoryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateCategoryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.updatedCategory = action.payload;
      }
    );
    builder.addCase(
      updateCategoryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(fetchTransactionForAdminViewThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchTransactionForAdminViewThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transaction = action.payload;
        state.tranErr = null;
      }
    );
    builder.addCase(
      fetchTransactionForAdminViewThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.transaction = null;
        state.tranErr = action.payload;
      }
    );

    builder.addCase(admitPartnersAprrovalThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      admitPartnersAprrovalThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.approval = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      admitPartnersAprrovalThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.approval = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(adminGetAllProcessThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      adminGetAllProcessThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allProcess = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      adminGetAllProcessThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allProcess = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(serachProcessForAdminThunk.pending, (state) => {
      state.processLoading = true;
    });
    builder.addCase(
      serachProcessForAdminThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.processLoading = false;
        state.searchProcessData = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      serachProcessForAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.processLoading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(searchCompanyInfoThunk.pending, (state) => {
      state.companyLoading = true;
    });
    builder.addCase(
      searchCompanyInfoThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.companyLoading = false;
        state.searchCompanyData = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      searchCompanyInfoThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.companyLoading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(currentPartnerInfoThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      currentPartnerInfoThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allpartnersData = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      currentPartnerInfoThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allpartnersData = null;
        state.appErr = action.payload;
      }
    );
    builder.addCase(allApprovedPartnersThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      allApprovedPartnersThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allApprovedPartners = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      allApprovedPartnersThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allApprovedPartners = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(adminGetAllInquriesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      adminGetAllInquriesThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allinquiryData = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      adminGetAllInquriesThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allinquiryData = null;
        state.appErr = action.payload;
      }
    );

    builder.addCase(adminDeleteInquiryThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      adminDeleteInquiryThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.allinquiryData = action.payload;
      }
    );
    builder.addCase(
      adminDeleteInquiryThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(getUserByIdforAdminThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUserByIdforAdminThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.other = action.payload;
      }
    );

    builder.addCase(
      getUserByIdforAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(updateUserByIdforAdminThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUserByIdforAdminThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.other = action.payload;
      }
    );
    builder.addCase(
      updateUserByIdforAdminThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(createNewsThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createNewsThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.approval = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      createNewsThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.approval = null;
        state.appErr = action.payload;
      }
    );
    builder.addCase(createusagefeeMasterThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createusagefeeMasterThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.usageFeeCreated = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      createusagefeeMasterThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(createUpperLimitRateThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createUpperLimitRateThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.upperlimitRate = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      createUpperLimitRateThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getUpperlimitThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getUpperlimitThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.upperlimitRate = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getUpperlimitThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(admitREmovePartnersAprrovalThunk.pending, (state) => {
      state.partnerListLoading = true;
    });
    builder.addCase(admitREmovePartnersAprrovalThunk.fulfilled, (state) => {
      state.partnerListLoading = false;
    });
    builder.addCase(admitREmovePartnersAprrovalThunk.rejected, (state) => {
      state.partnerListLoading = false;
    });

    builder.addCase(createTaxRateThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createTaxRateThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.taxRates = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      createTaxRateThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getAllTaxRateThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllTaxRateThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.taxRates = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllTaxRateThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getAllUsageFeeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllUsageFeeThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.usagefee = action.payload;
        state.appErr = null;
      }
    );
    builder.addCase(
      getAllUsageFeeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(updateAllUsageFeeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateAllUsageFeeThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.usageFeeUpdated = action.payload;
      }
    );
    builder.addCase(
      updateAllUsageFeeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(deleteUsageFeeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      deleteUsageFeeThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.usageFeeDeleted = action.payload;
      }
    );
    builder.addCase(
      deleteUsageFeeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );
    builder.addCase(getMailTemplatesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMailTemplatesThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.mailTemplate = action.payload;
      }
    );
    builder.addCase(
      getMailTemplatesThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getAllCategoriesThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAllCategoriesThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.getAllCategories = action.payload;
      }
    );
    builder.addCase(
      getAllCategoriesThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(getCommercialActThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCommercialActThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.commercialAct = action.payload;
      }
    );
    builder.addCase(
      getCommercialActThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.appErr = action.payload;
      }
    );

    builder.addCase(createCommerciaActThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCommerciaActThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createCommerciaActThunk.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteCompanyInfoThunk.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(deleteCompanyInfoThunk.fulfilled,(state, action : PayloadAction<any>)=>{
      state.loading = false;
      state.deleteUsers = action.payload
    })
    builder.addCase(deleteCompanyInfoThunk.rejected,(state, action : PayloadAction<any>)=>{
      state.loading = false;
      state.deleteUsersErr = action.payload;
    })

    builder.addCase(deleteOrderInfoThunk.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(deleteOrderInfoThunk.fulfilled,(state, action : PayloadAction<any>)=>{
      state.loading = false;
      state.deleteTransactions = action.payload
    })
    builder.addCase(deleteOrderInfoThunk.rejected,(state, action : PayloadAction<any>)=>{
      state.loading = false;
      state.deleteTransactionsErr = action.payload;
    })

    builder.addCase(deleteProcessInfoThunk.pending,(state)=>{
      state.loading = true;
    })
    builder.addCase(deleteProcessInfoThunk.fulfilled,(state, action : PayloadAction<any>)=>{
      state.loading = false;
      state.deleteProcesses = action.payload;
    })
    builder.addCase(deleteProcessInfoThunk.rejected,(state, action : PayloadAction<any>)=>{
      state.loading = false;
      state.deleteProcessesErr = action.payload;
    })

  },
});

export const {} = adminSlice.actions;
export const selectAdmin = (state: RootState) => state.admin;
export default adminSlice.reducer;
