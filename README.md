# pdf-text.js [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tomrule007/pdf-text.js/blob/development/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/tomrule007/pdf-text.js/blob/development/CONTRIBUTING.md)

## A JavaScript frontend cross-browser compatible utility to extract text from pdf documents into useable organized data objects.

The user provides a pdf file (data buffer or url) and an optional template config. Without the template config the function will return an array of character objects with the text, the coordinates (x,y) and width measurement of text. With a template file the user can validate the parsing and pull out blocks of text and table data.

## Current state (of the [demo site](https://pdftext.netlify.com/) )

- Allows a pdf file to be selected
- applies hardcoded sampleTables.pdf template to pull table data.
- creates 3 html tables demonstrating correct parsing of sampleTable.pdf table data.
- handles merging multi-line cells
- renders the pdf canvas view with moveable box object. (shift clicking the box adds a column line)
- shows the moveable box template config
- creates a list of all text items inside the box with their coordinates
- draws box around each character location
- stores character location
- uses pdf.js getTextContent to attempt to generate a html table of file.

## ToDo

- Readme
  - add installation instructions
  - add how to use instructions
- create template generator to create:
  - table bounds
  - column bounds
  - validation boxes
- create tests
- clean up project
- correct demo page text
- create issues and project board

## Technologies used 🛠️

- [React](https://reactjs.org/) - Front-End JavaScript library
- [pdf.js](https://github.com/mozilla/pdf.js) - PDF Reader in JavaScript

## Authors

- **Thomas J. Herzog** - [https://github.com/tomrule007](https://github.com/tomrule007)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
