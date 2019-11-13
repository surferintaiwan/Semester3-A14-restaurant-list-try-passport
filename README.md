# express-handlebars布局及樣式練習-以餐廳網站為例
此網站使用node.js環境 + Express + mongoDB建立而成，可供用戶搜尋網站上的店家或瀏覽店家詳細資料。

## 網站截圖
![網站截圖](https://github.com/surferintaiwan/Semester3-A1-restaurant-list/blob/master/index-photo.png?raw=true)

## 功能說明
1. 瀏覽所有店家

一進入[首頁](http://localhost:3000/)，可瀏覽目前網站內所有店家

2. 詳細店家介紹

點擊任一店家，會將店家詳細資料顯示

3. 店家搜尋功能

使用者可於搜尋欄輸入中英文，查詢與店家名稱匹配之店家

4. 可於首頁及詳細店家介紹頁面進行刪除
5. 可於首頁及詳細店家介紹頁面進行編輯
6. 可於畫面右上角點擊Add a restaurant進行新增

## 開始使用
1. 下載本專案檔案至本地端
```
git clone https://github.com/surferintaiwan/Semester3-A10-restaurant-list-try-CRUD.git
```
2. 於終端機打開專案檔案
```
cd Semester3-A10-restaurant-list-try-CRUD
```
3. 於終端機安裝npm

此命令會查詢package.json看本專案使用了哪些套件，並自動安裝
```
npm install
```
4. 於終端機運行input-original-data.js

因為一開始mongoDB內沒有任何資料，故運行此js可匯入9筆資料至mongoDB中。
```
node ./models/input-original-data.js
```

5. 於終端機啟用並監聽伺服器
```
nodemon app.js
```
6. 於瀏覽器輸入 [http://localhost:3000/](http://localhost:3000/) 即可開始使用建立於本地端之餐廳網站

6. 若欲停止伺服器運行，可於終端機輸入Ctrl + C ，即可停用伺服器
## 環境配置
### Web Server
* node.js > v12.12.0
### DB
* mongoDB
### 框架
* express
### 套件
* nodemon
* express-handlebars
* jquery > 3.4.1
* bootstrap > 5.11.2
* popper
* mongoose

## 專案貢獻者
[Shawn](https://github.com/surferintaiwan)


