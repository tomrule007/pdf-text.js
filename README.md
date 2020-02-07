# pdf-table-extractor

Current state:

- Allows a pdf file to be selected
- renders first page
- draws box around each character location
- stores character location
- uses pdf.js getTextContent to attempt to generate a html table of file.

ToDo:

- create template generator to create:

  - column cutoff lines
  - start line
  - stop line
  - text validation box

- connect character location to correct character (make sure spaces are included)
- clean up project
- correct demo page text
- finish readme
- create issues and project board

Currently Pulls location of every character on screen with location.

[Demo](https://pdf-table-dev.netlify.com/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
