answers = {
    // In total, how many pounds have these athletes Bench Pressed?
    "q1": null,
  
    // How many pounds did Barry Moore Back Squat in 2016?
    "q2": null,
  
    // In what month of 2017 did Barry Moore Back Squat the most total weight?
    "q3": null,
  
    // What is Abby Smith's Bench Press PR weight?
    // PR defined as the most the person has ever lifted for that exercise, regardless of reps performed.
    "q4": null
  }
  
  
  const { captureRejectionSymbol } = require("events");
  // Load data
  var fs = require("fs");
  var fileContentsUsers = fs.readFileSync("./users.json");
  var fileContentsExercises = fs.readFileSync("./exercises.json");
  var fileContentsWorkouts = fs.readFileSync("./workouts.json");
  var users = JSON.parse(fileContentsUsers);
  var exercises = JSON.parse(fileContentsExercises);
  var workouts = JSON.parse(fileContentsWorkouts);
  
  // Candidate TODO: Write code to answer questions
  const getExerciseId = (exerciseType) => exercises.find(exercise => exercise.title === exerciseType).id;
  
  const getTotalWeight = (exerciseId) => {
    return workouts
      .flatMap(workout => workout.blocks)
      .filter(block => block.exercise_id === exerciseId)
      .flatMap(block => block.sets)
      .filter(set => set.reps !== null && set.weight !== null)
      .reduce((totalWeight, set) => totalWeight + (set.reps * set.weight), 0);
  }
  
  const getUserId = (name_first, name_last) => (
    users.find(user => user.name_first === name_first && user.name_last === name_last).id
  )
  
  const getTotalWeightByYear = (id, exerciseType, date) => (
    workouts
    .filter(workout => workout.user_id === id && workout.datetime_completed.includes(date))
    .flatMap(workout => workout.blocks)
    .filter(block => block.exercise_id === exerciseType)
    .flatMap(block => block.sets)
    .filter(set => set.reps !== null && set.weight !== null)
    .reduce((totalWeight, set) => totalWeight + (set.reps * set.weight), 0)
  )
  
  const benchPressId = getExerciseId("Bench Press")
  const barryUserId = getUserId("Barry", "Moore")
  const backSquatExerciseId = getExerciseId("Back Squat")
  
  
  answers["q1"] = getTotalWeight(benchPressId)
  answers["q2"] = getTotalWeightByYear(barryUserId, backSquatExerciseId, "2018")
  
  
  // Output answers
  console.log(JSON.stringify(answers));