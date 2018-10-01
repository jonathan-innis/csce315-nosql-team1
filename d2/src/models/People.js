const {people} = require('../schemas');
const mongoose = require('mongoose');

people.statics.search = async function search(query){

    return await this.model('People', people, 'people').find( { $text : { $search : query} },
                                                              { score : { $meta   : "textScore" } });
}

let People = mongoose.model('People', people, 'people');

module.exports = People;
