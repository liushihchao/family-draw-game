# 遊戲部署指南 (Deployment Guide)

為了讓家人在聚會時能順利遊玩，我們建議將遊戲部署到網路上。這樣大家只要打開網址就能玩，不需要連接同一台 WiFi。

以下提供兩種最簡單的方法：

## 方法一：使用 Vercel (最推薦，超簡單)

Vercel 是一個免費且速度很快的靜態網頁託管服務。

### 步驟：
1.  前往 [Vercel 官網](https://vercel.com/) 註冊一個帳號 (可用 GitHub 或 Google 登入)。
2.  安裝 Vercel CLI (您電腦已有 Node.js，直接在終端機執行)：
    ```bash
    npm install -g vercel
    ```
3.  在遊戲資料夾 (`d:\Antigravity\draw-game`) 開啟終端機，執行：
    ```bash
    vercel
    ```
4.  接著一路按 **Enter** 即可 (全部選預設值)：
    *   Set up and deploy? -> `Y`
    *   Which scope? -> `Enter`
    *   Link to existing project? -> `N`
    *   Project name? -> `draw-game` (或按 Enter)
    *   In which directory? -> `Enter`
    *   Want to modify settings? -> `N`
5.  等待約 30 秒，它會給您一個 **Production** 網址 (例如 `https://draw-game-xyz.vercel.app`)。
6.  **把這個網址傳到家裡的 LINE 群組，大家用平板/手機打開就能玩了！**

---

## 方法二：使用 GitHub Pages (標準做法)

如果您有 GitHub 帳號，也可以用這個方法。

1.  在 GitHub 上建立一個新 Repository (例如 `family-draw-game`)。
2.  在遊戲資料夾執行以下指令上傳程式碼：
    ```bash
    git init
    git add .
    git commit -m "Initial game release"
    git branch -M main
    git remote add origin https://github.com/您的帳號/family-draw-game.git
    git push -u origin main
    ```
3.  上傳後，到 GitHub 專案頁面 -> **Settings** -> **Pages**。
4.  在 **Build and deployment** 下的 **Branch** 選擇 `main`，然後按 Save。
5.  等待約 1 分鐘，GitHub 會給您一個網址 (例如 `https://您的帳號.github.io/family-draw-game/`)。

---

## 常見問題

### Q: 手機畫面太小怎麼辦？
A: 這個遊戲設計時已針對平板 (iPad/Android Pad) 優化。如果用手機玩，建議**橫螢幕**使用。

### Q: 玩到一半重新整理會怎樣？
A: 目前沒有連結資料庫，重新整理後分數會重置。請提醒大家遊玩時盡量不要重整頁面。
