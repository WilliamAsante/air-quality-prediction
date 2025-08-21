# Air Quality Prediction Project - Hosting Guide

## 🚀 **Hosting Options**

### **Option 1: Free/Low-Cost Hosting (Recommended for Start)**

#### **A. Render.com (Free Tier)**
- **Frontend**: React app on Render
- **Backend API**: Node.js API on Render
- **ML Model**: Python script on Railway or Heroku
- **Database**: Firebase (already configured)

#### **B. Vercel + Railway**
- **Frontend**: Vercel (excellent for React)
- **Backend API**: Railway
- **ML Model**: Railway or Heroku
- **Database**: Firebase

### **Option 2: Production-Ready Hosting**

#### **A. AWS (Amazon Web Services)**
- **Frontend**: S3 + CloudFront
- **Backend API**: Lambda + API Gateway
- **ML Model**: EC2 or Lambda
- **Database**: Firebase or DynamoDB

#### **B. Google Cloud Platform**
- **Frontend**: Firebase Hosting
- **Backend API**: Cloud Run
- **ML Model**: Cloud Functions
- **Database**: Firebase (already configured)

#### **C. Microsoft Azure**
- **Frontend**: Static Web Apps
- **Backend API**: App Service
- **ML Model**: Functions or App Service
- **Database**: Firebase or Cosmos DB

## 🎯 **Recommended: Render.com Setup (Free)**

### **Step 1: Prepare Your Project for Deployment**

#### **1.1 Create Production Build Scripts**
```json
// Frontend_New/package.json - Add build script
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### **1.2 Create Environment Files**
```bash
# Frontend_New/.env.production
VITE_API_URL=https://your-api-url.onrender.com
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
```

#### **1.3 Update API for Production**
```javascript
// backend/api/prediction-api.js - Add CORS for production
app.use(cors({
  origin: ['https://your-frontend-url.onrender.com', 'http://localhost:5173'],
  credentials: true
}));
```

### **Step 2: Deploy Backend API to Render**

#### **2.1 Create render.yaml for Backend API**
```yaml
# backend/api/render.yaml
services:
  - type: web
    name: air-quality-api
    env: node
    buildCommand: npm install
    startCommand: node prediction-api.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

#### **2.2 Deploy Steps:**
1. **Push code to GitHub**
2. **Connect GitHub to Render**
3. **Create new Web Service**
4. **Select your repository**
5. **Set build command**: `npm install`
6. **Set start command**: `node prediction-api.js`
7. **Deploy**

### **Step 3: Deploy Frontend to Render**

#### **3.1 Create render.yaml for Frontend**
```yaml
# Frontend_New/render.yaml
services:
  - type: web
    name: air-quality-frontend
    env: static
    buildCommand: npm run build
    staticPublishPath: ./dist
    envVars:
      - key: VITE_API_URL
        value: https://your-api-url.onrender.com
```

#### **3.2 Deploy Steps:**
1. **Connect GitHub to Render**
2. **Create new Static Site**
3. **Select your repository**
4. **Set build command**: `npm run build`
5. **Set publish directory**: `dist`
6. **Deploy**

### **Step 4: Deploy ML Model (Railway/Heroku)**

#### **4.1 Create Procfile for ML Model**
```bash
# backend/ml-model/Procfile
worker: python model.py
```

#### **4.2 Create requirements.txt (already exists)**
```txt
pandas
numpy
scikit-learn
requests
schedule
```

#### **4.3 Deploy to Railway:**
1. **Connect GitHub to Railway**
2. **Create new service**
3. **Select your repository**
4. **Set start command**: `python model.py`
5. **Add environment variables**
6. **Deploy**

## 🔧 **Alternative: Vercel + Railway Setup**

### **Frontend on Vercel:**
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: `cd Frontend_New && vercel`
3. **Follow prompts**

### **Backend on Railway:**
1. **Connect GitHub to Railway**
2. **Create new service**
3. **Select backend/api folder**
4. **Deploy**

## 🌐 **Production Environment Setup**

### **1. Environment Variables**

#### **Frontend (.env.production):**
```bash
VITE_API_URL=https://your-api-url.onrender.com
VITE_FIREBASE_API_KEY=AIzaSyBWrayH0WtJq4djwExtOCMFQGtpNG6f4wM
VITE_FIREBASE_AUTH_DOMAIN=air-quality-8e6d8.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://air-quality-8e6d8-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=air-quality-8e6d8
```

#### **Backend API (.env):**
```bash
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://your-frontend-url.onrender.com
```

#### **ML Model (.env):**
```bash
FIREBASE_HOST=air-quality-8e6d8-default-rtdb.firebaseio.com
FIREBASE_PATH=/sensorLogs
FIREBASE_AUTH=r5iQokvMXQNMTTDFC6XzcBin1VzWX7JsnvxsIsy6
```

### **2. Update API URLs**

#### **Frontend API Calls:**
```typescript
// Frontend_New/src/utils/predictionReader.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export async function readLatestPredictions(): Promise<AirQualityPrediction[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predictions`);
    // ... rest of the code
  }
}
```

## 📊 **Monitoring & Maintenance**

### **1. Health Checks**
```javascript
// backend/api/prediction-api.js - Add health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### **2. Logging**
```javascript
// Add logging to API
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

### **3. Error Handling**
```javascript
// Add global error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

## 🔒 **Security Considerations**

### **1. CORS Configuration**
```javascript
// Only allow your frontend domain
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
```

### **2. Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

### **3. Environment Variables**
- **Never commit secrets to Git**
- **Use environment variables for all sensitive data**
- **Rotate API keys regularly**

## 💰 **Cost Estimation**

### **Free Tier (Recommended for Start):**
- **Render**: $0/month (free tier)
- **Vercel**: $0/month (free tier)
- **Railway**: $0/month (free tier)
- **Firebase**: $0/month (free tier)
- **Total**: $0/month

### **Production Tier:**
- **Render**: $7/month per service
- **Vercel**: $20/month (Pro plan)
- **Railway**: $5/month per service
- **Firebase**: $25/month (Blaze plan)
- **Total**: ~$60-80/month

## 🚀 **Quick Deployment Checklist**

### **Before Deployment:**
- [ ] Update all API URLs to production
- [ ] Set up environment variables
- [ ] Test production build locally
- [ ] Update CORS settings
- [ ] Add health check endpoints
- [ ] Set up logging

### **After Deployment:**
- [ ] Test all endpoints
- [ ] Verify Firebase connection
- [ ] Check ML model predictions
- [ ] Monitor error logs
- [ ] Set up alerts/notifications
- [ ] Document deployment process

## 📞 **Support & Troubleshooting**

### **Common Issues:**
1. **CORS errors**: Check origin settings
2. **Environment variables**: Verify all are set
3. **Build failures**: Check package.json scripts
4. **API timeouts**: Increase timeout limits
5. **Memory issues**: Optimize ML model

### **Useful Commands:**
```bash
# Check deployment status
curl https://your-api-url.onrender.com/health

# View logs
railway logs
vercel logs
render logs

# Redeploy
git push origin main
```

## 🎯 **Next Steps**

1. **Choose your hosting platform** (Render recommended for start)
2. **Prepare your code for production**
3. **Deploy backend API first**
4. **Deploy frontend**
5. **Deploy ML model**
6. **Test everything**
7. **Set up monitoring**

**Your air quality prediction system will be live and accessible worldwide!** 🌍
