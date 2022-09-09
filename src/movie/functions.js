const { sequelize } = require("../db/connection");
const Movie = require("./table");

// ------------------- Create -------------------
exports.addMovie = async (movieObject) => {
    try {
        await Movie.create(movieObject);
    } catch (error) {
        console.log("error in addMovie")
        console.log(error)
    }
};


// ------------------- Read -------------------
exports.listMovies = async () => {
    try {
        return await Movie.findAll();
    } catch (error) {
        console.log("error in listMovies")
        console.log(error)
    }
};

exports.showMovies = async () => {
    try {
        let list = await Movie.findAll({attributes: ['id', 'title', 'actor']});
        // SELECT `id`, `title`, `actor` FROM `Movies` AS `Movie`;
        console.table(await list.map(value => value.dataValues));
    } catch (error) {
        console.log("error in showMovies")
        console.log(error)
    }
};

// ------------------- Update -------------------

exports.updateMovieTitle = async (yargs) => {
    try {
        await Movie.update({ title: yargs.newTitle }, {
            where: {
              title: yargs.title
            }
          });
    } catch (error) {
        console.log("error in updateMovieTitle")
        console.log(error)
    }
}

exports.updateMovieActor = async (yargs) => {
    try {
        await Movie.update({ actor: yargs.newActor }, {
            where: {
              title: yargs.title
            }
          });
    } catch (error) {
        console.log("error in updateMovieActor")
        console.log(error)
    }
}



exports.updateMovie = async (yargs) => {
    try {
        await Movie.update({ title: yargs.newTitle, actor: yargs.newActor }, {
            where: {
              title: yargs.title,
              actor: yargs.actor
            }
          });
    } catch (error) {
        console.log("error in updateMovie")
        console.log(error)
    }
}


// ------------------- Delete -------------------
exports.deleteMovie = async (yargs) => {
    try {
        await sequelize.query(
            `DELETE FROM Movies WHERE title = '${yargs.title}'`
            );
    } catch (error) {
        console.log("error in deleteMovie")
        console.log(error)
    }
}
