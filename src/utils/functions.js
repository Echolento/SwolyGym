import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from "./swoldier";
const exercises = exercisesFlattener(EXERCISES);

export function generateWorkout(args) {
    const { muscles, poison: workout, goals } = args;
    let exerciseKeys = Object.keys(exercises);
    exerciseKeys = exerciseKeys.filter((key) => exercises[key].meta.environment !== "home");
    let includedTracker = [];
    let listOfMuscles;

    if (workout === "individual") {
        listOfMuscles = muscles;
    } else {
        listOfMuscles = WORKOUTS[workout][muscles[0]];
    }

    listOfMuscles = new Set(shuffleArray(listOfMuscles));
    const arrOfMuscles = Array.from(listOfMuscles);
    const scheme = goals;

    // Error handling for invalid scheme
    if (!SCHEMES[scheme]) {
        console.error(`Invalid scheme: ${scheme}`);
        return []; // Return an empty array or handle it as needed
    }

    const sets = SCHEMES[scheme].ratio.reduce((acc, curr, index) => {
        const setType = index === 0 ? "compound" : "accessory";
        return [
            ...acc,
            ...Array(parseInt(curr)).fill({ setType }),
        ];
    }, []).map((set, index) => {
        const muscleGroupToUse = arrOfMuscles[index % arrOfMuscles.length];
        return { ...set, muscleGroup: muscleGroupToUse };
    });

    const { compound: compoundExercises, accessory: accessoryExercises } =
        exerciseKeys.reduce((acc, curr) => {
            const exercise = exercises[curr];
            const matchesMuscle = exercise.muscles.some(muscle => listOfMuscles.has(muscle));
            if (matchesMuscle) {
                acc[exercise.type] = {
                    ...acc[exercise.type],
                    [curr]: exercise,
                };
            }
            return acc;
        }, { compound: {}, accessory: {} });

    const genWOD = sets.map(({ setType, muscleGroup }) => {
        const data = setType === "compound" ? compoundExercises : accessoryExercises;
        const filteredData = Object.keys(data)
            .filter(curr => !includedTracker.includes(curr) && data[curr].muscles.includes(muscleGroup));

        let randomExercise = filteredData[Math.floor(Math.random() * filteredData.length)] ||
            Object.keys(setType === "compound" ? accessoryExercises : compoundExercises)
            .filter(val => !includedTracker.includes(val))[0];

        if (!randomExercise) {
            return {};
        }

        let repsOrDuration = exercises[randomExercise].unit === "reps"
            ? Math.min(...SCHEMES[scheme].repRanges) + Math.floor(Math.random() * (Math.max(...SCHEMES[scheme].repRanges) - Math.min(...SCHEMES[scheme].repRanges))) + (setType === "accessory" ? 4 : 0)
            : Math.floor(Math.random() * 40) + 20;

        const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];

        if (exercises[randomExercise].unit === "reps") {
            const tempoSum = tempo.split(" ").reduce((acc, curr) => acc + parseInt(curr), 0);
            if (tempoSum * repsOrDuration > 85) {
                repsOrDuration = Math.floor(85 / tempoSum);
            }
        } else {
            repsOrDuration = Math.ceil(repsOrDuration / 5) * 5;
        }

        includedTracker.push(randomExercise);

        return {
            name: randomExercise,
            tempo,
            rest: SCHEMES[scheme]["rest"][setType === "compound" ? 0 : 1],
            reps: repsOrDuration,
            ...exercises[randomExercise],
        };
    });

    return genWOD.filter(element => Object.keys(element).length > 0);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function exercisesFlattener(exercisesObj) {
    const flattenedObj = {};

    for (const [key, val] of Object.entries(exercisesObj)) {
        if (!val.variants) {
            flattenedObj[key] = val;
        } else {
            for (const variant in val.variants) {
                const variantName = `${variant}_${key}`;
                const variantSubstitutes = Object.keys(val.variants)
                    .filter(sub => sub !== variant)
                    .map(sub => `${sub} ${key}`);

                flattenedObj[variantName] = {
                    ...val,
                    description: `${val.description}___${val.variants[variant]}`,
                    substitutes: [...val.substitutes, ...variantSubstitutes].slice(0, 5),
                };
            }
        }
    }
    return flattenedObj;
}
