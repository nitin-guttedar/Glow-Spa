[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$SourcePath,

    [Parameter()]
    [string]$OutputDir
)

Add-Type -AssemblyName System.Drawing

# Derive repository root from script directory
$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Item .).FullName }
$repoRoot = Split-Path -Parent $scriptDir

# Fallback to symbol image or source logo within repository
if (-not $SourcePath) {
    $defaultSymbol = Join-Path $repoRoot 'public\assets\glow-spa-symbol-transparent.png'
    $defaultSource = Join-Path $repoRoot 'public\assets\glow-spa-logo-source.png'
    if (Test-Path $defaultSymbol) {
        $SourcePath = $defaultSymbol
    } elseif (Test-Path $defaultSource) {
        $SourcePath = $defaultSource
    } else {
        throw "Source image not provided and defaults do not exist."
    }
} elseif (-not (Test-Path $SourcePath)) {
    throw "Specified SourcePath not found: $SourcePath"
}

# Resolve destination directories dynamically relative to repository root
$pubRoot = if ($OutputDir) { $OutputDir } else { Join-Path $repoRoot 'public' }
$pubAssets = Join-Path $pubRoot 'assets'

if (-not (Test-Path $pubAssets)) {
    New-Item -ItemType Directory -Path $pubAssets -Force | Out-Null
}

Write-Host "Favicon source image: $SourcePath"
Write-Host "Output root directory: $pubRoot"

$symbolBmp = [System.Drawing.Bitmap]::FromFile($SourcePath)

function Create-Square-Favicon([System.Drawing.Bitmap]$sym, [int]$size, [string]$outPath) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = [Math]::Min(($size * 0.88) / $sym.Width, ($size * 0.88) / $sym.Height)
    $drawW = [int]($sym.Width * $scale)
    $drawH = [int]($sym.Height * $scale)
    $drawX = [int](($size - $drawW) / 2)
    $drawY = [int](($size - $drawH) / 2)

    $g.DrawImage($sym, $drawX, $drawY, $drawW, $drawH)
    $g.Dispose()

    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created Favicon: $outPath ($size x $size)"
}

Create-Square-Favicon -sym $symbolBmp -size 512 -outPath (Join-Path $pubRoot 'favicon.png')
Create-Square-Favicon -sym $symbolBmp -size 512 -outPath (Join-Path $pubAssets 'favicon.png')
Create-Square-Favicon -sym $symbolBmp -size 180 -outPath (Join-Path $pubAssets 'apple-touch-icon.png')
Create-Square-Favicon -sym $symbolBmp -size 32 -outPath (Join-Path $pubRoot 'favicon-32x32.png')

$symbolBmp.Dispose()
Write-Host "Favicons created successfully in $pubRoot and $pubAssets"
