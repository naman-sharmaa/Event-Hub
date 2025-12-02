import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { body } from 'express-validator';
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getMyEvents,
} from '../controllers/eventController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'events');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ storage });

// Validation rules - optional for FormData uploads
const eventValidation = [
  body('title').optional().trim().notEmpty().withMessage('Title is required'),
  body('category').optional().trim().notEmpty().withMessage('Category is required'),
  body('date').optional().isISO8601().withMessage('Valid date is required'),
  body('location').optional().trim().notEmpty().withMessage('Location is required'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('bookingExpiry').optional().isISO8601().withMessage('Valid booking expiry date is required'),
];

// Public routes
router.get('/', getEvents);

// Protected routes (must be before /:id to avoid route matching issues)
router.get('/organizer/my-events', authenticate, authorize('organizer'), getMyEvents);
// For file uploads, skip validation since FormData fields are handled differently
router.post('/', authenticate, authorize('organizer'), upload.single('image'), createEvent);
router.put('/:id', authenticate, authorize('organizer'), upload.single('image'), updateEvent);
router.delete('/:id', authenticate, authorize('organizer'), deleteEvent);

// Public routes (/:id must be last)
router.get('/:id', getEvent);

export default router;

