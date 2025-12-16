# 2025 年度績效報告 - PTDMvc 專案改版

---

## 績效目標一：遷移至 .NET 9、EF Core 9 (DTO、FluentValidation)

### 1.1 框架版本升級

| 項目 | 升級內容 |
|------|----------|
| Target Framework | → **.NET 9.0** |
| Entity Framework Core | → **9.0.5** |
| FluentValidation | → **12.0.0** |
| ASP.NET Core MVC | → **9.0.5** |

### 1.2 專案架構 (14 個專案全部升級)

```
PTDMvc.sln
├── WebSite/           (net9.0) - Web 應用主專案
├── AuthServices/      (net9.0) - 認證服務層
├── SSServices/        (net9.0) - 系統服務層
├── ComboLogics/       (net9.0) - 下拉選單邏輯
├── CommonLogics/      (net9.0) - 共用邏輯
├── MenuLogics/        (net9.0) - 選單邏輯
├── ModuleLogics/      (net9.0) - 模組邏輯
├── DbContexts/        (net9.0) - EF Core 資料存取層
├── Domain/            (net9.0) - 領域模型
├── LC.Core/           (net9.0) - 核心工具庫
├── Resource/          (net9.0) - 多語系資源檔
├── Auths/             (net9.0) - 認證模組
├── AuthServices.Tests (net9.0) - 單元測試
└── ServiceLayer.Tests (net9.0) - 服務層測試
```

### 1.3 DTO 模式實作

**建立 34+ DTO 類別，實現資料傳輸物件分層：**

#### 使用者模組 (AuthServices/User/DTOs/)
| DTO | 用途 |
|-----|------|
| `UserCreateDto` | 新增使用者資料 |
| `UserUpdateDto` | 更新使用者資料 |
| `UserWriteDto` | 寫入使用者基底類別 |
| `UserViewDto` | 使用者詳細檢視 |
| `UserListDto` | 使用者列表項目 |
| `UserSearchDto` | 使用者搜尋條件 |
| `MyProfileViewDto` | 個人資料檢視 |
| `MyProfileUpdateDto` | 個人資料更新 |
| `LoginDto` | 登入資料 |

#### 角色模組 (AuthServices/Role/DTOs/)
| DTO | 用途 |
|-----|------|
| `RoleCreateDto` | 新增角色 |
| `RoleUpdateDto` | 更新角色 |
| `RoleWriteDto` | 寫入角色基底 |
| `RoleListDto` | 角色列表項目 |
| `RoleModuleUpdateDto` | 角色權限更新 |

#### 系統選單模組 (SSServices/SysOption/DTOs/)
| DTO | 用途 |
|-----|------|
| `SysOptionSearchDto` | 系統選單搜尋 |
| `SysOptionListDto` | 系統選單列表 |
| `SysOptionViewDto` | 系統選單檢視 |
| `SysOptionWriteDto` | 系統選單寫入 |

#### 系統日誌模組 (SSServices/SystemEventLog/DTOs/)
| DTO | 用途 |
|-----|------|
| `SystemEventLogSearchDto` | 日誌搜尋條件 |
| `SystemEventLogListDto` | 日誌列表項目 |
| `SystemEventLogRecordDto` | 日誌紀錄詳情 |
| `SystemEventLogRecordSearchDto` | 紀錄搜尋 |

#### 共用 DTO
| DTO | 位置 | 用途 |
|-----|------|------|
| `SearchDto` | LC.Core | 分頁搜尋基底 |
| `ApiResponseDto` | LC.Core | API 回應封裝 |
| `DropDownListDto` | ComboLogics | 下拉選單項目 |
| `MenuDto` | MenuLogics | 選單項目 |
| `BreadCrumbDto` | MenuLogics | 麵包屑導航 |
| `ModuleTreeDto` | ModuleLogics | 模組樹狀結構 |

### 1.4 FluentValidation 驗證器實作

#### 已建立的驗證器

