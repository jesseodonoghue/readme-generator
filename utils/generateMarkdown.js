// function to generate markdown for README
function generateMarkdown(data, license) {
  return `# ${data.title}  ${license.image}


  ## Description
  ${data.description}


  ## <a name="top"></a>Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)

  
  ## <a name="installation"></a>Installation
  ${data.installation}
  [Back to Top](#top)


  ## <a name="usage"></a>Usage
  ${data.usage}
  [Back to Top](#top)


  ## <a name="license"></a>License  ${license.image}
  This application falls under the ${license.url}.
  [Back to Top](#top)


  ## <a name="contributing"></a>Contributing
  ${data.contribution}
  [Back to Top](#top)


  ## <a name="tests"></a>Tests
  ${data.testing}
  [Back to Top](#top)


  ## <a name="questions"></a>Questions
  If you have any questions, please email me at ${data.email}. You may also view my other public projects on my [GitHub Profile](https://github.com/${data.username}).
  [Back to Top](#top)
`;
}

module.exports = generateMarkdown;
