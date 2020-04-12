var express = require('express');
var router = express.Router();
const fs = require('fs');
const neatCsv = require('neat-csv');


let personality = [{
  type: 'OPE',
  'score': 0
},{
  type: 'CON',
  'score': 0
},{
  type: 'EXT',
  'score': 0
},{
  type: 'AGR',
  'score': 0
},{
  type: 'NEU',
  'score': 0
}];


/* GET home page. */
router.get('/:bookGenre/:musicGenre/:moviesGenre/:tvGenre', function(req, res, next) {
  let clusters = [
    {
      AGR: 0,
      CON: 0,
      EXT: 0,
      NEU: 0,
      OPE: 0
    },
    {
      AGR: 0,
      CON: 0,
      EXT: 0,
      NEU: 0,
      OPE: 0
    },
    {
      AGR: 0,
      CON: 0,
      EXT: 0,
      NEU: 0,
      OPE: 0
    },
    {
      AGR: 0,
      CON: 0,
      EXT: 0,
      NEU: 0,
      OPE: 0
    },
    {
      AGR: 0,
      CON: 0,
      EXT: 0,
      NEU: 0,
      OPE: 0
    },
  ];
  let ps = ['AGR', 'CON', 'EXT', 'NEU', 'OPE'];
  fs.readFile('./files/clusters.csv', async (err, data) => {
    for(let i = 0;i < (await neatCsv(data)).length; i++){
      clusters[0][ps[i]] = ((await neatCsv(data))[i]['Cluster 1'])*5;
      clusters[1][ps[i]] = ((await neatCsv(data))[i]['Cluster 2'])*5;
      clusters[2][ps[i]] = ((await neatCsv(data))[i]['Cluster 3'])*5;
      clusters[3][ps[i]] = ((await neatCsv(data))[i]['Cluster 4'])*5;
      clusters[4][ps[i]] = ((await neatCsv(data))[i]['Cluster 5'])*5;
    }
    console.log(await clusters)

  fs.readFile('./files/books.csv', async (err, data) => {
      for(let i = 0; i < (await clusters).length; i++){
        let books = [{genre:'', score: 999},{genre:'', score: 999},{genre:'', score: 999}];
        for(let book of await neatCsv(data)) {
          let score = 0;
          ps.map((personality) => score += Math.abs(book[personality] - clusters[i][personality]));
          for(let i = 0; i < books.length; i++)
            if(score < books[i].score){
              books[i] = {genre: book['Book Genre'], score}; break;
            }
        }
        clusters[i].books = books;
      }
  })

  fs.readFile('./files/music.csv', async (err, data) => {
      for(let i = 0; i < (await clusters).length; i++){
        let books = [{genre:'', score: 999},{genre:'', score: 999},{genre:'', score: 999}];
        for(let book of await neatCsv(data)) {
          let score = 0;
          ps.map((personality) => score += Math.abs(book[personality] - clusters[i][personality]));
          for(let i = 0; i < books.length; i++)
            if(score < books[i].score){
              books[i] = {genre: book['Music Genre'], score}; break;
            }
        }
        clusters[i].music = books;
      }
  })

  fs.readFile('./files/movies.csv', async (err, data) => {
      for(let i = 0; i < (await clusters).length; i++){
        let books = [{genre:'', score: 999},{genre:'', score: 999},{genre:'', score: 999}];
        for(let book of await neatCsv(data)) {
          let score = 0;
          ps.map((personality) => score += Math.abs(book[personality] - clusters[i][personality]));
          for(let i = 0; i < books.length; i++)
            if(score < books[i].score){
              books[i] = {genre: book['Movie Genre'], score}; break;
            }
        }
        clusters[i].movies = books;
      }
  })

  fs.readFile('./files/tv.csv', async (err, data) => {
      for(let i = 0; i < (await clusters).length; i++){
        let books = [{genre:'', score: 999},{genre:'', score: 999},{genre:'', score: 999}];
        for(let book of await neatCsv(data)) {
          let score = 0;
          ps.map((personality) => score += Math.abs(book[personality] - clusters[i][personality]));
          for(let i = 0; i < books.length; i++)
            if(score < books[i].score){
              books[i] = {genre: book['TV Genre'], score}; break;
            }
        }
        clusters[i].tv = books;
      }
      res.json(await clusters);
  })
  // fs.readFile('./files/music.csv', async (err, data) => {
  //   for(let book of await neatCsv(data)) {
  //     if(book['Music Genre'] === req.params.musicGenre){
  //       personality[0]['score'] = (parseFloat(book.OPE) + personality[0]['score'])/2;
  //       personality[1]['score'] = (parseFloat(book.CON) + personality[1]['score'])/2;
  //       personality[2]['score'] = (parseFloat(book.EXT) + personality[2]['score'])/2;
  //       personality[3]['score'] = (parseFloat(book.AGR) + personality[3]['score'])/2;
  //       personality[4]['score'] = (parseFloat(book.NEU) + personality[4]['score'])/2;
  //     }
  //   }
  // })
  // fs.readFile('./files/movies.csv', async (err, data) => {
  //   for(let book of await neatCsv(data)) {
  //     if(book['Movie Genre'] === req.params.moviesGenre){
  //       personality[0]['score'] = (parseFloat(book.OPE) + personality[0]['score'])/2;
  //       personality[1]['score'] = (parseFloat(book.CON) + personality[1]['score'])/2;
  //       personality[2]['score'] = (parseFloat(book.EXT) + personality[2]['score'])/2;
  //       personality[3]['score'] = (parseFloat(book.AGR) + personality[3]['score'])/2;
  //       personality[4]['score'] = (parseFloat(book.NEU) + personality[4]['score'])/2;
  //     }
  //   }
  // })
  // fs.readFile('./files/tv.csv', async (err, data) => {
  //   for(let book of await neatCsv(data)) {
  //     if(book['TV Genre'] === req.params.tvGenre){
  //       personality[0]['score'] = (parseFloat(book.OPE) + personality[0]['score'])/2;
  //       personality[1]['score'] = (parseFloat(book.CON) + personality[1]['score'])/2;
  //       personality[2]['score'] = (parseFloat(book.EXT) + personality[2]['score'])/2;
  //       personality[3]['score'] = (parseFloat(book.AGR) + personality[3]['score'])/2;
  //       personality[4]['score'] = (parseFloat(book.NEU) + personality[4]['score'])/2;
  //     }
  //   }
  //   console.log(await personality)
  })
  // http://localhost:3000/crime/blues/action/animation
  // res.render('index', { title: 'Express' });
});

module.exports = router;
