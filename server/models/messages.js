const mongoose = require('mongoose');
const _ = require('lodash');
const generateSlug = require('../utils/slugify');

const { Schema } = mongoose;

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);

const mongoSchema = new Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  googleToken: {
    access_token: String,
    refresh_token: String,
    token_type: String,
    expiry_date: Number,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
});

class messageClass {
  static publicFields() {
    return ['id', 'displayName', 'email', 'slug'];
  }

  static async signInOrSignUp({ googleId, email, googleToken, displayName }) {
    const user = await this.findOne({ googleId }).select(messageClass.publicFields().join(' '));

    if (user) {
      const modifier = {};

      if (googleToken.accessToken) {
        modifier.access_token = googleToken.accessToken;
      }

      if (googleToken.refreshToken) {
        modifier.refresh_token = googleToken.refreshToken;
      }

      if (_.isEmpty(modifier)) {
        return user;
      }

      await this.updateOne({ googleId }, { $set: modifier });

      return user;
    }

    const slug = await generateSlug(this, displayName);

    const newMessage = await this.create({
      createdAt: new Date(),
      googleId,
      email,
      googleToken,
      displayName,
      slug,
    });

    return _.pick(newMessage, messageClass.publicFields());
  }
}

mongoSchema.loadClass(messageClass);

const message = mongoose.model('message', mongoSchema);

module.exports = message;
