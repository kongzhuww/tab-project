$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = (Resolve-Path (Join-Path $PSScriptRoot '../../..')).Path
$out = Join-Path $root 'store-assets/en-US'
$items = @(
    @{ Source = 'demo-home.png'; Output = '05-demo-home-1280x800.png'; Title = 'Your new-tab workspace'; Footer = 'Demo data. AI news headlines shown are fictional, not real announcements.' },
    @{ Source = 'demo-bilibili.png'; Output = '06-demo-bilibili-1280x800.png'; Title = 'Bilibili favorites'; Footer = 'Demo data and sample videos. Available features depend on the installed version.' },
    @{ Source = 'demo-todoist.png'; Output = '07-demo-todoist-1280x800.png'; Title = 'Todoist calendar and task board'; Footer = 'Fictional demo tasks. Todoist features require your own account configuration.' }
)
foreach ($item in $items) {
    $source = [System.Drawing.Image]::FromFile((Join-Path $root ('docs/images/' + $item.Source)))
    $canvas = New-Object System.Drawing.Bitmap 1280, 800
    $g = [System.Drawing.Graphics]::FromImage($canvas)
    $titleFont = New-Object System.Drawing.Font 'Segoe UI', 20, ([System.Drawing.FontStyle]::Bold)
    $footerFont = New-Object System.Drawing.Font 'Segoe UI', 11
    $brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(49, 65, 82))
    try {
        $g.Clear([System.Drawing.Color]::White)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
        $g.DrawString($item.Title, $titleFont, $brush, 20, 8)
        $scale = [Math]::Min(1.0, [Math]::Min(1280.0 / $source.Width, 700.0 / $source.Height))
        $width = [int][Math]::Round($source.Width * $scale)
        $height = [int][Math]::Round($source.Height * $scale)
        $x = [int]((1280 - $width) / 2)
        $y = [int](50 + (700 - $height) / 2)
        $rect = New-Object System.Drawing.Rectangle $x, $y, $width, $height
        $g.DrawImage($source, $rect)
        $g.DrawString($item.Footer, $footerFont, $brush, 20, 769)
        $destination = Join-Path $out $item.Output
        $canvas.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
        Write-Output $destination
    } finally {
        $brush.Dispose()
        $titleFont.Dispose()
        $footerFont.Dispose()
        $g.Dispose()
        $canvas.Dispose()
        $source.Dispose()
    }
}
