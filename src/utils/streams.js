const program = require("commander");

const actions = require("./actions");
const {
  fileDescription,
  actionDescription,
  pathDescription,
  helpOptionExamples,
  invalidAction,
  optionNotProvided,
  wrongInput
} = require("../messages");

const showHelpExamples = () => {
  console.log(helpOptionExamples);
};

program.on("--help", showHelpExamples);
program.on("-h", showHelpExamples);

program
  .version("0.1.0")
  .option("-a, --act <act>", actionDescription)
  .option("-f, --file <file>", fileDescription)
  .option("-p, --path <path>", pathDescription)
  .parse(process.argv);

const executeAction = () => {
  switch (program.act) {
    case "reverse":
    case "transform":
      actions[program.act]();
      break;

    case "outputFile":
    case "convertFromFile":
    case "convertToFile":
      if (program.file) {
        actions[program.act](program.file);
      } else {
        console.log(optionNotProvided("--file"));
      }
      break;

    case "cssBundler":
      if (program.path) {
        actions[program.act](program.path);
      } else {
        console.log(optionNotProvided("--path"));
      }
      break;

    default:
      console.log(invalidAction(program.act));
  }
};

if (!process.argv.slice(2).length) {
  console.log(wrongInput);
  program.outputHelp();
} else if (program.act === undefined) {
  console.log(optionNotProvided("--act"));
} else {
  executeAction();
}
