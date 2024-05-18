const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to delete an image from Supabase storage
async function deleteImage(imageName) {
    try {
        const { data, error } = await supabase.storage
            .from('YOUR_BUCKET_NAME')
            .remove([imageName]);
        
        if (error) {
            console.error('Error deleting image:', error.message);
            return;
        }
        
        console.log('Image deleted successfully:', data);
    } catch (error) {
        console.error('Error deleting image:', error.message);
    }
}

// Usage example
const imageNameToDelete = 'example.jpg';
deleteImage(imageNameToDelete);