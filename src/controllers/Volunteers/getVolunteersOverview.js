import Volunteer from "@models/Volunteer";

const getVolunteersOverview = async (req, res, next) => {
  try {
    const totalVolunteers = await Volunteer.countDocuments();
    const totalDoctors = await Volunteer.countDocuments({ job: "doctor" });

    const overviewData = {
      totalVolunteers,
      totalDoctors,
    };

    console.log("overviewData");

    console.log(overviewData);

    res.json({
      ...overviewData,
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getVolunteersOverview;
