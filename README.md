# pdf-text.js

A JavaScript front-end solution to Extract text from pdf documents into useable organized data objects. The user provides a pdf file (data buffer or url) and an optional template config. Without the template config the function will return an array of character objects with character, x & y coordinates(lower lefthand corner) and width measurement of character. With a template file the user can validate the parsing and pull out blocks of text and table data. 


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

[Demo](https://pdftext.netlify.com/)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
