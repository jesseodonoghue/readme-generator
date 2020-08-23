// function to generate markdown for README
function generateMarkdown(data, license) {
  return `# ${data.title}  ${license.image}

  ## Description
  ${data.description}

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## <a name="installation"></a>Installation
  ${data.installation}

  ## <a name="usage"></a>Usage
  ${data.usage}

  ## <a name="license"></a>License  ${license.image}
  This application falls under the ${license.url}.

  ## <a name="contributing"></a>Contributing
  ${data.contribution}

  ## <a name="tests"></a>Tests
  ${data.testing}

  ## <a name="questions"></a>Questions
  If you have any questions, please email me at ${data.email}. You may also view my other public projects on my [GitHub Profile](https://github.com/${data.username}).
`;
}

module.exports = generateMarkdown;
