// package includes
require("./utils/generateMarkdown");
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// object containing blank user license template and array of objects containing various license information
let userLicense = {
    name:   "",
    image:  "",
    url:    ""
};

const licenses = [
    {
        name:   "Apache 2.0 License",
        image:  "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
        url:    "[Apache 2.0 License](https://opensource.org/licenses/Apache-2.0)"
    },
    {
        name:   "BSD 3-Clause License",
        image:  "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
        url:    "[BSD 3-Clause License](https://opensource.org/licenses/BSD-3-Clause)"
    },
    {
        name:   "BSD 2-Clause License",
        image:  "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
        url:    "[BSD 2-Clause License](https://opensource.org/licenses/BSD-2-Clause)"
    },
    {
        name:   "Creative Commons Attribution 4.0 International License",
        image:  "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)(http://creativecommons.org/licenses/by/4.0/)",
        url:    "[Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/)"
    },
    {
        name:   "Creative Commons Attribution-ShareAlike 4.0 International License",
        image:  "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)",
        url:    "[Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/)"
    },
    {
        name:   "Creative Commons Attribution-NonCommercial 4.0 International License",
        image:  "[!License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc/4.0/)",
        url:    "[Creative Commons Attribution-NonCommercial 4.0 International License](http://creativecommons.org/licenses/by-nc/4.0/)"
    },
    {
        name:   "Creative Commons Attribution-NoDerivates 4.0 International License",
        image:  "[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nd/4.0/)",
        url:    "[Creative Commons Attribution-NoDerivates 4.0 International License](http://creativecommons.org/licenses/by-nd/4.0/)"
    },
    {
        name:   "Creative Commons Attribution-NonCommmercial-ShareAlike 4.0 International License",
        image:  "[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc-sa/4.0/)",
        url:    "[Creative Commons Attribution-NonCommmercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)"
    },
    {
        name:   "Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License",
        image:  "[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-nc-nd/4.0/)",
        url:    "[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License](http://creativecommons.org/licenses/by-nc-nd/4.0/)"
    },
    {
        name:   "Eclipse Public License 1.0",
        image:  "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
        url:    "[Eclipse Public License 1.0](https://opensource.org/licenses/EPL-1.0)"
    },
    {
        name:   "GNU GPL v3 License",
        image:  "[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)",
        url:    "[GNU GPL v3 License](http://www.gnu.org/licenses/gpl-3.0)"
    },
    {
        name:   "GNU GPL v2 License",
        image:  "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](http://www.gnu.org/licenses/gpl-2.0)",
        url:    "[GNU GPL v2 License](http://www.gnu.org/licenses/gpl-2.0)"
    },
    {
        name:   "GNU AGPL v3 License",
        image:  "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)",
        url:    "[GNU AGPL v3 License](http://www.gnu.org/licenses/agpl-3.0)"
    },
    {
        name:   "GNU LGPL v3 License",
        image:  "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](http://www.gnu.org/licenses/lgpl-3.0)",
        url:    "[GNU LGPL v3 License](http://www.gnu.org/licenses/lgpl-3.0)"
    },
    {
        name:   "GNU FDL v1.3 License",
        image:  "[![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](http://www.gnu.org/licenses/fdl-1.3)",
        url:    "[GNU FDL v1.3 License](http://www.gnu.org/licenses/fdl-1.3)"
    },
    {
        name:   "IBM Public License Version 1.0",
        image:  "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
        url:    "[IBM Public License Version 1.0](https://opensource.org/licenses/IPL-1.0)"
    },
    {
        name:   "MIT License",
        image:  "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
        url:    "[MIT License](https://opensource.org/licenses/MIT)"
    },
    {
        name:   "Mozilla Public License 2.0",
        image:  "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
        url:    "[Mozilla Public License 2.0](https://opensource.org/licenses/MPL-2.0)"
    },
    {
        name:   "zlib/libpng License",
        image:  "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)",
        url:    "[zlib/libpng License](https://opensource.org/licenses/Zlib)"
    }    
];

// array of questions for user
const licenseChoice = [];
licenses.forEach(license => licenseChoice.push(license.name));

const questions = [
    {
        type:       "input",
        name:       "title",
        message:    "What is the project title?",
        validate:   (value) => {
            if (value === "" || value === null) {
                return "Title can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type:       "input",
        name:       "description",
        message:    "What is the project description?",
        validate:   (value) => {
            if (value === "" || value === null) {
                return "Description can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type:       "input",
        name:       "installation",
        message:    "What are the project's installation instructions?",
        validate:   (value) => {
            if (value === "" || value === null) {
                return "Installation instructions can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type:       "input",
        name:       "usage",
        message:    "What is the project's usage information?",
        validate:   (value) => {
            if (value === "" || value === null) {
                return "Usage information can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type:       "list",
        name:       "license",
        message:    "Which license does your project fall under? (select a license)",
        choices:    licenseChoice
    },
    {
        type:       "input",
        name:       "contribution",
        message:    "What are the project's contribution guidelines?",
        validate:   (value) => {
            if (value === "" || value === null) {
                return "Contribution guidelines can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type:       "input",
        name:       "testing",
        message:    "What are the project's testing instructions?",
        validate:   (value) => {
            if (value === "" || value === null) {
                return "Testing instructions can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type:       "input",
        name:       "username",
        message:    "What is your GitHub username?",
        validate:   (value) => {
            if (value === "" || value === null) {
                return "Username can not be empty.";
            } else {
                return true;
            }
        }
    },
    {
        type:       "input",
        name:       "email",
        message:    "What is your email address?",
        validate:   (value) => {

            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)

            if (value === "" || value === null) {
                return "Email can not be empty.";
            } else if (valid) {
                return true;
            } else {
                return "Please enter a valid email."
            }
        }
    }
];

// function to write README file
function writeToFile(fileName, data) {

    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.log(err);
        }
    });

    console.log("Successfully created README.md! File is located in the 'generated' directory.")
}

// function to initialize program
function init() {

    inquirer.prompt(questions).then((answers) => {
         
        licenses.forEach(license => {
            if(answers.license === license.name) {
                userLicense.name = license.name;
                userLicense.image = license.image;
                userLicense.url = license.url;
            }
        });

        const userReadme = generateMarkdown(answers, userLicense);

        writeToFile("./generated/README.md", userReadme);
        
    });

}

// function call to initialize program
init();
