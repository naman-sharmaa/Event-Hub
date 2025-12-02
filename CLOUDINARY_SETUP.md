# Cloudinary Setup for Event Image Uploads

## Problem
Render uses **ephemeral storage** - uploaded files are deleted when the server restarts. We need cloud storage for persistent image hosting.

## Solution: Cloudinary Integration

### Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. After signup, you'll see your **Dashboard** with credentials

### Step 2: Get Cloudinary Credentials
From your Cloudinary Dashboard, copy these values:
- **Cloud Name**: e.g., `dxyz123abc`
- **API Key**: e.g., `123456789012345`
- **API Secret**: e.g., `abcdefghijklmnopqrstuvwxyz`

### Step 3: Add Environment Variables

#### For Local Development (.env file in backend folder):
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

#### For Render Production:
1. Go to your Render dashboard: https://dashboard.render.com
2. Select your backend service
3. Go to **Environment** tab
4. Add these environment variables:
   - `CLOUDINARY_CLOUD_NAME` = your_cloud_name
   - `CLOUDINARY_API_KEY` = your_api_key
   - `CLOUDINARY_API_SECRET` = your_api_secret
5. Click **Save Changes** - Render will auto-deploy

### Step 4: Test the Setup

#### Local Testing:
1. Start your backend: `cd backend && npm run dev`
2. Start your frontend: `cd .. && npm run dev`
3. Login as organizer
4. Create a new event and upload an image
5. Check console logs - should see: `📸 Image uploaded to Cloudinary`
6. The image URL in MongoDB should be a Cloudinary URL like:
   `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/event-images/xyz.jpg`

#### Production Testing (after Render deployment):
1. Wait for Render to finish deploying (2-5 minutes)
2. Go to your production site
3. Login as organizer and create an event with an image
4. The image should now display correctly and persist after server restarts

### What Changed:

#### Backend:
- ✅ Installed `cloudinary` and `multer-storage-cloudinary` packages
- ✅ Created `/backend/config/cloudinary.js` for Cloudinary configuration
- ✅ Updated `/backend/routes/eventRoutes.js` to use Cloudinary storage
- ✅ Updated `/backend/controllers/eventController.js` to save Cloudinary URLs

#### Frontend:
- ✅ No changes needed! `getImageUrl()` helper already handles full URLs
- ✅ Cloudinary URLs (https://...) pass through unchanged

### How It Works:

1. **Organizer uploads image** → Sent to backend as multipart/form-data
2. **Multer + Cloudinary** → Image uploaded directly to Cloudinary cloud
3. **Cloudinary returns URL** → e.g., `https://res.cloudinary.com/.../image.jpg`
4. **Backend saves URL to MongoDB** → Full Cloudinary URL stored in `imageUrl` field
5. **Frontend displays image** → `getImageUrl()` detects https:// and returns URL as-is
6. **Image persists forever** → No more 404 errors after Render restarts!

### Benefits:
- ✅ **Persistent storage** - Images never deleted
- ✅ **Fast CDN delivery** - Cloudinary serves images globally
- ✅ **Automatic optimization** - Images compressed for web
- ✅ **Free tier generous** - 25GB storage/bandwidth per month
- ✅ **No code changes** - Frontend automatically handles Cloudinary URLs

### Verification:
Check your MongoDB database - `imageUrl` field should now contain:
- ❌ OLD: `/uploads/events/image-1234567890.jpg` (local path - doesn't work on Render)
- ✅ NEW: `https://res.cloudinary.com/your-cloud/image/upload/v.../image.jpg` (works everywhere!)

### Troubleshooting:

**Images still not showing?**
1. Check Render environment variables are set correctly
2. Check Render deployment logs for errors: `Error: Must supply cloud_name`
3. Verify Cloudinary credentials are correct (check Dashboard)
4. Clear browser cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)

**404 errors still happening?**
1. Old events with local paths: Edit those events and re-upload images
2. Database cleanup: Delete old events with `/uploads/...` paths
3. The new system only works for newly uploaded images

**Need to migrate old images?**
Old local images are lost (Render's ephemeral storage). You'll need to:
1. Re-upload images for existing events, or
2. Use external URLs for old events

---

**Next Steps:**
1. ✅ Get Cloudinary credentials
2. ✅ Add environment variables to Render
3. ✅ Commit and push changes to GitHub
4. ✅ Wait for Render to deploy
5. ✅ Test image upload on production
