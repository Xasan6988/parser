const request = require('request');
const jssoup = require('jssoup').default;
const fs = require('fs');

const url = 'https://www.bizkontakte.com/stavnews-8-961-495-98-72';



request.get(url, (err, res, html) => {
  if (err) throw err;

  if (res.statusCode === 200 || res.statusCode === 201) {
    const soup = new jssoup(html);
    const questions = soup.findAll('div', 'question-block');
    const stream = fs.createWriteStream('./new.txt');
    questions.forEach(item => {
      stream.write(item.text.slice(2) + '\n');
    });
    stream.close();
  }
});
