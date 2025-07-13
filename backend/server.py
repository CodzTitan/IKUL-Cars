from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import uuid
from datetime import datetime

load_dotenv()

app = FastAPI(title="IKUL Cars API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/ikul_cars_db")
client = AsyncIOMotorClient(MONGO_URL)
db = client.get_database()

# Pydantic models
class CarSpec(BaseModel):
    id: str
    name: str
    brand: str
    model: str
    year: int
    horsepower: int
    top_speed: int
    engine: str
    acceleration_0_60: float
    image_url: str
    blueprint_image_url: str
    description: str
    is_latest: bool = False
    created_at: datetime

class CarSpecCreate(BaseModel):
    name: str
    brand: str
    model: str
    year: int
    horsepower: int
    top_speed: int
    engine: str
    acceleration_0_60: float
    image_url: str
    blueprint_image_url: str
    description: str
    is_latest: bool = False

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "IKUL Cars API is running"}

@app.get("/api/cars/latest", response_model=List[CarSpec])
async def get_latest_cars():
    """Get the latest car specs for the weekly drop section"""
    cursor = db.cars.find({"is_latest": True}).sort("created_at", -1).limit(10)
    cars = []
    async for car in cursor:
        car["id"] = car.pop("_id")
        cars.append(CarSpec(**car))
    return cars

@app.get("/api/cars/search")
async def search_cars(q: str):
    """Search cars by name, brand, or model"""
    if not q or len(q.strip()) < 2:
        return []
    
    search_query = {
        "$or": [
            {"name": {"$regex": q, "$options": "i"}},
            {"brand": {"$regex": q, "$options": "i"}},
            {"model": {"$regex": q, "$options": "i"}}
        ]
    }
    
    cursor = db.cars.find(search_query).limit(10)
    cars = []
    async for car in cursor:
        car["id"] = car.pop("_id")
        cars.append({
            "id": car["id"],
            "name": car["name"],
            "brand": car["brand"],
            "model": car["model"],
            "year": car["year"]
        })
    return cars

@app.get("/api/cars/{car_id}", response_model=CarSpec)
async def get_car_details(car_id: str):
    """Get detailed specs for a specific car"""
    car = await db.cars.find_one({"_id": car_id})
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    
    car["id"] = car.pop("_id")
    return CarSpec(**car)

@app.post("/api/cars", response_model=CarSpec)
async def create_car(car: CarSpecCreate):
    """Create a new car specification"""
    car_dict = car.dict()
    car_dict["id"] = str(uuid.uuid4())
    car_dict["created_at"] = datetime.utcnow()
    car_dict["_id"] = car_dict["id"]
    
    await db.cars.insert_one(car_dict)
    car_dict["id"] = car_dict.pop("_id")
    return CarSpec(**car_dict)

@app.on_event("startup")
async def startup_event():
    """Initialize database with sample data"""
    # Check if we have any cars in the database
    count = await db.cars.count_documents({})
    if count == 0:
        # Sample car data
        sample_cars = [
            {
                "_id": str(uuid.uuid4()),
                "name": "Ferrari 296 GTB",
                "brand": "Ferrari",
                "model": "296 GTB",
                "year": 2024,
                "horsepower": 818,
                "top_speed": 205,
                "engine": "2.9L V6 Hybrid",
                "acceleration_0_60": 2.9,
                "image_url": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800",
                "blueprint_image_url": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
                "description": "The ultimate expression of Ferrari's hybrid technology",
                "is_latest": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": str(uuid.uuid4()),
                "name": "Porsche 911 GT3 RS",
                "brand": "Porsche",
                "model": "911 GT3 RS",
                "year": 2024,
                "horsepower": 518,
                "top_speed": 184,
                "engine": "4.0L Flat-6",
                "acceleration_0_60": 3.0,
                "image_url": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
                "blueprint_image_url": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
                "description": "Track-focused precision engineering",
                "is_latest": True,
                "created_at": datetime.utcnow()
            },
            {
                "_id": str(uuid.uuid4()),
                "name": "Bugatti Chiron",
                "brand": "Bugatti",
                "model": "Chiron",
                "year": 2024,
                "horsepower": 1479,
                "top_speed": 261,
                "engine": "8.0L W16 Quad-Turbo",
                "acceleration_0_60": 2.4,
                "image_url": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
                "blueprint_image_url": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800",
                "description": "The pinnacle of automotive engineering",
                "is_latest": True,
                "created_at": datetime.utcnow()
            }
        ]
        
        await db.cars.insert_many(sample_cars)
        print("Sample car data inserted successfully")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)