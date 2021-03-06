const { AuthenticationError } = require('apollo-server-express');
const { User, Recipe, GroceryList } = require('../models');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
    me:  async (parent, args, context) => {
        if (context.user){
        const userData = await User.findOne({_id: context.user._id})
          .select('-__v -password')

          return userData;
        }

        throw new AuthenticationError('Not logged in')
    },
},
getOneUser: async (parent, args) => {
    return await User.findOne();
},
removeBook: async (parent, args) => {
     await Book.query().deleteById(_id);
     return _id;
},
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args) => {
            console.log('test');
            console.log(args);
            const book = await Book.create(args);
            return Book;
        }
}
}