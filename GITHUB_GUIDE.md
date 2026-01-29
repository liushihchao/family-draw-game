# GitHub 部署詳細教學 (Step-by-Step)

將您的「你畫我猜」遊戲放到網路上，永久保存並分享給家人。

## 第一階段：準備您的 GitHub 倉庫 (Repository)

1.  **登入/註冊**：前往 [GitHub.com](https://github.com/) 登入您的帳號。
2.  **建立新倉庫**：
    *   在右上角點擊 **+** 號，選擇 **New repository**。
3.  **填寫資訊**：
    *   **Repository name**: 輸入 `family-draw-game` (或是您喜歡的名字)。
    *   **Description**: (選填) 寫「全家聚會遊戲」。
    *   **Public/Private**: 選擇 **Public** (公開才能免費用 GitHub Pages)。
    *   其他選項 (Add README, .gitignore) **都不要勾選**，保持預設。
4.  **建立**：點擊最下方的綠色按鈕 **Create repository**。
5.  **複製網址**：建立後，您會看到一個新的頁面。找到 "Quick setup" 區域，複製那個 HTTPS 網址，看起來像：
    `https://github.com/您的帳號/family-draw-game.git`
    *(請先記下這個網址，等一下會用到)*

---

## 第二階段：上傳程式碼 (在您的電腦操作)

我會協助您設定 git。如果您已經準備好上面的網址，請**告訴我您的 Repository 網址**，我可以幫您執行大部分指令。

如果您想自己練習，請依序執行以下指令 (在終端機 `d:\Antigravity\draw-game` 下)：

```bash
# 1. 初始化 git (如果還沒做過)
git init

# 2. 將所有檔案加入追蹤
git add .

# 3. 提交第一次版本
git commit -m "First commit: family game finished"

# 4.設定分支名稱為 main
git branch -M main

# 5. 連接到您剛建立的倉庫 (請將網址換成您剛剛複製的)
git remote add origin https://github.com/您的帳號/family-draw-game.git

# 6. 推送上去！
git push -u origin main
```

---

## 第三階段：開啟網頁 (GitHub Pages)

上傳成功後，最後一步是開啟網頁功能：

1.  回到您的 GitHub 倉庫頁面。
2.  點擊上方的 **Settings** (設定) 標籤。
3.  在左側選單欄位，找到並點擊 **Pages**。
4.  在 **Build and deployment** 區域的 **Branch** 選項：
    *   將 `None` 改為 `main`。
    *   旁邊資料夾選 `/(root)`。
    *   點擊 **Save**。
5.  等待約 1~2 分鐘，重新整理頁面。上方會出現一行網址，類似：
    `https://您的帳號.github.io/family-draw-game/`

**點擊那個網址，您的遊戲就上線了！傳給家人吧！**
