import { NextFunction, Request, Response } from "express";
import { InvalidInput } from "../utils/customErrors";
import { Data } from "../models/Data";

export async function addData(req: Request, res: Response, next: NextFunction) {
  try {
    const { key, value } = req.body;
    if (!key) {
      throw new InvalidInput({
        message: "The provided key is not valid or missing.",
        code: "INVALID_KEY",
      });
    }

    if (!value) {
      throw new InvalidInput({
        message: "The provided value is not valid or missing.",
        code: "INVALID_VALUE",
      });
    }

    // Check if the key already exists
    const existingData = await Data.findOne({
      where: {
        key,
      },
    });

    if (existingData) {
      throw new InvalidInput({
        message:
          "The provided key already exists in the database. To update an existing key, use the update API.",
        code: "KEY_EXISTS",
      });
    }

    // Create the data entry in the database
    await Data.create({ ...req.body });

    // Respond with success message
    return res.status(201).json({
      status: "success",
      message: "Data stored successfully.",
    });
  } catch (error: any) {
    if (error instanceof InvalidInput) {
      next(error);
    } else {
      throw new InvalidInput(
        {
          message: "Internal server error occurred. Please try again later.",
          code: "INTERNAL_ERROR",
        },
        500
      );
    }
  }
}

export async function getData(req: Request, res: Response, next: NextFunction) {
  try {
    const { key } = req.params;

    // Find data by the provided key
    const data = await Data.findOne({
      where: {
        key,
      },
    });

    if (!data) {
      throw new InvalidInput({
        message: "The provided key does not exist in the database.",
        code: "KEY_NOT_FOUND",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        key: data.key,
        value: data.value,
      },
    });
  } catch (error: any) {
    if (error instanceof InvalidInput) {
      next(error);
    } else {
      throw new InvalidInput(
        {
          message: "Internal server error occurred. Please try again later.",
          code: "INTERNAL_ERROR",
        },
        500
      );
    }
  }
}

export async function updateData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { key } = req.params;
    const { value } = req.body;

    // Find data by the provided key
    const data = await Data.findOne({
      where: {
        key,
      },
    });

    if (!data) {
      throw new InvalidInput({
        message: "The provided key does not exist in the database.",
        code: "KEY_NOT_FOUND",
      });
    }

    // Update the value and save the data
    data.value = value;
    await data.save();

    return res.status(200).json({
      status: "success",
      message: "Data updated successfully.",
    });
  } catch (error: any) {
    if (error instanceof InvalidInput) {
      next(error);
    } else {
      throw new InvalidInput(
        {
          message: "Internal server error occurred. Please try again later.",
          code: "INTERNAL_ERROR",
        },
        500
      );
    }
  }
}

export async function deleteData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { key } = req.params;

    // Find data by the provided key
    const data = await Data.findOne({
      where: {
        key,
      },
    });

    if (!data) {
      throw new InvalidInput({
        message: "The provided key does not exist in the database.",
        code: "KEY_NOT_FOUND",
      });
    }

    // Delete the data
    await data.destroy();

    return res.status(200).json({
      status: "success",
      message: "Data deleted successfully.",
    });
  } catch (error: any) {
    if (error instanceof InvalidInput) {
      next(error);
    } else {
      throw new InvalidInput(
        {
          message: "Internal server error occurred. Please try again later.",
          code: "INTERNAL_ERROR",
        },
        500
      );
    }
  }
}
