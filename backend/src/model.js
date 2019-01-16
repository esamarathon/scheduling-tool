import mongoose from 'mongoose';
import './db';

const StartPoint = new mongoose.Schema({
  type: String, // One of 'absolute', 'startOf', 'endOf'
  setup: Number, // Length of setup time in ms
  time: Number, // Used for type === 'absolute'; timestamp in ms since epoch
  ref: mongoose.Schema.Types.ObjectId, // Used for type === 'startOf', 'endOf'; reference to Element this is relative to
  offset: Number, // Offset from startpoint in ms (not very sensible for type === 'absolute')
  actualTime: Number, // Timestamp in ms since epoch, actual time this item started (takes precedence)
});

const EndPoint = new mongoose.Schema({
  type: String, // One of 'absolute', 'startOf', 'endOf', 'duration'
  setup: Number, // Length of setup time in ms
  time: Number, // Used for type === 'absolute'; timestamp in ms since epoch
  ref: mongoose.Schema.Types.ObjectId, // Used for type === 'startOf', 'endOf'; reference to Element this is relative to
  duration: Number, // Used for type === 'duration'; length of Element in ms
  offset: Number, // Offset from endpoint in ms (not very sensible for type === 'absolute', not used for 'duration')
  actualTime: Number, // Timestamp in ms since epoch, actual time this item ended (takes precedence)
});

const People = new mongoose.Schema({
  // ToDo, this is still very open
  name: String,
});

const Element = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  data: Object, // Typed by parent.dataSchema, contains additional data fields that are schedule specific
  foreignDataModel: String, // Type of data referenced from external database (i.e. user tool)
  foreignData: String, // Referenced data ID from external database
  constraints: {
    preferredTimeslot: String,
  },
  people: [People],
  start: StartPoint,
  end: EndPoint,
});

const Schedule = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  dataSchema: Object, // Describes the schema applied to the 'data' field of Elements belonging to this schedule
  offset: Number, // Time offset in ms to Event start where this schedule begins.  ToDo do we want this? Useful for validation for constraints?
  elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'element' }],
  constraints: {
    minimumRequiredPeople: Number,
    overlap: Boolean,
    minimumSetupTime: Number,
  },
  defaults: {
    name: String,
    setup: Number,
    teardown: Number,
    duration: Number,
  },
});

const Event = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  usertoolRef: String, // reference to event from users tool
  name: String, // Human readable name for the Event to be displayed
  startTime: Number, // Timestamp in ms since epoch # ToDo will be fetched from users tool in future
  endTime: Number, // Timestamp in ms since epoch # ToDo will be fetched from users tool in future
  schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'schedule' }],
  constraintSettings: {
    peopleAvailable: Boolean,
    preferredTimeslots: Boolean,
  },
});

const UpdateAction = new mongoose.Schema({
  idType: String, // Type of Element the ID references
  id: String, // Reference to be modified
  action: String, // "set", "insert", "delete", "addItem", "removeItem"
  path: String, // Nested Attribute to modify
  oldValue: mongoose.Schema.Types.Mixed, // Original value of <id>.path
  newValue: mongoose.Schema.Types.Mixed, // Value to set <id>.path to
});

const Transformation = new mongoose.Schema({
  time: Date, // time when this transaction was performed
  userID: String, // user ID from the user tool
  type: String, // Kind of transformation
  actions: [UpdateAction],
});

export const schemas = {
  StartPoint, EndPoint, People, Element, Schedule, Event, UpdateAction, Transformation,
};

export const models = {
  StartPoint: mongoose.model('startpoint', StartPoint),
  EndPoint: mongoose.model('endpoint', EndPoint),
  People: mongoose.model('people', People),
  Element: mongoose.model('element', Element),
  Schedule: mongoose.model('schedule', Schedule),
  Event: mongoose.model('event', Event),
  UpdateAction: mongoose.model('updateaction', UpdateAction),
  Transformation: mongoose.model('transformation', Transformation),
};
