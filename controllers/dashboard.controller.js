import Record from "../models/record.model.js";

export const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await Record.find({ user: userId });

    // total income summary
    const totalIncome = records
      .filter((record) => record.type === "income")
      .reduce((sum, record) => sum + record.amount, 0);

    //total expense summary
    const totalExpense = records
      .filter((record) => record.type === "expense")
      .reduce((sum, record) => sum + record.amount, 0);

    // balance
    const balance = totalIncome - totalExpense;

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        balance,
      },
    });
  } catch (error) {
    console.error("Summary Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch summary",
    });
  }
};

export const getCategoryTotals = async (req, res) => {
  try {
    const userId = req.user._id;

    //aggregating the data
    const data = await Record.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Category Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch category totals",
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await Record.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("Recent Activity Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activity",
    });
  }
};

export const getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user._id;

    //filter by year
    const year = req.query.year || new Date().getFullYear();

    const trends = await Record.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$date" },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id",
          totalIncome: 1,
          totalExpense: 1,
          balance: { $subtract: ["$totalIncome", "$totalExpense"] },
        },
      },
      { $sort: { month: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: trends,
    });
  } catch (error) {
    console.error("Trends Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch trends",
    });
  }
};
