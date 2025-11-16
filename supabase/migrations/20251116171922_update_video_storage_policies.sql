/*
  # Update Video Storage Policies for Authentication

  1. Security Changes
    - Drop existing public upload policy that allows anyone to upload
    - Create new policy restricting uploads to authenticated users only
    - Keep public read access so videos display on Home page for all visitors
    - Add delete policy for authenticated users to manage their uploads
  
  2. Policies Created
    - "Public Read Access" - Anyone can view videos in the videos bucket
    - "Authenticated Upload" - Only authenticated users can upload videos
    - "Authenticated Delete" - Only authenticated users can delete videos
  
  Important Notes:
    - Videos remain publicly accessible for display on the website
    - Only authorized users can upload new videos
    - Prevents unauthorized video uploads while maintaining public viewing
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads" ON storage.objects;

-- Create policy for public read access (anyone can view videos)
CREATE POLICY "Public Read Access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'videos');

-- Create policy for authenticated uploads only
CREATE POLICY "Authenticated Upload"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'videos');

-- Create policy for authenticated deletes
CREATE POLICY "Authenticated Delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'videos');

-- Create policy for authenticated updates (for metadata changes)
CREATE POLICY "Authenticated Update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'videos')
  WITH CHECK (bucket_id = 'videos');