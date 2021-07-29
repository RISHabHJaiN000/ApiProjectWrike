// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const userSchema = new Schema({
//   kind: {
//     type: Object,
//     required: true
//     },
//   data:[{
//     id: {
//     type: Object,
//     required: true
//     },
//     firstName: {
//     type: Object,
//     required: true
//     },
//     lastName: {
//     type: Object,
//     required: true
//     },
//     type: {
//     type: Object,
//     required: true
//     },
//     profiles: {
//     type: Array,
//     required: true
//     },

//     profiles:[{
//       email: {
//       type: Object,
//       required: true
//       },
//       external: {
//       type: Object,
//       required: true
//       },
//       admin: {
//       type: Object,
//       required: true
//       },
//       owner: {
//       type: Object,
//       required: true
//       },
//       avatarUrl: {
//       type: Object,
//       required: true
//       },
//       timezone: {
//       type: Object,
//       required: true
//       },
//       locale: {
//       type: Object,
//       required: true
//       },
//       deleted: {
//       type: Object,
//       required: true
//       },
//       me: {
//       type: Object,
//       required: true
//       },
//       title: {
//       type: Object,
//       required: true
//       },
//       phone: {
//       type: Object,
//       required: true
//       },
//     }]

//     }]
// });
// const User = mongoose.model("User", userSchema);
// module.exports = User;






const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  kind: {
    type: String,
    required: true
    },
  data:[{
    id: {
    type: String,
    required: true
    },
    firstName: {
    type: String,
    required: true
    },
    lastName: {
    type: String,
    required: true
    },
    type: {
    type: String,
    required: true
    },
    // profiles: {
    // type: Array,
    // required: true
    // },

    profiles:[{
      email: {
      type: String,
      required: true
      },
      external: {
      type: Boolean,
      required: true
      },
      admin: {
      type: Boolean,
      required: true
      },
      owner: {
      type: Boolean,
      required: true
      }}],
    avatarUrl: {
    type: String,
    required: true
    },
    timezone: {
    type: String,
    required: true
    },
    locale: {
    type: String,
    required: true
    },
    deleted: {
    type: String,
    required: true
    },
    me: {
    type: Boolean,
    required: true
    },
    title: {
    type: String,
    required: true
    },
    phone: {
    type: String,
    required: true
    },
    

    }]
});
const User = mongoose.model("User", userSchema);
module.exports = User;