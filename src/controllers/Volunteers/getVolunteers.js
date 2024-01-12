import Volunteer from "@models/Volunteer";

const getVolunteers = async (req, res, next) => {
  try {
    const { page, searchQuery, limit } = req.query;

    const LIMIT = Number(limit) || 10;

    const startIndex = (Number(page) - 1) * LIMIT;

    const volunteersSearchQuery = new RegExp(searchQuery, "i");

    const volunteersSearchQueryCriteria = {
      $or: [
        { firstName: volunteersSearchQuery },
        { middleName: volunteersSearchQuery },
        { lastName: volunteersSearchQuery },
      ],
    };

    const totalVolunteers = await Volunteer.countDocuments(
      volunteersSearchQueryCriteria
    );

    const volunteers = await Volunteer.find(volunteersSearchQueryCriteria)
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    console.log(volunteers);

    res.json({
      data: volunteers,
      totalItems: totalVolunteers,
      currentPage: Number(page),
      numberOfPages: Math.ceil(totalVolunteers / LIMIT),
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getVolunteers;
