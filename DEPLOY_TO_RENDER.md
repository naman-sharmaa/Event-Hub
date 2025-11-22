# Step-by-Step Guide: Deploy Event Hub to Render

## Prerequisites
- GitHub repository pushed (✅ Done!)
- MongoDB Atlas account with connection string
- Gmail account with App Password enabled
- Razorpay account with API keys
- Firebase project set up

---

## Step 1: Sign Up / Login to Render

1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with your **GitHub account** (recommended)
4. Authorize Render to access your repositories

---

## Step 2: Deploy Backend API

### A. Create New Web Service

1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your **Event-Hub** repository
3. Configure the service:

```
Name: eventhub-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install
Start Command: node server.js
Instance Type: Free
```

### B. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add each:

```bash
NODE_ENV=production
PORT=5050

# Your MongoDB URI from Atlas
MONGODB_URI=mongodb+srv://namansharma2109_db_user:YOUR_PASSWORD@eventhub1.cdyt0nq.mongodb.net/ticketcharge_hub?retryWrites=true&w=majority&appName=EventHub1

# Generate new JWT secret (run: openssl rand -base64 32)
JWT_SECRET=your-generated-secret-here
JWT_EXPIRE=7d

# Your Gmail credentials
EMAIL_USER=woodymist2110@gmail.com
EMAIL_PASSWORD=ijjtvlnzcbajyynw

# Your Razorpay credentials
RAZORPAY_KEY_ID=rzp_test_RgpqWh2lOmXvv7
RAZORPAY_KEY_SECRET=5oRgelpZJkD5VaJZ1RSR7BlG

# Your Firebase credentials
FIREBASE_PROJECT_ID=eventhub-d4844
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@eventhub-d4844.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCSP4A5gTBojcP3\nXtGROnuxqyBU5CzCvxLiYj8OD3u71V0AcDwlF8IgXBTLnNYqoBX21Wu+dK0aeE3o\nmolq4Pgo+nLaSmogE8FhPpKSj3Q3H4hJZMRtme9pGNiAiIhT3TZT3Vutlm4RJhr0\n9qR6kk58mb0vK1vHZ4kgeExG3jOL9MgkOqDYGP6WbTNJBp14/vA1F5dgYl34pA7h\nK2umnZShikmaFgvDGtkTiLlshwR8envzo0nP1G+WNRQhahGgvCj0wonzeaKMQVLM\niQndWfJpHdDn9ZlS4Z2TvfpbRPgFO2Ho4B8Eb1N3VxnufTZsg1YYmbhi6O7HIZ8+\nRi3rRic5AgMBAAECggEABU1YEL2mS6QYHrfJUUKViXNy0KEVHlpfDOYS8yeMjNrH\nbGSlSZL67sFn35noCdOT+Eb0iQsh23vRF0XDBaTyWkn6L//SqScOM8BZAAdDZ1w1\nTLPiizaxf1XvQ3mvt5qlhZTY5go2I1kGUSs/+1GiltHcEgG4ahpO1maGHWug4soH\nDv0UHXv7+7aoAK5Ycmi9XYivGgTDlZUJw0I3wrCv9zausw6IXgP91elr9IsNYC99\np4RZBXIp3ByX2pmQT5qnLPHXZa/BGLHn4WWDtqMHnkJ/995gaOVD+0uVz5QXlsEc\n/qf0dCzRcRIGekEhESKCqKl4DHvRTnXDw/jgNR9cIQKBgQDFtiSoLm7qQxlu6VsS\nqiHHJWzxkVNHuQqgNrog+0C+zqq31+5MyHaWh/Dx9VzsNYYeySESCTd1OhgT9WBc\nN5KbtG3SKjW6Xl4WFewl2nCD1x+4VqS5lbHz6gqyemCP0HUj8VW70f6ynS7zRlCT\nibQTcwryePYvkQQL0KVtSfHK2wKBgQC9XUNSB5tEoJ5bSW/yKT25MX4wSsN+SrzX\nysSTaBUBy0LrNtEuivrm+SQTiV9UQ9gm+Ey4A3f9IarLrgpByIUM3RjGfYE8miuU\nRtbz8PI9TM7hJcAJMPA29nX2g5ilGR3B3t9iwIZvFh633ahmTisUnxRMmV66p/5O\nSO0EFAQQewKBgDTF0nEFu9tRv7coGIQZ31w9tB+ir70EOj7bfMES74w+s7jQrS3X\nkDfL31dmK8Bs5PjQrMAYr7HdqNGi/G6A8uQWu/2OALtXNvvkLB1Keh/myvO0RNG4\nkEBP5z0Ohzm75ZiLcVvpyHc6l26eBSHsbqGGYpSoDuZRaegRcCaEx0JjAoGAF1l1\noJrBgX/Qpu7yN8jwDHLW3XuKiXsLuAwPmyF9XaBDmx9CQdvvPiXAVgxdTdWjxIJf\na106IWNSXRUTvLLN/R0SHf+BvQhBkWH+xUuTgw2CgO6XtEpthEl1mDT30Hu9WJdz\nsgiNSwtONFvHlP3UgBFxflR3AssOJ3cEirkxGxsCgYA2Z6yestd5zZvvlT1MCW7G\n/NMLD/mgBEGDkekRFguJUJwrB8nHk+hYPF+1FETUTp2UE3EgyPLA/qXntr8Kb9+I\nkKWnpxLQfeXv7YZSG7d+1TR8aAmsO0Xu8HG4B5A/vdceImJWPv9FH2JkLfGTU7IK\nZAKUW/uJDA5UDe3zgZs6+w==\n-----END PRIVATE KEY-----\n

# Leave this blank for now - will update after frontend deploys
FRONTEND_URL=
```

