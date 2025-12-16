// 流程標準化績效型別定義

// DTO 項目
export interface DTOItem {
  name: string;
  purpose: string;
  module?: string;
}

// DTO 模組
export interface DTOModule {
  name: string;
  path: string;
  items: DTOItem[];
}

// FluentValidation 驗證器
export interface ValidatorItem {
  name: string;
  path: string;
  description: string;
  rules?: string[];
}

// 專案升級項目
export interface ProjectUpgrade {
  name: string;
  framework: string;
  description: string;
}

// API 對照項目
export interface APIMapping {
  oldAPI: string;
  newAPI: string;
  httpMethod?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

// API 模組
export interface APIModule {
  name: string;
  description: string;
  mappings: APIMapping[];
}

// HTTP 狀態碼規範
export interface HTTPStatusCode {
  code: string;
  description: string;
}

// SCSS 元件
export interface SCSSComponent {
  name: string;
  path: string;
  description: string;
}

// HTML 模板
export interface HTMLTemplate {
  name: string;
  purpose: string;
  components: string[];
}

// MVC View 更新
export interface MVCViewUpdate {
  view: string;
  content: string;
}

// Vue 元件
export interface VueComponent {
  name: string;
  path: string;
  description: string;
}

// Kendo 模組
export interface KendoModule {
  name: string;
  package: string;
  components: string[];
}

// Vite 建置設定
export interface ViteBuildConfig {
  name: string;
  file: string;
  description: string;
  inputPath?: string;
  outputPath?: string;
  features?: string[];
}

// Vite 整合詳情
export interface ViteIntegrationDetail {
  title: string;
  description: string;
  configExample?: string;
  buildCommand?: string;
  outputStructure?: string;
}

// Composable
export interface ComposableItem {
  name: string;
  purpose: string;
}

// 技術棧升級
export interface TechStackUpgrade {
  item: string;
  oldTech: string;
  newTech: string;
}

// 程式碼片段
export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  description?: string;
}

// 里程碑
export interface Milestone {
  date: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  description?: string;
}

// 績效目標
export interface StandardizationGoal {
  id: string;
  name: string;
  icon: string;
  description: string;
  milestones: Milestone[];
  summary: {
    label: string;
    value: string | number;
  }[];
}

// .NET 9 遷移目標
export interface DotNet9Goal extends StandardizationGoal {
  projectUpgrades: ProjectUpgrade[];
  dtoModules: DTOModule[];
  validators: ValidatorItem[];
  codeSnippets: CodeSnippet[];
}

// RESTful API 目標
export interface RESTfulAPIGoal extends StandardizationGoal {
  designPrinciples: {
    principle: string;
    description: string;
    example: string;
  }[];
  apiModules: APIModule[];
  httpStatusCodes: HTTPStatusCode[];
  codeSnippets: CodeSnippet[];
}

// 新版面目標
export interface NewLayoutGoal extends StandardizationGoal {
  directoryStructure: string;
  scssComponents: SCSSComponent[];
  htmlTemplates: HTMLTemplate[];
  mvcViewUpdates: MVCViewUpdate[];
}

// Kendo + Vue 目標
export interface KendoVueGoal extends StandardizationGoal {
  techStackUpgrades: TechStackUpgrade[];
  clientAppStructure: string;
  kendoModules: KendoModule[];
  vueComponents: VueComponent[];
  viteBuildConfigs: ViteBuildConfig[];
  viteIntegration: ViteIntegrationDetail[];
  composables: ComposableItem[];
  codeSnippets: CodeSnippet[];
}

// 流程標準化完整資料
export interface StandardizationData {
  title: string;
  description: string;
  weight: number;
  targetDate: string;
  goals: {
    dotNet9: DotNet9Goal;
    restfulAPI: RESTfulAPIGoal;
    newLayout: NewLayoutGoal;
    kendoVue: KendoVueGoal;
  };
  performanceSummary: {
    category: string;
    items: {
      label: string;
      value: string | number;
    }[];
  }[];
}
