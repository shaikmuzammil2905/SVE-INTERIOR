/* ==========================================================================
   SV Elegant Interior - Supabase & Cloudinary Configuration Engine
   ========================================================================== */

const SUPABASE_URL = 'https://evvxxxpjqtceqhisgckx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dnh4eHBqcXRjZXFoaXNnY2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3MzQwNDEsImV4cCI6MjEwMjMxMDA0MX0.-4fBkFXZW4ioADG5Aw84HJYShxTmhCgCMKfPla-DpMQ';

const CLOUDINARY_CONFIG = {
  cloudName: 'dn2l3pe4',
  uploadPreset: 'ml_default',
  uploadUrl: 'https://api.cloudinary.com/v1_1/dn2l3pe4/auto/upload'
};

// Initialize Supabase JS Client
let db = null;

if (window.supabase) {
  db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = db;
} else {
  console.warn('Supabase SDK script not loaded yet. Waiting for script initialization...');
}

// Utility: Cloudinary Direct Upload with Progress Tracking
async function uploadToCloudinary(file, folder = 'sve-interior', onProgress = null) {
  if (!file) throw new Error('No file provided for upload.');

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('folder', folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY_CONFIG.uploadUrl, true);

    if (onProgress && xhr.upload) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          onProgress(percentComplete);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        // Save asset metadata to Supabase media_assets table asynchronously
        saveMediaAssetRecord(response, folder);
        resolve({
          url: response.secure_url,
          public_id: response.public_id,
          format: response.format,
          resource_type: response.resource_type,
          width: response.width,
          height: response.height,
          bytes: response.bytes
        });
      } else {
        let errMessage = 'Cloudinary upload failed.';
        try {
          const errRes = JSON.parse(xhr.responseText);
          if (errRes.error && errRes.error.message) errMessage = errRes.error.message;
        } catch (e) {}
        reject(new Error(errMessage));
      }
    };

    xhr.onerror = () => reject(new Error('Network error occurred during media upload.'));
    xhr.send(formData);
  });
}

// Save uploaded media metadata to Supabase media_assets table
async function saveMediaAssetRecord(res, folder) {
  if (!db) return;
  try {
    await db.from('media_assets').upsert({
      file_name: res.original_filename || 'asset',
      secure_url: res.secure_url,
      cloudinary_public_id: res.public_id,
      resource_type: res.resource_type,
      format: res.format,
      width: res.width,
      height: res.height,
      bytes: res.bytes,
      folder: folder
    }, { onConflict: 'cloudinary_public_id' });
  } catch (e) {
    console.error('Failed to log media asset in database:', e);
  }
}

// Log admin action to activity_logs table
async function logAdminActivity(action, module, recordId = null, details = '') {
  if (!db) return;
  try {
    const user = (await db.auth.getUser())?.data?.user;
    const adminEmail = user?.email || 'admin@svelegantinteriors.com';

    await db.from('activity_logs').insert([{
      admin_email: adminEmail,
      action: action,
      module: module,
      record_id: recordId ? String(recordId) : null,
      details: details
    }]);
  } catch (err) {
    console.error('Error logging activity:', err);
  }
}
