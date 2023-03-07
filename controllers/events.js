const {Event} = require('../models/Event');

const getEvents = async (req, res) => {
    const events = await Event.find().populate('user', 'name');

    return res.status(200).json({
        ok: true,
        events
    });
}

const createEvent = async (req, res) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        return res.status(201).json({
            ok: true,
            event: savedEvent
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            message: 'Algo salio mal'
        });
    }
}

const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró el evento'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(403).json({
                ok: false,
                message: 'El usuario no tiene autorización para realizar esta operación'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        return res.status(200).json({
            ok: true,
            event: updatedEvent
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            ok: false,
            message: 'Algo salio mal',
        });
    }
}

const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'No se encontró el evento'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(403).json({
                ok: false,
                message: 'El usuario no tiene autorización para realizar esta operación'
            });
        }

        await Event.findByIdAndDelete(eventId);

        return res.status(200).json({ok: true});
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            ok: false,
            message: 'Algo salio mal'
        });
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}