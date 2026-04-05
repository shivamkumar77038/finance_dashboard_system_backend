import Record from "../models/Record.js";
import asyncHandler from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";

export const getSummary = asyncHandler(async (req, res) => {
  const records = await Record.find();

  let income = 0,
    expense = 0,
    categoryMap = {};

  records.forEach((r) => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;

    categoryMap[r.category] =
      (categoryMap[r.category] || 0) + r.amount;
  });

  return successResponse(res, 200, "Summary", {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
    categoryBreakdown: categoryMap,
  });
});