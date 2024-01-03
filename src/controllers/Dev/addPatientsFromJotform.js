import dotenv from "dotenv";
import axios from "axios";

import Patient from "@models/Patient";

const addPatientsFromJotform = async (req, res, next) => {
  try {
    dotenv.config({ path: ".env" });

    const submissionsApiUrl = `https://eu-api.jotform.com/user/submissions&limit=30000&apiKey=${process.env.JOTFORM_KEY}`;

    const submissions = await axios.get(submissionsApiUrl);

    const { content: submissionsContent } = submissions.data;

    submissionsContent.forEach(async (submission) => {
      let patientData = {};
      patientData.jotformFormId = submission.id;

      const { answers } = submission;

      patient = await Patient.findOne({
        jotformFormId: patientData.jotformFormId,
      });

      for (const answer in answers) {
        const currentAnswer = answers[answer];

        const answerName = currentAnswer.name;

        switch (answerName) {
          case "name":
            patientData.firstName = currentAnswer?.answer?.first;
            patientData.middleName = currentAnswer?.answer?.middle; // ??
            patientData.lastName = currentAnswer?.answer?.last;

            break;

          case "date":
            patientData.dob = new Date(currentAnswer?.answer?.datetime);
            break;

          case "currentDate":
            patientData.patientCreatedAt = new Date();
            break;

          case "maritalStatus":
            let maritalStatus;

            switch (currentAnswer.answer) {
              case "Single -  Singel":
                maritalStatus = "Single";
                break;

              case "Married - Marid":
                maritalStatus = "Married";
                break;

              case "Widowed - Winoh":
                maritalStatus = "Widowed";
                break;

              case "Divorced - Divɔs":
                maritalStatus = "Divorced";
                break;

              default:
                break;
            }

            patientData.maritalStatus = maritalStatus;

            break;

          case "numberOf":
            patientData.noOfChildren = Number(currentAnswer?.answer);
            break;

          case "whatDo":
            patientData.job = currentAnswer?.answer;
            break;

          case "whatIs":
            patientData.income = currentAnswer?.answer;
            break;

          case "howWould":
            patientData.englishSpeakingLevel =
              Number(currentAnswer?.answer) || 0;
            break;

          case "doYou15":
            patientData.ownsMobilePhone = currentAnswer?.answer === "Yes";
            break;

          case "typeA":
            patientData.geometry = {};

            const latitudeRegex = /Latitude: ([\d.-]+)/;
            const longitudeRegex = /Longitude: ([\d.-]+)/;

            const latitudeMatch = currentAnswer?.answer.match(latitudeRegex);
            const longitudeMatch = currentAnswer?.answer.match(longitudeRegex);

            if (latitudeMatch && longitudeMatch) {
              const latitude = parseFloat(latitudeMatch[1]);
              const longitude = parseFloat(longitudeMatch[1]);

              patientData.geometry.coordinates = [longitude, latitude];
            }

            break;

          case "ifYes":
            patientData.mobilePhone = currentAnswer?.answer;
            break;

          case "areYou":
            patientData.pregnant = currentAnswer?.answer === "Yes";
            break;

          case "ifYes34":
            patientData.conceivingDate =
              currentAnswer?.answer?.datetime &&
              new Date(currentAnswer?.answer?.datetime);
            break;

          case "fileUpload":
            console.log("image!");
            console.log(currentAnswer?.answer);
            patientData.patientImages = currentAnswer?.answer;
            break;

          case "gender":
            patientData.sex = currentAnswer?.answer;

            break;

          default:
            break;
        }
      }

      const newPatient = new Patient(patientData);

      await newPatient.save();
    });

    res.json(submissionsContent);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default addPatientsFromJotform;
