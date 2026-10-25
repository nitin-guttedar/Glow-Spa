[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$SourcePath
)

Add-Type -AssemblyName System.Drawing

# Derive repository root from script directory
$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Item .).FullName }
$repoRoot = Split-Path -Parent $scriptDir

# Fallback to maintainer source image within repository if not provided
if (-not $SourcePath) {
    $defaultSource = Join-Path $repoRoot 'public\assets\glow-spa-logo-source.png'
    if (Test-Path $defaultSource) {
        $SourcePath = $defaultSource
    } else {
        throw "Source image path not provided and default $defaultSource does not exist."
    }
} elseif (-not (Test-Path $SourcePath)) {
    throw "Specified SourcePath not found: $SourcePath"
}

Write-Host "Analyzing source image: $SourcePath"
$bmp = [System.Drawing.Bitmap]::FromFile($SourcePath)
$w = $bmp.Width
$h = $bmp.Height
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $pixel = $bmp.GetPixel($x, $y)
        if ($pixel.R -lt 240 -or $pixel.G -lt 240 -or $pixel.B -lt 240) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

$boxW = $maxX - $minX + 1
$boxH = $maxY - $minY + 1
Write-Host "Bounding box: X=$minX..$maxX (W=$boxW), Y=$minY..$maxY (H=$boxH)"
$sample = $bmp.GetPixel([int]($minX + $boxW/2), [int]($minY + $boxH * 0.35))
Write-Host "Sample color: R=$($sample.R), G=$($sample.G), B=$($sample.B)"
$bmp.Dispose()
