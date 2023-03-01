const {Event} = require('../models/Event');

const getEvents = (req, res) => {
    return res.status(200).json({
        ok: true,
        message: 'Obtener eventos'
    });
}

const createEvent = async(req, res) => {
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

const updateEvent = (req, res) => {
    return res.status(200).json({
       ok: true,
       message: 'Actualizar evento'
    });
}

const deleteEvent = (req, res) => {
    return res.status(200).json({
       ok: true,
       message: 'Eliminar evento'
    });
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}