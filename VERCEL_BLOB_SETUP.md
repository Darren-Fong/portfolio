# How to Setup Vercel Blob Storage

## 1. Create Vercel Blob Store

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project (or create one by importing from GitHub)
3. Go to **Storage** tab
4. Click **Create Database**
5. Select **Blob** 
6. Choose a name (e.g., "portfolio-data")
7. Click **Create**

## 2. Get Your Token

After creating the Blob store:
1. You'll see environment variables automatically added
2. Copy the `BLOB_READ_WRITE_TOKEN` value
3. It looks like: `vercel_blob_rw_xxxxxxxxxxxxx`

## 3. Add to Local Development

Create `.env.local` file in your project root:

```bash
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

## 4. Deploy to Vercel

The environment variables are **automatically set** in production when you create the Blob store.

Just push your code:
```bash
git add .
git commit -m "Add Vercel Blob storage"
git push
```

Vercel will auto-deploy with the Blob connection already configured!

## 5. How It Works

- **Admin page** (`/admin`) saves data via API routes
- **API routes** (`/api/portfolio`) store data in Vercel Blob
- **Frontend components** fetch data from API routes
- **Data persists** across deployments
- **No database** setup needed

## Advantages of Vercel Blob:

✅ **Free tier**: 1 GB storage included  
✅ **Fast**: Globally distributed CDN  
✅ **Simple**: No database configuration  
✅ **Automatic**: Environment variables auto-configured  
✅ **Scalable**: Handles traffic spikes  

## Alternative: Local Development Without Vercel

For local testing without Vercel Blob, the API will return empty data `{}` and won't save. This is fine for development - data will work once deployed to Vercel.

Or, you can mock it by creating a local `.env.local` with a test token after deploying to Vercel once.
