export const fileChange = (pathToFile, change) =>
  `File ${pathToFile} has been ${change}`;

export const noSuchFile = path => `There is no such file as ${path}`;

export const noSuchDirectory = path => `There is no such directory as ${path}`;

export const optionNotProvided = option =>
  `The ${option} option must be provided`;

export const wrongInput = "Wrong input. It seems like you need help\n";

export const invalidAction = action =>
  `There is no such action as ${action}. Try one of the following:
    reverse | transform | outputFile | convertFromFile | convertToFile | cssBundler 
  `;

export const actionDescription = `Action to be executed. Must have one of the following values: 
    reverse | transform | outputFile | convertFromFile | convertToFile | cssBundler
  `;
export const fileDescription = `File - the path to the file action will be executed on. 
    Option --file must be provided if the action is one of the followings:
    outputFile | convertFromFile | convertToFile
  `;
export const pathDescription = `Path - the path to the directory action will be executed on. 
    Option --path must be provided if the action is one of the followings:
    cssBundler
  `;

export const helpOptionExamples = `
  Examples:
  $ node ./dist/utils/streams.js --act=outputFile --file=./data/test2.csv
  $ node ./dist/utils/streams.js -a outputFile -f ./data/test2.csv
  $ node ./dist/utils/streams.js --act=convertToFile --file=./data/test2.csv
  $ node ./dist/utils/streams.js --act=reverse
  $ node ./dist/utils/streams.js --act=transform
  $ node ./dist/utils/streams.js -a cssBundler -p ./css
  $ node ./dist/utils/streams.js --help
  $ node ./dist/utils/streams.js -h`;
