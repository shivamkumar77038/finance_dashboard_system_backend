import Record from "../models/Record.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

export const createRecord = asyncHandler(async (req, res) => {
  const record = await Record.create({
    ...req.body,
    createdBy: req.user.id,
  });

  return successResponse(res, 201, "Record created", record);
});

export const getRecords = asyncHandler(async (req, res) => {
  const { type, category, startDate, endDate } = req.query;

  let filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const records = await Record.find(filter);

  return successResponse(res, 200, "Records fetched", records);
});

export const updateRecord = asyncHandler(async (req, res) => {
  const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  return successResponse(res, 200, "Updated", record);
});

export const deleteRecord = asyncHandler(async (req, res) => {
  await Record.findByIdAndDelete(req.params.id);

  return successResponse(res, 200, "Deleted");
});