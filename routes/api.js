const router = require("express").Router();
const {Workout} = require("../models");


// Get the most recent workout
router.get("/api/workouts", (req, res) => {
  Workout
    .aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ])
    .sort({ day: -1 })
    .limit(1)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Add Exercise
router.put('/api/workouts/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    Workout.findByIdAndUpdate(req.params.id, {$push: {exercises: req.body}}, { new: true, runValidators: true })
        .then(dbWorkout => {
            console.log(dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })

})

// Create Workout
router.post("/api/workouts", (req , res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Get Workouts in range (the last 7 workouts)
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercises.duration"}
            }
        }
    ])
    .sort({ day: -1 })
    .limit(7)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


module.exports = router;
