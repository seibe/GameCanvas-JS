
import { gc, GameBase } from "./lib/gamecanvas.js";

class Game extends GameBase {
    /********* 初期化の手順はこちらに *********/
    initGame() {
        gc.profilerEnabled = true;
    }
    enterGame() { }

    /********* フレーム計算処理はこちらに *********/
    updateGame() { }

    /********* フレーム描画処理はこちらに *********/
    drawGame() {
        // 画面を白で塗りつぶします
        gc.clearScreen();

        // ここから、画像を表示する命令を記述していく
        gc.drawImage(0, 0, 0);
        gc.setColor(0, 0, 0);
        gc.drawString("この文字と青空の画像が見えていれば成功です", 60, 220);
    }

    /********* 終了時の処理はこちらに *********/
    leaveGame() { }
    finalGame() { }
}
new Game();
