# toolsQA-Cypress

## Dependencies :

- [node](https://nodejs.org/en/download/)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

---

## Installation Guide :

1. git clone the repository :

```
git clone https://github.com/NicoSalva/toolsQA-Cypress
```

2. Once you have project cloned locally, goto project :

```
cd toolsQA-Cypress
```

3. Install all the dependencies :

```
npm install --legacy-peer-dps
```

## Running Suite:

**MANUALLY:**

This command open Cypress tools, go to e2e and run the formPage.cy.js

```
npx cypress open
```

**MOCHAWESOME:**

```
npm run cy:run:chrome -- --spec "cypress/e2e/formPage.cy.js"
```

**Reporter Mochawesome**:

play the .mp4 from videos folder

Open mochawesome.html from result folder
