import {Router} from 'express'
import { createBooking, deleteBooking, getPersonalBookings, getActiveBookings, getBookingsByDate, changeStatus } from '../controllers/booking.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createBookingSchema } from '../Schemas/booking.schema.js'

const router = Router()

router.post('/bookings',authRequired, validateSchema(createBookingSchema), createBooking);
router.delete('/bookings/:id', authRequired, deleteBooking);
router.get('/bookings', authRequired, getPersonalBookings);
router.get('/bookings',authRequired, getActiveBookings);
router.get('/bookings', authRequired, getBookingsByDate);
router.put('/bookings/:id', authRequired, changeStatus);

export default router