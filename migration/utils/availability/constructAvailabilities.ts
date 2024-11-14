import { Availability } from "../../types/availabilityTypes";
import { selectStatus } from "./statusSelection";

// export interface Availability {
//   process_id: number;
//   availability_date: Date;
//   status: number;
// }

export const constructedAvailabilityArray = (
  process_id: number,
  availabilityArray: Availability[]
) => {
  const filteredAvailabilities = availabilityArray
    .filter(
      (availability: Availability) => availability.process_id === process_id
    )
    .map((availability: Availability) => {
      return {
        date: availability.availability_date,
        selectedStatus: selectStatus(availability.status),
      };
    });
  return filteredAvailabilities;
};
