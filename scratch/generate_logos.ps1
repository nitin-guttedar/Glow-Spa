[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$SourcePath,

    [Parameter()]
    [string]$OutputDir
)

Add-Type -AssemblyName System.Drawing

# Derive repository root from script location
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

# Resolve destination directories dynamically relative to repository root
$pubRoot = if ($OutputDir) { $OutputDir } else { Join-Path $repoRoot 'public' }
$pubAssets = Join-Path $pubRoot 'assets'

if (-not (Test-Path $pubAssets)) {
    New-Item -ItemType Directory -Path $pubAssets -Force | Out-Null
}

Write-Host "Source image: $SourcePath"
Write-Host "Output assets directory: $pubAssets"

$srcBmp = [System.Drawing.Bitmap]::FromFile($SourcePath)
$w = $srcBmp.Width
$h = $srcBmp.Height

# Measure overall logo bounds (lotus + text) and icon-only bounds
$minX = $w; $maxX = 0; $minY = $h; $maxY = 0
$iconMinX = $w; $iconMaxX = 0; $iconMinY = $h; $iconMaxY = 0

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $srcBmp.GetPixel($x, $y)
        $isDark = ($p.R -lt 240 -or $p.G -lt 240 -or $p.B -lt 240)
        if ($isDark) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }

            # Lotus icon sits above wordmark (wordmark starts below y = 520 in 1024x1024)
            if ($y -lt [int]($h * 0.51)) {
                if ($x -lt $iconMinX) { $iconMinX = $x }
                if ($x -gt $iconMaxX) { $iconMaxX = $x }
                if ($y -lt $iconMinY) { $iconMinY = $y }
                if ($y -gt $iconMaxY) { $iconMaxY = $y }
            }
        }
    }
}

Write-Host "Overall Logo Bounds: X=$minX..$maxX, Y=$minY..$maxY"
Write-Host "Icon Emblem Bounds: X=$iconMinX..$iconMaxX, Y=$iconMinY..$iconMaxY"

# Helper to crop bitmap with transparent background and anti-aliased edge blending
function Make-Transparent-Crop([System.Drawing.Bitmap]$source, [int]$x1, [int]$y1, [int]$x2, [int]$y2, [int]$pad, [string]$outPath, [bool]$makeGold = $false) {
    $cropX = [Math]::Max(0, $x1 - $pad)
    $cropY = [Math]::Max(0, $y1 - $pad)
    $cropW = [Math]::Min($source.Width - $cropX, ($x2 - $x1 + 1) + 2 * $pad)
    $cropH = [Math]::Min($source.Height - $cropY, ($y2 - $y1 + 1) + 2 * $pad)

    $dest = New-Object System.Drawing.Bitmap($cropW, $cropH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    for ($y = 0; $y -lt $cropH; $y++) {
        for ($x = 0; $x -lt $cropW; $x++) {
            $srcPixel = $source.GetPixel($cropX + $x, $cropY + $y)
            $lum = [int](0.299 * $srcPixel.R + 0.587 * $srcPixel.G + 0.114 * $srcPixel.B)

            if ($srcPixel.R -ge 250 -and $srcPixel.G -ge 250 -and $srcPixel.B -ge 250) {
                $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } elseif ($srcPixel.R -ge 235 -and $srcPixel.G -ge 235 -and $srcPixel.B -ge 235) {
                $alpha = [int]((255 - $lum) * 255 / (255 - 235))
                $alpha = [Math]::Max(0, [Math]::Min(255, $alpha))
                if ($makeGold) {
                    $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 212, 175, 55))
                } else {
                    $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $srcPixel.R, $srcPixel.G, $srcPixel.B))
                }
            } else {
                if ($makeGold) {
                    $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 212, 175, 55))
                } else {
                    $dest.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $srcPixel.R, $srcPixel.G, $srcPixel.B))
                }
            }
        }
    }

    $dest.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $dest.Dispose()
    Write-Host "Generated: $outPath ($cropW x $cropH)"
}

# Helper to create square favicon centered on emblem
function Make-Square-Favicon([System.Drawing.Bitmap]$source, [int]$x1, [int]$y1, [int]$x2, [int]$y2, [int]$size, [string]$outPath) {
    $w = $x2 - $x1 + 1
    $h = $y2 - $y1 + 1

    $cropBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    for ($y = 0; $y -lt $h; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $p = $source.GetPixel($x1 + $x, $y1 + $y)
            if ($p.R -ge 245 -and $p.G -ge 245 -and $p.B -ge 245) {
                $cropBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $cropBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $p.R, $p.G, $p.B))
            }
        }
    }

    $fav = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($fav)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $scale = [Math]::Min(($size * 0.88) / $w, ($size * 0.88) / $h)
    $drawW = [int]($w * $scale)
    $drawH = [int]($h * $scale)
    $drawX = [int](($size - $drawW) / 2)
    $drawY = [int](($size - $drawH) / 2)

    $g.DrawImage($cropBmp, $drawX, $drawY, $drawW, $drawH)
    $g.Dispose()
    $cropBmp.Dispose()

    $fav.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $fav.Dispose()
    Write-Host "Generated Favicon: $outPath ($size x $size)"
}

# Generate all logos and icons dynamically
Make-Transparent-Crop -source $srcBmp -x1 $minX -y1 $minY -x2 $maxX -y2 $maxY -pad 15 -outPath (Join-Path $pubAssets 'glow-spa-logo-transparent.png')
Make-Transparent-Crop -source $srcBmp -x1 $minX -y1 $minY -x2 $maxX -y2 $maxY -pad 15 -outPath (Join-Path $pubAssets 'glow-spa-logo.png')
Make-Transparent-Crop -source $srcBmp -x1 $minX -y1 $minY -x2 $maxX -y2 $maxY -pad 15 -outPath (Join-Path $pubAssets 'glow-spa-logo-gold-transparent.png') -makeGold $true
Make-Transparent-Crop -source $srcBmp -x1 $iconMinX -y1 $iconMinY -x2 $iconMaxX -y2 $iconMaxY -pad 10 -outPath (Join-Path $pubAssets 'glow-spa-symbol-transparent.png')

# Generate square favicons
Make-Square-Favicon -source $srcBmp -x1 $iconMinX -y1 $iconMinY -x2 $iconMaxX -y2 $iconMaxY -size 512 -outPath (Join-Path $pubRoot 'favicon.png')
Make-Square-Favicon -source $srcBmp -x1 $iconMinX -y1 $iconMinY -x2 $iconMaxX -y2 $iconMaxY -size 512 -outPath (Join-Path $pubAssets 'favicon.png')
Make-Square-Favicon -source $srcBmp -x1 $iconMinX -y1 $iconMinY -x2 $iconMaxX -y2 $iconMaxY -size 180 -outPath (Join-Path $pubAssets 'apple-touch-icon.png')
Make-Square-Favicon -source $srcBmp -x1 $iconMinX -y1 $iconMinY -x2 $iconMaxX -y2 $iconMaxY -size 32 -outPath (Join-Path $pubRoot 'favicon-32x32.png')

$srcBmp.Dispose()
Write-Host "All logo and favicon variations generated successfully in $pubRoot and $pubAssets"
