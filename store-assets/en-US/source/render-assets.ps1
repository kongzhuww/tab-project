$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$assetDir = Split-Path $PSScriptRoot -Parent
$projectDir = Split-Path (Split-Path $assetDir -Parent) -Parent
$iconPath = Join-Path $projectDir 'assets\icon-128.png'
$backgroundPath = Join-Path $PSScriptRoot 'promo-background.png'
$icon = [System.Drawing.Image]::FromFile($iconPath)
$background = [System.Drawing.Image]::FromFile($backgroundPath)
$heading = [System.Drawing.ColorTranslator]::FromHtml('#1E3328')
$muted = [System.Drawing.ColorTranslator]::FromHtml('#53675B')
$accent = [System.Drawing.ColorTranslator]::FromHtml('#3D6346')

function New-Canvas([int]$width, [int]$height) {
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    return @{ Bitmap = $bitmap; Graphics = $graphics }
}

function Draw-Label($graphics, [string]$text, [float]$size, [float]$x, [float]$y, $color, [bool]$bold = $false) {
    $style = [System.Drawing.FontStyle]::Regular
    if ($bold) { $style = [System.Drawing.FontStyle]::Bold }
    $font = New-Object System.Drawing.Font('Segoe UI', $size, $style, [System.Drawing.GraphicsUnit]::Pixel)
    $brush = New-Object System.Drawing.SolidBrush($color)
    try { $graphics.DrawString($text, $font, $brush, $x, $y) }
    finally { $font.Dispose(); $brush.Dispose() }
}

function Draw-Background($graphics, [int]$width, [int]$height) {
    $scale = [Math]::Max($width / $background.Width, $height / $background.Height)
    $w = [float]($background.Width * $scale)
    $h = [float]($background.Height * $scale)
    $graphics.DrawImage($background, [float](($width - $w) / 2), [float](($height - $h) / 2), $w, $h)
}

function Save-Canvas($canvas, [string]$name) {
    try { $canvas.Bitmap.Save((Join-Path $assetDir $name), [System.Drawing.Imaging.ImageFormat]::Png) }
    finally { $canvas.Graphics.Dispose(); $canvas.Bitmap.Dispose() }
}

try {
    # Preserve the original logo; upscale without changing its shape or branding.
    $canvas = New-Canvas 300 300
    $canvas.Graphics.Clear([System.Drawing.Color]::Transparent)
    $attributes = New-Object System.Drawing.Imaging.ImageAttributes
    try {
        $attributes.SetWrapMode([System.Drawing.Drawing2D.WrapMode]::TileFlipXY)
        $canvas.Graphics.DrawImage($icon, [System.Drawing.Rectangle]::new(0, 0, 300, 300), 0, 0, $icon.Width, $icon.Height, [System.Drawing.GraphicsUnit]::Pixel, $attributes)
    } finally { $attributes.Dispose() }
    Save-Canvas $canvas '01-extension-logo-300x300.png'

    $canvas = New-Canvas 440 280
    $g = $canvas.Graphics
    Draw-Background $g 440 280
    # A light translucent wash improves type contrast without suggesting a product UI.
    $wash = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(112, 251, 252, 249))
    try { $g.FillRectangle($wash, 0, 0, 440, 280) } finally { $wash.Dispose() }
    $g.DrawImage($icon, 28, 28, 34, 34)
    Draw-Label $g 'tab-project' 23 72 28 $heading $true
    Draw-Label $g 'A new tab.' 36 26 91 $heading $true
    Draw-Label $g 'Your own space.' 36 26 135 $heading $true
    Draw-Label $g 'Shortcuts, bookmarks & more.' 18 28 211 $muted
    Draw-Label $g 'MAKE EVERY TAB YOURS' 10 29 249 $accent $true
    Save-Canvas $canvas '02-small-promo-440x280.png'

    $canvas = New-Canvas 1400 560
    $g = $canvas.Graphics
    Draw-Background $g 1400 560
    $g.DrawImage($icon, 78, 56, 60, 60)
    Draw-Label $g 'tab-project' 34 154 64 $heading $true
    Draw-Label $g 'YOUR NEW TAB, REIMAGINED' 16 80 159 $accent $true
    Draw-Label $g 'Make room for' 68 73 202 $heading $true
    Draw-Label $g 'your everyday.' 68 73 279 $heading $true
    Draw-Label $g 'Shortcuts. Bookmarks. Search. Your workspace.' 24 80 392 $muted
    Draw-Label $g 'Personal themes and optional connected tools.' 21 80 435 $muted
    Save-Canvas $canvas '03-large-promo-1400x560.png'
} finally {
    $icon.Dispose()
    $background.Dispose()
}
Write-Output 'Created logo and two promotional tiles. No product screenshots were generated.'
