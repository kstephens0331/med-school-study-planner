import express from 'express';
import { supabase, togetherAI, srs, type Card } from '../api';
import { authenticate } from '../middleware/auth';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validate';

const router = express.Router();

// Auth routes
router.post('/register',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  validateRequest,
  async (req, res) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: req.body.email,
        password: req.body.password
      });

      if (error) throw error;
      res.status(201).json({ user: data.user });
    } catch (err: any) {
      res.status(400).json({ 
        error: err.message || 'Registration failed' 
      });
    }
  }
);

router.post('/login',
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  validateRequest,
  async (req, res) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: req.body.email,
        password: req.body.password
      });

      if (error) throw error;
      res.json({ token: data.session?.access_token });
    } catch (err: any) {
      res.status(401).json({ 
        error: err.message || 'Invalid credentials' 
      });
    }
  }
);

// Card routes
router.get('/cards', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', req.user.id)
      .lte('next_review', new Date().toISOString());

    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    res.status(500).json({ 
      error: err.message || 'Failed to fetch cards' 
    });
  }
});

router.post('/cards', 
  authenticate,
  body('content').notEmpty().trim().escape(),
  validateRequest,
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('cards')
        .insert({
          user_id: req.user.id,
          content: req.body.content,
          next_review: new Date().toISOString()
        })
        .select()
        .single();

      if (error || !data) throw error;
      res.status(201).json(data);
    } catch (err: any) {
      res.status(400).json({ 
        error: err.message || 'Failed to create card' 
      });
    }
  }
);

// SRS routes
router.post('/cards/:id/review',
  authenticate,
  param('id').isUUID(),
  body('performanceRating').isInt({ min: 1, max: 5 }),
  validateRequest,
  async (req, res) => {
    try {
      const card = await srs.processReview(
        req.params.id,
        req.body.performanceRating
      );
      res.json(card);
    } catch (err: any) {
      res.status(400).json({ 
        error: err.message || 'Review failed' 
      });
    }
  }
);

// AI routes
router.post('/summarize',
  authenticate,
  body('text').notEmpty().isString(),
  validateRequest,
  async (req, res) => {
    try {
      const summary = await togetherAI.summarize(req.body.text);
      res.json({ summary });
    } catch (err: any) {
      res.status(500).json({ 
        error: err.message || 'Summarization failed' 
      });
    }
  }
);

export default router;