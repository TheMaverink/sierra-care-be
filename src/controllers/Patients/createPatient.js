import Patient from "@models/Patient";
import {
  PATIENTS_HEALTH_RISKS,
  PATIENTS_ENGLISH_SPEAKING_LEVELS,
  BLOOD_TYPES
} from "consts";

const createPatient = async (req, res, next) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      maritalStatus,
      noOfChildren,
      job,
      income,
      englishSpeakingLevel,
      ownsMobilePhone,
      mobilePhone,
      locationCoordinates,
      address,
      pregnant,
      conceivingDate,
      email,
      patientImages,
      bloodType,
      healthRisk,
    } = req.body;

    console.log(
      firstName,
      middleName,
      lastName,
      dob,
      gender,
      maritalStatus,
      noOfChildren,
      job,
      income,
      englishSpeakingLevel,
      ownsMobilePhone,
      mobilePhone,
      locationCoordinates,
      address,
      pregnant,
      conceivingDate,
      email,
      patientImages,
      bloodType,
      healthRisk
    );

    let patient = await Patient.findOne({
      email,
      mobilePhone,
      firstName,
      lastName,
    });

    if (patient) {
      return res.status(400).json({
        errors: [
          {
            msg: "Sorry, this patient is already registered!",
          },
        ],
      });
    }

    patient = new Patient({
      firstName,
      middleName,
      lastName,
      dob,
      gender: gender?.toLowerCase(),
      maritalStatus: maritalStatus && maritalStatus.toLowerCase(),
      noOfChildren,
      job,
      income,
      englishSpeakingLevel: englishSpeakingLevel
        ? Object.values(PATIENTS_ENGLISH_SPEAKING_LEVELS)[englishSpeakingLevel]
        : PATIENTS_ENGLISH_SPEAKING_LEVELS.UNKNOWN,
      ownsMobilePhone,
      mobilePhone,
      locationCoordinates,
      address,
      pregnant,
      conceivingDate,
      email,
      patientImages,
      bloodType: bloodType ||  BLOOD_TYPES.UNKNOWN ,
      healthRisk: healthRisk
        ? Object.values(PATIENTS_HEALTH_RISKS)[healthRisk]
        : PATIENTS_HEALTH_RISKS.UNKNOWN,
      createdBy: req.volunteer.id,
    });

    await patient.save();

    console.log("patient");
    console.log(patient);

    res.status(200).send({ ...patient });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default createPatient;
