const { sequelize } = require("../db/connection");
const User = require("./table");

// ------------------- Create -------------------
exports.addUser = async (Object) => {
    try {
        await User.create(Object);
    } catch (error) {
        console.log("error in addUser")
        if(error.original.errno === 1062) {
            console.log(error.original.sqlMessage);
            return;
        } else {
            console.log(error)
            return;
        }
    }
};


// ------------------- Read -------------------
exports.showUsers = async () => {
    try {
        let list = await User.findAll({attributes: ['id', 'name', 'age', 'email', 'favTitleID']});
        // SELECT 'id', 'name', 'age', 'email', 'favTitleID' FROM `Users` AS `User`;
        console.table(await list.map(value => value.dataValues));
    } catch (error) {
        console.log("error in showUsers")
        console.log(error)
    }
};

// ------------------- Update -------------------
exports.updateUser = async (yargs) => {
    try {
        await User.update({ name: yargs.nameR, emailR: yargs.emailR, age: yargs.ageR, favTitleID: yargs.titleIDR}, {
            where: {
                name: yargs.name, email: yargs.email, age: yargs.age, favTitleID: yargs.titleID
            }
          });
    } catch (error) {
        console.log("error in updateUser")
        console.log(error)
    }
}

exports.updateUserName = async (yargs) => {
    try {
        await User.update({ name: yargs.nameR }, {
            where: {
              name: yargs.name
            }
          });
    } catch (error) {
        console.log("error in updateUserName")
        console.log(error)
    }
}

exports.updateUserEmail = async (yargs) => {
    try {
        await User.update({ email: yargs.emailR }, {
            where: {
              email: yargs.email
            }
          });
    } catch (error) {
        console.log("error in updateUserEmail")
        console.log(error)
    }
}

exports.updateUserAge = async (yargs) => {
    try {
        await User.update({ age: yargs.ageR }, {
            where: {
              age: yargs.age
            }
          });
    } catch (error) {
        console.log("error in updateUserAge")
        console.log(error)
    }
}

exports.updateUserNameAge = async (yargs) => {
    try {
        await User.update({ name:yargs.nameR ,age: yargs.ageR }, {
            where: {
              age: yargs.age,
              name:yargs.name
            }
          });
    } catch (error) {
        console.log("error in updateUserNameAge")
        console.log(error)
    }
}

exports.updateUserNameEmail = async (yargs) => {
    try {
        await User.update({ name:yargs.nameR ,email: yargs.emailR }, {
            where: {
              email: yargs.email,
              name:yargs.name
            }
          });
    } catch (error) {
        console.log("error in updateUserNameEmail")
        console.log(error)
    }
}

exports.updateUserNameTitleID = async (yargs) => {
    try {
        await User.update({ name:yargs.nameR ,favTitleID: yargs.titleIDR }, {
            where: {
              favTitleID: yargs.titleID,
              name:yargs.name
            }
          });
    } catch (error) {
        console.log("error in updateUserNameTitleID")
        console.log(error)
    }
}

exports.updateUserNameAgeEmail = async (yargs) => {
    try {
        await User.update({ name:yargs.nameR ,age: yargs.ageR, email: yargs.emailR }, {
            where: {
              email: yargs.email,
              name:yargs.name,
              age: yargs.age
            }
          });
    } catch (error) {
        console.log("error in updateUserNameAgeEmail")
        console.log(error)
    }
}

exports.updateUserNameAgeTitleID = async (yargs) => {
    try {
        await User.update({ name:yargs.nameR ,age: yargs.ageR, favTitleID: yargs.titleIDR }, {
            where: {
                favTitleID: yargs.titleID,
                name: yargs.name,
                age: yargs.age
            }
          });
    } catch (error) {
        console.log("error in updateUserNameAgeTitleID")
        console.log(error)
    }
}

exports.updateUserNameTitleIDEmail = async (yargs) => {
    try {
        await User.update({ name:yargs.nameR ,email: yargs.emailR, favTitleID: yargs.titleIDR }, {
            where: {
                favTitleID: yargs.titleID,
                name: yargs.name,
                email: yargs.email
            }
          });
    } catch (error) {
        console.log("error in updateUserNameTitleIDEmail")
        console.log(error)
    }
}

exports.updateUserAgeTitleIDEmail = async (yargs) => {
    try {
        await User.update({ age:yargs.ageR, email: yargs.emailR, favTitleID: yargs.titleIDR }, {
            where: {
                favTitleID: yargs.titleID,
                age: yargs.age,
                email: yargs.email
            }
          });
    } catch (error) {
        console.log("error in updateUserAgeTitleIDEmail")
        console.log(error)
    }
}


// ------------------- Delete -------------------
exports.deleteUserEmail = async (yargs) => {
    try {
        await sequelize.query(
            `DELETE FROM Users WHERE email = '${yargs.email}'`
            );
    } catch (error) {
        console.log("error in deleteUserEmail")
        console.log(error)
    }
}

exports.deleteUserEmailName = async (yargs) => {
    try {
        await sequelize.query(
            `DELETE FROM Users WHERE email = '${yargs.email}' AND name = '${yargs.name}'`
            );
    } catch (error) {
        console.log("error in deleteUserEmailName")
        console.log(error)
    }
}
