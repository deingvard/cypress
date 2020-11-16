/// <reference types="cypress" />

describe('JSON objects', () => {
    it('JSON objects', () => {
        cy.openHomePage()

        const simpleObject = {"key": "value", "key2": "value2"}
        const simpleArrayOfValues = ["one", "two", "three"]
        const arrayOfObjects = [{"key": "value"}, {"key2": "value2"}, {"key3": "value3"}]
        const typesOfData = {"string": "this is a string", "number": 10}
        const mix = {
            "FirstName": "James",
            "LastName": "Stone",
            "Age": 40,
            "Students": [
                {
                    "firstName": "Sara",
                    "lastName": "Conor"
                },
                {
                    "firstName": "Bruce",
                    "lastName": "Willis"
                }
            ]
        }
        console.log(simpleObject.key)
        console.log(simpleObject["key"])

        console.log(simpleObject.key2)
        console.log(simpleObject["key2"])

        console.log(simpleArrayOfValues[0])
        console.log(simpleArrayOfValues[1])
        console.log(simpleArrayOfValues[2])

        console.log(arrayOfObjects["key"])
        console.log(arrayOfObjects["key2"])
        console.log(arrayOfObjects["key3"])

        console.log(typesOfData["string"])
        console.log(typesOfData["number"])

        console.log(mix.Students[0].firstName)
        console.log(mix.FirstName)
        console.log(mix.LastName)

        const lastNameOfSecondStudent = mix.Students[1].lastName
    });
})