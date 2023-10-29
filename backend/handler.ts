"use strick"

module.exports.lamdatest = async (event) => {
    return {
        statusCode:200,
        body: JSON.stringify(
            {
                message: "Go to datpt57's serverless",
                input: event,

            },
            null,
            2
        )
    }
    
}