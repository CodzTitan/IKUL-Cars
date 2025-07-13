#!/usr/bin/env python3
"""
IKUL Cars Backend API Test Suite
Tests all backend API endpoints and functionality
"""

import requests
import json
import time
import os
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE = f"{BACKEND_URL}/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

def test_health_check():
    """Test the health check endpoint"""
    print_test_header("Health Check Endpoint")
    
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy":
                print_success("Health check endpoint working correctly")
                print_info(f"Response: {data}")
                return True
            else:
                print_error(f"Health check returned unexpected status: {data}")
                return False
        else:
            print_error(f"Health check failed with status code: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Health check request failed: {e}")
        return False

def test_latest_cars():
    """Test the latest cars endpoint"""
    print_test_header("Latest Cars Endpoint")
    
    try:
        response = requests.get(f"{API_BASE}/cars/latest", timeout=10)
        
        if response.status_code == 200:
            cars = response.json()
            
            if isinstance(cars, list):
                print_success(f"Latest cars endpoint working - returned {len(cars)} cars")
                
                # Check for expected sample cars
                expected_cars = ["Ferrari 296 GTB", "Porsche 911 GT3 RS", "Bugatti Chiron"]
                found_cars = [car.get("name", "") for car in cars]
                
                for expected in expected_cars:
                    if any(expected in found for found in found_cars):
                        print_success(f"Found expected car: {expected}")
                    else:
                        print_warning(f"Expected car not found: {expected}")
                
                # Validate car structure
                if cars:
                    car = cars[0]
                    required_fields = ["id", "name", "brand", "model", "year", "horsepower", "top_speed", "engine"]
                    missing_fields = [field for field in required_fields if field not in car]
                    
                    if not missing_fields:
                        print_success("Car objects have correct structure")
                    else:
                        print_error(f"Missing required fields: {missing_fields}")
                        return False
                
                return True
            else:
                print_error(f"Latest cars endpoint returned non-list: {type(cars)}")
                return False
        else:
            print_error(f"Latest cars endpoint failed with status code: {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Latest cars request failed: {e}")
        return False

def test_search_functionality():
    """Test the search functionality"""
    print_test_header("Search Functionality")
    
    search_tests = [
        ("Ferrari", "brand search"),
        ("Porsche", "brand search"),
        ("GTB", "model search"),
        ("911", "model search"),
        ("chiron", "case insensitive search"),
        ("FERRARI", "uppercase search"),
        ("fer", "partial match search")
    ]
    
    all_passed = True
    
    for query, test_type in search_tests:
        try:
            response = requests.get(f"{API_BASE}/cars/search", params={"q": query}, timeout=10)
            
            if response.status_code == 200:
                results = response.json()
                
                if isinstance(results, list):
                    if results:
                        print_success(f"{test_type} '{query}' returned {len(results)} results")
                        
                        # Validate search result structure
                        result = results[0]
                        required_fields = ["id", "name", "brand", "model", "year"]
                        missing_fields = [field for field in required_fields if field not in result]
                        
                        if missing_fields:
                            print_error(f"Search result missing fields: {missing_fields}")
                            all_passed = False
                    else:
                        print_warning(f"{test_type} '{query}' returned no results")
                else:
                    print_error(f"Search returned non-list for '{query}': {type(results)}")
                    all_passed = False
            else:
                print_error(f"Search failed for '{query}' with status code: {response.status_code}")
                all_passed = False
                
        except requests.exceptions.RequestException as e:
            print_error(f"Search request failed for '{query}': {e}")
            all_passed = False
    
    # Test edge cases
    print_info("Testing edge cases...")
    
    # Empty query
    try:
        response = requests.get(f"{API_BASE}/cars/search", params={"q": ""}, timeout=10)
        if response.status_code == 200:
            results = response.json()
            if results == []:
                print_success("Empty query correctly returns empty list")
            else:
                print_warning("Empty query should return empty list")
        else:
            print_error(f"Empty query failed with status code: {response.status_code}")
            all_passed = False
    except requests.exceptions.RequestException as e:
        print_error(f"Empty query test failed: {e}")
        all_passed = False
    
    # Single character query
    try:
        response = requests.get(f"{API_BASE}/cars/search", params={"q": "F"}, timeout=10)
        if response.status_code == 200:
            results = response.json()
            if results == []:
                print_success("Single character query correctly returns empty list")
            else:
                print_warning("Single character query should return empty list")
        else:
            print_error(f"Single character query failed with status code: {response.status_code}")
            all_passed = False
    except requests.exceptions.RequestException as e:
        print_error(f"Single character query test failed: {e}")
        all_passed = False
    
    return all_passed

