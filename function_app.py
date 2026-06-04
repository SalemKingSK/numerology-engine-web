import azure.functions as func
import json
import logging

app = func.FunctionApp()

@app.function_name("HealthCheck")
@app.route(route="health", methods=["GET"])
def health_check(req: func.HttpRequest) -> func.HttpResponse:
    """Health check endpoint for Mystique Compass"""
    logging.info("Health check endpoint called")
    
    response = {
        "status": "healthy",
        "service": "Mystique Compass",
        "environment": "Azure Functions"
    }
    
    return func.HttpResponse(
        json.dumps(response),
        status_code=200,
        mimetype="application/json"
    )

@app.function_name("WelcomeAPI")
@app.route(route="welcome", methods=["GET", "POST"])
def welcome_api(req: func.HttpRequest) -> func.HttpResponse:
    """Welcome endpoint for Mystique Compass API"""
    logging.info("Welcome endpoint called")
    
    name = req.params.get("name", "Seeker")
    
    response = {
        "message": f"Welcome to Mystique Compass, {name}!",
        "description": "Your numerology engine is ready to guide your path",
        "endpoints": {
            "health": "/api/health",
            "welcome": "/api/welcome"
        }
    }
    
    return func.HttpResponse(
        json.dumps(response),
        status_code=200,
        mimetype="application/json"
    )
