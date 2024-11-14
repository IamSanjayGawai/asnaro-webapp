import CityPivot from "../models/City_Pivot.js";

export const getAllStates = async (req, res) => {
  try {
    const states = await CityPivot.find({}).sort({ pref_id: 1 });
    const uniqueStates = [...new Set(states.map((state) => state.state))];
    res.json(uniqueStates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/*
//Alternate code to get all states
export const getAllStates = async (req, res) => {
  try {
    const states = await CityPivot.aggregate([
      { $group: { _id: "$state", pref_id: { $first: "$pref_id" } } },
      { $sort: { pref_id: 1 } },
      { $project: { _id: 0, state: "$_id" } }
    ]);

    const sortedStates = states.map(state => state.state);

    console.log(sortedStates);
    res.json(sortedStates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 */

//Registering pref_id to all cities in a state
export const RegisterPrefId = async (req, res) => {
  try {
    const { pref_id, state } = req.body;
    const newCityPivot = await CityPivot.find({ state: state });
    console.log(newCityPivot);
    newCityPivot.forEach((city) => {
      city.pref_id = pref_id;
      city.save();
    });
    res.json(newCityPivot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUniqueCities = async (req, res) => {
  try {
    const { state } = req.params;
    const trimmedState = state.trim(); // Remove leading/trailing whitespaces
    const uniqueCities = await CityPivot.distinct("city", {
      state: trimmedState,
    });

    res.json(uniqueCities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAreaAndCitiesByState = async (req, res) => {
  try {
    const { state } = req.params;
    const trimmedState = state.trim();

    let uniqueAreas = [];

    if (state === "all") {
      uniqueAreas = await CityPivot.distinct("area");
    } else {
      uniqueAreas = await CityPivot.distinct("area", {
        state: trimmedState,
      });
    }

    const CitiesWithArea = await Promise.all(
      uniqueAreas.map(async (area) => {
        const citiesInArea = await CityPivot.distinct("city", {
          area: area.trim(),
        });
        return { area, cities: citiesInArea };
      })
    );

    res.json(CitiesWithArea);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
