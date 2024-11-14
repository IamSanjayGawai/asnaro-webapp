import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { RiFilter3Line } from "react-icons/ri";
import { useAppSelector } from "@/state/hooks";
import { selectTransaction } from "@/state/slices/transactionSlice";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  statusLabels: {
    label: string;
    key: string | string[];
  }[];
  setFilter: (status: string[]) => void;
  handlePageChange: (page: number) => void;
};

export function DrawerDemo({
  isOpen,
  setIsOpen,
  statusLabels,
  setFilter,
  handlePageChange,
}: Props) {
  const { transactionStatus } = useAppSelector(selectTransaction);
  const [newFilter, setNewFilter] = useState<string[]>([]);
  console.log("newFilter", newFilter);
  return (
    <Drawer open={isOpen}>
      <DrawerContent>
        <div className="">
          <DrawerHeader>
            <div className="flex items-center gap-2">
              <RiFilter3Line className="w-6 h-6 text-[#171717]" />
              <DrawerTitle className="text-[#171717]">Filters</DrawerTitle>
            </div>
          </DrawerHeader>
          <hr className="mb-8" />
          <DrawerDescription>
            {statusLabels.map((status) => (
              <div
                key={
                  Array.isArray(status.key) ? status.key.join("-") : status.key
                }
                onClick={() =>
                  setNewFilter(
                    Array.isArray(status.key) ? [status.key[0]] : [status.key]
                  )
                }
                className="flex gap-2 items-center pl-4 mt-8"
              >
                <Checkbox
                  checked={
                    Array.isArray(newFilter)
                      ? newFilter.includes(
                          Array.isArray(status.key) ? status.key[0] : status.key
                        )
                      : false
                  }
                  id={`${
                    Array.isArray(status.key)
                      ? status.key.join("-")
                      : status.key
                  }`}
                  className="rounded-full text-white"
                />
                <label
                  htmlFor={`check_${
                    Array.isArray(status.key)
                      ? status.key.join("-")
                      : status.key
                  }`}
                  className="text-sm cursor-pointer font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                >
                  {status.label}(
                  {transactionStatus && transactionStatus?.countInfo
                    ? transactionStatus?.countInfo.reduce((acc, item) => {
                        if (Array.isArray(status.key)) {
                          return (
                            acc +
                            (status.key.includes(item.status.toString())
                              ? item.count
                              : 0)
                          );
                        }
                        return (
                          acc +
                          (item.status === parseInt(status.key)
                            ? item.count
                            : 0)
                        );
                      }, 0)
                    : 0}
                  )
                </label>
              </div>
            ))}
          </DrawerDescription>

          <hr className="mt-10" />
          <DrawerFooter>
            <div className="flex w-full justify-between gap-4">
              <DrawerClose asChild>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="w-full rounded-none "
                >
                  Cancel
                </Button>
              </DrawerClose>
              <DrawerClose asChild>
                <Button
                  onClick={(e) => {
                    setIsOpen(false);
                    e.preventDefault();
                    setFilter(newFilter);
                    handlePageChange(1);
                  }}
                  className="w-full rounded-none text-white"
                >
                  Apply
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