**1. UserWriteDtoValidator (使用者驗證)**
```csharp
// 位置: AuthServices/User/Validators/UserWriteDtoValidator.cs
public sealed class UserWriteDtoValidator : AbstractValidator<UserWriteDto>
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

        // 帳號驗證: 必填 + 長度 + 格式 + 唯一性
        RuleFor(x => x.account)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("VerifyError_必填")
            .MaximumLength(20).WithMessage("VerifyError_長度限制")
            .Matches(@"^[A-Za-z0-9_]+$").WithMessage("VerifyError_需為英數字")
            .Must((dto, account) => AccountNotExists(dto, account)).WithMessage("VerifyError_重複");

        // 角色必選
        RuleFor(x => x.roleIDs)
            .NotNull().WithMessage("VerifyError_必填")
            .Must(list => list != null && list.Any()).WithMessage("VerifyError_必填");

        // Email 格式驗證 (選填)
        RuleFor(x => x.email)
            .EmailAddress().WithMessage("VerifyError_格式錯誤")
            .When(x => !string.IsNullOrWhiteSpace(x.email));

        // 密碼驗證 (新增必填/編輯選填)
        RuleFor(x => x).Custom((dto, context) => {
            if (dto is UserCreateDto)
                PasswordValidationHelper.ValidateRequiredPassword(...);
            else
                PasswordValidationHelper.ValidateOptionalPassword(...);
        });
    }
}
```

**2. MyProfileUpdateDtoValidator (個人資料驗證)**
```csharp
// 位置: AuthServices/User/Validators/MyProfileUpdateDtoValidator.cs
```

**3. RoleUpdateDtoValidator (角色驗證)**
```csharp
// 位置: AuthServices/Role/Validators/RoleUpdateDtoValidator.cs
```

**4. SysOptionWriteDtoValidator (系統選單驗證)**
```csharp
// 位置: SSServices/SysOption/Validators/SysOptionWriteDtoValidator.cs
```

#### FluentValidation 註冊方式
```csharp
// WebSite/Program.cs
builder.Services.AddValidatorsFromAssemblyContaining<UserWriteDtoValidator>();
builder.Services.AddFluentValidationAutoValidation();
```

---

## 績效目標二：API 改為 RESTful API

### 2.1 設計原則

| 原則 | 說明 | 範例 |
|------|------|------|
| 資源命名 | 使用複數名詞 | `/api/users`, `/api/roles` |
| HTTP 動詞 | 動詞表達動作 | GET 查詢、POST 新增、PUT 更新、DELETE 刪除 |
| URL 結構 | ID 放在路徑中 | `/api/users/{id}` |
| 子資源 | 巢狀路徑 | `/api/roles/{id}/modules` |
| 命名風格 | kebab-case | `/api/sys-options`, `/api/my-profile` |

### 2.2 API 重構對照表

#### User API (使用者管理)
| 舊 API (RPC 風格) | 新 API (RESTful) |
|-------------------|------------------|
| `POST /api/User/QueryList` | `GET /api/users` |
| `GET /api/User/Create` | `GET /api/users/new` |
| `POST /api/User/SaveCreate` | `POST /api/users` |
| `GET /api/User/Modify?id={id}` | `GET /api/users/{id}` |
| `POST /api/User/SaveModify` | `PUT /api/users/{id}` |
| `POST /api/User/Delete` | `DELETE /api/users/{id}` |
| - | `DELETE /api/users` (批次刪除) |

#### Role API (角色管理)
| 舊 API (RPC 風格) | 新 API (RESTful) |
|-------------------|------------------|
| `POST /api/Role/List` | `GET /api/roles` |
| `GET /api/Role/GetModuleTreeByRoleId?id={id}` | `GET /api/roles/{id}/modules` |
| `POST /api/Role/SaveName` | `PUT /api/roles/{id}` |
| `POST /api/Role/SaveModule` | `PUT /api/roles/modules` |
| `POST /api/Role/Delete` | `DELETE /api/roles/{id}` |
| - | `DELETE /api/roles` (批次刪除) |

#### SysOption API (系統選單)
| 舊 API (RPC 風格) | 新 API (RESTful) |
|-------------------|------------------|
| `POST /api/SysOption/QueryList` | `GET /api/sys-options` |
| `GET /api/SysOption/Modify?optionType={type}` | `GET /api/sys-options/{optionType}` |
| `POST /api/SysOption/Save?optionType={type}` | `PUT /api/sys-options/{optionType}` |

