param (
    [string]$Command = "start"
)

switch ($Command) {
    "start" {
        Write-Host "Starting services..."
        docker-compose up -d
    }
    "stop" {
        Write-Host "Stopping services..."
        docker-compose down
    }
    "build" {
        Write-Host "Building and starting services..."
        docker-compose up --build -d
    }
    "logs" {
        docker-compose logs -f
    }
    "restart" {
        Write-Host "Restarting services..."
        docker-compose down
        docker-compose up -d
    }
    "test" {
        Write-Host "Running all tests..."
        Write-Host "--- API Go ---"
        Push-Location apps/api-go; go test ./... -v; Pop-Location
        Write-Host "--- API Node.js ---"
        Push-Location apps/api-nodejs; pnpm test; Pop-Location
        Write-Host "--- Frontend ---"
        Push-Location apps/frontend; pnpm test; Pop-Location
    }
    Default {
        Write-Host "Usage: ./start.ps1 -Command [start|stop|build|logs|restart|test]"
        Write-Host "Default command is 'start'"
    }
}
