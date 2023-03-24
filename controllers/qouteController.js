exports.quoteController = async (req, res) => {
    try {

        qouteArray = ["Good food is good mood", "I’m soy into you.", "Food shared is happiness multiplied.", "Let’s gain some weight!", "Food is love made edible", "The secret ingredient is always cheese.", "Hunger is a good cook", "Good food, good mood.", "Grocery shopping: because diets don't work on an empty fridge.", "Grocery shopping: because lattes don't grow on trees.", "Shop like you love yourself.", "Grocery shopping: because diets don't start themselves.", "Shop like a boss, cook like a pro."];

        var num = Math.random() * (qouteArray.length - 0);

        console.log(parseInt(num));

        return res.status(200).json({
            message: "Success",
            data: qouteArray[parseInt(num)],
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};