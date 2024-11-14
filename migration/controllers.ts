import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { connectSQLDatabase } from "./db-connections/mysqlconnect";
import {
  selectAllCategories,
  selectPrefs,
  selectAllUsers,
  selectAllProcesses,
  selectAllReviews,
  selectAllAvailabilities,
} from "./utils/queries";
import { userMigration } from "./entity-migrations/userMigration";
import { categoryMigration } from "./entity-migrations/categoryMigration";
import { processesMigration } from "./entity-migrations/processMigration";
import { availabilitiesMigration } from "./entity-migrations/availabilityMigration";
import { Process, User } from "./types/processTypes";

export const migrationController = async (req: Request, res: Response) => {
  try {
    const sqlConnection = await connectSQLDatabase();

    const [sqlUsers] = await sqlConnection.execute(selectAllUsers());
    const [sqlPrefs] = await sqlConnection.execute(selectPrefs());
    const [sqlCategories] = await sqlConnection.execute(selectAllCategories());
    const [sqlProcesses] = await sqlConnection.execute(selectAllProcesses());
    const [sqlProcessReviews] = await sqlConnection.execute(selectAllReviews());
    const [sqlProcessAvailabilities] = await sqlConnection.execute(
      selectAllAvailabilities()
    );

    const { categories } = await categoryMigration(sqlCategories);
    const { users } = (await userMigration(sqlUsers, sqlPrefs)) as {
      users: User[];
    };
    const { processes } = (await processesMigration(
      sqlProcesses,
      sqlProcessReviews,
      sqlPrefs,
      users
    )) as { processes: Process[] };
    const { availabilities } = await availabilitiesMigration(
      sqlProcessAvailabilities,
      processes
    );

    return res.status(StatusCodes.OK).json({
      message: "success",
      users,
      processes,
      categories,
      availabilities,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "failed",
    });
  }
};
