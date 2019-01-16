import { validateTransformation } from 'shared/transformation';
import { models } from './model';

export async function getEvents(req, res) {
  if (!req.jwt) return res.status(401).end('Not authenticated.');

  const events = await models.event.find();
  return res.json(events.map(e => ({ name: e.name, id: e.id })));
}

export async function getEvent(req, res) {
  if (!req.jwt) return res.status(401).end('Not authenticated.');

  const { eventId } = req.params;
  if (!eventId) return res.status(404).end('Not found');

  const event = await models.event.findById(eventId);
  if (event === null) return res.status(404).end('Not found');

  const schedulesArray = await Promise.all(event.schedules.map(s => models.schedule.findById(s)));
  const schedules = schedulesArray.map(s => ({ [s._id.toHexString()]: s.toJSON() }))
    .reduce((p, c) => ({ ...p, ...c }));
  const flatElementsArray = schedulesArray.map(s => s.elements).reduce((p, c) => p.concat(c));
  const elementsArray = await Promise.all(flatElementsArray.map(e => models.element.findById(e)));
  const elements = elementsArray.map(e => ({ [e._id.toHexString()]: e.toJSON() }))
    .reduce((p, c) => ({ ...p, ...c }));

  return res.json({ event, schedules, elements });
}

async function lookupId(type, id) {
  if (!models.hasOwnProperty(type)) return null;

  // turn type into model object
  const model = Object.getOwnPropertyDescriptor(models, type).value;
  const objId = models.createObjectId(id);
  const obj = await model.findById(objId);

  console.log(obj.toJSON());
  return obj;
}

export async function handleTransformation(req, res) {
  if (!req.jwt) return res.status(401).end('Not authenticated.');

  const transformation = req.body;
  try {
    const valid = await validateTransformation(transformation, lookupId);
    if (valid) {
      console.log(req.body);
    }
  } catch (e) {
    return res.status(400).end('Bad request');
  }
  return res.json({});
}
