const yargs = require("yargs");
const { sequelize } = require("./db/connection");
const { addMovie, showMovies, updateMovie, updateMovieActor, updateMovieTitle, deleteMovie} = require("./movie/functions");
const { addUser, showUsers, updateUser, updateUserName, updateUserEmail, updateUserAge, updateUserNameAge, updateUserNameEmail, updateUserNameTitleID, updateUserNameAgeEmail, updateUserNameAgeTitleID, updateUserNameTitleIDEmail, updateUserAgeTitleIDEmail, deleteUserEmail, deleteUserEmailName} = require("./user/functions");

const app = async (Obj) => {
    try {
        await sequelize.sync();
        // ----------------- MOVIES -----------------
        // ----------------- Create -----------------
        if (Obj.create && Obj.movie) {
            await addMovie (
            {
                title: Obj.title, 
                actor: Obj.actor
            }
            );
            await showMovies();
        } 
        // ----------------- Read ----------------- 
        else if (Obj.read && Obj.movie) {
            await showMovies();
        } 
        // ----------------- Update -----------------
        //             ----- title ----- 
        else if ((Obj.update && Obj.title && Obj.movie) && !Obj.actor ) {
            await updateMovieTitle (Obj);
            await showMovies();
        }
        //             ----- actor ----- 
        else if ((Obj.update && Obj.actor && Obj.movie) && !Obj.title) {
            await updateMovieActor (Obj);
            await showMovies();
        }
        //          ----- title & actor ----- 
        else if (Obj.update && (Obj.actor && Obj.title && Obj.movie)) {
            await updateMovie (Obj);
            await showMovies();
        }
        // ----------------- Delete -----------------
        else if (Obj.delete && Obj.movie) {
            await deleteMovie (Obj);
            await showMovies();
        }
        // -------------------------------------------------------------------------------------------------------------
        // ----------------- USERS -----------------
        // ----------------- Create -----------------
        // -------------------------------------------------------------------------------------------------------------
        else if (Obj.create && Obj.user) {
            await addUser (
            {
                name: Obj.name, 
                age: Obj.age,
                email: Obj.email,
                favTitleID: Obj.titleID
            }
            );
            await showUsers();
        } 
        // ----------------- Read ----------------- 
        else if (Obj.read && Obj.user) {
            await showUsers();
        } 
        // ----------------- Update -----------------
        //             ----- name, age, email, titleID ----- 
        else if (Obj.update && Obj.name && Obj.age && Obj.email && Obj.titleID) {
            await updateUser (Obj);
            await showUsers();
        }
        //             ----- name ----- 
        else if ((Obj.update && Obj.name && Obj.user) && !Obj.age) {
            await updateUserName (Obj);
            await showUsers();
        }
        //             ----- email ----- 
        else if ((Obj.update && Obj.email && Obj.user) && !Obj.name && !Obj.age && !Obj.titleID) {
            await updateUserEmail (Obj);
            await showUsers();
        }
        //             ----- age ----- 
        else if ((Obj.update && Obj.age && Obj.user) && !Obj.name && !Obj.email && !Obj.titleID) {
            await updateUserAge (Obj);
            await showUsers();
        }
        //          ----- name & age ----- 
        else if (Obj.update && (Obj.name && Obj.age && Obj.user)&& !Obj.email && !Obj.titleID) {
            await updateUserNameAge (Obj);
            await showUsers();
        }
        //          ----- name & email ----- 
        else if (Obj.update && (Obj.name && Obj.email && Obj.user) && !Obj.titleID && !Obj.age) {
            await updateUserNameEmail (Obj);
            await showUsers();
        }
        //          ----- name & titleID ----- 
        else if (Obj.update && (Obj.name && Obj.titleID && Obj.user) && !Obj.email && !Obj.age) {
            await updateUserNameTitleID (Obj);
            await showUsers();
        }
        //          ----- name & age & email ----- 
        else if (Obj.update && (Obj.name && Obj.age && Obj.email && Obj.user)&& !Obj.titleID) {
            await updateUserNameAgeEmail (Obj);
            await showUsers();
        }
        //          ----- name & age & titleID ----- 
        else if (Obj.update && (Obj.name && Obj.age && Obj.titleID && Obj.user)&& !Obj.email) {
            await updateUserNameAgeTitleID (Obj);
            await showUsers();
        }
        //          ----- name & titleID & email ----- 
        else if (Obj.update && (Obj.name && Obj.titleID && Obj.email && Obj.user)&& !Obj.age) {
            await updateUserNameTitleIDEmail (Obj);
            await showUsers();
        }
        //          ----- age & titleID & email ----- 
        else if (Obj.update && (Obj.age && Obj.titleID && Obj.titleID && Obj.user) && !Obj.name) {
            await updateUserAgeTitleIDEmail (Obj);
            await showUsers();
        }
        // ----------------- Delete -----------------
        else if (Obj.delete && Obj.user && Obj.email && !Obj.name) {
            await deleteUserEmail (Obj);
            await showUsers();
        }
        else if (Obj.delete && Obj.user && Obj.email && Obj.name) {
            await deleteUserEmailName (Obj);
            await showUsers();
        }
        // ----------------- JOIN -----------------
        else if (Obj.joinTable){
            const rawJoin = async () => {
                const [results] = await sequelize.query(
                    "SELECT name, age, email, title AS favourite_movie, favTitleID AS id FROM Users LEFT JOIN Movies ON Users.favTitleID = Movies.id"
                )
                console.table(results.map( (value) => (value)));
            } 
            rawJoin()
        }
        else {
            log("incorrect command");
        }
        sequelize.close();
    } catch (error){
        log(error);
    }
}
let log = console.log;
app(yargs.argv);