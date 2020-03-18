# pdf-template-parse [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tomrule007/pdf-text.js/blob/development/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/tomrule007/pdf-text.js/blob/development/CONTRIBUTING.md)

## A JavaScript frontend cross-browser compatible "PDF parser w/ template Engine" to convert pdf documents into organized data objects

A two phase process were the pdf text characters are first extracted and then processed with a template engine to turn the characters array into meaningful data objects.

### pdf parse phase

Text is extracted one character at a time while recording the coordinates (x,y) and character width. This allows you to build custom filters/reducers to extract the data you are after.

### template engine

Included template engine will extract and combine table data or values using a user provided template file that includes the coordinate bounds of the desired items.

## ToDo

- Readme
  - add installation instructions
  - add how to use instructions
- Add tests
- replace char_offset option with character map detection

## Technologies used 🛠️

- [React](https://reactjs.org/) - Front-End JavaScript library
- [pdf.js](https://github.com/mozilla/pdf.js) - PDF Reader in JavaScript

## Authors

- **Thomas J. Herzog** - [https://github.com/tomrule007](https://github.com/tomrule007)

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