def test_car_details():
    """Test individual car details endpoint"""
    print_test_header("Car Details Endpoint")
    
    # First get a car ID from latest cars
    try:
        response = requests.get(f"{API_BASE}/cars/latest", timeout=10)
        if response.status_code == 200:
            cars = response.json()
            if cars:
                car_id = cars[0]["id"]
                print_info(f"Testing car details for ID: {car_id}")
                
                # Test valid car ID
                detail_response = requests.get(f"{API_BASE}/cars/{car_id}", timeout=10)
                
                if detail_response.status_code == 200:
                    car_details = detail_response.json()
                    
                    # Validate complete car structure
                    required_fields = [
                        "id", "name", "brand", "model", "year", "horsepower", 
                        "top_speed", "engine", "acceleration_0_60", "image_url", 
                        "blueprint_image_url", "description"
                    ]
                    
                    missing_fields = [field for field in required_fields if field not in car_details]
                    
                    if not missing_fields:
                        print_success("Car details endpoint working correctly")
                        print_success("Car details have complete structure")
                        
                        # Test invalid car ID
                        invalid_response = requests.get(f"{API_BASE}/cars/invalid-id", timeout=10)
                        if invalid_response.status_code == 404:
                            print_success("Invalid car ID correctly returns 404")
                            return True
                        else:
                            print_error(f"Invalid car ID should return 404, got: {invalid_response.status_code}")
                            return False
                    else:
                        print_error(f"Car details missing required fields: {missing_fields}")
                        return False
                else:
                    print_error(f"Car details failed with status code: {detail_response.status_code}")
                    return False
            else:
                print_error("No cars available to test car details")
                return False
        else:
            print_error("Could not get cars list to test car details")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Car details test failed: {e}")
        return False

def test_cors_headers():
    """Test CORS headers are present"""
    print_test_header("CORS Headers")
    
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        cors_headers = [
            "access-control-allow-origin",
            "access-control-allow-methods",
            "access-control-allow-headers"
        ]
        
        found_headers = []
        for header in cors_headers:
            if header in response.headers:
                found_headers.append(header)
        
        if found_headers:
            print_success(f"CORS headers present: {found_headers}")
            return True
        else:
            print_warning("No CORS headers found in response")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"CORS headers test failed: {e}")
        return False

def test_database_connectivity():
    """Test database connectivity by checking if sample data exists"""
    print_test_header("Database Connectivity")
    
    try:
        # Test by getting latest cars - if this works, database is connected
        response = requests.get(f"{API_BASE}/cars/latest", timeout=10)
        
        if response.status_code == 200:
            cars = response.json()
            if cars and len(cars) >= 3:
                print_success("Database connectivity working - sample data present")
                print_info(f"Found {len(cars)} cars in database")
                return True
            else:
                print_warning("Database connected but insufficient sample data")
                return False
        else:
            print_error("Database connectivity test failed - could not retrieve cars")
            return False
            
    except requests.exceptions.RequestException as e:
        print_error(f"Database connectivity test failed: {e}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print(f"{Colors.BOLD}{Colors.BLUE}")
    print("=" * 80)
    print("IKUL CARS BACKEND API TEST SUITE")
    print("=" * 80)
    print(f"{Colors.ENDC}")
    
    print_info(f"Testing backend at: {API_BASE}")
    
    # Wait a moment for server to be ready
    time.sleep(2)
    
    test_results = {
        "Health Check": test_health_check(),
        "Latest Cars": test_latest_cars(),
        "Search Functionality": test_search_functionality(),
        "Car Details": test_car_details(),
        "CORS Headers": test_cors_headers(),
        "Database Connectivity": test_database_connectivity()
    }
    
    # Summary
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"{Colors.ENDC}")
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        if result:
            print_success(f"{test_name}: PASSED")
            passed += 1
        else:
            print_error(f"{test_name}: FAILED")
    
    print(f"\n{Colors.BOLD}Overall Result: {passed}/{total} tests passed{Colors.ENDC}")
    
    if passed == total:
        print_success("🎉 All backend API tests passed!")
        return True
    else:
        print_error(f"❌ {total - passed} test(s) failed")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)