import Patient from "@models/Patient";

const getPatients = async (req, res, next) => {
  try {
    const { page, searchQuery, limit } = req.query;

    const LIMIT = Number(limit) || 10;

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
      .skip(startIndex)

      console.log(patients)

    res.json({
      data: patients,
      totalItems: totalPatients,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalPatients / LIMIT),
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getPatients;
