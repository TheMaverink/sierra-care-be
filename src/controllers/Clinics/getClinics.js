import Clinic from "@models/Clinic";

const getClinics = async (req, res, next) => {
  try {
    const { page, limit, searchQuery } = req.query;

    const LIMIT = Number(limit) || 10;

    const startIndex = (Number(page) - 1) * LIMIT;

    const clinicsSearchQuery = new RegExp(searchQuery, "i");

    const clinicsSearchQueryCriteria = {
      $or: [{ name: clinicsSearchQuery }],
    };

    const totalClinics = await Clinic.countDocuments(
      clinicsSearchQueryCriteria
    );

    const clinics = await Clinic.find(clinicsSearchQueryCriteria)
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    console.log(clinics);

    res.json({
      data: clinics,
      totalItems: totalClinics,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalClinics / LIMIT),
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getClinics;
