const e={title:"流程標準化",description:"PTDMvc 專案改版 - MVC 範本標準化",weight:30,targetDate:"2025-12-31",goals:{dotNet9:{id:"dotnet9",name:"遷移至 .NET 9、EF Core 9",icon:"🚀",description:"框架版本升級，導入 DTO 模式與 FluentValidation 驗證",milestones:[{date:"2025-07-31",title:"遷移至 .NET 9、EF Core 9 (DTO、FluentValidation)",status:"completed"}],summary:[{label:"專案升級",value:"14 個"},{label:"DTO 類別",value:"34+ 個"},{label:"FluentValidation 驗證器",value:"4+ 個"}],projectUpgrades:[{name:"WebSite",framework:"net9.0",description:"Web 應用主專案"},{name:"AuthServices",framework:"net9.0",description:"認證服務層"},{name:"SSServices",framework:"net9.0",description:"系統服務層"},{name:"ComboLogics",framework:"net9.0",description:"下拉選單邏輯"},{name:"CommonLogics",framework:"net9.0",description:"共用邏輯"},{name:"MenuLogics",framework:"net9.0",description:"選單邏輯"},{name:"ModuleLogics",framework:"net9.0",description:"模組邏輯"},{name:"DbContexts",framework:"net9.0",description:"EF Core 資料存取層"},{name:"Domain",framework:"net9.0",description:"領域模型"},{name:"LC.Core",framework:"net9.0",description:"核心工具庫"},{name:"Resource",framework:"net9.0",description:"多語系資源檔"},{name:"Auths",framework:"net9.0",description:"認證模組"},{name:"AuthServices.Tests",framework:"net9.0",description:"單元測試"},{name:"ServiceLayer.Tests",framework:"net9.0",description:"服務層測試"}],dtoModules:[{name:"使用者模組",path:"AuthServices/User/DTOs/",items:[{name:"UserCreateDto",purpose:"新增使用者資料"},{name:"UserUpdateDto",purpose:"更新使用者資料"},{name:"UserWriteDto",purpose:"寫入使用者基底類別"},{name:"UserViewDto",purpose:"使用者詳細檢視"},{name:"UserListDto",purpose:"使用者列表項目"},{name:"UserSearchDto",purpose:"使用者搜尋條件"},{name:"MyProfileViewDto",purpose:"個人資料檢視"},{name:"MyProfileUpdateDto",purpose:"個人資料更新"},{name:"LoginDto",purpose:"登入資料"}]},{name:"角色模組",path:"AuthServices/Role/DTOs/",items:[{name:"RoleCreateDto",purpose:"新增角色"},{name:"RoleUpdateDto",purpose:"更新角色"},{name:"RoleWriteDto",purpose:"寫入角色基底"},{name:"RoleListDto",purpose:"角色列表項目"},{name:"RoleModuleUpdateDto",purpose:"角色權限更新"}]},{name:"系統選單模組",path:"SSServices/SysOption/DTOs/",items:[{name:"SysOptionSearchDto",purpose:"系統選單搜尋"},{name:"SysOptionListDto",purpose:"系統選單列表"},{name:"SysOptionViewDto",purpose:"系統選單檢視"},{name:"SysOptionWriteDto",purpose:"系統選單寫入"}]},{name:"系統日誌模組",path:"SSServices/SystemEventLog/DTOs/",items:[{name:"SystemEventLogSearchDto",purpose:"日誌搜尋條件"},{name:"SystemEventLogListDto",purpose:"日誌列表項目"},{name:"SystemEventLogRecordDto",purpose:"日誌紀錄詳情"},{name:"SystemEventLogRecordSearchDto",purpose:"紀錄搜尋"}]},{name:"共用 DTO",path:"各專案",items:[{name:"SearchDto",purpose:"分頁搜尋基底",module:"LC.Core"},{name:"ApiResponseDto",purpose:"API 回應封裝",module:"LC.Core"},{name:"DropDownListDto",purpose:"下拉選單項目",module:"ComboLogics"},{name:"MenuDto",purpose:"選單項目",module:"MenuLogics"},{name:"BreadCrumbDto",purpose:"麵包屑導航",module:"MenuLogics"},{name:"ModuleTreeDto",purpose:"模組樹狀結構",module:"ModuleLogics"}]}],validators:[{name:"UserWriteDtoValidator",path:"AuthServices/User/Validators/UserWriteDtoValidator.cs",description:"使用者驗證器",rules:["姓名必填","代碼唯一性驗證","帳號格式驗證","角色必選","Email 格式驗證","密碼強度驗證"]},{name:"MyProfileUpdateDtoValidator",path:"AuthServices/User/Validators/MyProfileUpdateDtoValidator.cs",description:"個人資料驗證器"},{name:"RoleUpdateDtoValidator",path:"AuthServices/Role/Validators/RoleUpdateDtoValidator.cs",description:"角色驗證器"},{name:"SysOptionWriteDtoValidator",path:"SSServices/SysOption/Validators/SysOptionWriteDtoValidator.cs",description:"系統選單驗證器"}],codeSnippets:[{title:"UserWriteDtoValidator 驗證器範例",language:"csharp",description:"FluentValidation 驗證邏輯",code:`public sealed class UserWriteDtoValidator : AbstractValidator<UserWriteDto>
{
    public UserWriteDtoValidator(PTDMvcDbContext dbContext)
    {
        // 姓名必填
        RuleFor(x => x.name)
            .NotEmpty().WithMessage("VerifyError_必填");

        // 代碼驗證: 必填 + 長度 + 格式 + 唯一性
        RuleFor(x => x.code)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("VerifyError_必填")
            .MaximumLength(20).WithMessage("VerifyError_長度限制")
            .Matches(@"^[A-Za-z0-9_]+$").WithMessage("VerifyError_需為英數字")
            .Must((dto, code) => CodeNotExists(dto, code)).WithMessage("VerifyError_重複");

        // 角色必選
        RuleFor(x => x.roleIDs)
            .NotNull().WithMessage("VerifyError_必填")
            .Must(list => list != null && list.Any()).WithMessage("VerifyError_必填");
    }
}`},{title:"FluentValidation 註冊",language:"csharp",description:"Program.cs 中註冊驗證器",code:`// WebSite/Program.cs
builder.Services.AddValidatorsFromAssemblyContaining<UserWriteDtoValidator>();
builder.Services.AddFluentValidationAutoValidation();`}]},restfulAPI:{id:"restful-api",name:"API 改為 RESTful API",icon:"🔌",description:"API 端點重構，遵循 RESTful 設計規範",milestones:[{date:"2025-08-31",title:"API 改為 RESTful API",status:"completed"}],summary:[{label:"API 端點重構",value:"15+ 個"},{label:"HTTP 動詞",value:"標準化"},{label:"URL 結構",value:"kebab-case"}],designPrinciples:[{principle:"資源命名",description:"使用複數名詞",example:"/api/users, /api/roles"},{principle:"HTTP 動詞",description:"動詞表達動作",example:"GET 查詢、POST 新增、PUT 更新、DELETE 刪除"},{principle:"URL 結構",description:"ID 放在路徑中",example:"/api/users/{id}"},{principle:"子資源",description:"巢狀路徑",example:"/api/roles/{id}/modules"},{principle:"命名風格",description:"kebab-case",example:"/api/sys-options, /api/my-profile"}],apiModules:[{name:"User API",description:"使用者管理",mappings:[{oldAPI:"POST /api/User/QueryList",newAPI:"GET /api/users",httpMethod:"GET"},{oldAPI:"GET /api/User/Create",newAPI:"GET /api/users/new",httpMethod:"GET"},{oldAPI:"POST /api/User/SaveCreate",newAPI:"POST /api/users",httpMethod:"POST"},{oldAPI:"GET /api/User/Modify?id={id}",newAPI:"GET /api/users/{id}",httpMethod:"GET"},{oldAPI:"POST /api/User/SaveModify",newAPI:"PUT /api/users/{id}",httpMethod:"PUT"},{oldAPI:"POST /api/User/Delete",newAPI:"DELETE /api/users/{id}",httpMethod:"DELETE"}]},{name:"Role API",description:"角色管理",mappings:[{oldAPI:"POST /api/Role/List",newAPI:"GET /api/roles",httpMethod:"GET"},{oldAPI:"GET /api/Role/GetModuleTreeByRoleId?id={id}",newAPI:"GET /api/roles/{id}/modules",httpMethod:"GET"},{oldAPI:"POST /api/Role/SaveName",newAPI:"PUT /api/roles/{id}",httpMethod:"PUT"},{oldAPI:"POST /api/Role/SaveModule",newAPI:"PUT /api/roles/modules",httpMethod:"PUT"},{oldAPI:"POST /api/Role/Delete",newAPI:"DELETE /api/roles/{id}",httpMethod:"DELETE"}]},{name:"SysOption API",description:"系統選單",mappings:[{oldAPI:"POST /api/SysOption/QueryList",newAPI:"GET /api/sys-options",httpMethod:"GET"},{oldAPI:"GET /api/SysOption/Modify?optionType={type}",newAPI:"GET /api/sys-options/{optionType}",httpMethod:"GET"},{oldAPI:"POST /api/SysOption/Save?optionType={type}",newAPI:"PUT /api/sys-options/{optionType}",httpMethod:"PUT"}]},{name:"MyProfile API",description:"個人資料",mappings:[{oldAPI:"GET /api/MyProfile/Modify",newAPI:"GET /api/my-profile",httpMethod:"GET"},{oldAPI:"POST /api/MyProfile/Save",newAPI:"PUT /api/my-profile",httpMethod:"PUT"}]},{name:"EventLog API",description:"事件日誌",mappings:[{oldAPI:"POST /api/EventLog/QueryList",newAPI:"GET /api/event-logs",httpMethod:"GET"},{oldAPI:"POST /api/EventLog/FindByRecordGuid",newAPI:"GET /api/event-logs/by-record",httpMethod:"GET"}]}],httpStatusCodes:[{code:"200 OK",description:"查詢成功、更新成功"},{code:"201 Created",description:"新增成功 (含 Location header)"},{code:"400 Bad Request",description:"驗證失敗"},{code:"401 Unauthorized",description:"未登入"},{code:"403 Forbidden",description:"無權限"},{code:"404 Not Found",description:"資源不存在"}],codeSnippets:[{title:"前端 API 呼叫更新",language:"javascript",description:"app.apis.js 新舊寫法對照",code:`// 舊寫法
api.user.queryList({ queryString: '?keyword=test' })  // POST

// 新寫法
api.users.queryList({ queryString: '?keyword=test', method: 'GET' })

// 舊寫法
api.role.getModuleTreeByRoleId({ queryString: \`?id=\${roleId}\` })

// 新寫法
api.roles.getModuleTreeByRoleId({ id: roleId })  // GET /api/roles/{id}/modules`}]},newLayout:{id:"new-layout",name:"套用新版面",icon:"🎨",description:"導入新版 UI 設計，建立標準化 SCSS 架構與 HTML 模板",milestones:[{date:"2025-12-31",title:"套用新版面",status:"completed"}],summary:[{label:"MVC Views 更新",value:"8+ 個"}],directoryStructure:`共用後台_新/
├── dist/                      # 編譯產出
│   ├── css/
│   │   ├── style.css             # 主要樣式
│   │   └── vendors/
│   │       └── kendo_custom.css  # Kendo UI 客製樣式
│   ├── js/
│   │   ├── main.js               # 主程式
│   │   ├── left-sidebar.js       # 側邊欄
│   │   ├── fancyboxTool.js       # 彈窗工具
│   │   ├── font-size-change.js   # 字體大小切換
│   │   └── validTool.js          # 驗證工具
│   ├── fonts/                 # 字型檔案
│   └── templates/             # HTML 模板片段
└── src/
    └── scss/
        ├── base/              # 基礎樣式
        ├── components/        # 元件樣式
        ├── helpers/           # 輔助工具
        ├── layout/            # 版面配置
        ├── pages/             # 頁面樣式
        ├── vendors/           # 第三方覆寫
        └── style.scss         # 主入口`,scssComponents:[{name:"_reset.scss",path:"base/",description:"重置樣式"},{name:"_fonts.scss",path:"base/",description:"字型定義"},{name:"_icon.scss",path:"base/",description:"圖示樣式"},{name:"_animation.scss",path:"base/",description:"動畫效果"},{name:"_area.scss",path:"components/",description:"區塊樣式"},{name:"_breadcrumb.scss",path:"components/",description:"麵包屑"},{name:"_btn.scss",path:"components/",description:"按鈕樣式"},{name:"_form.scss",path:"components/",description:"表單樣式"},{name:"_left-sidebar.scss",path:"components/",description:"側邊欄"},{name:"_pagination.scss",path:"components/",description:"分頁"},{name:"_tab.scss",path:"components/",description:"頁籤"},{name:"_table.scss",path:"components/",description:"表格"},{name:"_tool-btns-list.scss",path:"components/",description:"工具按鈕列"},{name:"_kendoui-overwrite.scss",path:"vendors/",description:"Kendo UI 覆寫"},{name:"_fancybox_overwrite.scss",path:"vendors/",description:"Fancybox 覆寫"}],htmlTemplates:[{name:"dashboard.html",purpose:"儀表板",components:["統計卡片","圖表區"]},{name:"form_table.html",purpose:"標準列表頁",components:["搜尋區","表格","分頁"]},{name:"form_table_all.html",purpose:"完整表單頁",components:["多欄位表單"]},{name:"form_table_v.html",purpose:"垂直表單頁",components:["垂直排列表單"]},{name:"role.html",purpose:"角色管理",components:["樹狀權限選擇"]},{name:"tab_page.html",purpose:"分頁切換",components:["Tab 頁籤"]},{name:"fancybox_pages.html",purpose:"彈窗頁面",components:["彈窗表單","彈窗表格"]},{name:"login.html",purpose:"登入頁",components:["登入表單"]},{name:"forgot_password.html",purpose:"忘記密碼",components:["密碼重設表單"]},{name:"base_left_right.html",purpose:"左右分欄",components:["左側樹","右側內容"]}],mvcViewUpdates:[{view:"Views/Shared/_Layout_Backstage.cshtml",content:"主版面、側邊欄、導航"},{view:"Views/Role/Index.cshtml",content:"角色管理頁面"},{view:"Views/Role/partial_list.cshtml",content:"角色列表"},{view:"Views/Role/partial_event.cshtml",content:"角色事件"},{view:"Views/Role/partial_module.cshtml",content:"角色權限"},{view:"Views/SysOption/Index.cshtml",content:"系統選單列表"},{view:"Views/SysOption/Modify.cshtml",content:"系統選單編輯"},{view:"Views/EventLog/Index.cshtml",content:"事件日誌列表"}]},kendoVue:{id:"kendo-vue",name:"前端套用 Kendo、Vue",icon:"⚡",description:"前端技術棧升級，導入 Vue 3 + Kendo UI for Vue + Vite",milestones:[{date:"2025-12-31",title:"前端套用 Kendo、Vue",status:"completed"}],summary:[{label:"Vue 元件",value:"6 個"},{label:"Kendo 模組封裝",value:"7 個"},{label:"Vite 建置設定",value:"8 個"},{label:"Composables",value:"8+ 個"}],techStackUpgrades:[{item:"UI 框架",oldTech:"jQuery 3.3.1",newTech:"Vue 3.5.17"},{item:"狀態管理",oldTech:"Kendo Observable",newTech:"Pinia 3.0.3"},{item:"事件系統",oldTech:"jQuery Events",newTech:"mitt 3.0.1"},{item:"建構工具",oldTech:"無",newTech:"Vite 7.0.3"},{item:"類型支援",oldTech:"無",newTech:"TypeScript 5.9.3"},{item:"UI 元件",oldTech:"Kendo UI for jQuery",newTech:"Kendo UI for Vue 6.3.0"}],clientAppStructure:`WebSite/ClientApp/
├── package.json              # 套件定義
├── vite.config.js            # CSS 建置
├── vite.kendo.config.js      # Kendo 元件建置
├── vite.component.config.js  # Vue 元件建置
├── vite.lib.config.js        # 工具庫建置
├── vite.cldr.config.js       # 國際化建置
├── vite.pinia.config.js      # Pinia 建置
├── vite.directive.config.js  # Vue 指令建置
├── vite.mitt.config.js       # 事件總線建置
└── src/
    ├── component/            # Vue 元件
    ├── kendo/                # Kendo Vue 封裝
    ├── lib/                  # 工具庫
    ├── stores/               # Pinia Store
    ├── pinia/                # Pinia 設定
    ├── cldr/                 # 國際化
    ├── directive/            # Vue 指令
    └── mitt/                 # 事件總線`,kendoModules:[{name:"Grid",package:"@progress/kendo-vue-grid",components:["Grid","GridColumn"]},{name:"Buttons",package:"@progress/kendo-vue-buttons",components:["Button","ButtonGroup"]},{name:"DateInputs",package:"@progress/kendo-vue-dateinputs",components:["DatePicker","DateTimePicker"]},{name:"Dropdowns",package:"@progress/kendo-vue-dropdowns",components:["DropDownList","ComboBox","MultiSelect"]},{name:"Inputs",package:"@progress/kendo-vue-inputs",components:["Input","NumericTextBox","TextArea"]},{name:"TreeView",package:"@progress/kendo-vue-treeview",components:["TreeView"]},{name:"Indicators",package:"@progress/kendo-vue-indicators",components:["Loader","Skeleton"]}],vueComponents:[{name:"LC.Grid2.vue",path:"src/component/",description:"核心表格元件"},{name:"GridCheckbox.vue",path:"src/component/",description:"勾選框元件"},{name:"GridToolBar.vue",path:"src/component/",description:"工具列元件"},{name:"EditableGrid.vue",path:"src/component/",description:"可編輯表格"},{name:"MultiSelect.vue",path:"src/component/",description:"多選下拉"},{name:"SingleSelect.vue",path:"src/component/",description:"單選下拉"}],viteBuildConfigs:[{name:"vite.config.js",file:"vite.config.js",description:"CSS 主樣式建置",inputPath:"src/css/client.scss",outputPath:"wwwroot/packages/client.css",features:["SCSS 編譯","PostCSS 處理","CSS 壓縮"]},{name:"vite.kendo.config.js",file:"vite.kendo.config.js",description:"Kendo UI for Vue 元件建置",inputPath:"src/kendo/*.ts",outputPath:"wwwroot/packages/kendo/",features:["Tree Shaking","按需載入","ESM 輸出"]},{name:"vite.component.config.js",file:"vite.component.config.js",description:"Vue 元件獨立建置",inputPath:"src/component/*.vue",outputPath:"wwwroot/packages/component/",features:["SFC 編譯","Template 優化","獨立 JS 輸出"]},{name:"vite.lib.config.js",file:"vite.lib.config.js",description:"工具函式庫建置",inputPath:"src/lib/*.ts",outputPath:"wwwroot/packages/lib/",features:["TypeScript 編譯","通用工具封裝"]},{name:"vite.cldr.config.js",file:"vite.cldr.config.js",description:"CLDR 國際化資料建置",inputPath:"src/cldr/index.ts",outputPath:"wwwroot/packages/cldr/",features:["Kendo CLDR 資料","多語系支援","日期/數字格式"]},{name:"vite.pinia.config.js",file:"vite.pinia.config.js",description:"Pinia 狀態管理建置",inputPath:"src/pinia/index.ts",outputPath:"wwwroot/packages/pinia/",features:["Store 註冊","狀態持久化","跨元件共享"]},{name:"vite.directive.config.js",file:"vite.directive.config.js",description:"Vue 自訂指令建置",inputPath:"src/directive/index.ts",outputPath:"wwwroot/packages/directive/",features:["v-focus","v-click-outside","全域註冊"]},{name:"vite.mitt.config.js",file:"vite.mitt.config.js",description:"事件總線建置",inputPath:"src/mitt/index.ts",outputPath:"wwwroot/packages/mitt/",features:["跨元件通訊","事件發布訂閱","取代 jQuery Events"]}],viteIntegration:[{title:"Vite + ASP.NET Core 整合架構",description:'透過 Vite 將前端資源編譯後輸出至 wwwroot/packages/，MVC Views 透過 <script type="module"> 載入',configExample:`// vite.config.js - 基礎配置範例
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../wwwroot/packages',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: (format) => \`[name].js\`
    },
    rollupOptions: {
      external: ['vue'],  // Vue 由 CDN 載入
      output: {
        globals: { vue: 'Vue' }
      }
    }
  }
});`,outputStructure:`wwwroot/packages/
├── client.css          # 主樣式
├── kendo/              # Kendo 模組
│   ├── kendo-grid.js
│   ├── kendo-buttons.js
│   └── all.css
├── component/          # Vue 元件
│   ├── LC.Grid2.js
│   └── EditableGrid.js
├── lib/                # 工具函式
├── pinia/              # 狀態管理
├── cldr/               # 國際化
├── directive/          # 自訂指令
└── mitt/               # 事件總線`},{title:"Kendo UI for Vue 按需載入",description:"將 Kendo 元件分割為獨立模組，MVC 頁面依需求載入對應模組，減少初始載入大小",configExample:`// vite.kendo.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const kendoModules = {
  'kendo-grid': './src/kendo/grid.ts',
  'kendo-buttons': './src/kendo/buttons.ts',
  'kendo-dateinputs': './src/kendo/dateinputs.ts',
  'kendo-dropdowns': './src/kendo/dropdowns.ts',
  'kendo-inputs': './src/kendo/inputs.ts',
  'kendo-treeview': './src/kendo/treeview.ts',
  'kendo-indicators': './src/kendo/indicators.ts',
};

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../wwwroot/packages/kendo',
    lib: {
      entry: kendoModules,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@progress/kendo-vue-intl'],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
      }
    }
  }
});`,buildCommand:"npm run build:kendo"},{title:"Vue 元件獨立打包",description:"每個 Vue 元件編譯為獨立 JS 檔案，支援 MVC 頁面按需引用",configExample:`// vite.component.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { readdirSync } from 'fs';
import { resolve } from 'path';

// 動態讀取 component 目錄下的所有 .vue 檔案
const componentDir = resolve(__dirname, 'src/component');
const entries = {};
readdirSync(componentDir)
  .filter(file => file.endsWith('.vue'))
  .forEach(file => {
    const name = file.replace('.vue', '');
    entries[name] = resolve(componentDir, file);
  });

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../wwwroot/packages/component',
    lib: {
      entry: entries,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'pinia'],
      output: {
        entryFileNames: '[name].js',
      }
    }
  }
});`},{title:"MVC View 整合使用",description:"Razor View 中透過 ES Module 載入 Vue 元件，與後端資料綁定",configExample:`<!-- Views/User/Index.cshtml -->
@section Scripts {
  <!-- Vue 3 CDN -->
  <script src="https://unpkg.com/vue@3/dist/vue.esm-browser.js"><\/script>
  
  <!-- Kendo 模組按需載入 -->
  <script type="module">
    import { Grid, GridColumn } from '/packages/kendo/kendo-grid.js';
    import LCGrid2 from '/packages/component/LC.Grid2.js';
    import { createPinia } from '/packages/pinia/pinia.js';
    
    const app = Vue.createApp({
      components: { LCGrid2, Grid, GridColumn },
      data() {
        return {
          searchModel: { keyword: '' },
          apiUrl: '@Url.Action("QueryList", "User")'
        };
      },
      methods: {
        handleDataBind(data) {
          console.log('載入資料:', data);
        }
      }
    });
    
    app.use(createPinia());
    app.mount('#app');
  <\/script>
}

<div id="app">
  <lc-grid2
    guid="user-list"
    :search-model="searchModel"
    :api-url="apiUrl"
    @data-bind="handleDataBind">
  </lc-grid2>
</div>`},{title:"npm scripts 建置指令",description:"透過 npm scripts 統一管理各模組的建置流程",configExample:`// package.json
{
  "scripts": {
    "build:css": "vite build --config vite.config.js",
    "build:kendo": "vite build --config vite.kendo.config.js",
    "build:component": "vite build --config vite.component.config.js",
    "build:lib": "vite build --config vite.lib.config.js",
    "build:cldr": "vite build --config vite.cldr.config.js",
    "build:pinia": "vite build --config vite.pinia.config.js",
    "build:directive": "vite build --config vite.directive.config.js",
    "build:mitt": "vite build --config vite.mitt.config.js",
    "build:all": "npm-run-all build:css build:kendo build:component build:lib build:cldr build:pinia build:directive build:mitt",
    "watch": "npm-run-all --parallel watch:*",
    "watch:css": "vite build --config vite.config.js --watch",
    "watch:component": "vite build --config vite.component.config.js --watch"
  },
  "dependencies": {
    "vue": "^3.5.17",
    "pinia": "^3.0.3",
    "mitt": "^3.0.1",
    "@progress/kendo-vue-grid": "^6.3.0",
    "@progress/kendo-vue-buttons": "^6.3.0",
    "@progress/kendo-vue-dateinputs": "^6.3.0",
    "@progress/kendo-vue-dropdowns": "^6.3.0",
    "@progress/kendo-vue-inputs": "^6.3.0",
    "@progress/kendo-vue-treeview": "^6.3.0",
    "@progress/kendo-vue-indicators": "^6.3.0"
  },
  "devDependencies": {
    "vite": "^7.0.3",
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.9.3",
    "sass": "^1.77.0",
    "npm-run-all": "^4.1.5"
  }
}`,buildCommand:"npm run build:all"}],composables:[{name:"useSidebar",purpose:"側邊欄展開/收合控制"},{name:"useNavigation",purpose:"頁面導航管理"},{name:"useFormValidation",purpose:"表單驗證邏輯"},{name:"useLoading",purpose:"載入狀態控制"},{name:"useModal",purpose:"模態框開關控制"},{name:"useLocalStorage",purpose:"本地儲存封裝"},{name:"useDebounce",purpose:"防抖函數"},{name:"useThrottle",purpose:"節流函數"}],codeSnippets:[{title:"LC.Grid2.vue 使用範例",language:"html",description:"核心表格元件用法",code:`<LCGrid2
  ref="grid"
  guid="user-list"
  :search-model="searchModel"
  identity-field="userId"
  :enable-select="true"
  @data-bind="handleDataBind"
  @click-row="handleRowClick"
>
  <template #search>
    <input v-model="searchModel.keyword" placeholder="搜尋..." />
    <button @click="$refs.grid.query()">查詢</button>
  </template>

  <template #header="{ isAllSelected, toggleSelectAll }">
    <tr>
      <th><input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll($event.target.checked)" /></th>
      <th>姓名</th>
      <th>帳號</th>
    </tr>
  </template>

  <template #row="{ item, isSelected, toggleSelection }">
    <td><input type="checkbox" :checked="isSelected" @change="toggleSelection(item.userId, $event.target.checked)" /></td>
    <td>{{ item.name }}</td>
    <td>{{ item.account }}</td>
  </template>
</LCGrid2>`}]}},performanceSummary:[{category:".NET 9 / EF Core 9",items:[{label:"專案升級",value:"14 個"},{label:"DTO 類別",value:"34+ 個"},{label:"FluentValidation 驗證器",value:"4+ 個"}]},{category:"RESTful API",items:[{label:"API 端點重構",value:"15+ 個"},{label:"HTTP 動詞",value:"標準化"}]},{category:"新版面",items:[{label:"MVC Views 更新",value:"8+ 個"}]},{category:"Kendo + Vue",items:[{label:"Vue 元件",value:"6 個"},{label:"Kendo 模組封裝",value:"7 個"},{label:"Vite 建置設定",value:"8 個"},{label:"Composables",value:"8+ 個"}]}]};export{e as standardizationData};
