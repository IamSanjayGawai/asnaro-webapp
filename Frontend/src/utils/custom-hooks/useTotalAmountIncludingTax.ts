import { useAppSelector } from "@/state/hooks";
import { selectTransaction } from "@/state/slices/transactionSlice";

export const useTotalAmountIncludingTax = () => {
  const { quatation: quotation } = useAppSelector(selectTransaction);
  const lastQuotationObject =
    quotation && quotation?.length > 0 ? quotation[quotation.length - 1] : null;

  return lastQuotationObject
    ? lastQuotationObject.totalAmountIncludingTax
    : null;
};
