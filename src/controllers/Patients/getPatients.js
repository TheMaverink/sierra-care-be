import Patient from "@models/Patient";

const getPatients = async (req, res, next) => {
  try {
    const { page, limit, searchQuery, gender, ageMin, ageMax } = req.query;

    const LIMIT = Number(limit) || 10;

    const startIndex = (Number(page) - 1) * LIMIT;

    let patientSearchQueryCriteria = {};

    if (searchQuery && searchQuery !== "") {
   

      // const searchRegex = searchQuery
      //   .split(" ")
      //   .map((namePart) => `(?=.*${namePart})`)
      //   .join("");

        const patientSearchQuery = new RegExp(searchQuery, "i");

      // console.log("searchQuery");
      // console.log(searchQuery);
      // console.log("searchRegex");
      // console.log(searchRegex);

      patientSearchQueryCriteria = {
        ...patientSearchQueryCriteria,
        $or: [
          { firstName: patientSearchQuery },
          { middleName: patientSearchQuery },
          { lastName: patientSearchQuery },
        ],
      };
    }

    if (gender && gender !== "all") {
      patientSearchQueryCriteria.gender = gender;
    }

    if (ageMin && ageMax) {
      patientSearchQueryCriteria.dob = {
        $gte: new Date(
          new Date().setFullYear(new Date().getFullYear() - ageMax)
        ),
        $lte: new Date(
          new Date().setFullYear(new Date().getFullYear() - ageMin)
        ),
      };
    }

    const totalPatients = await Patient.countDocuments(
      patientSearchQueryCriteria
    );

    const patients = await Patient.find(patientSearchQueryCriteria)
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

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