#### MyProfile API (個人資料)
| 舊 API (RPC 風格) | 新 API (RESTful) |
|-------------------|------------------|
| `GET /api/MyProfile/Modify` | `GET /api/my-profile` |
| `POST /api/MyProfile/Save` | `PUT /api/my-profile` |

#### EventLog API (事件日誌)
| 舊 API (RPC 風格) | 新 API (RESTful) |
|-------------------|------------------|
| `POST /api/EventLog/QueryList` | `GET /api/event-logs` |
| `POST /api/EventLog/FindByRecordGuid` | `GET /api/event-logs/by-record` |

### 2.3 HTTP 狀態碼規範

| 狀態碼 | 使用情境 |
|--------|----------|
| `200 OK` | 查詢成功、更新成功 |
| `201 Created` | 新增成功 (含 Location header) |
| `400 Bad Request` | 驗證失敗 |
| `401 Unauthorized` | 未登入 |
| `403 Forbidden` | 無權限 |
| `404 Not Found` | 資源不存在 |

### 2.4 前端 API 呼叫更新

```javascript
// WebSite/wwwroot/js/app.apis.js

// 舊寫法
api.user.queryList({ queryString: '?keyword=test' })  // POST

// 新寫法
api.users.queryList({ queryString: '?keyword=test', method: 'GET' })

// 舊寫法
api.role.getModuleTreeByRoleId({ queryString: `?id=${roleId}` })

// 新寫法
api.roles.getModuleTreeByRoleId({ id: roleId })  // GET /api/roles/{id}/modules
```

---

## 績效目標三：套用新版面

### 3.1 新版面目錄結構

```
共用後台_新/
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
│   │   ├── NotoSansTC-*.ttf      # 思源黑體
│   │   ├── bootstrap-icons.*     # Bootstrap Icons
│   │   └── fa-*.ttf/woff2        # Font Awesome
│   ├── images/                # 圖片資源
│   │   ├── Logo.svg
│   │   ├── login_img.svg
│   │   └── state-*.svg           # 狀態圖示
│   └── templates/             # HTML 模板片段
│       ├── components/
│       │   ├── breadcrumb.html       # 麵包屑
│       │   ├── left-sidebar.html     # 側邊欄
│       │   ├── kendo-list-area.html  # Kendo 列表區
│       │   ├── pagination.html       # 分頁
│       │   ├── table.html            # 表格
│       │   ├── tool-btns-list.html   # 工具按鈕列
│       │   ├── nav_1_style.html      # 導航樣式1
│       │   ├── nav_2_style.html      # 導航樣式2
│       │   └── notification-widget.html
│       ├── layout/
│       │   ├── fancybox.html         # 彈窗版面
│       │   ├── leftbar_default.html  # 預設側邊欄
│       │   └── dropdown_default.html # 預設下拉
│       └── fancybox_pages/
│           ├── form.html             # 彈窗表單
│           └── table.html            # 彈窗表格
└── src/                       # 原始碼
    └── scss/
        ├── base/              # 基礎樣式
        │   ├── _reset.scss
        │   ├── _fonts.scss
        │   ├── _icon.scss
        │   └── _animation.scss
        ├── components/        # 元件樣式
        │   ├── _area.scss
        │   ├── _breadcrumb.scss
        │   ├── _btn.scss
        │   ├── _form.scss
        │   ├── _left-sidebar.scss
        │   ├── _pagination.scss
        │   ├── _tab.scss
        │   ├── _table.scss
        │   ├── _tool-btns-list.scss
        │   └── _nav_*.scss
        ├── helpers/           # 輔助工具
        │   ├── _variables.scss
        │   ├── _mixin.scss
        │   ├── _function.scss
        │   ├── _map.scss
        │   └── _utilities.scss
        ├── layout/            # 版面配置
        │   └── _share.scss
        ├── pages/             # 頁面樣式
        │   ├── _dashboard.scss
        │   ├── _login.scss
        │   └── _forgot_password.scss
        ├── vendors/           # 第三方覆寫
        │   ├── _bootstrap.scss
        │   ├── _bootstrap-icons.scss
        │   ├── _fontawesome-all.scss
        │   ├── _kendoui-overwrite.scss
        │   ├── _fancybox_overwrite.scss
        │   └── kendo_custom.scss
        └── style.scss         # 主入口
```

