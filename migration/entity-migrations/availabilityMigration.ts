import mongoose from "mongoose";
import { QueryResult } from "mysql2";
import Availibility from "../models/Availibility";
import { selectStatus } from "../utils/availability/statusSelection";
import { constructedAvailabilityArray } from "../utils/availability/constructAvailabilities";
import { Availability } from "../types/availabilityTypes";
import { Process } from "../types/processTypes";

export const availabilitiesMigration = async (
  sqlProcessAvailabilities: QueryResult,
  processes: Process[]
) => {
  const availabilityArray = Array.isArray(sqlProcessAvailabilities)
    ? (sqlProcessAvailabilities as Availability[])
    : [];
  const processIdsInAvailabilities =
    availabilityArray.length > 0
      ? availabilityArray.map((availability) => availability.process_id)
      : [];
  const uniqueAvailabilityProcesses = processIdsInAvailabilities
    .filter(
      (availability: number, index: number) =>
        processIdsInAvailabilities.indexOf(availability) === index
    )
    .map((process: number) => {
      const findProcessById = processes.find(
        (searchedProcess: Process) => searchedProcess.process_id === process
      );
      if (findProcessById)
        return {
          sql_process_id: process,
          process_id: new mongoose.Types.ObjectId(`${findProcessById._id}`),
          availability: constructedAvailabilityArray(
            process,
            availabilityArray
          ),
        };
      else {
        return "no process found";
      }
    });

  const filteredAvailabilities = uniqueAvailabilityProcesses.filter(
    (availability: any) => availability !== "no process found"
  );

  const availabilities = await Promise.all(
    filteredAvailabilities.map((availability: any) =>
      Availibility.create(availability)
    )
  );

  return {
    availabilities,
  };
};
