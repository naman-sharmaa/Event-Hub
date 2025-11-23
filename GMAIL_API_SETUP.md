# Gmail API Setup for Render Deployment

Since Render blocks SMTP ports (587, 465), you need to use Gmail API instead.

## Step 1: Enable Gmail API

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Enable Gmail API:
   - Go to "APIs & Services" → "Library"
   - Search for "Gmail API"
   - Click "Enable"

## Step 2: Create OAuth2 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Select "Web application"
4. Add authorized redirect URI: `https://developers.google.com/oauthplayground`
5. Save and note down:
   - Client ID
   - Client Secret

## Step 3: Generate Refresh Token

1. Go to https://developers.google.com/oauthplayground/
2. Click settings icon (top right) → Check "Use your own OAuth credentials"
3. Enter your Client ID and Client Secret
4. In "Step 1", select "Gmail API v1" → "https://mail.google.com/"
5. Click "Authorize APIs"
6. Sign in with your Gmail account (woodymist2110@gmail.com)
7. Click "Exchange authorization code for tokens"
8. Copy the "Refresh token"

## Step 4: Add to Render Environment Variables

Add these to eventhub-backend on Render:

```
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REFRESH_TOKEN=your_refresh_token  
EMAIL_USER=woodymist2110@gmail.com
```

## Step 5: Update Code

The code has been updated to use Gmail API automatically when these variables are present.

After adding environment variables, redeploy and emails will work! ✅
