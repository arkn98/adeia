const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const TimetableSchema = new Schema({
  class: {
    type: Schema.Types.ObjectId,
    ref: 'classes',
    unique: true,
    required: true
  },
  classCode: {
    type: String,
    required: true
  },
  timetable: {
    day01: {
      h01: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h02: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h03: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h04: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h05: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h06: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h07: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h08: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      }
    },
    day02: {
      h01: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h02: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h03: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h04: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h05: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h06: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h07: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h08: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      }
    },
    day03: {
      h01: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h02: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h03: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h04: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h05: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h06: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h07: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h08: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      }
    },
    day04: {
      h01: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h02: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h03: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h04: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h05: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h06: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h07: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h08: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      }
    },
    day05: {
      h01: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h02: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h03: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h04: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h05: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h06: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h07: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      },
      h08: {
        courseCode: {
          type: String,
          default: null
        },
        handlingStaff: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          default: null
        },
        additionalStaff: [
          {
            type: Schema.Types.ObjectId,
            ref: 'users',
            default: null
          }
        ]
      }
    }
  }
});

module.exports = Timetable = mongoose.model('timetables', TimetableSchema);
