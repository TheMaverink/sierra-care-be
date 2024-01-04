import Patient from "@models/Patient";

const getPatients = async (req, res, next) => {
  try {
    const { page, searchQuery, limit } = req.query;

    const LIMIT = limit || 10;

    const startIndex = (Number(page) - 1) * LIMIT;

    const patientSearchQuery = new RegExp(searchQuery, "i");

    const patientSearchQueryCriteria = {
      $or: [
        { firstName: patientSearchQuery },
        { middleName: patientSearchQuery },
        { lastName: patientSearchQuery },
      ],
    };

    const totalPatients = await Patient.countDocuments(
      patientSearchQueryCriteria
    );

    const patients = await Patient.find(patientSearchQueryCriteria)
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: patients,
      currentPage: Number(page) || 1,
      numberOfPages: Math.ceil(totalPatients / LIMIT),
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getPatients;