### C. Deploy Backend

1. Click **"Create Web Service"**
2. Wait 3-5 minutes for build and deployment
3. Once deployed, **copy your backend URL** (e.g., `https://eventhub-backend.onrender.com`)

---

## Step 3: Deploy Frontend

### A. Create New Static Site

1. From Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect your **Event-Hub** repository
3. Configure the service:

```
Name: eventhub-frontend
Region: Oregon (US West)
Branch: main
Root Directory: (leave empty - root of repo)
Build Command: npm install && npm run build
Publish Directory: dist
```

### B. Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add:

```bash
# Use your actual backend URL from Step 2C
VITE_API_URL=https://eventhub-backend.onrender.com/api

# Your Razorpay key
VITE_RAZORPAY_KEY_ID=rzp_test_RgpqWh2lOmXvv7

# Your Firebase config (get from Firebase Console)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=eventhub-d4844.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=eventhub-d4844
VITE_FIREBASE_STORAGE_BUCKET=eventhub-d4844.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### C. Add Rewrite Rules for SPA

1. In **"Redirects/Rewrites"** section, add:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Type:** Rewrite

2. Click **"Create Static Site"**
3. Wait 3-5 minutes for build and deployment
4. Once deployed, **copy your frontend URL** (e.g., `https://eventhub-frontend.onrender.com`)

---

## Step 4: Update Backend CORS

1. Go back to your **eventhub-backend** service in Render
2. Go to **"Environment"** tab
3. Find `FRONTEND_URL` variable
4. Update it with your frontend URL: `https://eventhub-frontend.onrender.com`
5. Click **"Save Changes"**
6. Backend will automatically redeploy

---

## Step 5: Update MongoDB Network Access

1. Go to MongoDB Atlas Dashboard
2. Navigate to **Network Access** → **IP Access List**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (or add Render's IPs)
5. Click **"Confirm"**

---

## Step 6: Test Your Deployment

### Test Backend API:
```
https://eventhub-backend.onrender.com/api/events
```
Should return events list or empty array.

### Test Frontend:
```
https://eventhub-frontend.onrender.com
```
Should load your Event Hub homepage.

### Test Admin Login:
```
https://eventhub-frontend.onrender.com/admin/login
Email: namansharma2109@gmail.com
Password: Xanthium@123
```

---

## Common Issues & Solutions

### Issue 1: Backend shows "Application failed to respond"
**Solution:** Check logs in Render dashboard. Usually means env variables are missing or MongoDB connection failed.

### Issue 2: Frontend shows blank page
**Solution:** 
- Check browser console for errors
- Verify `VITE_API_URL` is correct
- Make sure all `VITE_` variables are set

### Issue 3: CORS errors
**Solution:** 
- Ensure `FRONTEND_URL` in backend matches your actual frontend URL
- Don't include trailing slash

### Issue 4: Free tier sleeps after inactivity
**Solution:** 
- Render free tier spins down after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading to paid plan for production

---

## Important Notes

1. **Free Tier Limitations:**
   - Services sleep after 15 min inactivity
   - 750 hours/month free
   - Slower cold starts

2. **MongoDB Atlas:**
   - Free tier: 512MB storage
   - Ensure network access allows Render

3. **Environment Variables:**
   - Never commit `.env` to git
   - Keep production keys secure
   - Rotate keys regularly

4. **Custom Domain (Optional):**
   - Go to service settings → Custom Domains
   - Add your domain and update DNS records

---

## Your Deployed URLs

After deployment, you'll have:

- **Frontend:** `https://eventhub-frontend.onrender.com`
- **Backend API:** `https://eventhub-backend.onrender.com`
- **Admin Portal:** `https://eventhub-frontend.onrender.com/admin`

---

## Next Steps After Deployment

1. **Test all features:**
   - User registration/login
   - Event browsing
   - Ticket booking
   - Admin portal
   - Organizer dashboard

2. **Monitor logs:**
   - Check Render logs for any errors
   - Monitor MongoDB Atlas for queries

3. **Set up custom domain** (optional)

4. **Configure email settings:**
   - Verify Gmail App Password works
   - Test OTP emails

5. **Update GitHub README** with live links

---

Need help? Check:
- Render Dashboard logs for error details
- MongoDB Atlas logs for connection issues
- Browser console for frontend errors
