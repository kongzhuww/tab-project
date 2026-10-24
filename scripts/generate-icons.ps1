Add-Type -AssemblyName System.Drawing

function Generate-Icon([int]$size, [string]$outputPath) {
    $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $c1 = [System.Drawing.Color]::FromArgb(255, 52, 211, 153)
    $c2 = [System.Drawing.Color]::FromArgb(255, 20, 184, 166)
    $rect = New-Object System.Drawing.RectangleF(0.0, 0.0, [float]$size, [float]$size)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 45.0)

    $radius = [float]($size * 0.28)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = [float]($radius * 2.0)
    $path.AddArc(0.0, 0.0, $d, $d, 180.0, 90.0)
    $path.AddArc([float]($size - $d), 0.0, $d, $d, 270.0, 90.0)
    $path.AddArc([float]($size - $d), [float]($size - $d), $d, $d, 0.0, 90.0)
    $path.AddArc(0.0, [float]($size - $d), $d, $d, 90.0, 90.0)
    $path.CloseFigure()

    $g.FillPath($brush, $path)

    $scale = [float]($size / 64.0)
    $penWidth = [Math]::Max(1.0, [float](5.0 * $scale))
    $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, [float]$penWidth)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round

    $p1 = New-Object System.Drawing.PointF([float](13.0 * $scale), [float](31.0 * $scale))
    $p2 = New-Object System.Drawing.PointF([float](32.0 * $scale), [float](15.0 * $scale))
    $p3 = New-Object System.Drawing.PointF([float](51.0 * $scale), [float](31.0 * $scale))
    $p4 = New-Object System.Drawing.PointF([float](51.0 * $scale), [float](50.0 * $scale))
    $p5 = New-Object System.Drawing.PointF([float](13.0 * $scale), [float](50.0 * $scale))

    [System.Drawing.PointF[]]$house = @($p1, $p2, $p3, $p4, $p5)
    $g.DrawPolygon($pen, $house)

    $d1 = New-Object System.Drawing.PointF([float](25.0 * $scale), [float](50.0 * $scale))
    $d2 = New-Object System.Drawing.PointF([float](25.0 * $scale), [float](38.0 * $scale))
    $d3 = New-Object System.Drawing.PointF([float](39.0 * $scale), [float](38.0 * $scale))
    $d4 = New-Object System.Drawing.PointF([float](39.0 * $scale), [float](50.0 * $scale))

    [System.Drawing.PointF[]]$door = @($d1, $d2, $d3, $d4)
    $g.DrawLines($pen, $door)

    $g.Dispose()
    $brush.Dispose()
    $pen.Dispose()
    $path.Dispose()

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Successfully generated $outputPath ($size x $size)"
}

Generate-Icon 16 "assets/icon-16.png"
Generate-Icon 32 "assets/icon-32.png"
Generate-Icon 48 "assets/icon-48.png"
Generate-Icon 128 "assets/icon-128.png"
