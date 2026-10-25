@echo off
echo ================================================
echo  Membuka Port 5173 untuk Vite Dev Server
echo  Agar HP bisa akses dari hotspot
echo ================================================
echo.
netsh advfirewall firewall delete rule name="Vite Dev 5173" >nul 2>&1
netsh advfirewall firewall add rule name="Vite Dev 5173" dir=in action=allow protocol=TCP localport=5173
echo.
echo ✓ Port 5173 sudah dibuka!
echo.
echo IP komputer untuk diakses dari HP:
ipconfig | findstr "192.168"
echo.
echo Buka di browser HP:
echo   http://192.168.36.1:5173
echo   http://192.168.217.1:5173
echo.
pause
