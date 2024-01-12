import Log from "@models/Log";

const getLogs = async (req, res, next) => {
  try {
    const logs = await Log.find();

    res.json({
      ...logs,
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getLogs;