### 3.2 頁面範本

| 範本檔案 | 用途 | 包含元件 |
|----------|------|----------|
| `dashboard.html` | 儀表板 | 統計卡片、圖表區 |
| `form_table.html` | 標準列表頁 | 搜尋區 + 表格 + 分頁 |
| `form_table_all.html` | 完整表單頁 | 多欄位表單 |
| `form_table_v.html` | 垂直表單頁 | 垂直排列表單 |
| `role.html` | 角色管理 | 樹狀權限選擇 |
| `tab_page.html` | 分頁切換 | Tab 頁籤 |
| `fancybox_pages.html` | 彈窗頁面 | 彈窗表單/表格 |
| `login.html` | 登入頁 | 登入表單 |
| `forgot_password.html` | 忘記密碼 | 密碼重設表單 |
| `base_left_right.html` | 左右分欄 | 左側樹 + 右側內容 |

### 3.3 已套用至 MVC Views

| View | 套用內容 |
|------|----------|
| `Views/Shared/_Layout_Backstage.cshtml` | 主版面、側邊欄、導航 |
| `Views/Role/Index.cshtml` | 角色管理頁面 |
| `Views/Role/partial_list.cshtml` | 角色列表 |
| `Views/Role/partial_event.cshtml` | 角色事件 |
| `Views/Role/partial_module.cshtml` | 角色權限 |
| `Views/SysOption/Index.cshtml` | 系統選單列表 |
| `Views/SysOption/Modify.cshtml` | 系統選單編輯 |
| `Views/EventLog/Index.cshtml` | 事件日誌列表 |

---

## 績效目標四：前端套用 Kendo、Vue

### 4.1 技術棧升級

| 項目 | 舊技術 | 新技術 |
|------|--------|--------|
| UI 框架 | jQuery 3.3.1 | **Vue 3.5.17** |
| 狀態管理 | Kendo Observable | **Pinia 3.0.3** |
| 事件系統 | jQuery Events | **mitt 3.0.1** |
| 建構工具 | 無 | **Vite 7.0.3** |
| 類型支援 | 無 | **TypeScript 5.9.3** |
| UI 元件 | Kendo UI for jQuery | **Kendo UI for Vue 6.3.0** |

### 4.2 ClientApp 專案結構

```
WebSite/ClientApp/
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
    │   ├── LC.Grid2.vue         # 核心表格元件
    │   ├── GridCheckbox.vue     # 勾選框元件
    │   ├── GridToolBar.vue      # 工具列元件
    │   ├── EditableGrid.vue     # 可編輯表格
    │   ├── MultiSelect.vue      # 多選下拉
    │   └── SingleSelect.vue     # 單選下拉
    ├── kendo/                # Kendo Vue 封裝
    │   ├── grid.ts              # Grid 元件
    │   ├── buttons.ts           # Button 元件
    │   ├── dateinputs.ts        # 日期輸入
    │   ├── dropdowns.ts         # 下拉選單
    │   ├── inputs.ts            # 輸入框
    │   ├── treeview.ts          # 樹狀檢視
    │   └── indicators.ts        # 指示器
    ├── lib/                  # 工具庫
    │   ├── useRowEditGrid.ts    # 行內編輯
    │   ├── gridColumns.ts       # 欄位設定
    │   ├── errorStore.ts        # 錯誤狀態
    │   ├── uuid.ts              # UUID 產生
    │   └── eventBus.js          # 事件總線
    ├── stores/               # Pinia Store
    │   └── gridSearch.ts        # 搜尋條件持久化
    ├── pinia/                # Pinia 設定
    ├── cldr/                 # 國際化
    ├── directive/            # Vue 指令
    └── mitt/                 # 事件總線
```

