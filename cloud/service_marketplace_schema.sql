-- Service Marketplace Database Schema
-- Optimized for scalability, geo-search, and production best practices.

-- 1. Enable Necessary Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 2. Utility Function for Timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Note: 'service_users' table is assumed to exist as follows:
-- CREATE TABLE service_users (
--     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     first_name VARCHAR(255) NOT NULL,
--     last_name VARCHAR(255) NOT NULL,
--     email VARCHAR(255) UNIQUE NOT NULL,
--     phone_number VARCHAR(20) UNIQUE,
--     is_active BOOLEAN DEFAULT TRUE,
--     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- 3. Service Provider Profile
CREATE TABLE IF NOT EXISTS service_provider_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_user_id UUID NOT NULL UNIQUE REFERENCES service_users(id) ON DELETE CASCADE,
    bio TEXT,
    tagline VARCHAR(255),
    profile_picture_url TEXT,
    years_of_experience INTEGER CHECK (years_of_experience >= 0),
    hourly_rate DECIMAL(12, 2) CHECK (hourly_rate >= 0),
    
    -- Professional Address
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_service_provider_profiles_updated_at 
BEFORE UPDATE ON service_provider_profiles 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 4. Service Categories
-- Using a many-to-many relationship for categorization
CREATE TABLE IF NOT EXISTS service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    parent_category_id UUID REFERENCES service_categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS service_provider_category_map (
    service_user_id UUID NOT NULL REFERENCES service_users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (service_user_id, category_id)
);

-- 5. Service Provider Skills
CREATE TABLE IF NOT EXISTS service_provider_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_user_id UUID NOT NULL REFERENCES service_users(id) ON DELETE CASCADE,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(20) CHECK (proficiency_level IN ('Beginner', 'Intermediate', 'Expert', 'Specialist')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(service_user_id, skill_name)
);

-- 6. Service Provider Ratings & Reviews
CREATE TABLE IF NOT EXISTS service_provider_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_user_id UUID NOT NULL REFERENCES service_users(id) ON DELETE CASCADE,
    reviewer_user_id UUID NOT NULL, -- Link to consumer/user table
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_service_provider_ratings_updated_at 
BEFORE UPDATE ON service_provider_ratings 
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 7. Service Provider Work History
CREATE TABLE IF NOT EXISTS service_provider_work_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_user_id UUID NOT NULL REFERENCES service_users(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    project_title VARCHAR(255),
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    is_current_work BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Service Provider Current Location (PostGIS)
CREATE TABLE IF NOT EXISTS service_provider_current_location (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_user_id UUID NOT NULL UNIQUE REFERENCES service_users(id) ON DELETE CASCADE,
    
    -- Geography type: Point (longitude, latitude)
    -- 4326 is the SRID for WGS 84 (GPS coordinates)
    location GEOGRAPHY(POINT, 4326) NOT NULL,
    
    accuracy_meters DECIMAL(8, 2),
    is_online BOOLEAN DEFAULT TRUE,
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CREATE TRIGGER update_location_timestamp 
-- BEFORE UPDATE ON service_provider_current_location 
-- FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 9. Indexes & Optimization

-- Spatial Index for Geo-Searching
CREATE INDEX idx_sp_location ON service_provider_current_location USING GIST (location);

-- Indexes for Fast Lookups
CREATE INDEX idx_sp_profile_user_id ON service_provider_profiles(service_user_id);
CREATE INDEX idx_sp_rating_user_id ON service_provider_ratings(service_user_id);
CREATE INDEX idx_sp_skills_user_id ON service_provider_skills(service_user_id);
CREATE INDEX idx_sp_work_history_user_id ON service_provider_work_history(service_user_id);

-- GIN Index for Full Text Search on Bio/Skills (Optional but recommended)
CREATE INDEX idx_sp_profile_bio_fts ON service_provider_profiles USING GIN (to_tsvector('english', bio));

/*
================================================================================
Scalability & Geo-Search Optimization Suggestions:
================================================================================

1. Geo-Search Efficiency (PostGIS):
   - Use `ST_DWithin` for circular searches (e.g., finding providers within 10km). It leverages GIST indexes.
   - Example query: 
     SELECT service_user_id FROM service_provider_current_location 
     WHERE ST_DWithin(location, ST_MakePoint(lon, lat)::geography, 10000);

2. Materialized Views:
   - For aggregator metrics like 'Average Rating', use Materialized Views or a cache (Redis) to avoid heavy 
     re-calculation on every profile view.

3. Partitioning:
   - If work history or ratings tables grow into millions of rows, consider table partitioning by `created_at` 
     or `service_user_id`.

4. Denormalization vs. Normalization:
   - Keep frequently accessed profile data (like name, avg_rating) in a denormalized search index (Elasticsearch/Typesense) 
     for sub-millisecond search performance.

5. Global Scalability:
   - For global operations, ensure SRID 4326 is used (WGS 84 standard). 
   - Use Read Replicas close to geographical hotspots to reduce latency.
*/
