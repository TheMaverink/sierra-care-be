import Volunteer from "@models/Volunteer";

const isVolunteerLoggedIn = async (req, res, next) => {
  try {
    
    const volunteer = await Volunteer.findById(req?.volunteer?.id).select(
      "-password -tokens"
    );

    console.log("volunteer");
    console.log(volunteer);

    res.json({
        isVolunteerLoggedIn: !!volunteer,
        volunteer: volunteer || null
    });
  } catch (err) {
    console.error(err.message);
    res.status(401).send("Auth failed");
  }
};

export default isVolunteerLoggedIn;
