import Record from "../models/record.model.js";

export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, notes } = req.body;

    // validations
    if (!amount || !type || !category) {
      return res.status(400).json({
        success: false,
        message: "Amount, type and category are required",
      });
    }

    // creating record
    const record = await Record.create({
      user: req.user._id,
      amount,
      type,
      category,
      date,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Record created successfully",
      data: record,
    });
  } catch (error) {
    console.error("CreateRecord Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create record",
    });
  }
};

export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    console.log(req.query)

    const filter = { user: req.user._id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    console.log(filter)

    const records = await Record.find(filter).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("GetRecords Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch records",
    });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    // check if record is owned by logged in user
    if (record.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const updatedRecord = await Record.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("UpdateRecord Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update record",
    });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }

    // check if record is owned by logged in user if not don't allow
    if (record.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await record.deleteOne();

    res.status(200).json({
      success: true,
      message: "Record deleted successfully",
    });
  } catch (error) {
    console.error("DeleteRecord Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete record",
    });
  }
};
