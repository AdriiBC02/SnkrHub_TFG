-- Existing code...

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_admin_user_modtime
BEFORE UPDATE ON admin_users
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Insert a sample admin user (replace with your desired email)
INSERT INTO admin_users (id, email)
VALUES (
  '774aae0a-4da1-4027-b8af-5449811a339b', -- Replace with a valid UUID from auth.users
  'adriibc02@gmail.com'
);