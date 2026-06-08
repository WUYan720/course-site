export interface CodeBlock {
  language: string;
  code: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface ContentSection {
  type: 'text' | 'code' | 'table' | 'note';
  content?: string;
  code?: CodeBlock;
  table?: TableData;
  items?: string[];
}

export interface ChapterSection {
  title: string;
  content: ContentSection[];
}

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  sections: ChapterSection[];
}

export const courseContent: Chapter[] = [
  {
    id: 'data-cleaning',
    title: `数据清洗`,
    subtitle: `数据清洗核心知识点讲解、语法与举例`,
    sections: [
  {
    title: `1. 检查缺失值`,
    content: [
    {
      type: "text",
      content: `语法 (Pandas):`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import pandas as pd\ndata = pd.read_csv(\'data.csv\')\nprint(data.isnull().sum()) # 统计每列缺失数量`,
      },
    },
    {
      type: "text",
      content: `\`isnull()\`返回布尔型 DataFrame，\`sum()\`汇总每列缺失个数。`,
    }
    ],
  },
  {
    title: `2. 删除缺失值`,
    content: [
    {
      type: "text",
      content: `- 删除含缺失值的行: \`data.dropna()\`\n\n- 删除指定列有缺失的行: \`data.dropna(subset=[\'列名\'])\`\n\n- 原地修改: \`data.dropna(inplace=True)\``,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `data.dropna(inplace=True) # 删除所有含NaN的行`,
      },
    },
    {
      type: "text",
      content: `注意：删除前应确认缺失比例，避免过度损失样本。`,
    }
    ],
  },
  {
    title: `3. 填充缺失值`,
    content: [
    {
      type: "text",
      content: `常用方法：均值、中位数、众数、指定值、前向 / 后向填充。`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 用均值填充\ndata[\'age\'].fillna(data[\'age\'].mean(), inplace=True)\n# 用中位数填充\ndata[\'income\'].fillna(data[\'income\'].median(), inplace=True)\n# 用众数填充\nmode_val = data[\'gender\'].mode()\ndata[\'gender\'].fillna(mode_val, inplace=True)\n# 指定常数填充\ndata.fillna(0, inplace=True)`,
      },
    },
    {
      type: "text",
      content: `举例：在用户信息数据中，年龄缺失时使用全体用户的平均年龄填充；收入缺失时使用中位数 (避免极值影响)。`,
    }
    ],
  },
  {
    title: `4. 指定空值识别类型`,
    content: [
    {
      type: "text",
      content: `当数据中用 “n/a”、“NA”、“—” 等表示缺失时，需在读取时声明:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `missing_values = ["n/a", "na", "--"]\ndata = pd.read_csv(\'data.csv\', na_values=missing_values)`,
      },
    },
    {
      type: "text",
      content: `这样 Pandas 会将这些字符串识别为 NaN。`,
    }
    ],
  },
  {
    title: `1. 检查重复值`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `print(data.duplicated().sum()) # 重复行数\n# 查看重复行\nprint(data[data.duplicated()])`,
      },
    },
    {
      type: "text",
      content: `\`duplicated()\`返回布尔 Series，默认标记第一次出现之后的重复为 True。`,
    }
    ],
  },
  {
    title: `2. 删除重复值`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `data.drop_duplicates(inplace=True) # 保留第一次出现的行\n# 基于指定列判断重复\ndata.drop_duplicates(subset=[\'id\', \'name\'], keep=\'first\', inplace=True)`,
      },
    },
    {
      type: "text",
      content: `参数\`keep\`可选 \'first\'(保留第一个)、\'last\'(保留最后一个)、False (全部删除)。\n\n举例：电商订单数据中，同一订单号出现多次，按订单号去重保留第一条记录。`,
    }
    ],
  },
  {
    title: `1. IQR (四分位距) 法`,
    content: [
    {
      type: "text",
      content: `语法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `Q1 = data[\'column\'].quantile(0.25)\nQ3 = data[\'column\'].quantile(0.75)\nIQR = Q3 - Q1\nlower = Q1 - 1.5 * IQR\nupper = Q3 + 1.5 * IQR\ndata = data[(data[\'column\'] >= lower) & (data[\'column\'] <= upper)]`,
      },
    },
    {
      type: "text",
      content: `超出上下限的值被视为异常值并删除。`,
    }
    ],
  },
  {
    title: `2. Z-score 法`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `from scipy import stats\nz_scores = stats.zscore(data[\'column\'])\ndata = data[(z_scores > -3) & (z_scores < 3)] # 保留Z-score在[-3,3]内的行`,
      },
    },
    {
      type: "text",
      content: `通常认为 \\| Z\\|\\>3 为异常值。`,
    }
    ],
  },
  {
    title: `3. 箱线图可视化检测`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `import matplotlib.pyplot as plt\nplt.boxplot(data[\'column\'])\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `箱线图能直观显示异常值 (图中圆点)。\n\n举例：分析员工薪资时，发现个别月薪为 100 万元 (录入错误)，用 IQR 方法识别并剔除或修正为缺失值后填充均值。`,
    }
    ],
  },
  {
    title: `1. 数据类型转换`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `# 转为整数/浮点\ndata[\'age\'] = data[\'age\'].astype(int)\n# 转为日期时间\ndata[\'date\'] = pd.to_datetime(data[\'date\'])`,
      },
    },
    {
      type: "text",
      content: `确保数值列能运算、日期列能排序和提取特征。`,
    }
    ],
  },
  {
    title: `2. 字符串清洗`,
    content: [
    {
      type: "text",
      content: `- 去除空格: \`data[\'name\'].str.strip()\`\n\n- 统一大小写: \`data[\'name\'].str.lower()\`\n\n- 替换字符: \`data[\'phone\'].str.replace(\'-\', \'\')\`\n\n- 正则删除非字母数字: \`data[\'note\'].str.replace(\'[^a-zA-Z0-9]\', \'\')\`\n\n举例：对 Payment 列 (含美元符号和逗号) 的清洗:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `data["Payment"] = data["Payment"].str[1:].str.replace(",", ".").astype(float)`,
      },
    },
    {
      type: "text",
      content: `先将第一个字符 ($) 去掉，再将逗号替换为点，最后转为浮点数。`,
    }
    ],
  },
  {
    title: `3. 日期统一格式`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `data["Date"] = data["Date"].astype("datetime64[ns]")`,
      },
    },
    {
      type: "text",
      content: `可将多种日期格式 (如 “2020/12/01”、“20201226”) 统一为标准 datetime。`,
    }
    ],
  },
  {
    title: `4. 分列与提取`,
    content: [
    {
      type: "text",
      content: `在 Excel 中，可使用 “数据→分列” 功能将日期时间拆分为两列，或用 Ctrl\\+E 快速填充提取部分字符。`,
    }
    ],
  },
  {
    title: `1. 归一化 (Min-Max 缩放)`,
    content: [
    {
      type: "text",
      content: `将数据映射到 \\[0,1\\] 区间:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from sklearn.preprocessing import MinMaxScaler\nscaler = MinMaxScaler()\ndata[[\'col1\', \'col2\']] = scaler.fit_transform(data[[\'col1\', \'col2\']])`,
      },
    },
    {
      type: "text",
      content: `适用于需要将不同量纲特征统一尺度的情况。`,
    }
    ],
  },
  {
    title: `2. 标准化 (Z-score 标准化)`,
    content: [
    {
      type: "text",
      content: `转换成均值为 0、标准差为 1 的分布:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\ndata[[\'col1\', \'col2\']] = scaler.fit_transform(data[[\'col1\', \'col2\']])`,
      },
    },
    {
      type: "text",
      content: `常用于机器学习模型对特征分布有要求的场景 (如线性回归、SVM)。`,
    }
    ],
  },
  {
    title: `六、Excel 常用清洗操作`,
    content: [
    {
      type: "text",
      content: `除了 Python，Excel 在快速清洗小规模数据时也极为高效。以下为核心语法 (操作):\n\n1. **分列**: 选中列 → 数据 → 分列 → 按分隔符或固定宽度拆分。例如将 “2025-05-11 14:30:00” 分为日期和时间两列。\n\n2. **快速填充 (Ctrl\\+E)**: 通过示例自动填充规律。例如从 “张明 13812345678” 中只提取手机号。\n\n3. **删除重复项**: 数据 → 删除重复项，可基于多列判断。\n\n4. **条件格式标记重复**: 选中区域 → 条件格式 → 突出显示重复值，标红重复项。\n\n5. **TRIM 函数去空格**: \`=TRIM(A1)\`去除前后多余空格。\n\n举例：从身份证号中提取出生日期:\n使用分列 (固定宽度) 取出第 7\\~14 位数字，再转为日期格式。`,
    }
    ],
  },
  {
    title: `七、SPSS 清洗语法举例`,
    content: [
    {
      type: "text",
      content: `SPSS 通过语法实现批量清洗，适合统计分析场景。`,
    }
    ],
  },
  {
    title: `1. 删除重复记录`,
    content: [
    {
      type: "code",
      code: {
        language: "spss",
        code: `SORT CASES BY ID Name.\nMATCH FILES /FILE=* /BY ID Name /FIRST=firstcase.\nSELECT IF (firstcase=1).\nEXECUTE.`,
      },
    },
    {
      type: "text",
      content: `先排序，再标记每组第一个记录，筛选保留。`,
    }
    ],
  },
  {
    title: `2. 用均值替换缺失值`,
    content: [
    {
      type: "code",
      code: {
        language: "spss",
        code: `AGGREGATE\n/OUTFILE=* MODE=ADDVARIABLES\n/BREAK=\n/var1_mean=MEAN(var1).\nIF MISSING(var1) var1 = var1_mean.\nEXECUTE.`,
      },
    },
    {
      type: "text",
      content: `先计算均值存为新变量，再用 IF 赋值替换缺失值。`,
    }
    ],
  },
  {
    title: `3. 数据标准化`,
    content: [
    {
      type: "code",
      code: {
        language: "spss",
        code: `DESCRIPTIVES VARIABLES=var1 /SAVE.\nEXECUTE.`,
      },
    },
    {
      type: "text",
      content: `自动生成 Z 标准化新变量 Zvar1。`,
    }
    ],
  },
  {
    title: `4. 创建分组变量`,
    content: [
    {
      type: "code",
      code: {
        language: "spss",
        code: `IF (age < 18) age_group = 1.\nIF (age >= 18 & age < 30) age_group = 2.\nIF (age >= 30 & age < 50) age_group = 3.\nIF (age >= 50) age_group = 4.\nEXECUTE.`,
      },
    },
    {
      type: "text",
      content: `根据年龄分四组。`,
    }
    ],
  },
  {
    title: `八、综合实例：清洗用户信息数据集`,
    content: [
    {
      type: "text",
      content: `假设有一个包含用户 ID、姓名、年龄、性别、收入、注册日期的 CSV 文件，按以下步骤清洗:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder\n\n# 加载数据\ndata = pd.read_csv(\'user_data.csv\')\n\n# 1. 查看基本信息与缺失\nprint(data.info())\nprint(data.isnull().sum())\n\n# 2. 填充缺失值(年龄用均值,收入用中位数)\ndata[\'age\'] = data[\'age\'].fillna(data[\'age\'].mean())\ndata[\'income\'] = data[\'income\'].fillna(data[\'income\'].median())\n\n# 3. 删除重复用户(基于ID)\ndata.drop_duplicates(subset=[\'id\'], inplace=True)\n\n# 4. 转换日期格式\ndata[\'reg_date\'] = pd.to_datetime(data[\'reg_date\'])\n\n# 5. 异常值检测(年龄超过100视为异常,用均值替换)\ndata.loc[data[\'age\'] > 100, \'age\'] = data[\'age\'].mean()\n\n# 6. 性别编码(标签编码)\nle = LabelEncoder()\ndata[\'gender\'] = le.fit_transform(data[\'gender\'])\n\n# 7. 收入标准化\nscaler = StandardScaler()\ndata[\'income_scaled\'] = scaler.fit_transform(data[[\'income\']])\n\nprint(data.head())`,
      },
    },
    {
      type: "text",
      content: `该实例涵盖了缺失值、重复值、异常值、格式转换、编码和标准化等核心步骤，是数据清洗的标准流程。`,
    }
    ],
  },
  {
    title: `总结`,
    content: [
    {
      type: "text",
      content: `数据清洗的核心知识点围绕识别脏数据并修正 / 删除，具体技术包含:\n\n- 缺失值: \`dropna()\` / \`fillna()\`(均值、中位数、众数)\n\n- 重复值: \`duplicated()\` / \`drop_duplicates()\`\n\n- 异常值: IQR 法、Z-score、箱线图\n\n- 格式统一: \`astype()\`、\`pd.to_datetime()\`、\`str.replace()\`、正则\n\n- 数据变换: \`MinMaxScaler\` / \`StandardScaler\`\n\n- 工具扩展: Excel 分列、快速填充；SPSS 的\`AGGREGATE\`、\`RECODE\`等。\n\n掌握这些语法和实例，能够高效处理大多数数据质量问题，为后续分析奠定可靠基础。`,
    },
    {
      type: "note",
      content: `（注：文档部分内容可能由 AI 生成）`,
    }
    ],
  }
    ],
  },
  {
    id: 'group-aggregation',
    title: `分组聚合分析`,
    subtitle: `分组聚合分析核心知识点、语法与实战举例`,
    sections: [
  {
    title: `一、核心思想：Split-Apply-Combine (拆分 - 应用 - 合并)`,
    content: [
    {
      type: "text",
      content: `分组聚合操作的本质可以用 “拆分 - 应用 - 合并” 三部曲来概括:\n\n1. 拆分 (Split): 根据指定的一个或多个键 (key), 将原始数据集拆分成若干个子小组。\n\n2. 应用 (Apply): 对每一个子小组独立地应用一个函数，这个函数可以是聚合函数 (求和、平均值)、转换函数 (标准化) 或过滤函数。\n\n3. 合并 (Combine): 将每一步 “应用” 的结果合并成一个新的、结构清晰的数据结构 (DataFrame 或 Series)。\n\n这个模式适用于所有主流分析工具，无论是 SQL 还是 Pandas, 底层逻辑完全一致。`,
    }
    ],
  },
  {
    title: `1. 基本语法与规则`,
    content: [
    {
      type: "text",
      content: `在关系型数据库中，GROUP BY 子句用于结合聚合函数，根据一个或多个列对结果集进行分组。其基本语法为:`,
    },
    {
      type: "code",
      code: {
        language: "sql",
        code: `SELECT column_name, aggregate_function(column_name)\nFROM table_name\nWHERE condition\nGROUP BY column_name;`,
      },
    },
    {
      type: "text",
      content: `核心铁律：SELECT 子句中所有未使用聚合函数的列，都必须出现在 GROUP BY 子句中。这是因为数据库在处理每个分组时，非聚合列的值可能有多个，必须明确指定按哪个字段分组才能得到唯一的汇总行。`,
    }
    ],
  },
  {
    title: `2. 常用聚合函数`,
    content: [
    {
      type: "table",
      table: {
        headers: [`函数`, `作用`, `说明`],
        rows: [[`COUNT()`, `统计行数或非空值数量`, `COUNT (\\*) 统计所有行，COUNT (列名) 忽略 NULL 值`], [`SUM()`, `计算总和`, `仅适用于数值列`], [`AVG()`, `计算平均值`, `自动忽略 NULL 值`], [`MIN()`, `计算最小值`, `可用于数值、日期、字符串`], [`MAX()`, `计算最大值`, `同上`]],
      },
    }
    ],
  },
  {
    title: `3. 典型举例`,
    content: [
    {
      type: "text",
      content: `#### 例 1: 统计每个国家的产品种类数\n\n假设有水果表 T\\_TEST\\_FRUITINFO, 包含字段 FruitName、ProductPlace、Price, 按出产国统计水果种类:`,
    },
    {
      type: "code",
      code: {
        language: "sql",
        code: `SELECT COUNT(*) AS 水果种类, ProductPlace AS 出产国\nFROM T_TEST_FRUITINFO\nGROUP BY ProductPlace;`,
      },
    },
    {
      type: "text",
      content: `这条语句将数据集按国家分组，然后对每个组统计记录数。\n\n#### 例 2: 统计每个客户的订单总金额\n\n假设有订单表 Orders (O\\_Id, OrderDate, OrderPrice, Customer):`,
    },
    {
      type: "code",
      code: {
        language: "sql",
        code: `SELECT Customer, SUM(OrderPrice) AS 总金额\nFROM Orders\nGROUP BY Customer;`,
      },
    },
    {
      type: "text",
      content: `结果会按客户名称分组，计算出每个客户的消费总额。\n\n#### 例 3: 按多列复合分组\n\n按产品和月份统计销售额:`,
    },
    {
      type: "code",
      code: {
        language: "sql",
        code: `SELECT product_id, MONTH(sale_date) AS sale_month, SUM(sales) AS total_sales\nFROM sales_table\nGROUP BY product_id, sale_month;`,
      },
    }
    ],
  },
  {
    title: `4. HAVING 筛选分组结果`,
    content: [
    {
      type: "text",
      content: `WHERE 子句在分组前过滤行，而 HAVING 子句在分组后对聚合结果进行筛选:`,
    },
    {
      type: "code",
      code: {
        language: "sql",
        code: `SELECT region, SUM(sales) AS total_sales\nFROM sales_data\nGROUP BY region\nHAVING SUM(sales) > 10000;`,
      },
    }
    ],
  },
  {
    title: `5. 执行顺序`,
    content: [
    {
      type: "text",
      content: `SQL 语句的执行顺序遵循：WHERE → GROUP BY → HAVING → ORDER BY。理解这一点有助于正确编写分组查询。`,
    }
    ],
  },
  {
    title: `三、Python Pandas 中的分组聚合`,
    content: [
    {
      type: "text",
      content: `Pandas 通过 groupby () 方法实现了极其强大灵活的分组聚合功能，语法上更贴近 “拆分 - 应用 - 合并” 的思维模式。`,
    }
    ],
  },
  {
    title: `1. 基本语法`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `DataFrame.groupby(by=None, axis=0, level=None, as_index=True, sort=True, dropna=True)`,
      },
    },
    {
      type: "text",
      content: `主要参数说明:`,
    },
    {
      type: "table",
      table: {
        headers: [`参数`, `说明`, `默认值`],
        rows: [[`by`, `分组依据，可以是列名、列名列表、函数、字典或 Series`, `None`], [`as\\_index`, `是否将分组键作为结果索引`, `True`], [`sort`, `是否对分组键排序`, `True`], [`dropna`, `是否排除包含 NaN 值的分组`, `True`]],
      },
    }
    ],
  },
  {
    title: `2. 核心操作模式`,
    content: [
    {
      type: "text",
      content: `#### 单列分组聚合:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 按部门计算平均薪资\navg_salary = df.groupby(\'Department\')[\'Salary\'].mean()`,
      },
    },
    {
      type: "text",
      content: `#### 多列分组聚合:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 按地区和部门计算平均销售额(生成分层索引)\navg_sales = df.groupby([\'Region\', \'Department\'])[\'Sales\'].mean()`,
      },
    },
    {
      type: "text",
      content: `#### 选取部分列聚合:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 两种写法等价,选取\'data1\'列按\'key1\'分组后计算均值\ngrouped1 = df[\'data1\'].groupby(df[\'key1\']).mean()\ngrouped2 = df.groupby(df[\'key1\'])[\'data1\'].mean()`,
      },
    }
    ],
  },
  {
    title: `3. 常用聚合函数`,
    content: [
    {
      type: "table",
      table: {
        headers: [`函数`, `作用`],
        rows: [[`sum()`, `计算总和`], [`mean()`, `计算平均值`], [`count()`, `计算非缺失值的数量`], [`size()`, `计算所有元素的数量 (包括缺失值)`], [`std()`, `计算标准差`], [`min()/max()`, `计算最小值 / 最大值`], [`first()/last()`, `返回每组的第一个 / 最后一个值`], [`nunique()`, `计算唯一值的数量`]],
      },
    },
    {
      type: "text",
      content: `注意:size () 与 count () 的区别在于前者包含 NaN 值，后者不包含。`,
    }
    ],
  },
  {
    title: `4. 一次计算多个统计值: .agg ()`,
    content: [
    {
      type: "text",
      content: `.agg () 方法允许对分组后的数据一次性应用多个聚合函数:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 对薪资同时计算总和、均值和标准差\nsalary_stats = df.groupby(\'Department\')[\'Salary\'].agg([\'sum\', \'mean\', \'std\'])`,
      },
    },
    {
      type: "text",
      content: `也可以对不同列分别指定不同的聚合函数:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `result = df.groupby(\'Department\').agg({\n    \'Salary\': [\'sum\', \'mean\'],\n    \'Sales\': \'max\'\n})`,
      },
    }
    ],
  },
  {
    title: `5. 分组转换: .transform ()`,
    content: [
    {
      type: "text",
      content: `transform () 方法可以在保持原始数据形状的同时进行分组计算，常用于数据标准化:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 计算每组内的z-score标准化\nz_scores = df.groupby(\'Group\')[\'Value\'].transform(\n    lambda x: (x - x.mean()) / x.std()\n)`,
      },
    }
    ],
  },
  {
    title: `6. 遍历分组`,
    content: [
    {
      type: "text",
      content: `GroupBy 对象支持迭代，产生由分组名和数据块组成的二元元组:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `for name, group in df.groupby(\'Department\'):\n    print(f"部门: {name}")\n    print(group)`,
      },
    },
    {
      type: "text",
      content: `对于多列分组，元组第一个元素是键值组成的元组:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `for (k1, k2), group in df.groupby([\'Region\', \'Department\']):\n    print(k1, k2)\n    print(group)`,
      },
    }
    ],
  },
  {
    title: `四、分组与聚合的区别`,
    content: [
    {
      type: "text",
      content: `分组是将数据按某些特征进行分类归组，目的是使数据更加有序和易于观察。\n聚合是对分组后的数据进行统计计算 (求和、平均值等), 目的是将大量数据转化为易于理解的汇总信息。\n两者通常结合使用：先分组后聚合，这也是数据分析中最常见的操作模式。`,
    }
    ],
  },
  {
    title: `1. 使用自定义聚合函数`,
    content: [
    {
      type: "text",
      content: `除了内置函数，还可以在 Pandas 中传入自定义函数:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `def range_func(x):\n    return x.max() - x.min()\n\nresult = df.groupby(\'category\')[\'value\'].agg([\'mean\', range_func, \'std\'])`,
      },
    }
    ],
  },
  {
    title: `2. 性能优化技巧`,
    content: [
    {
      type: "text",
      content: `- 使用分类数据类型 (category) 可以显著提升分组性能。\n\n- 如果不需要排序结果，设置 sort=False。\n\n- 优先使用内置聚合函数，通常比自定义函数更快。`,
    }
    ],
  },
  {
    title: `3. 常见问题`,
    content: [
    {
      type: "table",
      table: {
        headers: [`问题`, `解决方案`],
        rows: [[`分组键包含 NaN 值`, `设置 dropna=True (默认) 或先处理缺失值`], [`分组结果顺序混乱`, `设置 sort=True 确保分组键排序`], [`自定义函数性能差`, `尽量使用向量化操作或内置函数`]],
      },
    }
    ],
  },
  {
    title: `4. 使用字典 / Series 进行分组`,
    content: [
    {
      type: "text",
      content: `Pandas 还支持通过字典或 Series 进行分组映射，非常灵活:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `mapping = {\'a\': \'red\', \'b\': \'red\', \'c\': \'blue\', \'d\': \'blue\', \'e\': \'red\'}\nby_column = people.groupby(mapping, axis=1).sum()`,
      },
    }
    ],
  },
  {
    title: `总结`,
    content: [
    {
      type: "text",
      content: `分组聚合分析是数据处理的基石，无论是 SQL 还是 Pandas 都遵循着相同的 “拆分 - 应用 - 合并” 思想。SQL 的 GROUP BY 语法简洁严格，适用于数据库查询；Pandas 的 groupby 则更加灵活，提供了丰富的聚合函数、自定义聚合、分组转换等功能。掌握这些核心知识点，能够高效地从海量数据中提取出有价值的统计信息，为业务决策提供数据支持。\n\n理解分组聚合的核心不在于记住每个函数的参数，而在于建立起 “按维度拆解、按指标汇总” 的思维方式。当你面对任何需要分类统计的问题时，都应该下意识地思考三个问题：按什么分组？要算什么指标？要不要过滤分组结果？把握住这三点，分组聚合就不再是难题。`,
    },
    {
      type: "note",
      content: `（注：文档部分内容可能由 AI 生成）`,
    }
    ],
  }
    ],
  },
  {
    id: 'market-basket-analysis',
    title: `购物篮分析内容提取`,
    subtitle: `购物篮分析核心知识点、语法与实例`,
    sections: [
  {
    title: `1. 项集与事务`,
    content: [
    {
      type: "text",
      content: `在关联分析中，项集 (Itemset) 是指包含 0 个或多个项的集合。若一个项集包含 k 个项，则称为 k 项集。例如 \\{啤酒，尿布，牛奶\\} 是一个 3 - 项集。事务 (Transaction) 对应一次购物记录，通常包含一个唯一标识 (TID) 和该次购买的所有商品。购物篮数据常用二元表示：每行对应一个事务，每列对应一个商品，值为 1 表示该商品被购买，0 表示未购买。`,
    }
    ],
  },
  {
    title: `2. 支持度 (Support)`,
    content: [
    {
      type: "text",
      content: `支持度衡量某个项集在所有事务中出现的频率，反映规则的普遍性。对于规则 $X \\to Y$ , 支持度定义为:\n\n$Support(X \\to Y)=\\frac{ 同时包含 X 和 Y 的事务数 }{ 总事务数 }$\n\n例如，若总事务数为 5, 同时包含牛奶、尿布、啤酒的事务有 2 个，则支持度 =2 / 5=0.4 (或 40%)。支持度越高，说明该组合越常见。`,
    }
    ],
  },
  {
    title: `3. 置信度 (Confidence)`,
    content: [
    {
      type: "text",
      content: `置信度衡量规则的可靠性，即在前件 X 出现的前提下，后件 Y 出现的条件概率:\n\n$Confidence (X \\to Y)=\\frac{Support(X \\cup Y)}{Support(X)}=\\frac{ 同时包含 X 和 Y 的事务数 }{ 包含 X 的事务数 }$\n\n若购买牛奶、尿布的事务有 3 个，其中同时购买了啤酒的有 2 个，则置信度 =2 / 3 ≈0.67 (67%)。置信度越接近 1, 说明前件对后件的 "带动" 作用越强。`,
    }
    ],
  },
  {
    title: `4. 提升度 (Lift)`,
    content: [
    {
      type: "text",
      content: `提升度用于判断两个商品之间是正相关、负相关还是独立:\n\n$Lift(X\\to Y)=\\frac {Confidence(X\\to Y)}{Support(Y)}=\\frac {Support(X\\cup Y)}{Support(X)× Support(Y)}$\n\n- $Lift > 1$ : 正相关，购买 X 会提高购买 Y 的概率 (如啤酒与尿布)\n\n- $Lift =1$ : 独立，两者无关联\n\n- $Lift <1$ : 负相关，购买 X 反而降低购买 Y 的概率\n\n提升度是判断规则是否真正有效的关键指标，它排除了商品本身热门程度带来的干扰。`,
    }
    ],
  },
  {
    title: `5. 频繁项集与强关联规则`,
    content: [
    {
      type: "text",
      content: `- **频繁项集**: 支持度不小于最小支持度阈值 (min\\_support) 的项集。例如，设置最小支持度为 0.4, 则出现频率≥40% 的组合才被视为频繁项集。\n\n- **强关联规则**: 从频繁项集中提取出的同时满足最小置信度 (min\\_confidence) 和最低提升度 (min\\_lift) 的规则。`,
    }
    ],
  },
  {
    title: `6. Apriori 算法`,
    content: [
    {
      type: "text",
      content: `Apriori 是最经典的关联规则挖掘算法，其核心思想基于先验原理:\n如果一个项集是频繁的，则它的所有子集也一定是频繁的；反之，如果一个子集是非频繁的，则包含该子集的任何超集都是非频繁的。\n\n利用这一性质，算法通过连接 (join) 和剪枝 (prune) 两个步骤逐层生成候选集:\n\n1. 扫描数据集，得到频繁 1 - 项集 $L_{1}$\n\n2. 由 $L_{k-1}$ 连接生成候选 k - 项集 $C_{k}$\n\n3. 利用先验原理剪枝：删除 $C_{k}$ 中那些含有非频繁子集的候选集\n\n4. 再次扫描数据集，计算 $C_{k}$ 中各候选集的支持度，筛选出频繁 k - 项集 $L_{k}$\n\n5. 重复步骤 2\\~4, 直到无法生成新的频繁项集\n\nApriori 算法的优点是原理简单、易于实现；缺点是需要多次扫描事务数据库，当数据量极大时效率较低。为此，后续出现了 FP-Growth 等不产生候选集的改进算法。`,
    }
    ],
  },
  {
    title: `二、实现语法 (Python 代码示例)`,
    content: [
    {
      type: "text",
      content: `在实际工作中，最常用的 Python 工具是 mlxtend 库，它封装了 Apriori 算法和关联规则生成函数。下面给出标准的使用流程。`,
    }
    ],
  },
  {
    title: `1. 安装与导入`,
    content: [
    {
      type: "code",
      code: {
        language: "bash",
        code: `pip install mlxtend`,
      },
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import pandas as pd\nfrom mlxtend.frequent_patterns import apriori, association_rules\nfrom mlxtend.preprocessing import TransactionEncoder`,
      },
    }
    ],
  },
  {
    title: `2. 准备数据`,
    content: [
    {
      type: "text",
      content: `数据应为事务列表格式：每个元素是一个列表，代表一次购物中的商品集合。`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `transactions = [\n    [\'milk\', \'bread\', \'butter\'],\n    [\'beer\', \'diapers\', \'chips\'],\n    [\'milk\', \'bread\', \'eggs\'],\n    [\'beer\', \'chips\'],\n    [\'milk\', \'diapers\'],\n    [\'bread\', \'butter\', \'coffee\'],\n    [\'beer\', \'diapers\', \'milk\'],\n    [\'milk\', \'bread\', \'butter\', \'coffee\'],\n    [\'beer\', \'chips\', \'coffee\', \'cookies\'],\n    [\'milk\', \'diapers\', \'bread\']\n]`,
      },
    }
    ],
  },
  {
    title: `3. 转换为独热编码矩阵`,
    content: [
    {
      type: "text",
      content: `Apriori 算法要求输入为布尔型 DataFrame (即商品列，交易行为行)。`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `te = TransactionEncoder()\nte_ary = te.fit(transactions).transform(transactions)\ndf = pd.DataFrame(te_ary, columns=te.columns_)`,
      },
    }
    ],
  },
  {
    title: `4. 挖掘频繁项集`,
    content: [
    {
      type: "text",
      content: `设置最小支持度 (例如 0.25, 即 25% 的事务中包含该组合)。`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `frequent_itemsets = apriori(df, min_support=0.25, use_colnames=True)`,
      },
    }
    ],
  },
  {
    title: `5. 生成关联规则并筛选`,
    content: [
    {
      type: "text",
      content: `使用 association\\_rules 函数，指定评估指标 (如置信度) 和最小阈值。`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.6)`,
      },
    },
    {
      type: "text",
      content: `输出结果将包含每一规则的前件 (antecedents)、后件 (consequents)、支持度、置信度、提升度等列。`,
    }
    ],
  },
  {
    title: `6. 查看与排序`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `rules.sort_values(by=\'lift\', ascending=False)`,
      },
    },
    {
      type: "text",
      content: `通过调整 min\\_support、min\\_confidence 和 max\\_len 等参数，可以获得不同粒度的规则。`,
    }
    ],
  },
  {
    title: `例子：文具店购物篮分析`,
    content: [
    {
      type: "text",
      content: `某文具店收集了顾客购买订单，数据包含订单 ID 和商品名称两列。原始数据有 40055 行，经过去重和分组后得到 9646 个订单 (每个订单可能包含多件商品)。分析目标：发现哪些文具经常一起被购买，从而设计捆绑销售策略。\n\n步骤:\n\n1. 数据预处理：对每个订单的商品名称进行分组聚合，得到每个订单的商品列表。\n\n2. 设置参数：最小支持度 = 0.02 (即组合出现频率超过 2%), 最小置信度 = 0.45, 最小提升度 = 1。\n\n3. 运行 Apriori: 从订单列表中挖掘频繁项集和强关联规则。\n\n4. 结果解读 (部分规则):\n\n    - \\{订书机\\} → \\{中性笔\\}: 支持度 0.03, 置信度 0.52, 提升度 1.3\n\n    - \\{圆珠笔，便利贴\\} → \\{中性笔\\}: 支持度 0.025, 置信度 0.61, 提升度 1.5\n\n说明购买订书机的顾客有 52% 的概率也会购买中性笔 (提升度大于 1, 为正相关); 同时购买圆珠笔和便利贴的顾客更有意愿再购买中性笔。\n\n**商业启示**:\n\n- 可将订书机与中性笔捆绑销售或摆放在相邻货架。\n\n- 设计 "买圆珠笔 \\+ 便利贴，加价换购中性笔" 的促销活动。\n\n- 利用这些规则向老客户进行交叉推荐。`,
    }
    ],
  },
  {
    title: `扩展：超市购物篮分析`,
    content: [
    {
      type: "text",
      content: `使用经典的 "面包、牛奶、啤酒" 等商品，参考上述代码，设置 min\\_support=0.3,min\\_confidence=0.5, 可能得到如下的强规则:`,
    },
    {
      type: "table",
      table: {
        headers: [`前件`, `后件`, `支持度`, `置信度`, `提升度`],
        rows: [[`牛奶`, `面包`, `0.4`, `0.8`, `1.2`], [`面包`, `牛奶`, `0.4`, `0.67`, `1.0`]],
      },
    },
    {
      type: "text",
      content: `前者提升度 \\> 1, 说明牛奶对面包有促进作用；后者提升度 = 1, 说明购买面包对牛奶没有额外影响。这样的分析可以帮助超市决定促销时选择哪种商品作为 "诱饵"。`,
    }
    ],
  },
  {
    title: `四、应用场景总结`,
    content: [
    {
      type: "table",
      table: {
        headers: [`场景`, `说明`],
        rows: [[`货架布局优化`, `将频繁同时购买的商品就近摆放，方便顾客查找，提升连带销售`], [`捆绑促销设计`, `对关联度高的商品组合进行打折或满减，刺激购买量`], [`个性化推荐`, `根据顾客当前购物车中的商品推荐关联商品 (如电商 "购买此商品的顾客还购买了…")`], [`库存管理`, `基于组合销售预测，合理调配相关商品的库存，减少积压或断货`]],
      },
    }
    ],
  },
  {
    title: `五、注意事项与进阶方向`,
    content: [
    {
      type: "text",
      content: `- **参数调优**: 最小支持度设置过高会遗漏低频但有意义的组合，过低则会产生大量噪音规则。通常需要结合业务知识和数据规模多次试验。\n\n- **提升度 \\> 1 才有效**: 不要只看置信度高，有些组合 (如全脂牛奶和酸奶) 置信度可能很高，但提升度接近 1, 说明只是两者都受欢迎，并无真正关联。\n\n- **算法选择**: 对于超大规模数据集，建议使用 FP-Growth 或 Spark 的 MLlib 实现，以提升效率。\n\n- **动态分析**: 购物篮分析应结合时间维度 (如季节、节假日), 因为商品关联可能随时间变化。\n\n通过上述讲解，我们可以看到购物篮分析本质上是通过支持度、置信度、提升度这三个度量从海量交易数据中发现有商业价值的 "如果 - 那么" 规则。掌握 Apriori 算法的原理，并利用 mlxtend 等工具快速实现，是数据分析和商业运营中非常实用的技能。无论是传统零售还是电商，这种分析都能带来直接的收益提升。`,
    },
    {
      type: "note",
      content: `（注：文档部分内容可能由 AI 生成）`,
    }
    ],
  }
    ],
  },
  {
    id: 'customer-clustering',
    title: `客户聚类分析`,
    subtitle: `客户聚类分析核心知识点、语法与实战举例`,
    sections: [
  {
    title: `客户聚类分析：核心知识点、语法与实战举例`,
    content: [
    {
      type: "text",
      content: `---`,
    }
    ],
  },
  {
    title: `一、客户聚类分析概述`,
    content: [
    {
      type: "text",
      content: `客户聚类分析 (Customer Clustering) 是一种基于无监督学习的数据挖掘技术，其核心思想 是 “物以类聚”—— 将客户按照某些特征 (如消费行为、人口属性、偏好等) 划分为若干个群体，使得同一群体内的客户高度相似，不同群体之间的客户差异明显｡这种分析是客户细分 (Customer Segmentation) 的核心手段，帮助企业实现精准营销、降低获客成本、提升客户 满意度和忠诚度｡\n\n与传统的按年龄、地区等简单规则分组不同，聚类分析能自动发现数据中隐藏的模式，将客户分 为 “高价值忠实客户”“价格敏感型”“潜力新客” 等具有商业意义的群体｡其典型应用场景包 括:\n\n- 会员分层管理：识别重要保持客户、发展客户、潜在客户等｡\n\n- 个性化推荐：为不同聚类群体推荐差异化的产品或服务｡\n\n- 流失预警：通过聚类发现行为异常群体，提前干预｡\n\n- 营销活动优化：针对不同群体设计不同的优惠策略，提高 ROI｡\n\n---`,
    }
    ],
  },
  {
    title: `2.1 什么是聚类？`,
    content: [
    {
      type: "text",
      content: `聚类 (Clustering) 是将数据集中的对象划分成若干个簇 (Cluster), 使得簇内相似度最大化、簇 间相似度最小化｡它与分类 (Classification) 的关键区别在于：聚类不需要预先标注的标签，完 全是数据驱动的 “自动发现” 过程｡`,
    }
    ],
  },
  {
    title: `2.2 客户聚类的目标`,
    content: [
    {
      type: "text",
      content: `在客户分析场景中，聚类要回答以下几个业务问题:`,
    },
    {
      type: "table",
      table: {
        headers: [`业务问题`, `聚类目标`],
        rows: [[`企业如何细分客户？`, `找到具有相似消费特征的群体`], [`哪些是重要的保持客户？`, `识别高价值、高忠诚度群体`], [`哪些是发展客户？`, `识别有潜力但尚未充分激活的群体`], [`哪些是潜在客户？`, `识别当前价值低但可能转化的群体`]],
      },
    },
    {
      type: "text",
      content: `---`,
    }
    ],
  },
  {
    title: `3.1 K-Means 算法`,
    content: [
    {
      type: "text",
      content: `K-Means 是最经典、最常用的客户聚类算法，其优点是运行速度快、可处理大规模数据、易于理 解；缺点是需要预先指定簇数 K、对异常值敏感、不适合发现非凸形状的簇｡\n\n算法步骤 (迭代优化过程):\n\n1. 初始化：随机选择 K 个数据点作为初始质心 (Centroid)｡\n\n2. 分配：计算每个样本到各质心的距离 (通常用欧氏距离), 将其分配到最近的质心所在的簇｡\n\n3. 更新：重新计算每个簇内所有样本的均值，作为新的质心｡\n\n4. 重复：重复步骤 2 和 3, 直到质心不再变化或达到最大迭代次数｡\n\n数学表达：最小化簇内平方和 (Within-Cluster Sum of Squares, WCSS):\n$WCSS =\\sum_{i=1}^{k} \\sum_{x \\in C_{i}}\\left| x-\\mu_{i}\\right| ^{2}$\n其中 $C_{i}$ 是第 i 个簇，$\\mu_{i}$ 是该簇的质心｡`,
    }
    ],
  },
  {
    title: `3.2 其他聚类算法`,
    content: [
    {
      type: "table",
      table: {
        headers: [`算法`, `特点`, `适用场景`],
        rows: [[`HDBSCAN`, `DBSCAN 的升级版，自动识别簇数，高鲁棒性`, `大规模客户数据的高鲁棒性聚类`], [`DBSCAN`, `基于密度的聚类，可识别噪声点`, `数据量适中且希望自动识别噪声点`], [`层次聚类`, `可生成聚类树，直观易解释`, `数据量小且需要直观解释`]],
      },
    },
    {
      type: "text",
      content: `选择建议：数据量大 (\\>10 万) 时优先 K-Means; 数据量适中且希望自动识别噪声点可用 DBSCAN; 数据量小且需要直观解释可用层次聚类｡\n\n---`,
    }
    ],
  },
  {
    title: `四、数据预处理与特征工程`,
    content: [
    {
      type: "text",
      content: `数据质量直接决定聚类效果，以下是关键步骤:`,
    }
    ],
  },
  {
    title: `4.1 数据清洗`,
    content: [
    {
      type: "text",
      content: `- 缺失值处理：可采用均值 / 中位数填充、KNN 插值或删除高缺失率列｡例如，文档中使用 KNNImputer 填充信用卡客户数据的缺失值｡\n\n- 异常值处理：使用 Z-score 或 IQR 方法识别并处理极端值，避免扭曲聚类结果｡\n\n- 删除无用列：如客户 ID、时间戳等唯一标识列不能提供聚类信息，应提前移除｡`,
    }
    ],
  },
  {
    title: `4.2 数据标准化`,
    content: [
    {
      type: "text",
      content: `聚类算法基于距离度量，若特征量纲不同 (如 “年龄” 范围 0-100,“年收入” 范围 0-100 万), 会 导致某些特征主导距离计算｡因此必须进行标准化 (Z-score) 或归一化 (Min-Max)｡\n\n示例代码:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nscaled_data = scaler.fit_transform(raw_data)`,
      },
    }
    ],
  },
  {
    title: `4.3 RFM 特征构建 (最常用)`,
    content: [
    {
      type: "text",
      content: `RFM 模型是客户价值分析的经典框架，三个核心指标:`,
    },
    {
      type: "table",
      table: {
        headers: [`维度`, `含义`, `业务意义`],
        rows: [[`R (Recency)`, `最近一次消费时间间隔`, `R 越小，客户越活跃`], [`F (Frequency)`, `一定时期内的消费次数`, `F 越大，客户忠诚度越高`], [`M (Monetary)`, `一定时期内的消费金额`, `M 越大，客户价值越高`]],
      },
    },
    {
      type: "text",
      content: `将 RFM 作为聚类输入特征，可以自动识别出 “高价值忠实客户”(R 小、F 大、M 大)、“即将流失的 重要客户”(R 大、F 大、M 大)、“价格敏感型客户”(R 小、F 大、M 小) 等典型群体｡`,
    }
    ],
  },
  {
    title: `4.4 特征选择注意事项`,
    content: [
    {
      type: "text",
      content: `- 商业目标驱动：聚类特征应聚焦于要解决的问题｡例如，若关注消费行为，则只选用购买相 关特征，而不将性别、年龄等人口特征作为输入，否则聚类结果会被人口属性主导，失去行为 分析的价值｡\n\n- 避免特征冗余：高相关性的特征会重复加权，应进行相关性分析并剔除或合并｡\n\n- 高维数据降维：当特征维度很高时，可先用 PCA 或 t-SNE 降至 2-3 维再聚类，但需谨慎解释信息 损失｡\n\n---`,
    }
    ],
  },
  {
    title: `5.1 内部评估指标 (无真实标签时使用)`,
    content: [
    {
      type: "text",
      content: `在无监督场景下，常用以下指标评价聚类质量:`,
    },
    {
      type: "table",
      table: {
        headers: [`指标`, `计算公式要点`, `最佳值`],
        rows: [[`轮廓系数 (Silhouette Score)`, `衡量样本与自身簇的紧密度 vs. 与其他簇的分离度，范围 \\[-1,1\\]`, `越接近 1 越好`], [`Davies-Bouldin 指数`, `簇内相似度与簇间差异度的比值`, `越低越好`], [`Calinski-Harabasz 指数`, `簇间离散度与簇内离散度的比值 (方差比)`, `越高越好`], [`惯性 (Inertia)`, `各样本到质心的距离平方和 (即 WCSS)`, `越小越好，但单调递减`]],
      },
    },
    {
      type: "text",
      content: `这些指标常配合使用，避免单一指标的偏差｡例如，惯性会随 K 增大而单调递减，不能单独用于选 K｡`,
    }
    ],
  },
  {
    title: `5.2 确定最佳 K 值的方法`,
    content: [
    {
      type: "text",
      content: `- 肘方法 (Elbow Method): 计算不同 K 值下的 WCSS (惯性), 绘制折线图｡当 K 达到某个值后，WCSS 下降速度明显变缓，形成 “肘点”, 该点即为最佳 K 值｡\n\n- 轮廓系数法：选择使平均轮廓系数最大的 K 值｡\n\n- 业务经验法：根据业务可解释性选择 K 值，通常 3-5 个客户群体在营销中比较容易操作｡\n\n注意：聚类结果没有绝对的 “正确” 标准，最终需要结合商业逻辑来验证，即分出的群体是否 能在业务上被合理解释并指导行动｡\n\n---`,
    }
    ],
  },
  {
    title: `六、实战举例：基于 K-Means 和 RFM 的客户分群`,
    content: [
    {
      type: "text",
      content: `下面通过一个完整的 Python 示例演示客户聚类的流程｡本示例综合了多个文档中的方法｡`,
    }
    ],
  },
  {
    title: `6.1 模拟生成客户数据`,
    content: [
    {
      type: "text",
      content: `我们模拟三类典型客户群体：高价值客户、中等价值客户、低价值客户｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import numpy as np\nimport pandas as pd\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import silhouette_score\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# 设置随机种子\nnp.random.seed(42)\n\n# 生成500个样本,每个样本有3个RFM指标\nn = 500\n\n# 群体1:高价值客户(R小,F大,M大)\nhigh = np.random.normal(loc=[5, 40, 8000], scale=[2, 5, 1000], size=(n//3, 3))\n# 群体2:中等价值客户(R中等,F中等,M中等)\nmid = np.random.normal(loc=[20, 15, 3000], scale=[5, 3, 500], size=(n//3, 3))\n# 群体3:低价值客户(R大,F小,M小)\nlow = np.random.normal(loc=[50, 4, 500], scale=[8, 2, 200], size=(n//3, 3))\n\n# 合并并转换为DataFrame\ndata = np.vstack([high, mid, low])\ndf = pd.DataFrame(data, columns=[\'Recency\', \'Frequency\', \'Monetary\'])\nprint(df.head())`,
      },
    }
    ],
  },
  {
    title: `6.2 数据标准化`,
    content: [
    {
      type: "text",
      content: `由于三个特征量纲差异大 (Monetary 达数千，Recency 仅数十), 必须标准化:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `scaler = StandardScaler()\nscaled = scaler.fit_transform(df)\nscaled_df = pd.DataFrame(scaled, columns=df.columns)`,
      },
    }
    ],
  },
  {
    title: `6.3 确定最佳 K 值 (肘方法 \\+ 轮廓系数)`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `# 计算不同K值的WCSS和轮廓系数\nwcss = []\nsil_scores = []\nK_range = range(2, 9)\n\nfor k in K_range:\n    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)\n    kmeans.fit(scaled)\n    wcss.append(kmeans.inertia_)\n    sil_scores.append(silhouette_score(scaled, kmeans.labels_))\n\n# 绘制肘图\nfig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))\nax1.plot(K_range, wcss, \'bo-\')\nax1.set_title(\'Elbow Method\')\nax1.set_xlabel(\'K\')\nax1.set_ylabel(\'WCSS\')\n\nax2.plot(K_range, sil_scores, \'rs-\')\nax2.set_title(\'Silhouette Score\')\nax2.set_xlabel(\'K\')\nax2.set_ylabel(\'Score\')\nplt.tight_layout()\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `从图中可观察到 K=3 时肘点明显且轮廓系数最高，因此选择 K=3｡`,
    }
    ],
  },
  {
    title: `6.4 执行 K-Means 聚类`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `optimal_k = 3\nkmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)\nkmeans.fit(scaled)\ndf[\'Cluster\'] = kmeans.labels_`,
      },
    }
    ],
  },
  {
    title: `6.5 结果分析与解读`,
    content: [
    {
      type: "text",
      content: `计算各群体的 RFM 均值，并进行业务解读:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `cluster_summary = df.groupby(\'Cluster\').agg({\n    \'Recency\': \'mean\',\n    \'Frequency\': \'mean\',\n    \'Monetary\': \'mean\'\n}).round(2)\nprint(cluster_summary)`,
      },
    },
    {
      type: "text",
      content: `输出示例 (数值因随机种子而定):`,
    },
    {
      type: "table",
      table: {
        headers: [`Cluster`, `Recency`, `Frequency`, `Monetary`],
        rows: [[`0`, `49.5`, `3.8`, `480`], [`1`, `19.6`, `14.7`, `2950`], [`2`, `4.8`, `39.2`, `7950`]],
      },
    },
    {
      type: "text",
      content: `根据 RFM 特征，可定义:\n\n- Cluster 2 → 高价值忠实客户 (R 小、F 大、M 大) → 一对一 VIP 服务、定向推荐高端产品｡\n\n- Cluster 1 → 中等价值潜力客户 (R 中等、F 中等、M 中等) → 推送促销活动、交叉销售｡\n\n- Cluster 0 → 低价值沉睡客户 (R 大、F 小、M 小) → 激活策略 (优惠券、折扣) 或降低营销 投入｡`,
    }
    ],
  },
  {
    title: `6.6 可视化展示`,
    content: [
    {
      type: "text",
      content: `用 PCA 降维到 2 维，展示聚类效果:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from sklearn.decomposition import PCA\n\npca = PCA(n_components=2)\npca_coords = pca.fit_transform(scaled)\n\nplt.figure(figsize=(8,6))\nscatter = plt.scatter(pca_coords[:,0], pca_coords[:,1], c=df[\'Cluster\'], cmap=\'viridis\', alpha=0.6)\nplt.xlabel(\'PC1\')\nplt.ylabel(\'PC2\')\nplt.title(\'Customer Clustering Visualization (PCA)\')\nplt.colorbar(scatter)\nplt.show()`,
      },
    }
    ],
  },
  {
    title: `6.7 完整代码梳理`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `# 完整流程伪代码\n1. 收集客户交易数据\n2. 计算每个客户的R、F、M值\n3. 数据清洗(缺失值、异常值)\n4. 标准化(StandardScaler)\n5. 用肘方法+轮廓系数确定K\n6. 执行KMeans聚类\n7. 分析各簇RFM均值\n8. 为每个簇定义客户类型(高价值/潜力/沉睡等)\n9. 制定差异化营销策略并实施\n10. 跟踪效果并迭代优化`,
      },
    },
    {
      type: "text",
      content: `---`,
    }
    ],
  },
  {
    title: `7.1 混合策略：RFM \\+ 聚类`,
    content: [
    {
      type: "text",
      content: `很多企业的实践中，先用 RFM 模型对客户打分，再将 RFM 得分作为聚类输入｡这种组合能兼顾业 务可解释性与算法自动发现能力｡`,
    }
    ],
  },
  {
    title: `7.2 多阶段聚类`,
    content: [
    {
      type: "text",
      content: `当数据量极大时，可先随机抽样构建小样本，用复杂算法 (如 HDBSCAN) 聚类，再将结果映射到 全量数据；或者使用 Mini-Batch K-Means 加速｡`,
    }
    ],
  },
  {
    title: `7.3 时间动态聚类`,
    content: [
    {
      type: "text",
      content: `客户行为会随时间变化，建议定期重新聚类 (如每月或每季度), 并跟踪客户群体之间的转移 (例 如从 “高价值” 转移到 “沉睡”), 以便及时调整策略｡`,
    }
    ],
  },
  {
    title: `7.4 常见陷阱`,
    content: [
    {
      type: "text",
      content: `- 变量选择不当：如将性别、年龄等人口统计变量直接加入聚类，会导致结果反映的是人口结 构而非行为模式｡正确做法是将人口变量用于聚类后的群体描述，而非输入｡\n\n- 忽略数据分布：在标准化之前，应先查看特征分布，对于严重偏态的特征，可先做对数变换 或 Box-Cox 变换｡\n\n- K 值选择过于机械：不能只看统计指标，务必备业务人员共同验证聚类结果是否合理｡\n\n---`,
    }
    ],
  },
  {
    title: `八、总结`,
    content: [
    {
      type: "text",
      content: `客户聚类分析是将海量客户数据转化为可执行洞察的关键技术｡本文从核心概念、算法原理、数 据预处理、效果评估到完整代码案例，系统性地展示了如何利用 K-Means 和 RFM 模型进行客户分 群｡实际应用中，建议根据数据规模、业务需求选择最合适的算法 (大数据量用 K-Means, 不规 则形状用 DBSCAN, 需要可解释性用层次聚类), 并始终以业务价值作为评价聚类好坏的最终标 准｡\n\n通过聚类，企业能够从 “一刀切” 的营销转向 “千人千面” 的精细化运营，真正实现数据驱动的 客户管理｡未来，随着深度学习与图神经网络的发展，自动特征提取和动态聚类将成为新的趋势，但 RFM\\+K-Means 这套经典组合在绝大多数场景下依然是快速见效的首选方案｡`,
    },
    {
      type: "note",
      content: `（注：文档部分内容可能由 AI 生成）`,
    }
    ],
  }
    ],
  },
  {
    id: 'data-visualization-1',
    title: `数据可视化1`,
    subtitle: `数据可视化核心知识点、语法与实战举例`,
    sections: [
  {
    title: `1. 可视化的目的`,
    content: [
    {
      type: "text",
      content: `- **探索性分析：**快速发现数据模式､异常､分布特征｡\n\n- **解释性沟通：**以直观图形向非技术受众传达见解｡\n\n- **辅助决策：**把抽象数字转化为可感知的视觉信息｡`,
    }
    ],
  },
  {
    title: `2. 视觉编码与感知通道`,
    content: [
    {
      type: "text",
      content: `视觉编码是将数据映射为图形元素的关键过程，主要通道包括:`,
    },
    {
      type: "table",
      table: {
        headers: [`通道`, `适合数据类型`, `例子`],
        rows: [[`位置`, `所有类型`, `散点图上的坐标`], [`长度`, `数量型`, `柱状图的高度`], [`角度 / 面积`, `数量型`, `饼图､气泡图`], [`颜色 (色相 / 饱和度 / 亮度)`, `类别型 / 数量型`, `热力图､分组颜色`], [`形状`, `类别型`, `不同符号表示分组`]],
      },
    },
    {
      type: "text",
      content: `原则：人类对位置､长度最敏感，对面积､颜色渐变的判断较弱｡优先使用高精度通道 (如位置､长度)｡`,
    }
    ],
  },
  {
    title: `3. 图表类型与选择`,
    content: [
    {
      type: "table",
      table: {
        headers: [`你想展现什么`, `推荐图表`],
        rows: [[`类别间的比较`, `柱状图 (分组､堆叠)､条形图`], [`趋势变化`, `折线图､面积图`], [`数据分布`, `直方图､核密度图､箱线图､小提琴图`], [`变量关系`, `散点图､气泡图､相关矩阵热力图`], [`构成比例`, `堆叠柱状图､饼图 (慎用，尽量用条形图或环形图)`], [`地理空间`, `地图､点图､等值区域图`]],
      },
    }
    ],
  },
  {
    title: `4. 设计原则`,
    content: [
    {
      type: "text",
      content: `- 数据 - 墨水比：去除多余背景线､3D 效果､装饰性元素，让数据占据主要视觉空间｡\n\n- 明确标签：坐标轴､图例､标题必须清晰，避免歧义｡\n\n- 合理用色：分类用离散色板 (如 Set2), 连续用顺序色板 (如 Viridis), 注意色盲友好 (如使用 ColorBrewer)｡\n\n- 避免误导：坐标轴从 0 开始 (柱状图), 不随意截断；尺度统一｡`,
    }
    ],
  },
  {
    title: `5. 图形语法 (Grammar of Graphics)`,
    content: [
    {
      type: "text",
      content: `现代可视化库 (如 ggplot2､Seaborn､Plotnine) 都基于图形语法，核心要素包括:\n\n- 数据：原始 DataFrame｡\n\n- 映射 (Aesthetics): 将列映射到 x､y､颜色､大小等｡\n\n- 几何对象 (Geometry): 点､线､柱､面等｡\n\n- 分面 (Facet): 按类别拆分子图｡\n\n- 统计变换 (Stat): 求和､均值､密度估计等｡\n\n- 主题 (Theme): 样式､字体､背景｡\n\n理解图形语法能让你从 “记住函数” 升级为 “组合元素” 来创造图表｡`,
    }
    ],
  },
  {
    title: `二､数据可视化语法 (以 Python 为例)`,
    content: [
    {
      type: "text",
      content: `Python 生态中最常用的三个库，分别代表不同层次的抽象:`,
    }
    ],
  },
  {
    title: `1. Matplotlib (底层，高度可控)`,
    content: [
    {
      type: "text",
      content: `语法模式：面向对象 (fig, ax = plt.subplots ()) 或 pyplot 接口｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import matplotlib.pyplot as plt\n\n# 数据\nx = [\'A\', \'B\', \'C\', \'D\']\ny = [10, 24, 18, 30]\n\n# 创建画布与坐标轴\nfig, ax = plt.subplots()\n\n# 绘制柱状图\nax.bar(x, y, color=[\'#4C72B0\', \'#DD8452\', \'#55A868\', \'#C44E52\'])\n\n# 标签与标题\nax.set_title(\'类别销售额\', fontsize=14)\nax.set_xlabel(\'类别\')\nax.set_ylabel(\'销售额 (万元)\')\n\n# 显示\nplt.show()`,
      },
    }
    ],
  },
  {
    title: `2. Seaborn (封装 Matplotlib, 内置漂亮主题，直通图形语法)`,
    content: [
    {
      type: "text",
      content: `语法模式：直接使用 sns.\\<图表类型\\>(data=df, x=..., y=..., hue=...), 自动处理分组､颜色､统计变换｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import seaborn as sns\nimport pandas as pd\n\n# 加载示例数据\ntips = sns.load_dataset(\'tips\')\n\n# 绘制箱线图:不同日期的总账单分布,并按性别分色\nsns.boxplot(data=tips, x=\'day\', y=\'total_bill\', hue=\'sex\',\npalette=\'Set2\')\nplt.title(\'不同日期小费总账单分布\')\nplt.show()`,
      },
    }
    ],
  },
  {
    title: `3. Plotly (交互式，可缩放､悬停､导出 HTML)`,
    content: [
    {
      type: "text",
      content: `语法模式 (Plotly Express 高级接口) 与 Seaborn 类似，但生成交互图表｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import plotly.express as px\n\n# 加载鸢尾花数据\ndf = px.data.iris()\n\n# 散点图:花萼长宽关系,按种类着色\nfig = px.scatter(df, x=\'sepal_width\', y=\'sepal_length\',\ncolor=\'species\', size=\'petal_length\',\nhover_data=[\'petal_width\'],\ntitle=\'鸢尾花萼片长宽关系\')\n\nfig.show() # 默认在浏览器/ notebook 中渲染`,
      },
    }
    ],
  },
  {
    title: `三､完整举例：从分析到可视化`,
    content: [
    {
      type: "text",
      content: `假设我们有一组某超市的销售数据，包含 月份､销售额 和 利润，想完成三项任务:\n\n1. 查看每月销售额趋势 (折线图)\n\n2. 比较各产品类别利润分布 (箱线图)\n\n3. 探索销售额与利润率的关系 (散点图)`,
    }
    ],
  },
  {
    title: `数据准备 (虚构):`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `import pandas as pd\n\ndata = pd.DataFrame({\n\'月份\': [\'Jan\', \'Feb\', \'Mar\', \'Apr\', \'May\', \'Jun\'],\n\'销售额\': [120, 135, 110, 150, 170, 190],\n\'利润\': [30, 35, 28, 40, 45, 50],\n\'类别\': [\'食品\',\'食品\',\'饮料\',\'饮料\',\'日用品\',\'日用品\']\n})`,
      },
    }
    ],
  },
  {
    title: `例 1: 销售额趋势 —— Matplotlib 折线图`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `import matplotlib.pyplot as plt\n\nplt.figure(figsize=(8, 4))\nplt.plot(data[\'月份\'], data[\'销售额\'], marker=\'o\', linewidth=2, color=\'#2E86AB\')\nplt.plot(data[\'月份\'], data[\'利润\'], marker=\'s\', linewidth=2,\ncolor=\'#A23B72\')\n\nplt.title(\'月度销售趋势\')\nplt.xlabel(\'月份\')\nplt.ylabel(\'金额 (万元)\')\nplt.legend([\'销售额\', \'利润\'])\n\nplt.grid(axis=\'y\', linestyle=\'--\', alpha=0.6)\nplt.show()`,
      },
    }
    ],
  },
  {
    title: `例 2: 按类别利润分布 —— Seaborn 箱线图`,
    content: [
    {
      type: "text",
      content: `由于数据太少 (每个类别仅 2 行), 实际中需要更多样本｡这里为了展示语法，改用 Seaborn 内置的 tips 数据集:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import seaborn as sns\nimport matplotlib.pyplot as plt\n\ntips = sns.load_dataset(\'tips\')\n\nsns.boxplot(data=tips, x=\'day\', y=\'total_bill\', hue=\'sex\',\npalette=\'muted\', linewidth=1.5)\nplt.title(\'不同日子的账单金额分布(按性别)\')\n\nplt.show()`,
      },
    }
    ],
  },
  {
    title: `例 3: 销售额 vs 利润率 —— Plotly 散点图 (基于 your data)`,
    content: [
    {
      type: "text",
      content: `先计算利润率，再绘图:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import plotly.express as px\n\ndata[\'利润率\'] = (data[\'利润\'] / data[\'销售额\']) * 100\n\nfig = px.scatter(data, x=\'销售额\', y=\'利润率\',\ncolor=\'类别\',\nhover_name=\'月份\',\ntitle=\'销售额与利润率关系\',\nlabels={\'利润率\': \'利润率 (%)\'})\nfig.show()`,
      },
    },
    {
      type: "text",
      content: `这个例子同时使用了三个视觉通道 (x, y, 颜色，大小), 展示不同类别､不同月份的聚类情况｡`,
    }
    ],
  },
  {
    title: `总结`,
    content: [
    {
      type: "table",
      table: {
        headers: [`层面`, `核心内容`],
        rows: [[`知识点`, `视觉编码原理､图表选择､设计原则､图形语法`], [`语法`, `Matplotlib (精细控制)､Seaborn (统计图形 \\+ 美观)､Plotly (交互)`], [`实践`, `明确目标 → 选图 → 编码映射 → 修饰 → 输出`]],
      },
    },
    {
      type: "text",
      content: `你可以根据需求选择适合的库：快速分析用 Seaborn, 精细化报告用 Matplotlib, 分享用 Plotly｡理解背后的 “图形语法” 后，任何新库都能快速上手｡`,
    },
    {
      type: "note",
      content: `（注：文档部分内容可能由 AI 生成）`,
    }
    ],
  }
    ],
  },
  {
    id: 'data-visualization-2',
    title: `数据可视化2`,
    subtitle: `基于 Python 数据分析技术的数据可视化：核心知识点、语法与举例`,
    sections: [
  {
    title: `基于 Python 数据分析技术的数据可视化：核心知识点､语法与举例`,
    content: [
    {
      type: "text",
      content: `数据可视化是数据分析流程中连接数据与决策的桥梁，它通过图形化手段将抽象的数字转化为直观的趋势､模式和异常，从而大幅提升信息传递效率｡在 Python 生态中，由 Matplotlib､ Seaborn､Plotly 等组成的可视化工具链，能覆盖从静态报告到交互式仪表盘的各类需求｡下面将从核心知识点､基本语法和综合举例三个方面系统讲解｡\n\n---`,
    }
    ],
  },
  {
    title: `1. 常用可视化库及其定位`,
    content: [
    {
      type: "text",
      content: `- **Matplotlib**:Python 可视化的基础库，提供高度灵活的绘图 API, 支持几乎所有的 2D 图形和部分 3D 图形，适合需要精细控制每个像素的场景｡\n\n- **Seaborn**: 基于 Matplotlib 的高级封装，内置美观的默认样式和统计图表类型 (如热力图､箱线图､分类散点图), 能用简洁代码生成专业的统计图形｡\n\n- **Plotly**: 专为交互式可视化设计，生成的图表可缩放､悬停提示､下载，适合 Web 嵌入和探索性数据分析｡\n\n- **Pandas 内置绘图**: 基于 Matplotlib 的轻量封装，直接在 DataFrame 上调用\`.plot()\`即可快速绘图，适合数据探索阶段的快速预览｡`,
    }
    ],
  },
  {
    title: `2. 图表类型与选择原则`,
    content: [
    {
      type: "text",
      content: `选择合适的图表是有效表达的关键:\n\n- 折线图：展示时间序列或连续数据的趋势变化｡\n\n- 柱状图 / 条形图：比较不同类别的数值大小｡\n\n- 散点图：揭示两个连续变量之间的相关关系｡\n\n- 饼图：显示各部分占总体的比例 (类别不宜过多)\n\n- 箱线图：展示数据分布的四分位数､异常值\n\n- 热力图：用颜色矩阵反映多变量之间的相关性或频率`,
    }
    ],
  },
  {
    title: `3. 数据预处理对可视化的影响`,
    content: [
    {
      type: "text",
      content: `高质量的可视化必须基于干净的数据｡关键步骤包括:\n\n- 缺失值处理：使用\`fillna()\`填充或\`dropna()\`删除｡\n\n- 重复值处理：使用\`drop_duplicates()\`去重｡\n\n- 异常值处理：通过条件筛选或分位数截断避免图表失真｡\n\n- 类型转换与归一化：用\`astype()\`转换数据类型，用\`MinMaxScaler\`将数值缩放到统一范围，便于对比｡`,
    }
    ],
  },
  {
    title: `4. 可视化优化最佳实践`,
    content: [
    {
      type: "text",
      content: `- 添加标签和标题:\`plt.xlabel/ylabel/title\`使图表自解释\n\n- 使用网格和图例:\`plt.grid()\`和\`plt.legend()\`提升可读性\n\n- 调整颜色和样式：通过\`plt.style.use(\'seaborn\')\`或自定义配色增强美观度｡\n\n- 保存高清图:\`plt.savefig(\'figure.png\', dpi=300)\`用于报告或分享\n\n---`,
    }
    ],
  },
  {
    title: `1. Matplotlib 基础语法`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.linspace(0, 10, 100)\ny = np.sin(x)\n\n# 折线图(MATLAB风格)\nplt.plot(x, y, color=\'blue\', linestyle=\'--\', marker=\'o\', label=\'sin(x)\')\n\nplt.xlabel(\'X轴\')\nplt.ylabel(\'Y轴\')\nplt.title(\'正弦波\')\nplt.legend()\nplt.grid(alpha=0.3)\nplt.show()\n\n# 保存图片\nplt.savefig(\'sin_wave.png\', dpi=300)`,
      },
    },
    {
      type: "text",
      content: `面向对象接口:\`fig, ax = plt.subplots(); ax.plot(x, y)\`提供更灵活的子图控制｡\n常用图表:\`plt.bar()\`､\`plt.scatter()\`､\`plt.hist()\`､\`plt.pie()\``,
    }
    ],
  },
  {
    title: `2. Seaborn 高级语法`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `import seaborn as sns\nimport pandas as pd\n\n# 加载内置数据集\ntips = sns.load_dataset(\'tips\')\n\n# 散点图(自动添加回归线)\nsns.regplot(x=\'total_bill\', y=\'tip\', data=tips)\nplt.title(\'消费与小费关系\')\nplt.show()\n\n# 箱线图\nsns.boxplot(x=\'day\', y=\'total_bill\', hue=\'smoker\', data=tips)\nplt.show()\n\n# 热力图(相关性矩阵)\nsns.heatmap(tips.corr(), annot=True, cmap=\'coolwarm\')\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `核心优势：自动处理统计变换､美观的默认配色､支持\`hue\`分色`,
    }
    ],
  },
  {
    title: `3. Plotly 交互语法`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `import plotly.express as px\n\n# 散点图(交互式)\ndf = px.data.iris()\nfig = px.scatter(df, x=\'sepal_width\', y=\'sepal_length\', color=\'species\', title=\'鸢尾花数据\')\nfig.show()\n\n# 折线图\nfig = px.line(x=[1,2,3,4], y=[10,11,12,13], markers=True)\nfig.show()`,
      },
    },
    {
      type: "text",
      content: `交互特性：悬停显示数值､缩放､拖拽；适合嵌入 Jupyter Notebook 或 Dash 应用`,
    }
    ],
  },
  {
    title: `4. Pandas 内置绘图`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `# 快速绘制DataFrame\ndf = pd.DataFrame({\'A\': [1,2,3], \'B\': [4,5,6]})\ndf.plot(kind=\'line\', title=\'快速折线图\')\nplt.show()\n\n# 直方图\ndf[\'A\'].hist(bins=5)\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `本质是 Matplotlib 的简单封装，适合 EDA 阶段的快速可视化\n\n---`,
    }
    ],
  },
  {
    title: `三､综合举例：电商销售数据分析`,
    content: [
    {
      type: "text",
      content: `以下用一个电商销售数据集的典型分析流程，演示如何综合运用上述知识｡`,
    }
    ],
  },
  {
    title: `1. 数据加载与预处理`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\n# 读取数据(假设有sales_data.csv)\ndf = pd.read_csv(\'sales_data.csv\')\n# 处理缺失值(若存在)\ndf.dropna(inplace=True)\n# 将日期列转为时间类型并提取月份\ndf[\'日期\'] = pd.to_datetime(df[\'日期\'])\ndf[\'月份\'] = df[\'日期\'].dt.to_period(\'M\').astype(str)`,
      },
    },
    {
      type: "text",
      content: `此过程参考了的数据清洗方法和的日期处理技巧｡`,
    }
    ],
  },
  {
    title: `2. 折线图：展示月度销售额趋势`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `monthly = df.groupby(\'月份\')[\'销售额\'].sum().reset_index()\n\nplt.figure(figsize=(10,5))\nplt.plot(monthly[\'月份\'], monthly[\'销售额\'], marker=\'o\', color=\'#2E86AB\')\nplt.title(\'2024年月度销售额趋势\', fontsize=14)\nplt.xlabel(\'月份\')\nplt.ylabel(\'销售额(元)\')\nplt.xticks(rotation=45)\nplt.grid(alpha=0.3)\nplt.tight_layout()\nplt.savefig(\'monthly_trend.png\', dpi=300)\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `此图可直观判断销售高峰与低谷｡`,
    }
    ],
  },
  {
    title: `3. 柱状图：对比各产品类别销售额 (Seaborn 版本)`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `category_sales = df.groupby(\'产品类别\')[\'销售额\'].sum().sort_values(ascending=False).reset_index()\n\nplt.figure(figsize=(8,5))\nsns.barplot(x=\'产品类别\', y=\'销售额\', data=category_sales, palette=\'viridis\')\nplt.title(\'各产品类别销售额对比\')\nplt.xlabel(\'产品类别\')\nplt.ylabel(\'销售额\')\n# 在柱子上标注数值\nfor i, v in enumerate(category_sales[\'销售额\']):\n    plt.text(i, v+200, f\'{v:,}\', ha=\'center\')\nplt.tight_layout()\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `使用 Seaborn 自动提供美观配色，并添加数值标签增强可读性｡`,
    }
    ],
  },
  {
    title: `4. 散点图：分析广告投入与销售额关系`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.figure(figsize=(7,5))\nsns.regplot(x=\'广告费用\', y=\'销售额\', data=df, scatter_kws={\'alpha\':0.6}, line_kws={\'color\':\'red\'})\nplt.title(\'广告费用 vs 销售额(含回归线)\')\nplt.xlabel(\'广告费用(元)\')\nplt.ylabel(\'销售额(元)\')\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `通过回归线可快速判断两者是否线性相关`,
    }
    ],
  },
  {
    title: `5. 热力图：查看各数值变量相关性`,
    content: [
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.figure(figsize=(6,5))\n# 选取数值列\nnum_cols = [\'销售额\', \'订单量\', \'广告费用\']\nsns.heatmap(df[num_cols].corr(), annot=True, cmap=\'coolwarm\', fmt=\'.2f\')\nplt.title(\'数值变量相关性热力图\')\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `颜色深浅与数值共同揭示变量间的关联强度｡`,
    }
    ],
  },
  {
    title: `6. 完整流程的意义`,
    content: [
    {
      type: "text",
      content: `以上例子展示了从数据清洗到多图组合的完整链路｡实际工作中，可根据分析目标自由组合图表类型，例如用箱线图检查销售额的异常分布，或用 Plotly 制作交互式仪表盘供团队协作｡Python 可视化生态的灵活性使得我们既能用几行代码快速出图，也能通过精细调参产出出版级图表｡\n\n通过掌握上述核心知识点､语法和典型举例，你可以系统性地利用 Python 进行高效的数据分析与可视化，从而更好地从数据中提取价值｡`,
    },
    {
      type: "note",
      content: `（注：文档部分内容可能由 AI 生成）`,
    }
    ],
  }
    ],
  },
  {
    id: 'financial-visualization',
    title: `财务数据可视化`,
    subtitle: `财务数据可视化核心知识点、语法与实战举例`,
    sections: [
  {
    title: `Matplotlib 简介`,
    content: [
    {
      type: "text",
      content: `Matplotlib 是 Python 的第三方绘图库，仅需几行代码，就能够生成各种格式的图形 (如：折线图､散点图､柱状图等等)｡使用 Matplotlib 生成的图形质量较高，甚至可以达到出版级别｡\n\n#### 执行步骤\n\n第一步：打开开始菜单中 “命令提示符”(快捷键 win\\+R)\n第二步：在命令提示符中输入如下代码`,
    },
    {
      type: "code",
      code: {
        language: "Plain Text",
        code: `pip3 install matplotlib`,
      },
    },
    {
      type: "text",
      content: `#### 引入规则\n\nMatplotlib 最核心的模块是 pyplot 模块，几乎所有的 2D 图形都是通过该模块绘制，pyplot 模块约定别名为 plt｡pyplot 模块引入规则:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from matplotlib import pyplot as plt`,
      },
    }
    ],
  },
  {
    title: `Matplotlib 初级应用`,
    content: [
    {
      type: "text",
      content: `#### 设置字体\n\nmatplotlib 默认情况不支持中文，可以使用以下简单的方法来解决｡ 函数语法如下:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.rcParams[\'font.family\']=[\'Microsoft YaHei\']`,
      },
    },
    {
      type: "text",
      content: `因为 matplotlib 默认字体中是没有中文的，所以当我们使用中文做图形标签时，将会无法显示，会显示□□｡解决这个问题需要在代码中加入如上语句｡\n\n#### 创建画布\n\n\`figure()\`函数：构建一张新的空白画布 (返回一个 figure 对象), 函数语法如下:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.figure(num=None,figsize=None,dpi=None,facecolor=None,edgecolor=None,frameon=True,FigureClass=Figure,clear=False,**kwargs)`,
      },
    },
    {
      type: "text",
      content: `figure () 函数常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`num`, `图像编号或名称，数字为编号，字符串为名称，是图形的唯一标识符`], [`figsize`, `指定 figure 的宽和高，单位为英寸`], [`dpi`, `指定绘图对象的分辨率`], [`facecolor`, `背景颜色，默认白色`]],
      },
    },
    {
      type: "text",
      content: `**例 4-1-1**: 创建一个编号为 “1”､宽度为 9､高度均为 5､分辨率为 100 的画布｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from matplotlib import pyplot as plt \nplt.figure(num="1",figsize=(9,5),dpi=100)`,
      },
    },
    {
      type: "text",
      content: `运行结果如下:`,
    },
    {
      type: "code",
      code: {
        language: "Plain Text",
        code: `<Figure size 900x500 with 0 Axes>`,
      },
    },
    {
      type: "text",
      content: `分辨率，又称解析度､解像度，可以细分为显示分辨率､图像分辨率､打印分辨率和扫描分辨率等｡通常情况下，图像的分辨率越高，所包含的像素就越多，图像就越清晰，印刷的质量也就越好｡同时，它也会增加文件占用的存储空间｡Figure size 900x500 则表明系统后台已建立一张分辨率为 900×500 的画布\n\n#### 创建子图\n\n\`subplot()\`函数：创建子图 (即创建一个 n 行 m 列的 axes 对象), 并选择绘图区域｡\n语法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.subplot(nrows,ncols,index)`,
      },
    },
    {
      type: "text",
      content: `- nrows､ncols: 子图的行数和列数，表示绘图区域被分为 n 行 m 列；\n\n- index: 子图索引，表示当前绘图区，子图按照从左到右､从上往下的顺序进行索引编号，编号从 1 开始\n\n**例 4-1-2**: 在例 4-1-1 创建的画布上创建 2 行 3 列的子图｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from matplotlib import pyplot as plt \nplt.figure(num="1",figsize=(9,5),dpi=100) \nplt.subplot(2,3,1) \nplt.subplot(2,3,3) \nplt.subplot(2,3,5)`,
      },
    },
    {
      type: "text",
      content: `运行结果\n注意：使用 subplot 可以规划 figure 划分 n 个子图，但每条 subplot 命令只会创建一个子图｡\n\n#### 添加画布内容\n\n添加画布内容是绘图的主体部分，首先，要确定 x､y 轴的数据及绘图类型，在 Matplotlib 中，大部分图形样式的绘制方法都存在于 pyplot 模块中，较常用图形如表所示:`,
    },
    {
      type: "table",
      table: {
        headers: [`图形`, `说明`, `图形`, `说明`],
        rows: [[`plt.plot()`, `折线图`, `plt.pie()`, `饼状图`], [`plt.scatter()`, `散点图`, `plt.area()`, `面积图`], [`plt.bar()`, `柱状图`, `plt.stackplot()`, `堆叠图`], [`plt.hist()`, `直方图`, `plt.boxplot()`, `箱线图`]],
      },
    },
    {
      type: "text",
      content: `确定 x､y 轴的数据及绘图类型后，即可设置图形的标题，x､y 轴的标签､刻度､范围等，最后添加图例｡ 各类标签及图例常用函数如表所示:`,
    },
    {
      type: "table",
      table: {
        headers: [`函数`, `说明`, `函数`, `说明`],
        rows: [[`plt.title()`, `设置图像标题`, `plt.xlim()`, `设置 x 轴范围`], [`plt.xlabel()`, `设置 x 轴名称`, `plt.ylim()`, `设置 y 轴范围`], [`plt.ylabel()`, `设置 y 轴名称`, `plt.xticks()`, `设置 x 轴刻度`], [`plt.legend()`, `设置图例`, `plt.yticks()`, `设置 y 轴刻度`]],
      },
    },
    {
      type: "text",
      content: `#### 保存与显示图形`,
    },
    {
      type: "table",
      table: {
        headers: [`函数`, `说明`],
        rows: [[`plt.savefig()`, `保存绘制的图形`], [`plt.show()`, `显示图形`]],
      },
    },
    {
      type: "text",
      content: `保存与显示函数：`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `import matplotlib.pyplot as plt \n""" 一些画图代码 """ \n# 语法\nplt.savefig("filename.png") \nplt.show()`,
      },
    },
    {
      type: "text",
      content: `如果需要保存图片，必须在\`plt.show()\`之前调用\`plt.savefig()\`, 这是由于调用\`plt.show()\`后会创建一个新的空白图片，在其后调用\`plt.savefig()\`将会保存新的空白图片｡`,
    }
    ],
  },
  {
    title: `初级绘图`,
    content: [
    {
      type: "text",
      content: `**例 4-1-3**: 甲公司 2020 年 1-5 月份销售额依次为 45000 元､38000 元､54000 元､55000 元､48000 元，使用 pyplot 模块绘制 1-5 月销售额柱状图`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from matplotlib import pyplot as plt \n# 步骤一:创建画布 \nplt.figure(figsize=(5,3),dpi=120)\n\n# 步骤二:创建绘图区(只有一个绘图区时可省略) \nplt.subplot(1,1,1)\n\n# 步骤三:指定数据和图形(x轴为月份,y轴为销售额) \nx = [1,2,3,4,5] \ny = [45000,38000,54000,55000,48000] \nplt.bar(x,y,width=0.5)\n\n# 步骤四:添加标签 \nplt.xlabel(\'月\') \nplt.ylabel(\'销售额\') \nplt.title(\'1-5月销售额\')\n\n# 步骤五:保存图形 \nplt.savefig(\'1-5月销售额.png\')\n\n# 步骤六:显示图形 \nplt.show()`,
      },
    },
    {
      type: "text",
      content: `运行结果：1-5 月销售额柱状图`,
    }
    ],
  },
  {
    title: `matplotlib 可视化绘图 - 绘制折线图`,
    content: [
    {
      type: "text",
      content: `折线图是最基本的图形，由线条组成｡\`plot()\`函数用于绘制折线图｡\n语法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.plot(x, y, scalex=True, scaley=True, data=None, **kwargs)`,
      },
    },
    {
      type: "text",
      content: `折线图 plot () 函数常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`**常用参数**`, `**说明**`],
        rows: [[`x,y`, `表示 x、y 轴数据，接收数组、列表、元组等`], [`scalex,scaley`, `是否自动缩放 x、y 轴，默认为 True`], [`data`, `可索引对象 (如:dict、DataFrame), 如果给定 data, 则只需提供在 x、y 中绘制的标签名称，如以 DataFrame 中的列作为 x、y 轴数据`], [`color(c)`, `设置折线颜色，接收字符串`], [`marker`, `设置线条上标记点的样式，默认 None, 接收字符串`], [`linestyle(ls)`, `设置线型的样式，默认实线 \'-\', 接收字符串`], [`linewidth(lw)`, `设置线型的宽度，接收数值`], [`alpha`, `设置线型的透明度，0.0-1.0 之间`], [`label`, `图例内容，接收字符串`]],
      },
    },
    {
      type: "text",
      content: `#### 常用参数详情\n\n##### 颜色参数`,
    },
    {
      type: "table",
      table: {
        headers: [`**color 参数设置**`, `**颜色**`, `**对应十六进制颜色码**`],
        rows: [[`color=\'b\'`, `蓝 (blue)`, `color=\'\\#0000FF\'`], [`color=\'g\'`, `绿 (green)`, `color=\'\\#008000\'`], [`color=\'r\'`, `红 (red)`, `color=\'\\#FF0000\'`], [`color=\'w\'`, `白 (white)`, `color=\'\\#FFFFFF\'`], [`color=\'m\'`, `洋红 (magenta)`, `color=\'\\#FF00FF\'`], [`color=\'y\'`, `黄 (yellow)`, `color=\'\\#FFFF00\'`], [`color=\'k\'`, `黑 (black)`, `color=\'\\#000000\'`], [`color=\'c\'`, `青 (cyan)`, `color=\'\\#00FFFF\'`]],
      },
    },
    {
      type: "text",
      content: `##### 线型参数`,
    },
    {
      type: "table",
      table: {
        headers: [`**linestyle 参数设置**`, `**线型**`],
        rows: [[`linestyle=\'-\'`, `默认实线`], [`linestyle=\'--\'`, `虚线`], [`linestyle=\'-.\'`, `点划线`], [`linestyle=\':\'`, `点状线`]],
      },
    },
    {
      type: "text",
      content: `##### 标记点参数`,
    },
    {
      type: "table",
      table: {
        headers: [`**marker 参数设置**`, `**标记点**`, `**marker 参数设置**`, `**标记点**`],
        rows: [[`marker=\'.\'`, `实心点`, `marker=\'\\+\'`, `加号`], [`marker=\'s\'`, `正方形`, `marker=\'v\'`, `一角朝下三角形`], [`marker=\'o\'`, `圆圈`, `marker=\'^\'`, `一角朝上三角形`], [`marker=\'\\*\'`, `星号`, `marker=\'D\'`, `菱形`], [`marker=\'p\'`, `五边形`, `marker=\'H\'`, `六边形`]],
      },
    },
    {
      type: "text",
      content: `#### 绘制折线图示例\n\n**例 4-1-4**: 读取 data.xlsx 文件，根据 “资产负债表项目” 和 “利润表项目” 计算各期毛利率､营业净利率､权益净利率､总资产净利率，并筛选 2020 年相关指标｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 引入pandas\nimport pandas as pd\n# 读取资产负债表项目 \ndf1 = pd.read_excel(r\'https://keyun-oss.acctedu.com/app/bigdata/basics/data.xlsx\',sheet_name = 0)\n# 读取利润表项目\ndf2 = pd.read_excel(r\'https://keyun-oss.acctedu.com/app/bigdata/basics/data.xlsx\',sheet_name = 1)\n# 调用merge函数连接df1､df2\ndf3 = pd.merge(df1,df2)\n# 指标计算 \ndf3[\'权益净利率\'] = df3[\'净利润\']/df3[\'平均所有者权益\'] \ndf3[\'毛利率\'] = (df3[\'营业收入\']-df3[\'营业成本\'])/df3[\'营业收入\'] \ndf3[\'营业净利率\'] = df3[\'净利润\']/df3[\'营业收入\'] \ndf3[\'总资产净利率\'] = df3 [\'净利润\']/(df3[\'平均流动资产\']+df3[\'平均非流动资产\'])\n# 创建df_2020(2020年财务指标统计) \ndf_2020 = df3.loc[df3[\'年\']==2020,[\'年\',\'月\',\'营业收入\',\'毛利率\',\'营业净利率\',\'权益净利率\',\'总资产净利率\']]\ndf_2020`,
      },
    },
    {
      type: "text",
      content: `注意：URL 地址可以单独定义为变量，方便切换不同数据源｡Pandas 中 Merge 函数可以简单的将同索引数据合并在一起｡但如果数据索引不一致，则需要用到 DataFrame 中的 set\\_index 函数重新设置索引｡\n\n运行结果：2020 年财务指标数据`,
    },
    {
      type: "table",
      table: {
        headers: ['', `年`, `月`, `营业收入`, `毛利率`, `营业净利率`, `权益净利率`, `总资产净利率`],
        rows: [[`12`, `2020`, `1`, `345700`, `0.3846`, `0.1950`, `0.029588`, `0.012658`], [`13`, `2020`, `2`, `388000`, `0.3720`, `0.1910`, `0.031702`, `0.013714`], [`14`, `2020`, `3`, `354780`, `0.3846`, `0.1984`, `0.029403`, `0.012913`], [`15`, `2020`, `4`, `372300`, `0.3750`, `0.1927`, `0.029267`, `0.013395`], [`16`, `2020`, `5`, `322000`, `0.4555`, `0.2706`, `0.034562`, `0.016008`], [`17`, `2020`, `6`, `384200`, `0.3815`, `0.1959`, `0.029158`, `0.013480`], [`18`, `2020`, `7`, `401200`, `0.3631`, `0.1744`, `0.026531`, `0.010587`], [`19`, `2020`, `8`, `424000`, `0.3715`, `0.1865`, `0.029282`, `0.011728`], [`20`, `2020`, `9`, `392000`, `0.3855`, `0.1997`, `0.028331`, `0.011453`], [`21`, `2020`, `10`, `354820`, `0.3776`, `0.1945`, `0.024487`, `0.010089`], [`22`, `2020`, `11`, `343500`, `0.3550`, `0.1729`, `0.020724`, `0.008573`], [`23`, `2020`, `12`, `401200`, `0.3418`, `0.1560`, `0.021464`, `0.008931`]],
      },
    },
    {
      type: "text",
      content: `**例 4-1-5**: 根据例 4-1-4 中 2020 年 “毛利率” 和 “营业净利率” 指标绘制折线图｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 创建画布 \nplt.figure(figsize=(8,4),dpi=100)\n# 指定数据 \nplt.plot(df_2020[\'月\'],df_2020[\'毛利率\'],label=\'毛利率\', linewidth=2,marker=\'s\') \nplt.plot(df_2020[\'月\'],df_2020[\'营业净利率\'],label=\'营业净利率\', linewidth=2,marker=\'s\')\n# 设置标签､标题 \nplt.xlabel(\'月\') \nplt.ylabel(\'比率\') \nplt.title(\'2020毛利率&营业净利率\') \nplt.xticks(df_2020[\'月\']) \nplt.legend()\n# 显示图形 \nplt.show()`,
      },
    }
    ],
  },
  {
    title: `绘制柱状图`,
    content: [
    {
      type: "text",
      content: `柱状图也称为条形图，是一种以长方形长度为变量的表达图形的统计报告图，由一系列高度不等的纵向条纹表示数据分布的情况，用来比较两个或者两个以上的数值｡\n\n\`bar()\`函数：绘制柱状图。语法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.bar(x,height, width =0.8 , bottom=None, *, align=\'center\', data=None,**kwargs)`,
      },
    },
    {
      type: "text",
      content: `柱状图 bar () 函数常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`x`, `x 轴数据，接收数组、列表、元组等`], [`height`, `柱状的高度，即 y 轴数值，接收数组、列表、元组等`], [`width`, `柱状的宽度，默认 0.8`], [`bottom`, `设置 y 边界坐标轴起点`], [`align`, `柱状与 x 坐标的对齐方式，默认值 \'center\', 表示居中位置，align=\'edge\' 表示边缘位置`], [`data`, `可索引对象 (如:dict、DataFrame)`], [`color、edgecolor(ec)`, `柱状填充颜色、图形边缘颜色`], [`alpha`, `设置柱状的透明度，0.0-1.0 之间`], [`label`, `图例内容，接收字符串`]],
      },
    },
    {
      type: "text",
      content: `说明：绘制垂直方向的柱形图可以用\`barh()\`函数，\`barh()\`函数比\`bar()\`函数名称重多了一个 h, 是英文单词 horizontal (水平) 的首字母。\n\n#### 绘制柱状图示例\n\n**例 4-1-6**: 根据例 4-1-4 中 2020 年 “权益净利率” 和 “总资产净利率” 指标绘制柱状图，图形并列显示｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 创建画布 \nplt.figure(figsize=(8,4),dpi=100)\n# 指定数据 \nplt.bar(df_2020[\'月\']-0.2,df_2020[\'权益净利率\'],label=\'权益净利率\', width=0.4) # x-0.2:防止图形重合 \nplt.bar(df_2020[\'月\']+0.2,df_2020[\'总资产净利率\'],label=\'总资产净利率\', width=0.4) # x+0.2:防止图形重合\n# 设置标签､标题 \nplt.xlabel(\'月\') \nplt.ylabel(\'比率\') \nplt.title(\'2020权益净利率&总资产净利率\') \nplt.xticks(df_2020[\'月\']) \nplt.legend()\n# 显示图形 \nplt.show()`,
      },
    },
    {
      type: "text",
      content: `运行结果：2020 权益净利率 \\& 总资产净利率柱状图`,
    }
    ],
  },
  {
    title: `绘制饼状图`,
    content: [
    {
      type: "text",
      content: `饼图用于表示不同分类的占比情况，通过弧度大小来对比各种分类，饼图通过将一个圆饼按照分类的占比分成多个区块，整个圆饼代表数据的总量，每个区块 (圆弧) 表示该分类占总体比例大小｡\n\n饼图 pie () 函数常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`x`, `绘图数据，饼图每一部分的比例，接收数组、列表、元组，如果 sum (x)\\>1 则使用 sum (x) 归一化 (即计算各项百分比)`], [`explode`, `指定每一部分偏移中心的距离 (以半径为 1, 按占半径的比例设置), 接收列表或元组`], [`labels`, `设置标签，接收列表或元组`], [`colors`, `设置饼图颜色，接收列表或元组`], [`autopct`, `设置饼图每一部分百分数格式，如:\'%.2f%\'(百分数保留 2 位小数)`], [`shadow`, `是否显示阴影，默认 False`], [`radius`, `设置饼图半径，默认值为 1`], [`labeldistance`, `标签位置相对于半径的比例，默认值为 1.1`], [`pctdistance`, `饼图百分数显示位置相对于半径的比例，默认值为 0.6`]],
      },
    },
    {
      type: "text",
      content: `#### 绘制饼状图示例\n\n**例 4-1-7**: 根据例 4-1-4 中 2020 年 “营业收入” 指标绘制饼图｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 创建画布 \nplt.figure(figsize=(5,5),dpi=100) \n# 指定数据 \nplt.pie(df_2020[\'营业收入\'],labels=df_2020[\'月\'],autopct=\'%.2f%%\') \n# 设置标题 \nplt.title(\'2020营业收入\') \n# 显示图形 \nplt.show()`,
      },
    },
    {
      type: "text",
      content: `运行结果：2020 营业收入饼图`,
    }
    ],
  },
  {
    title: `绘制组合图形`,
    content: [
    {
      type: "text",
      content: `**例 4-1-8**: 将多个图形组合在一起。`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 创建画布 \nplt.figure(figsize=(12,9)) \n# 创建折线图绘图区并绘制图形 \nplt.subplot(2,1,1) \nplt.plot(df_2020[\'月\'],df_2020[\'毛利率\'],label=\'毛利率\', linewidth=2,marker=\'s\') \nplt.plot(df_2020[\'月\'],df_2020[\'营业净利率\'],label=\'营业净利率\', linewidth=2,marker=\'s\') \nplt.xlabel(\'月\') \nplt.ylabel(\'比率\') \nplt.title(\'2020财务指标对比\') \nplt.xticks(df_2020[\'月\']) \nplt.legend()\n\nplt.subplot(2,1,2)\nplt.bar(df_2020[\'月\']-0.2,df_2020[\'权益净利率\'],label=\'权益净利率\', width=0.4)\nplt.bar(df_2020[\'月\']+0.2,df_2020[\'总资产净利率\'],label=\'总资产净利率\', width=0.4)\nplt.xlabel(\'月\')\nplt.ylabel(\'比率\')\nplt.xticks(df_2020[\'月\'])\nplt.legend()\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `#### subplots () 函数\n\n\`subplots()\`函数：快速创建多子图环境，将画布分为 n 行 m 列的绘图空间，返回一个 figure 和多个 axes (列表), 需要两个变量分别接收，选择区域时使用子图的列表索引进行访问，子图索引从 0 开始｡\n\n语法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `plt.subplots(nrows,ncols,sharex=False,sharey=False,squeeze=True,subplot_kw=None, gridspec_kw=None,**fig_kw)`,
      },
    },
    {
      type: "text",
      content: `- nrows､ncols: 子图的行数和列数，表示绘图区域被分为 n 行 m 列；\n\n- sharex､sharey: 是否共享 x 轴或 y 轴，默认 False 代表子图的 x､y 轴独立；\n\n- \\*\\*fig\\_kw:figure 函数的参数都可以使用，如 figsize｡\n\n**例 4-1-9**: 使用 subplots () 函数将例 4-1-5 绘制的折线图和例 4-1-6 绘制的柱状图组合在一起｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 创建子图,共享x､y轴\nfig,ax = plt.subplots(2,1,sharex=True,figsize=(12,9))\n# 绘制折线图\nax[0].plot(df_2020[\'月\'],df_2020[\'毛利率\'],label=\'毛利率\', linewidth=2,marker=\'s\')\nax[0].plot(df_2020[\'月\'],df_2020[\'营业净利率\'],label=\'营业净利率\', linewidth=2,marker=\'s\')\nax[0].set_title(\'2020财务指标对比\')\nax[0].legend()\n\n# 绘制柱状图\nax[1].bar(df_2020[\'月\']-0.2,df_2020[\'权益净利率\'],label=\'权益净利率\', width=0.4)\nax[1].bar(df_2020[\'月\']+0.2,df_2020[\'总资产净利率\'],label=\'总资产净利率\', width=0.4)\nplt.show()`,
      },
    },
    {
      type: "text",
      content: `#### subplot () 与 subplots () 对比`,
    },
    {
      type: "table",
      table: {
        headers: [`subplot () 函数`, `subplots () 函数`],
        rows: [[`需要先创建画布，再创建子图，并且每次只能返回一个坐标对象，绘图时，每次都要调用 subplot 指定位置｡`, `在创建画布时，会一次性建立所有子图 axes, 后续直接调用 axes 对象即可，使用该方法可以直接规划画布 (指定画布大小等)｡`]],
      },
    },
    {
      type: "text",
      content: `注意：\`plt.subplot(2,1,1)\`会将原始的图像切割成 2 个子图像，是 2 行 1 列，并将现在的操作位置转到第一个子图上，这样便实现了绘制子图的方法。在确定子图编号时 subplot () 从 1 开始，subplots () 从 0 开始。`,
    }
    ],
  },
  {
    title: `pandas 作图函数 - plot`,
    content: [
    {
      type: "text",
      content: `Pandas 提供了\`plot()\`绘图函数，可以绘制多种图形样式，相比于 Matplotlib, 可以直接对 DataFrame 调用该函数，并且函数中集成了 x､y 轴数据､图形标题､图例､样式等参数，代码比 Matplotlib 简洁许多｡\n\n注意：使用 Pandas 作图内部依赖于 Matplotlib, 因此在使用 plot () 之前，必须引入 Matplotlib 库。\n\nplot () 函数语法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `DataFrame.plot(x=None,y=None,kind=\'line\',ax=None,subplots=False,sharex=None,sharey=False,layout=None,figsize=None,use_index=True,title=None,grid=None,legend=True,style=None,logx=False,logy=False,loglog=False,xticks=None,yticks=None,xlim=None,ylim=None,rot=None,secondary_y=False,sort_columns=False,**kwargs)`,
      },
    },
    {
      type: "text",
      content: `plot () 绘图函数常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`参数`, `说明`],
        rows: [[`x`, `指定 x 轴上显示的数据列，默认使用行索引`], [`y`, `指定 y 轴上显示的数据列，默认所有数值型数据列`], [`kind`, `绘图类型，默认为折线图 "line", 可选参数有: "barh"(水平条形图)、"hist"(直方图)、"kde"(密度估计图)、"area"(面积图)、scatter"(散点图)、"hexbin" (蜂巢图)`], [`ax`, `选择子绘图区域，默认 None`], [`subplots`, `是否按列绘制子图，默认 False`], [`sharex`, `共享 x 轴，如果 ax=None 则默认为 True, 否则为 False`], [`sharey`, `共享 y 轴，默认为 False`], [`layout`, `子图的行列布局，元组形式 (行，列)`], [`figsize`, `图形尺寸大小，元组形式 (宽度，高度)`], [`use\\_index`, `用索引做 x 轴，默认为 True`], [`title`, `图形的标题，字符串或列表，若传递字符串则在图顶；传递列表且含有子图，则依次在每个子图顶部打印`], [`grid`, `图表是否有网格，默认 None`], [`legend`, `子图的图例显示，默认为 True, 可选 \'reverse\', 颠倒图例顺序`], [`style`, `对每列折线图设置线的样式，列表或字典`], [`logx`, `设置 x 轴刻度是否取对数，默认 False`], [`logy`, `设置 y 轴刻度是否取对数，默认 False`], [`loglog`, `同时设置 x、y 轴刻度是否取对数，默认 False`], [`xticks`, `设置 x 轴刻度，使用序列形式 (如列表)`], [`yticks`, `设置 y 轴刻度，使用序列形式 (如列表)`], [`xlim`, `设置 x 轴的数值范围，使用列表或元组形式`], [`ylim`, `设置 y 轴的数值范围，使用列表或元组形式`], [`rot`, `设置轴标签 (轴刻度) 的显示旋转度数，默认 None`], [`secondary\\_y`, `设置第二个 y 轴 (右 y 轴), 默认 False, 也可以列表或元组形式指定列`], [`sort\\_columns`, `对列名称进行排序以确定绘图顺序，默认为 False 不排序`], [`\\*\\*kwargs`, `在 matplotlib 绘图方法中相关参数都可以在此函数中使用，如 color、linestyle、linewidth、marker 等`]],
      },
    },
    {
      type: "text",
      content: `#### pandas 作图示例\n\n**例 4-1-10**: 根据例 4-1-4 中 2020 年毛利率､营业净利率､权益净利率､总资产净利率指标进行可视化展示，绘制折线图，并针对权益净利率､总资产净利率指标设置右 y 轴｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 折线图 \ndf_2020.plot(\'月\',[\'毛利率\',\'营业净利率\',\'权益净利率\',\'总资产净利率\'], secondary_y=[\'权益净利率\',\'总资产净利率\'],linewidth=2, marker=\'s\',title=\'2020年盈利能力指标统计\',figsize=(12,5));`,
      },
    },
    {
      type: "text",
      content: `运行结果：2020 年盈利能力指标统计折线图\n\n**例 4-1-11**: 根据例 4-1-4 中 2020 年权益净利率､总资产净利率指标绘制柱状图｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 柱状图 \ndf_2020.plot(\'月\',[\'权益净利率\',\'总资产净利率\'],kind=\'bar\', title=\'2020年权益净利率&总资产净利率\', figsize=(12,4),rot=0);`,
      },
    },
    {
      type: "text",
      content: `运行结果：2020 年权益净利率 \\& 总资产净利率柱状图\n\n**例 4-1-12**: 根据例 4-1-10 和例 4-1-11 可视化结果，绘制组合图形｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 创建子图\nfig,ax = plt.subplots(2,1,figsize=(12,10))\n# 绘制“2020年盈利能力指标统计”\ndf_2020.plot(\'月\',[\'毛利率\',\'营业净利率\',\'权益净利率\',\'总资产净利率\'],\nsecondary_y=[\'权益净利率\',\'总资产净利率\'],linewidth=2,\nmarker=\'s\',title=\'2020年盈利能力指标统计\',ax=ax[0])\n# 绘制“2020年权益净利率&总资产净利率”\ndf_2020.plot(\'月\',[\'权益净利率\',\'总资产净利率\'],\nkind=\'bar\',ax=ax[1],rot=0,\ntitle=\'2020年权益净利率&总资产净利率\');`,
      },
    },
    {
      type: "text",
      content: `运行结果：组合图形展示`,
    }
    ],
  },
  {
    title: `小结`,
    content: [
    {
      type: "text",
      content: `- matplotlib 绘图流程：创建画布→选定子图绘制图形→添加图例→保存图形→显示图形\n\n- figure: 创建空白画布，一个画布中包含一个或多个坐标系 (Axes), 每个 Axes 都是一个绘图区域\n\n- subplot: 创建子图并选择绘图区域\n\n- subplots: 快速创建多子图环境，需要两个变量分别接收\n\n- 其他常用函数:title、label、tick、legend 等\n\n- 常用绘图函数:plot、bar、pie 等\n\n- 作图函数 - plot: Pandas 快速作图函数，通过参数可绘制各种图形\n\nmatplotlib 官网:[https://matplotlib.org](https://matplotlib.org)\n\n---`,
    }
    ],
  },
  {
    title: `Pyecharts 简介`,
    content: [
    {
      type: "text",
      content: `Echarts (Enterprise Charts, 即商业级数据图表), 是一个由百度开源的数据可视化库，凭借着良好的交互性､精巧的图表设计，得到了众多开发者的认可｡Echarts 除了支持常规的折线图､柱状图､饼图等基本图形外，还支持树形图､地理图､3D 图以及组合图形｡\n\nPyecharts 支持图表类型有很多种，包括基本图表､直角坐标系图表､树型图表､地理图表､3D 图表､组合图表等｡\n\n安装 Pyecharts 库，执行步骤如下:\n第一步：打开 “命令提示符”(快捷键 win\\+R)\n第二步：在命令提示符中输入代码:`,
    },
    {
      type: "code",
      code: {
        language: "Plain Text",
        code: `pip3 install Pyecharts`,
      },
    }
    ],
  },
  {
    title: `Pyecharts 初级应用`,
    content: [
    {
      type: "text",
      content: `Pyecharts 的使用流程：\n\n1. 初始化具体类型图表\n\n2. 使用 add () 方法添加数据及配置项\n\n3. 使用 render () 生成图形 (.html 文件)\n\n4. 使用 render\\_notebook () 在 notebook 中展示图形\n\n图表类引入:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from pyecharts.charts import 图表类名`,
      },
    },
    {
      type: "text",
      content: `**例 4-2-1**: 甲公司 2020 年 1-5 月份收入金额依次为 45000 元､38000 元､54000 元､55000 元､48000 元，成本金额依次为 31500 元､28500 元､38880 元､40700 元､35520 元｡使用 Pyecharts 绘制 1-5 月收入成本对比图 (图表类型为柱状图)｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 初始化图表类型 \nfrom pyecharts.charts import Bar \nbar1 = Bar()\n# 添加数据 \nbar1.add_xaxis([\'1月\',\'2月\',\'3月\',\'4月\',\'5月\']) \nbar1.add_yaxis(\'收入\',[45000,38000,54000,55000,48000]) \nbar1.add_yaxis(\'成本\',[31500,28500,38880,40700,35520])\n# 生成html文件 \nbar1.render(\'收入&成本对比.html\')\n# 展示图形 \nbar1.render_notebook()`,
      },
    },
    {
      type: "text",
      content: `Pyecharts 还支持链式调用:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from pyecharts.charts import Bar \nbar1 = (Bar() \n.add_xaxis([\'1月\',\'2月\',\'3月\',\'4月\',\'5月\']) \n.add_yaxis(\'收入\',[45000,38000,54000,55000,48000]) \n.add_yaxis(\'成本\',[31500,28500,38880,40700,35520]) \n)\n# 展示图形 \nbar1.render_notebook()`,
      },
    }
    ],
  },
  {
    title: `Pyecharts 高级应用`,
    content: [
    {
      type: "text",
      content: `Pyecharts 提供了丰富的配置项，包括全局配置项和系列配置项:\n\n- \`set_global_opts()\`: 全局配置项，可配置标题､图例､坐标轴､工具箱等；\n\n- \`set_series_opts()\`: 系列配置项，可配置图元样式､文字样式､标签样式､点线样式等｡\n\n配置项引入方法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from pyecharts import options as opts`,
      },
    },
    {
      type: "text",
      content: `#### 初始化配置\n\n初始化配置:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `init_opts = opts.InitOpts()`,
      },
    },
    {
      type: "text",
      content: `opts.InitOpts () 常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`width`, `str, 图表画布宽度 (像素 px) , 如: width= \'900px\'`], [`height`, `str, 图表画布高度 (像素 px) , 如: height= \'500px\'`], [`chart\\_id`, `str, 图表 ID, 图表唯一标识`], [`theme`, `图表主题`]],
      },
    },
    {
      type: "text",
      content: `#### 定制主题\n\n主题类型引入方法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `from pyecharts.globals import ThemeType`,
      },
    },
    {
      type: "text",
      content: `设置主题方法:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `theme = ThemeType.主题风格`,
      },
    },
    {
      type: "text",
      content: `pyecharts 内置主题：`,
    },
    {
      type: "table",
      table: {
        headers: [`BUILTIN\\_THEMES`, `INFOGRAPHIC`, `ROMA`, `WALDEN`],
        rows: [[`CHALK`, `LIGHT`, `ROMANTIC`, `WESTEROS`], [`DARK`, `MACARONS`, `SHINE`, `WHITE`], [`ESSOS`, `PURPLE\\_PASSION`, `VINTAGE`, `WONDERLAND`]],
      },
    },
    {
      type: "text",
      content: `**例 4-2-2**: 在例 4-2-1 图形的基础上，配置宽度为 800Px, 高度为 450px, 主题为 “DARK”｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 引入表格类型､配置项､主题类型 \nfrom pyecharts.charts import Bar \nfrom pyecharts import options as opts \nfrom pyecharts.globals import ThemeType\n# 初始化配置,设置主题风格 \nbar1 = Bar(init_opts=opts.InitOpts(width=\'800px\',height=\'450px\', theme=ThemeType.DARK))\n# 添加数据 \nbar1.add_xaxis([\'1月\',\'2月\',\'3月\',\'4月\',\'5月\']) \nbar1.add_yaxis(\'收入\',[45000,38000,54000,55000,48000]) \nbar1.add_yaxis(\'成本\',[31500,28500,38880,40700,35520])\n# 展示图形 \nbar1.render_notebook()`,
      },
    },
    {
      type: "text",
      content: `运行结果：深色主题的收入成本对比柱状图`,
    }
    ],
  },
  {
    title: `常用全局配置项`,
    content: [
    {
      type: "text",
      content: `#### 标题配置项\n\n调用标题配置项:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `title_opts = opts.TitleOpts()`,
      },
    },
    {
      type: "text",
      content: `标题配置项 opts.TitleOpts () 常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`title`, `主标题文本，支持使用 \\\\n 换行`], [`subtitle`, `副标题文本，支持使用 \\\\n 换行`], [`pos\\_left`, `标题组件离容器左侧的距离，可以是具体数值，也可以是百分比，还可以是 \'left\', \'center\', \'right\', 组件会根据相应的位置自动对齐`], [`pos\\_right`, `标题组件离容器右侧的距离`], [`pos\\_top`, `标题组件离容器上侧的距离，可以是具体数值，也可以是百分比，还可以是 \'top\',\'middle\',\'bottom\', 组件会根据相应的位置自动对齐`], [`pos\\_bottom`, `标题组件离容器下侧的距离`]],
      },
    },
    {
      type: "text",
      content: `注意：TitleOpts () 函数的各个参数要以 “,” 分割，可以加入适当换行符和注释方便阅读，最后 “)” 前不要有 “,”。\n\n**例 4-2-3**: 在例 4-2-2 图形的基础上，设置主标题为 “收入 \\& 成本对比”, 副标题为 “2020 年 1-5 月”｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 引入表格类型､配置项､主题类型 \nfrom pyecharts.charts import Bar \nfrom pyecharts import options as opts \nfrom pyecharts.globals import ThemeType\n# 初始化配置 \nbar1 = Bar(init_opts=opts.InitOpts(width=\'800px\',height=\'450px\', theme=ThemeType.DARK))\n# 添加数据 \nbar1.add_xaxis([\'1月\',\'2月\',\'3月\',\'4月\',\'5月\']) \nbar1.add_yaxis(\'收入\',[45000,38000,54000,55000,48000]) \nbar1.add_yaxis(\'成本\',[31500,28500,38880,40700,35520])\n# 设置全局配置项 \nbar1.set_global_opts(title_opts = opts.TitleOpts(title= \'收入&成本对比\',subtitle=\'2020年1-5月\'))\n# 展示图形 \nbar1.render_notebook()`,
      },
    },
    {
      type: "text",
      content: `运行结果：带标题的收入成本对比柱状图\n\n#### 图例配置项\n\n调用图例配置项:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `legend_opts = opts.LegendOpts()`,
      },
    },
    {
      type: "text",
      content: `图例配置项 LegendOpts () 常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`type\\_`, `图例的类型，可选，默认 \'plain\': 代表普通图例，\'scroll\': 代表可滚动翻页的图例。`], [`selected\\_mode`, `图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。 默认开启图例选择，可以设成 False 关闭，也可设成\'single\' 或者 \'multiple\' 使用单选或者多选模式。`], [`is\\_show`, `是否显示图例组件，默认为 True`], [`pos\\_left/pos\\_right`, `图例组件离容器左 / 右侧的距离`], [`pos\\_top/pos\\_bottom`, `图例组件离容器上 / 下侧的距离`], [`orient`, `图例列表的布局朝向，默认 \'horizontal\' 水平，可选:\'vertical\' 垂直`]],
      },
    },
    {
      type: "text",
      content: `**例 4-2-4**: 在例 4-2-3 图形的基础上，将图例垂直排布｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 引入表格类型､配置项､主题类型 \nfrom pyecharts.charts import Bar \nfrom pyecharts import options as opts \nfrom pyecharts.globals import ThemeType \n# 初始化配置 \nbar1 = Bar(init_opts=opts.InitOpts(width=\'800px\',height=\'450px\', theme=ThemeType.DARK)) \n# 添加数据 \nbar1.add_xaxis([\'1月\',\'2月\',\'3月\',\'4月\',\'5月\']) \nbar1.add_yaxis(\'收入\',[45000,38000,54000,55000,48000]) \nbar1.add_yaxis(\'成本\',[31500,28500,38880,40700,35520])\n# 设置全局配置项 \nbar1.set_global_opts(title_opts = opts.TitleOpts(title= \'收入&成本对比\',subtitle=\'2020年1-5月\'), legend_opts = opts.LegendOpts(orient=\'vertical\'))\n# 展示图形 \nbar1.render_notebook()`,
      },
    },
    {
      type: "text",
      content: `运行结果：图例垂直排布的收入成本对比柱状图\n\n#### 坐标轴配置项\n\n调用 x､y 轴配置项:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `xaxis_opts = opts.AxisOpts() \nyaxis_opts = opts.AxisOpts()`,
      },
    },
    {
      type: "text",
      content: `坐标轴配置项 AxisOpts () 常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`name`, `坐标轴名称`], [`is\\_show`, `是否显示坐标轴，默认为 True`], [`is\\_inverse`, `是否反向坐标轴，默认为 False`], [`name\\_location`, `坐标轴名称显示位置，可选:\'start\',\'middle\',\'center\',\'end\', 默认 \'end\'`], [`name\\_gap`, `坐标轴名称与轴线之间的距离，默认 15`], [`name\\_rotate`, `坐标轴名称旋转角度值，解决坐标轴名称过长的问题`], [`axislabel\\_opts`, `坐标轴标签配置项。如：设置坐标轴标签旋转角度值，解决坐标轴标签名称过长的问题:axislabel\\_opts=opts.LabelOpts (rotate=-30)`]],
      },
    },
    {
      type: "text",
      content: `**例 4-2-5**: 在例 4-2-4 图形的基础上，分别设置 x 轴和 y 轴标签为 “月份”､“金额 (元)”, 并根据图形调整标签位置｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 引入表格类型､配置项､主题类型\nfrom pyecharts.charts import Bar \nfrom pyecharts import options as opts\nfrom pyecharts.globals import ThemeType\n# 初始化配置\nbar1 = Bar(init_opts=opts.InitOpts(width=\'800px\',height=\'450px\',\ntheme=ThemeType.DARK))\n# 添加数据 \nbar1.add_xaxis([\'1月\',\'2月\',\'3月\',\'4月\',\'5月\'])\nbar1.add_yaxis(\'收入\',[45000,38000,54000,55000,48000])\nbar1.add_yaxis(\'成本\',[31500,28500,38880,40700,35520])\n# 设置全局配置项 \nbar1.set_global_opts(title_opts = opts.TitleOpts(title= \'收入&成本对比\',subtitle=\'2020年1-5月\'), \nlegend_opts =opts.LegendOpts(orient=\'vertical\'),\nxaxis_opts=opts.AxisOpts(name=\'月份\'), \nyaxis_opts=opts.AxisOpts(name=\'金额(元)\',\nname_location=\'center\',\nname_gap=50))\n# 展示图形 \nbar1.render_notebook()`,
      },
    },
    {
      type: "text",
      content: `运行结果：带坐标轴名称的收入成本对比柱状图\n\n#### 工具箱配置\n\n调用工具箱配置:`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `toolbox_opts = opts.ToolboxOpts()`,
      },
    },
    {
      type: "text",
      content: `工具箱配置 ToolboxOpts () 常用参数：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用参数`, `说明`],
        rows: [[`is\\_show`, `是否显示工具栏组件，默认 False`], [`orient`, `工具栏的布局朝向，可选：默认 \'horizontal\' 水平，\'vertical\' 垂直`], [`pos\\_left`, `图例组件离容器左侧的距离`], [`pos\\_right`, `图例组件离容器右侧的距离`], [`pos\\_top`, `图例组件离容器上侧的距离`], [`pos\\_bottom`, `图例组件离容器下侧的距离`]],
      },
    },
    {
      type: "text",
      content: `**例 4-2-6**: 在例 4-2-5 图形的基础上，添加一个工具箱｡`,
    },
    {
      type: "code",
      code: {
        language: "python",
        code: `# 引入表格类型､配置项､主题类型 \nfrom pyecharts.charts import Bar \nfrom pyecharts import options as opts \nfrom pyecharts.globals import ThemeType\n# 初始化配置 \nbar1 = Bar(init_opts=opts.InitOpts(width=\'800px\',height=\'450px\', theme=ThemeType.DARK))\n# 添加数据 \nbar1.add_xaxis([\'1月\',\'2月\',\'3月\',\'4月\',\'5月\']) \nbar1.add_yaxis(\'收入\',[45000,38000,54000,55000,48000]) \nbar1.add_yaxis(\'成本\',[31500,28500,38880,40700,35520])\n# 设置全局配置项\nbar1.set_global_opts(title_opts = opts.TitleOpts(title= \'收入&成本对比\',subtitle=\'2020年1-5月\'), \nlegend_opts =opts.LegendOpts(orient=\'vertical\'), \nxaxis_opts=opts.AxisOpts(name=\'月份\'), \nyaxis_opts=opts.AxisOpts(name=\'金额(元)\'),\ntoolbox_opts=opts.ToolboxOpts(is_show=True))\n# 展示图形 \nbar1.render_notebook()`,
      },
    }
    ],
  },
  {
    title: `常用系列配置项`,
    content: [
    {
      type: "text",
      content: `常用系列配置项：`,
    },
    {
      type: "table",
      table: {
        headers: [`常用系列配置项`, `说明`],
        rows: [[`标签配置项`, `调用配置: label\\_opts=opts.LabelOpts (), 可设置标签的字体、大小、位置、旋转角度等，常用参数:is\\_show (是否显示标签)`], [`线样式配置项`, `调用配置:linestyle\\_opts=opts.LineStyleOpts (), 可设置线条的宽度、透明度、颜色等，常用参数: width (调整线条宽度)`], [`区域填充样式配置项`, `调用配置:areastyle\\_opts=opts.AreaStyleOpts (), 可设置区域填充的透明度、颜色等，常用参数: opacity (设置透明度，0-1 的数字，可通过该参数绘制面积图)`]],
      },
    }
    ],
  },
  {
    title: `DataFrame 数据可视化 - 数据格式转换`,
    content: [
    {
      type: "text",
      content: `Pyecharts 本质上是将 Echarts 的配置项由 Python dict 序列化为 JSON 格式，所以 Pyecharts 支持什么格式的数据类型取决于 JSON 支持什么数据类型，Python 中对 JSON 的格式转换如表所示:`,
    },
    {
      type: "table",
      table: {
        headers: [`Python`, `JSON`],
        rows: [[`int, float`, `number`], [`str`, `string`], [`bool`, `boolean`], [`dict`, `object (JSON 对象)`], [`list`, `array`]],
      },
    },
    {
      type: "text",
      content: `将数据传入 Pyecharts 时，需要先将数据格式转换成上述 Python 原生的数据类型才可使用。`,
    },
    {
      type: "note",
      content: `（注：文档部分内容可能由 AI 生成）`,
    }
    ],
  }
    ],
  }
];