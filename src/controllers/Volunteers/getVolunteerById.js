import Volunteer from "@models/Volunteer";

const getVolunteerById = async (req, res, next) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .populate("logs")
      .lean();

    if (volunteer) {
      res.status(200).json({ ...volunteer });
    } else {
      return res.status(404).json({ message: "Volunteer not found" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getVolunteerById;
