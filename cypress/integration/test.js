const { expect } = require("chai")

const { _ } = Cypress

const words = ['application', 'programming', 'interface', 'wizard', 'frizar'];

const tests = [
    {
        "test_input": "axvzermqapplication",
        "test_output": "lose",
        "hangman_parts": 6,
        "worng_letters": "xvzermq",
        "wright_letters": "aa"
    },
    {
        "test_input": "zeqvxwuprogramming",
        "test_output": "lose",
        "hangman_level": 6,
        "worng_letters": "zeqvxwu",
        "wright_letters": ""
    },
    {
        "test_input": "qlghinterface",
        "test_output": "win",
        "hangman_level": 4,
        "worng_letters": "qlgh",
        "wright_letters": "interface"
    }
]

// Cypress is configured in plugins and support files by custom hoooks 
// it would skip all test after first failed test
// This can be resolved as configurations options in future versions of cypress

describe('page check', () => {
    it('check DOM rendered correctly', () => {
        cy.visit('index.html')
        cy.get('body')
        cy.get('[NS-test=game-status]')
        // Donot place extra checks in here because it may be updated by JS
    })
})

// cy.get('[NS-test=wrong-letter]')
// cy.get('[NS-test=letter]')
// cy.get('[NS-test=figure-part]')
// cy.get('[NS-test=play-button]')




describe('check hangman construction', () => {

    it('check hangman construction', () => {
        const {test_input, hangman_level, test_output, worng_letters, wright_letters} = tests[0];
        cy.get('body').type(test_input)
        cy.get('[NS-test=figure-part]').should("have.length", 10)  
        // wait for 3s for delays in transition
        cy.get("[NS-test=play-button]").click()
    })
})

describe("running test cases", () => {``

    for(let i = 1; i < tests.length; i++) {
        it("running test case " + i, () => {
            const {test_input, hangman_level, test_output, worng_letters, wright_letters} = tests[i];

            cy.get('body').type(test_input)

            cy.get('[NS-test=wrong-letter]').then(($cells) => {

                var res = [];
                $cells.each((i, value$) => {
                    if(String(value$.innerText).trim().length != 0) {
                        res.push(String(value$.innerText).trim().toLowerCase());
                    }
                })
                let r = res.sort();
                let e = worng_letters.split("").sort();
                expect(r).to.deep.equal(e)
            })
            // check for correct words
            cy.get('[NS-test=letter]').then($cells => {
                var res = [];
                $cells.each((i, value$) => {
                    if(String(value$.innerText).trim().length != 0) {
                        res.push(String(value$.innerText).trim().toLowerCase());
                    }
                })
                let r = res.sort();
                let e = wright_letters.split("").sort();
                expect(r).to.deep.equal(e)
            })
            // wait for 3s for delays in transition
            cy.wait(3000)
            cy.get("[NS-test=play-button]").click()
        })
    }
})