// Existing palette/globals have real consumers; keep only their command bridge.
import { WallpaperService } from "../services/wallpaper.service";
import { windowManagerController } from "../core/window-manager.store";
import { withWallpaperWrite } from "./module-state";
export type { WallpaperHistoryItem } from "../services/wallpaper.service";
export const wallpaperLibraryController = {
  openDialog() { windowManagerController.open("wallpaper"); },
  closeDialog() { void windowManagerController.close("wallpaper"); },
  resetDefault() { return withWallpaperWrite(() => WallpaperService.clearWallpaper()); }
};
