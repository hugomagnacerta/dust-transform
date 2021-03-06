/* external modules */
const { join } = require('path');
const dust = require('dustjs-linkedin');
const fs = require('fs');

/* internal modules */
const jsonData = require('./resources/json/data.json');

dust.helpers.toString = (chunk, context, bodies, { string }) => {
  if ( !string ) return 'N/A';
  //process string data
  return string;
}
dust.helpers.toDate = (chunk, context, bodies, {date}) => {
  if ( !date ) return 'N/A';

  let dateWithFormat = new Date(date);

  return dateWithFormat.toISOString();
}

const fileName = join(__dirname,'resources', 'templates', 'main.dust');

const source = fs.readFileSync(fileName, 'utf8');
const compiled = dust.compile(source, 'tmpl');

dust.loadSource(compiled);
dust.render('tmpl', jsonData, function(err, out) {
  // `out` contains the rendered output.
  console.log(out);
  fs.writeFileSync("./resources/results/result.json", out, { encoding: 'utf8' });
});