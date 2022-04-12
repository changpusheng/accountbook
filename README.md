# expense-tracker

提供不同使用者記帳

(線上網址)heroku:https://accountbook0003.herokuapp.com/user/login

畫面渲染:
<ul>
<li>
登入頁面
    <div >
    <img src="https://user-images.githubusercontent.com/88585009/162753394-97d3d7cf-46b8-4d8b-8f4f-18e79836e74b.png" style="width:70%;"alt="登入畫面">
    </div>

</li>
    <li>
首頁
    <div >
    <img src="https://user-images.githubusercontent.com/88585009/162753525-6180b054-5966-4884-8718-d1b1d9cd85ad.png" style="width:70%;"alt="首頁">
    </div>
</li>
    <li>
分類
    <div >
    <img src="https://user-images.githubusercontent.com/88585009/162753683-d9605f4e-3e06-4d3f-8fdd-86d8289988d6.png" style="width:70%;"alt="分類">
    </div>
</li>
</ul>


環境建置與需求 (prerequisites)
<ul>
<li>
  "bcryptjs": "^2.4.3"
   </li>
   <li>
  "body-parser": "^1.20.0"
    </li>
   <li>
  "connect-flash": "^0.1.1"
    </li>
   <li>
  "dotenv": "^16.0.0"
    </li>
   <li>
  "express": "^4.17.3"
    </li>
   <li>
  "express-handlebars": "^6.0.3"
    </li>
   <li>
  "express-session": "^1.17.2"
    </li>
   <li>
  "method-override": "^3.0.0"
    </li>
   <li>
  "mongoose": "^6.2.10"
    </li>
   <li>
  "nodemon": "^2.0.15"
    </li>
   <li>
  "passport": "^0.5.2"  
  </li>
   <li>
  "passport-facebook": "^3.0.0"
    </li>
   <li>
  "passport-local": "^1.0.0"
  </li>
<li>
  "express-session": "^1.17.2"
</li>
 <li>
資料庫使用:mongodb
    </li>
</ul>

安裝與執行步驟 (installation and execution)
<ul>
<li>
$git clone https://github.com/changpusheng/expense-tracker.git
</li>
<li>
$git cd  expense-tracker
</li>
<li>
$npm init -y
</li>
  <li>
$npm run package
</li>
    <li>
$code .
</li>
    <li>
打開文件夾 .env.example 設定新的環境變數(ex:SECRET:BBQ)，將檔名.env.example改為.env 
</li>
<li>
$npm run categoryseed
</li>
    <li>
$npm run recordseed
</li>
<li>
$npm run dev
</li>
<li>
看到 
This server is running on http://localhost:3000.
mongoose connected!
代表伺服器和資料庫連線成功!!
</li>
</ul>
功能描述 (features)
<ul>
<li>
登入系統/保持登入/創造帳號
</li>
<li>
新增帳目/編輯帳目/刪除帳目/記錄總金額/項目分類/使用者擁有自己的帳目
</li>
</ul>
