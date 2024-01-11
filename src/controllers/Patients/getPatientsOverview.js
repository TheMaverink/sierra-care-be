import Patient from "@models/Patient";

const getPatientsOverview = async (req, res, next) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalMalePatients = await Patient.countDocuments({ gender: "male" });
    const totalFemalePatients = await Patient.countDocuments({
      gender: "female",
    });
    const totalUnknownGenderPatients = await Patient.countDocuments({
      gender: "unknown",
    });
    const totalOtherGenderPatients = await Patient.countDocuments({
      gender: "other",
    });

    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setUTCHours(0, 0, 0, 0);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(today);
    endOfWeek.setUTCHours(23, 59, 59, 999);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    const startOfThisYear = new Date(today.getFullYear(), 0, 1);
    const endOfThisYear = new Date(today.getFullYear() + 1, 0, 1);

    const patientsCreatedThisWeek = await Patient.countDocuments({
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    });

    const patientsBornThisYear = await Patient.countDocuments({
      dob: {
        $gte: startOfThisYear,
        $lt: endOfThisYear,
      },
    });

    const unknownEnglishSpeakingPatients = await Patient.countDocuments({
      englishSpeakingLevel: "unknown",
    });

    const noEnglishSpeakingPatients = await Patient.countDocuments({
      englishSpeakingLevel: "none",
    });

    const beginnerEnglishSpeakingPatients = await Patient.countDocuments({
      englishSpeakingLevel: "beginner",
    });

    const elementaryEnglishSpeakingPatients = await Patient.countDocuments({
      englishSpeakingLevel: "elementary",
    });

    const intermediateEnglishSpeakingPatients = await Patient.countDocuments({
      englishSpeakingLevel: "intermediate",
    });

    const advancedEnglishSpeakingPatients = await Patient.countDocuments({
      englishSpeakingLevel: "advanced",
    });

    const patientsDeaths = await Patient.countDocuments({
      dateOfDeath: { $exists: true },
    });

    const patientsWithMobilePhoneAccess = await Patient.countDocuments({
      ownsMobilePhone: true,
    });

    const yearsAgo = (years) => {
      return new Date(
        today.getFullYear() - years,
        today.getMonth(),
        today.getDate()
      );
    };

    const ageRange1 = await Patient.countDocuments({
      dob: { $gte: yearsAgo(18) },
    });
    const ageRange2 = await Patient.countDocuments({
      dob: { $lte: yearsAgo(18), $gt: yearsAgo(25) },
    });

    const ageRange3 = await Patient.countDocuments({
      dob: { $lte: yearsAgo(25), $gt: yearsAgo(35) },
    });

    const ageRange4 = await Patient.countDocuments({
      dob: { $lte: yearsAgo(35), $gt: yearsAgo(45) },
    });
    const ageRange5 = await Patient.countDocuments({
      dob: { $lte: yearsAgo(45), $gt: yearsAgo(55) },
    });

    const ageRange6 = await Patient.countDocuments({
      dob: { $lte: yearsAgo(55) },
    });

    const overviewData = {
      totalPatients,
      totalMalePatients,
      totalFemalePatients,
      totalUnknownGenderPatients,
      totalOtherGenderPatients,
      patientsCreatedThisWeek,
      patientsBornThisYear,
      unknownEnglishSpeakingPatients,
      noEnglishSpeakingPatients,
      beginnerEnglishSpeakingPatients,
      elementaryEnglishSpeakingPatients,
      intermediateEnglishSpeakingPatients,
      advancedEnglishSpeakingPatients,
      patientsDeaths,
      patientsWithMobilePhoneAccess,
      ageRange1,
      ageRange2,
      ageRange3,
      ageRange4,
      ageRange5,
      ageRange6,
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

export default getPatientsOverview;