### 4.3 Kendo UI for Vue 整合

**已封裝的 Kendo Vue 模組：**

| 模組 | 套件 | 包含元件 |
|------|------|----------|
| Grid | `@progress/kendo-vue-grid` | Grid, GridColumn |
| Buttons | `@progress/kendo-vue-buttons` | Button, ButtonGroup |
| DateInputs | `@progress/kendo-vue-dateinputs` | DatePicker, DateTimePicker |
| Dropdowns | `@progress/kendo-vue-dropdowns` | DropDownList, ComboBox, MultiSelect |
| Inputs | `@progress/kendo-vue-inputs` | Input, NumericTextBox, TextArea |
| TreeView | `@progress/kendo-vue-treeview` | TreeView |
| Indicators | `@progress/kendo-vue-indicators` | Loader, Skeleton |

### 4.4 核心元件 LC.Grid2.vue

**功能特色：**

| 功能 | 說明 |
|------|------|
| 搜尋區塊 | `<slot name="search">` 自定義搜尋表單 |
| 表頭插槽 | `<slot name="header">` 自定義表頭 |
| 資料列插槽 | `<slot name="row">` 自定義資料列 |
| 分頁模式 | `full` / `simple` / `none` |
| 顯示模式 | `list` (列表) / `history` (歷程彈窗) |
| 選取功能 | 單選 / 多選 / 跨頁選取 / 全選 |
| 搜尋持久化 | Pinia Store 自動保存搜尋條件 |
| 自適應高度 | 動態計算表格最大高度 |

**使用範例：**
```html
<LCGrid2
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
</LCGrid2>
```

### 4.5 建置與產出

**建置指令：**
```bash
npm run build:all   # 完整建置所有模組
```

**產出結構：**
```
WebSite/wwwroot/packages/
├── client.css                 # 主要樣式
├── kendo/                     # Kendo 模組
│   ├── kendo-grid.js
│   ├── kendo-buttons.js
│   ├── kendo-dateinputs.js
│   ├── kendo-dropdowns.js
│   ├── kendo-inputs.js
│   ├── kendo-treeview.js
│   ├── kendo-indicators.js
│   └── all.css
├── component/                 # Vue 元件
│   ├── LC.Grid2.js
│   ├── GridCheckbox.js
│   ├── GridToolBar.js
│   ├── EditableGrid.js
│   ├── MultiSelect.js
│   └── SingleSelect.js
├── lib/                       # 工具庫
├── pinia/                     # 狀態管理
├── cldr/                      # 國際化
├── directive/                 # Vue 指令
└── mitt/                      # 事件總線
```

### 4.6 Vue 3 Composables

**已建立的可重用邏輯：**

| Composable | 用途 |
|------------|------|
| `useSidebar` | 側邊欄展開/收合控制 |
| `useNavigation` | 頁面導航管理 |
| `useFormValidation` | 表單驗證邏輯 |
| `useLoading` | 載入狀態控制 |
| `useModal` | 模態框開關控制 |
| `useLocalStorage` | 本地儲存封裝 |
| `useDebounce` | 防抖函數 |
| `useThrottle` | 節流函數 |

---

## 績效總結

| 目標 | 完成項目 | 數量 |
|------|----------|------|
| **.NET 9 / EF Core 9** | 專案升級 | 14 個 |
| | DTO 類別 | 34+ 個 |
| | FluentValidation 驗證器 | 4+ 個 |
| **RESTful API** | API 端點重構 | 15+ 個 |
| | HTTP 動詞標準化 | GET/POST/PUT/DELETE |
| **新版面** | SCSS 元件 | 15+ 個 |
| | HTML 模板 | 10+ 個 |
| | MVC Views 更新 | 8+ 個 |
| **Kendo + Vue** | Vue 元件 | 6 個 |
| | Kendo 模組封裝 | 7 個 |
| | Vite 建置設定 | 8 個 |
| | Composables | 8+ 個 |

---

**文件版本**: 1.0
**建立日期**: 2025-12-03
**專案分支**: Johnny_106883_2
