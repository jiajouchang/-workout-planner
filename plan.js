/**
 * 訓練計劃行事曆 App - 靜態課表與飲食設定 (plan.js)
 * 專案設定：54 歲，173 cm
 * 兩階段規劃：
 *  - 減脂期 (Cut Phase)：68 kg 減至 64 kg，器材為現有 8 kg 固定啞鈴 × 2、單槓、健身椅、滾輪
 *  - 增肌期 (Bulk Phase)：64 kg 增至 75 kg，器材升級為 10 段可調式啞鈴 (9~55 LBS)、單槓、健身椅、滾輪
 */

// 10 段可調式啞鈴重量刻度 (LBS)
const ADJUSTABLE_DUMBBELL_LBS = [9, 15, 20, 26, 29, 35, 40, 44, 48, 55];

// 兩時期詳細配置
const PHASE_CONFIGS = {
  cut: {
    id: 'cut',
    name: '減脂期',
    badge: '🔥 減脂期',
    phaseTitle: '減脂精實期（當前階段）',
    targetRange: '68 kg ➔ 64 kg',
    startKg: 68.0,
    targetKg: 64.0,
    equipmentText: '現有器材：8 kg 固定啞鈴 × 2、單槓、健身椅、滾輪',
    dumbbellType: 'fixed',
    dumbbellUnit: 'kg',
    defaultWeight: 8,
    dailyCalories: '1,800 – 1,950 kcal',
    dailyProtein: '135 – 145 g',
    water: '2,500 – 3,000 ml',
    nutritionSummary: '每日熱量：1,800–1,950 kcal · 蛋白質 135–145g · 飲水 2,500–3,000ml',
    nutritionNote: '熱量赤字期（-300~400 kcal），充足蛋白質保護肌肉不流失，碳水減量並集中在訓練前後。',
    cardioNote: 'Zone 2 有氧 35–45 分鐘（每週 2–3 次），維持微喘但能說話強度，加強脂肪燃燒。',
    targetSetsDefault: 3,
    mealTemplates: [
      {
        id: 'breakfast',
        name: '早餐',
        icon: '🍳',
        proteinEst: '~32g',
        desc: '水煮蛋 / 茶葉蛋 2 顆、無糖高纖豆漿 400ml、燕麥片 30g（碳水適量減低）、香蕉半根或蘋果半顆'
      },
      {
        id: 'lunch',
        name: '午餐',
        icon: '🍱',
        proteinEst: '~38g',
        desc: '白飯半碗（約 100g）、去皮雞胸肉 / 鮮魚 160g、深綠色蔬菜大份（燙/少油炒，高纖飽足）'
      },
      {
        id: 'afternoon_snack',
        name: '下午點心',
        icon: '☕',
        proteinEst: '~14g',
        desc: '無糖黑咖啡或無糖綠茶、茶葉蛋 1 顆（減脂期暫停堅果與高糖水果，嚴控油脂與純糖）'
      },
      {
        id: 'dinner',
        name: '晚餐',
        icon: '🥗',
        proteinEst: '~38g',
        desc: '地瓜 1 小條或白飯 1/3 碗、瘦牛肉 / 雞胸肉 / 嫩豆腐 180g、清炒蔬菜兩大碗'
      },
      {
        id: 'bedtime',
        name: '睡前補充',
        icon: '🥛',
        proteinEst: '~15g',
        desc: '若當日蛋白質未達 135g：無糖豆漿 250ml 或低脂希臘優格 150g；足夠則喝溫水直接就寢'
      }
    ],
    progressionLadder: [
      { stage: 0, name: '動作質量與次數累積', instruction: '在 8–12 下區間內標準完成，保持發力品質與核心穩定，每組保留 1–2 下餘力（RIR 1–2）。' },
      { stage: 1, name: '放慢離心節奏 (3-4秒)', instruction: '下放重量放慢 3–4 秒，維持肌肉張力時間（TUT），在赤字下刺激肌纖維。' },
      { stage: 2, name: '頂峰收縮停頓 (1-2秒)', instruction: '在動作頂點用力擠壓目標肌群 1–2 秒，強化神經肌肉連結與充血感。' },
      { stage: 3, name: '全動作幅度 (Full ROM)', instruction: '深蹲全深度、臥推下沉拉滿胸肌，在關節舒適範圍內追求完整拉伸。' },
      { stage: 4, name: '單側抗扭轉穩定', instruction: '強化單側平衡與核心抗失衡控制，提高燃脂效率與本體感覺。' }
    ]
  },
  bulk: {
    id: 'bulk',
    name: '增肌期',
    badge: '💪 增肌期',
    phaseTitle: '大重量肌肥大期（64kg 達成後啟動）',
    targetRange: '64 kg ➔ 75 kg',
    startKg: 64.0,
    targetKg: 75.0,
    equipmentText: '升級器材：10 段可調式啞鈴 (9~55 LBS)、單槓、健身椅、滾輪',
    dumbbellType: 'adjustable_lbs',
    dumbbellUnit: 'lbs',
    availableDumbbells: ADJUSTABLE_DUMBBELL_LBS,
    defaultWeight: 20,
    dailyCalories: '2,400 – 2,600 kcal',
    dailyProtein: '125 – 135 g',
    water: '2,500 – 3,000 ml',
    nutritionSummary: '每日熱量：2,400–2,600 kcal · 蛋白質 ~130g · 飲水 2,500–3,000ml',
    nutritionNote: '熱量小幅盈餘 (+200-300 kcal)，充足碳水化合物提供高強度重訓肝醣，促進肌肉生長。',
    cardioNote: 'Zone 2 有氧 25–35 分鐘（每週 1–2 次），維持心肺功能與運動後主動恢復。',
    targetSetsDefault: 4,
    mealTemplates: [
      {
        id: 'breakfast',
        name: '早餐',
        icon: '🍳',
        proteinEst: '~30g',
        desc: '全蛋 2–3 顆、無糖豆漿 400ml、燕麥片 50g、香蕉 1 根（充足優質碳水）'
      },
      {
        id: 'lunch',
        name: '午餐',
        icon: '🍱',
        proteinEst: '~35g',
        desc: '白飯 1–1.5 碗（約 200g）、雞胸肉 / 鮮魚 / 瘦牛肉 150g、深綠色蔬菜 2 份'
      },
      {
        id: 'afternoon_snack',
        name: '下午點心',
        icon: '🍌',
        proteinEst: '~20g',
        desc: '無糖豆漿 350ml、香蕉 1 根、綜合堅果 1 小把（約 15–20g 優質油脂與熱量盈餘）'
      },
      {
        id: 'dinner',
        name: '晚餐',
        icon: '🥗',
        proteinEst: '~35g',
        desc: '白飯 1 碗、魚肉 / 雞肉 / 牛肉 150g、嫩豆腐半盒、清炒蔬菜'
      },
      {
        id: 'bedtime',
        name: '睡前補充',
        icon: '🥛',
        proteinEst: '~15g',
        desc: '無糖豆漿 300ml 或無糖希臘優格 150g，確保夜間睡眠蛋白質持續釋放修復肌肉'
      }
    ],
    progressionLadder: [
      { stage: 0, name: '可調啞鈴加重 (+1段)', instruction: '達到次數上限後，直接切換至下一段磅數（9→15→20→26→29→35→40→44→48→55 LBS）。' },
      { stage: 1, name: '容量提升 (+1組)', instruction: '主要復合動作增加 1 組，推升總容量至 4–5 組。' },
      { stage: 2, name: '放慢離心節奏 (3-4秒)', instruction: '下放重量放慢 3–4 秒，維持高肌張力，頂端停頓 1 秒。' },
      { stage: 3, name: '增加動作幅度 (ROM)', instruction: '深蹲貼底、臥推下沉拉滿胸大肌，全幅度破壞肌纖維。' },
      { stage: 4, name: '縮短組間休息', instruction: '組間休息縮短 15–30 秒，提高代謝壓力與肌肥大充血感。' }
    ]
  }
};

// 基礎訓練課表骨幹
const WORKOUT_SPLITS = {
  upper_a: {
    id: 'upper_a',
    title: '上半身 A',
    type: 'strength',
    color: '#3b82f6',
    description: '重點：胸肌推力、背部引體與手臂肩部輔助',
    exercises: [
      { exerciseId: 'pull_up', cutSets: 3, bulkSets: 4, minReps: 1, maxReps: 10, asManyAsPossible: true, isDumbbell: false, note: '盡可能多次（進步階梯 1-3→5→8→10下）' },
      { exerciseId: 'dumbbell_bench_press', cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true, note: '推至胸口正上方，手肘微內收45度' },
      { exerciseId: 'single_arm_dumbbell_row', cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true, note: '每側 10–15 下，手肘順勢拉向髖部' },
      { exerciseId: 'dumbbell_shoulder_press', cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '坐姿軀幹挺直，垂直向上推舉' },
      { exerciseId: 'dumbbell_lateral_raise', cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true, note: '微屈手肘，平舉至與肩同高' },
      { exerciseId: 'dumbbell_bicep_curl', cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '手肘貼緊身體，頂端擠壓二頭肌' },
      { exerciseId: 'dumbbell_tricep_extension', cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '舉過頭頂彎肘下放再伸直' }
    ]
  },
  lower_a: {
    id: 'lower_a',
    title: '下半身 A + 核心',
    type: 'strength',
    color: '#10b981',
    description: '重點：腿部推力（深蹲）、單腿穩定度與核心抗伸展',
    exercises: [
      { exerciseId: 'goblet_squat', cutSets: 3, bulkSets: 4, minReps: 12, maxReps: 20, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true, note: '雙手持單鈴於胸前，下蹲至大腿平行' },
      { exerciseId: 'bulgarian_split_squat', cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '後腳搭椅，前腳蹲深，每腿 8–15 下' },
      { exerciseId: 'dumbbell_romanian_deadlift', cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true, note: '屁股後推背打直，大腿後側拉伸' },
      { exerciseId: 'single_leg_hip_thrust', cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, isPerSide: true, isDumbbell: false, note: '單腳後跟踩地頂髖，頂端夾臀' },
      { exerciseId: 'ab_wheel_rollout', cutSets: 3, bulkSets: 3, minReps: 6, maxReps: 15, isDumbbell: false, note: '跪姿慢速向前滾動，腹肌收緊拉回' },
      { exerciseId: 'side_plank', cutSets: 3, bulkSets: 3, minReps: 30, maxReps: 60, unit: '秒', isPerSide: true, isDumbbell: false, note: '每側撐 30–60 秒，身體成一直線' }
    ]
  },
  cardio_rest: {
    id: 'cardio_rest',
    title: '有氧 / 休息',
    type: 'cardio',
    color: '#06b6d4',
    description: 'Zone 2 有氧 30–45 分鐘（快走、超慢跑或腳踏車，能對話但不能唱歌）',
    cardioDetail: {
      cutDuration: '35–45 分鐘',
      bulkDuration: '25–35 分鐘',
      duration: '30–45 分鐘',
      intensity: 'Zone 2 心率區間（呼吸微喘、能說完整句子）',
      options: ['戶外快走 / 斜坡快走', '超慢跑 / 輕鬆慢跑', '固定式腳踏車']
    }
  },
  upper_b: {
    id: 'upper_b',
    title: '上半身 B',
    type: 'strength',
    color: '#8b5cf6',
    description: '重點：引體向上量累積、上胸厚度與背部後側立體感',
    exercises: [
      { exerciseId: 'pull_up', cutSets: 3, bulkSets: 5, minReps: 1, maxReps: 12, asManyAsPossible: true, isDumbbell: false, note: '總量累積，不必每組力竭（如 8/7/6/5/5）' },
      { exerciseId: 'dumbbell_incline_bench_press', cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true, note: '上斜 30–45 度，推起時擠壓上胸' },
      { exerciseId: 'dumbbell_bent_over_row', cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true, note: '俯身 45 度，手肘貼身後拉夾背' },
      { exerciseId: 'dumbbell_arnold_press', cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '胸前旋轉推至頂端，鍛鍊全肩' },
      { exerciseId: 'dumbbell_reverse_fly', cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true, note: '俯身飛鳥展翅，專注肩膀後束' },
      { exerciseId: 'dumbbell_hammer_curl', cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '掌心相對垂直彎舉，加強手臂厚度' },
      { exerciseId: 'close_grip_push_up', cutSets: 3, bulkSets: 3, minReps: 5, maxReps: 30, asManyAsPossible: true, isDumbbell: false, note: '窄握伏地挺身盡可能多次，充血三頭' }
    ]
  },
  lower_b: {
    id: 'lower_b',
    title: '下半身 B + 核心',
    type: 'strength',
    color: '#ec4899',
    description: '重點：分腿蹲強化、大腿內收與臀推爆發力',
    exercises: [
      { exerciseId: 'bulgarian_split_squat', cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '每腿 10–15 下，專注臀腿主動發力' },
      { exerciseId: 'dumbbell_sumo_squat', cutSets: 3, bulkSets: 4, minReps: 12, maxReps: 20, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true, note: '寬站距相撲深蹲，加強大腿內側與臀肌' },
      { exerciseId: 'single_leg_romanian_deadlift', cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true, note: '單腳支撐平衡，強化腿後側' },
      { exerciseId: 'dumbbell_hip_thrust', cutSets: 3, bulkSets: 4, minReps: 12, maxReps: 20, defaultWeightKg: 8, defaultWeightLbs: 35, isDumbbell: true, note: '背靠椅頂髖，頂峰夾緊臀肌 2 秒' },
      { exerciseId: 'calf_raise', cutSets: 3, bulkSets: 4, minReps: 15, maxReps: 25, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true, note: '腳尖最高點停頓 1 秒，鍛鍊小腿' },
      { exerciseId: 'ab_wheel_rollout', cutSets: 3, bulkSets: 3, minReps: 6, maxReps: 15, isDumbbell: false, note: '腹肌持續發力，穩定控制往返' }
    ]
  },
  cardio_easy: {
    id: 'cardio_easy',
    title: '輕鬆跑 / 快走',
    type: 'cardio',
    color: '#f59e0b',
    description: '週末主動恢復：Zone 2 輕鬆快走或慢跑 30–45 分鐘',
    cardioDetail: {
      cutDuration: '35–45 分鐘',
      bulkDuration: '25–35 分鐘',
      duration: '30–45 分鐘',
      intensity: '微流汗、輕鬆愉快、維持身心活力',
      options: ['公園散步快走', '輕鬆超慢跑', '戶外騎行']
    }
  },
  rest: {
    id: 'rest',
    title: '完全休息',
    type: 'rest',
    color: '#64748b',
    description: '肌肉在休息中修復生長。充足睡眠、多喝水、吃夠蛋白質。'
  }
};

/**
 * 星期幾對應的課表（0 = 週日, 1 = 週一, ... 6 = 週六）
 */
const WEEKLY_SCHEDULE = [
  'rest',         // 0: 週日
  'upper_a',      // 1: 週一
  'lower_a',      // 2: 週二
  'cardio_rest',  // 3: 週三
  'upper_b',      // 4: 週四
  'lower_b',      // 5: 週五
  'cardio_easy'   // 6: 週六
];

/**
 * 動作難度階梯與變體設定表 (EXERCISE_VARIATIONS)
 * 每個動作提供三種階層：退階 (regression)、標準 (standard)、進階 (progression)
 * 方便初學者、特定肌群偏弱或尋求挑戰的使用者自由切換
 */
const EXERCISE_VARIATIONS = {
  // 1. 保加利亞分腿蹲（重點項目）
  bulgarian_split_squat: {
    baseId: 'bulgarian_split_squat',
    baseName: '保加利亞分腿蹲',
    targetArea: '臀大肌、股四頭肌、單腿平衡',
    standard: {
      id: 'bulgarian_split_squat',
      name: '保加利亞分腿蹲',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '後腳搭椅，前腳蹲深，鍛鍊單側臀腿爆發力與平衡穩定',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, isPerSide: true,
      defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '後腳搭椅，前腳蹲深，每腿 8–15 下'
    },
    regression: {
      id: 'split_squat',
      name: '雙腳著地靜態分腿蹲',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '雙腳均踩穩地面不架高，消除平衡晃動與後胯拉扯，專注下蹲與站立',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 12, isPerSide: true,
      defaultWeightKg: 0, defaultWeightLbs: 0, isDumbbell: false,
      note: '徒手或輕手持鈴，雙腳穩踏地面，垂直下蹲，每腿 8–12 下'
    },
    progression: {
      id: 'deficit_bulgarian_split_squat',
      name: '前腳墊高保加利亞分腿蹲',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '前腳踩槓片或踏板墊高 5–8cm，突破下蹲極限深度，深層拉伸臀大肌',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, isPerSide: true,
      defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '前腳墊高擴大行程，深蹲至大腿低於水平，頂端強力夾臀'
    }
  },

  // 2. 單槓引體向上
  pull_up: {
    baseId: 'pull_up',
    baseName: '單槓引體向上',
    targetArea: '闊背肌、大圓肌、二頭肌',
    standard: {
      id: 'pull_up',
      name: '單槓引體向上',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '背肌主動發力，下巴過槓，打造寬厚背部倒三角',
      cutSets: 3, bulkSets: 4, minReps: 1, maxReps: 10, asManyAsPossible: true, isDumbbell: false,
      note: '盡可能多次（進步階梯 1-3→5→8→10下）'
    },
    regression: {
      id: 'eccentric_pull_up',
      name: '離心慢放引體向上',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '雙腳蹬地跳起至頂端下巴過槓，隨後以 3–5 秒極慢速度下放，迅速累積背肌神經力量',
      cutSets: 3, bulkSets: 3, minReps: 3, maxReps: 6, isDumbbell: false,
      note: '跳起頂端夾背，下放放慢 3–5 秒，每組 3–6 下'
    },
    progression: {
      id: 'paused_pull_up',
      name: '頂端停頓引體向上',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '頂端胸口碰槓完全停頓 2 秒，消除借力與慣性，極度強化闊背肌收縮',
      cutSets: 3, bulkSets: 4, minReps: 4, maxReps: 8, isDumbbell: false,
      note: '頂端胸部觸槓懸停 2 秒，消除慣性，慢速控制下放'
    }
  },

  // 3. 啞鈴臥推
  dumbbell_bench_press: {
    baseId: 'dumbbell_bench_press',
    baseName: '啞鈴臥推',
    targetArea: '胸大肌、三頭肌、肩膀前束',
    standard: {
      id: 'dumbbell_bench_press',
      name: '啞鈴臥推',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '仰臥健身椅，手肘微內收45度，穩定下放推起',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '推至胸口正上方，手肘微內收45度'
    },
    regression: {
      id: 'incline_push_up',
      name: '健身椅上斜伏地挺身',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '雙手手掌撐在健身椅面上，降低身體自重比例，溫和建立胸肌發力感',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, isDumbbell: false,
      note: '手撐椅緣，身體繃緊成直線，胸口下沉微觸椅邊後推起'
    },
    progression: {
      id: 'paused_dumbbell_bench_press',
      name: '底部拉伸停頓啞鈴臥推',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '啞鈴下沉至最深拉伸位置停頓 2 秒，消除肌腱回彈，逼出胸肌本體主動發力',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '下放深處停頓 2 秒，胸肌深層拉滿後平穩推起'
    }
  },

  // 4. 單手啞鈴划船
  single_arm_dumbbell_row: {
    baseId: 'single_arm_dumbbell_row',
    baseName: '單手啞鈴划船',
    targetArea: '闊背肌、菱形肌、核心抗旋轉',
    standard: {
      id: 'single_arm_dumbbell_row',
      name: '單手啞鈴划船',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '一側膝手跪椅支撐，手肘拉向髖部夾緊背肌',
      cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '每側 10–15 下，手肘順勢拉向髖部'
    },
    regression: {
      id: 'incline_chest_supported_row',
      name: '上斜椅胸口支撐雙手划船',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '胸口趴在 45 度健身椅上，完全卸除腰部核心負擔，孤立背肌專注夾背',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '胸貼斜椅，雙手同時垂直向後上方拉肘夾背'
    },
    progression: {
      id: 'dumbbell_row_pause',
      name: '頂峰夾背停頓划船',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '拉至髖部頂點用力向脊椎方向夾緊 2 秒，徹底喚醒闊背肌中下部纖維',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true,
      note: '頂端用力夾緊背肌停頓 2 秒，抵抗重力慢放'
    }
  },

  // 5. 啞鈴肩推
  dumbbell_shoulder_press: {
    baseId: 'dumbbell_shoulder_press',
    baseName: '啞鈴肩推',
    targetArea: '肩部三角肌前中束、上胸',
    standard: {
      id: 'dumbbell_shoulder_press',
      name: '啞鈴肩推',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '端坐椅上背打直，垂直向上推舉，打造立體南瓜肩',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '坐姿軀幹挺直，垂直向上推舉'
    },
    regression: {
      id: 'incline_shoulder_press',
      name: '75度高斜椅肩推',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '椅背微調為 75 度，減輕肩峰下撞擊與胸椎靈活度受限壓力，動作更順暢',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 15, isDumbbell: true,
      note: '背貼 75 度椅背，推舉軌跡微向前上方，不卡肩膀'
    },
    progression: {
      id: 'standing_dumbbell_shoulder_press',
      name: '站姿啞鈴肩推',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '站姿推舉要求全身核心收緊、臀肌夾緊抵抗晃動，提升全身力量鏈協同',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '站姿挺拔，核心腹肌臀部全力繃緊，垂直推頂'
    }
  },

  // 6. 啞鈴側平舉
  dumbbell_lateral_raise: {
    baseId: 'dumbbell_lateral_raise',
    baseName: '啞鈴側平舉',
    targetArea: '三角肌中束（肩膀寬度）',
    standard: {
      id: 'dumbbell_lateral_raise',
      name: '啞鈴側平舉',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '手肘微屈，平舉至與肩同高，專注肩膀兩側發力',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true,
      note: '微屈手肘，平舉至與肩同高'
    },
    regression: {
      id: 'bent_arm_lateral_raise',
      name: '屈肘 90 度側平舉',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '雙肘固定彎曲 90 度向兩側抬起，大幅縮短力臂，避免斜方肌聳肩代償',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 15, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true,
      note: '手肘呈 90 度端平，由肩膀兩側帶動向上平舉'
    },
    progression: {
      id: 'leaning_lateral_raise',
      name: '單手側傾側平舉',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '一手扶椅身體向外傾斜 15 度，使三角肌中束全程維持強大拉伸與頂峰收縮',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, isPerSide: true, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true,
      note: '單手側傾，外展至頂點懸停 1 秒，換邊操作'
    }
  },

  // 7. 二頭彎舉
  dumbbell_bicep_curl: {
    baseId: 'dumbbell_bicep_curl',
    baseName: '二頭彎舉',
    targetArea: '手臂前側二頭肌',
    standard: {
      id: 'dumbbell_bicep_curl',
      name: '二頭彎舉',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '雙肘貼緊軀幹，只靠前臂上下帶動重量，頂端擠壓二頭肌',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '手肘貼緊身體，頂端擠壓二頭肌'
    },
    regression: {
      id: 'seated_dumbbell_bicep_curl',
      name: '端坐啞鈴二頭彎舉',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '坐在椅子上進行，杜絕腰腿擺動借力，純粹體驗二頭肌發力與頂峰收縮',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 15, isDumbbell: true,
      note: '端坐在椅子上，手肘固定在身側，勻速彎舉'
    },
    progression: {
      id: 'incline_dumbbell_bicep_curl',
      name: '上斜板啞鈴二頭彎舉',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '斜靠在 60 度上斜椅，雙臂自然垂於身後，最大化拉伸長頭，塑造飽滿手臂峰度',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 15, isDumbbell: true,
      note: '斜躺上斜椅，手臂後垂拉滿二頭長頭再強力彎舉'
    }
  },

  // 8. 三頭肌伸展
  dumbbell_tricep_extension: {
    baseId: 'dumbbell_tricep_extension',
    baseName: '三頭肌伸展',
    targetArea: '手臂後側三頭肌長頭',
    standard: {
      id: 'dumbbell_tricep_extension',
      name: '三頭肌伸展',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '雙手托鈴舉過頭頂，彎肘下放腦後再垂直伸直',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '舉過頭頂彎肘下放再伸直'
    },
    regression: {
      id: 'bench_dips',
      name: '健身椅屈臂支撐伸展',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '手掌向後撐在健身椅邊緣，雙膝彎曲，自重下壓撐起，不需高舉過頭',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, isDumbbell: false,
      note: '背貼椅沿下沉，手肘彎曲 90 度後靠三頭肌撐起身體'
    },
    progression: {
      id: 'overhead_tricep_pause',
      name: '深層拉伸停頓過頭伸展',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '啞鈴下沉至後頸深處極限拉伸長頭，靜止 2 秒再推起，撕裂感倍增',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '深處停頓 2 秒，感受三頭長頭深層拉滿後伸直'
    }
  },

  // 9. 高腳杯深蹲
  goblet_squat: {
    baseId: 'goblet_squat',
    baseName: '高腳杯深蹲',
    targetArea: '股四頭肌、臀大肌、核心',
    standard: {
      id: 'goblet_squat',
      name: '高腳杯深蹲',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '雙手持單鈴於胸前，下蹲至大腿與地面平行',
      cutSets: 3, bulkSets: 4, minReps: 12, maxReps: 20, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true,
      note: '雙手持單鈴於胸前，下蹲至大腿平行'
    },
    regression: {
      id: 'box_squat',
      name: '箱式深蹲 / 坐椅深蹲',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '身後放置健身椅，臀部後推坐穩椅面 1 秒再起立，保護膝關節並建立信心',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 0, defaultWeightLbs: 0, isDumbbell: false,
      note: '徒手或手持輕鈴，屁股碰椅停頓 1 秒再蹬地起立'
    },
    progression: {
      id: 'paused_goblet_squat',
      name: '底部停頓 3 秒高腳杯深蹲',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '下蹲至最深點完全靜止 3 秒再站起，消除回彈力，強化腿部靜態力量',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true,
      note: '最低點穩止 3 秒，核心緊繃蹬地站起'
    }
  },

  // 10. 啞鈴羅馬尼亞硬舉
  dumbbell_romanian_deadlift: {
    baseId: 'dumbbell_romanian_deadlift',
    baseName: '啞鈴羅馬尼亞硬舉',
    targetArea: '大腿後側膕繩肌、臀大肌、下背',
    standard: {
      id: 'dumbbell_romanian_deadlift',
      name: '啞鈴羅馬尼亞硬舉',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '屁股後推背打直，感受大腿後側強烈拉伸與臀部收縮',
      cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true,
      note: '屁股後推背打直，大腿後側拉伸'
    },
    regression: {
      id: 'wall_hip_hinge',
      name: '靠牆髖鉸鏈硬舉練習',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '背對牆面一步，專注將屁股往後找牆壁碰觸，避免彎腰駝背下背代償',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 0, defaultWeightLbs: 0, isDumbbell: false,
      note: '雙膝微屈，專注髖部向後推至屁股碰牆，拉滿腿後側站直'
    },
    progression: {
      id: 'b_stance_dumbbell_rdl',
      name: 'B-Stance 交錯腳硬舉',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '一腳後退腳尖點地，70% 重心集中在前腳，刺激度大幅超越傳統雙腳硬舉',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true,
      note: '前腳踩實，後腳腳尖輕觸輔助，每側 8–12 下'
    }
  },

  // 11. 單腿臀推
  single_leg_hip_thrust: {
    baseId: 'single_leg_hip_thrust',
    baseName: '單腿臀推',
    targetArea: '單側臀大肌、大腿後側',
    standard: {
      id: 'single_leg_hip_thrust',
      name: '單腿臀推',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '單腳後跟踩地頂髖，頂端夾臀 2 秒',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, isPerSide: true, isDumbbell: false,
      note: '單腳後跟踩地頂髖，頂端夾臀'
    },
    regression: {
      id: 'glute_bridge_double',
      name: '平躺雙腳臀橋',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '仰臥地面雙腳踩地，穩定頂起髖部，完全無單腿晃動或下背壓力',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, isDumbbell: false,
      note: '雙腳踩地頂髖，頂端夾緊臀部 2 秒'
    },
    progression: {
      id: 'weighted_single_leg_thrust',
      name: '負重單腿臀推',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '骨盆單側放置啞鈴負重推頂，極限孤立單側臀大肌',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '啞鈴置於單側髖骨，單腳踩地頂髖夾臀 2 秒'
    }
  },

  // 12. 腹肌滾輪
  ab_wheel_rollout: {
    baseId: 'ab_wheel_rollout',
    baseName: '滾輪',
    targetArea: '腹直肌、核心深層抗伸展',
    standard: {
      id: 'ab_wheel_rollout',
      name: '滾輪',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '跪姿慢速向前滾動，腹肌收緊拉回',
      cutSets: 3, bulkSets: 3, minReps: 6, maxReps: 15, isDumbbell: false,
      note: '跪姿慢速向前滾動，腹肌收緊拉回'
    },
    regression: {
      id: 'wall_stop_rollout',
      name: '靠牆半程滾輪 / 棒式支撐',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '距牆約 60cm 處跪姿向前滾，碰牆即停並收回，防止力竭塌腰受傷',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 12, isDumbbell: false,
      note: '碰牆即止，骨盆微後傾，腹肌收緊拉回'
    },
    progression: {
      id: 'paused_rollout',
      name: '末端停頓 2 秒腹肌滾輪',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '滾出至身體接近貼地極限時靜止懸停 2 秒，核心抗伸展極致考驗',
      cutSets: 3, bulkSets: 4, minReps: 6, maxReps: 12, isDumbbell: false,
      note: '極限延伸點停頓 2 秒，腹肌發力收縮拉回'
    }
  },

  // 13. 側棒式
  side_plank: {
    baseId: 'side_plank',
    baseName: '側棒式',
    targetArea: '腹內外斜肌、腰方肌、臀中肌',
    standard: {
      id: 'side_plank',
      name: '側棒式',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '每側撐 30–60 秒，身體成一直線',
      cutSets: 3, bulkSets: 3, minReps: 30, maxReps: 60, unit: '秒', isPerSide: true, isDumbbell: false,
      note: '每側撐 30–60 秒，身體成一直線'
    },
    regression: {
      id: 'knee_side_plank',
      name: '屈膝側棒式',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '雙膝彎曲 90 度貼地支撐，力矩減半，減輕肩頸與腰部不適，更易保持脊椎筆直',
      cutSets: 3, bulkSets: 3, minReps: 20, maxReps: 40, unit: '秒', isPerSide: true, isDumbbell: false,
      note: '膝蓋著地，髖部用力向上挺起成直線，每邊 20–40 秒'
    },
    progression: {
      id: 'side_plank_leg_lift',
      name: '側棒式加動態抬腿',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '側棒式頂起時上方腿勻速開合抬起，同時轟炸側腹與臀中肌',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, unit: '下/側', isPerSide: true, isDumbbell: false,
      note: '維持側棒式，上方腿動態抬起 10–15 下，換邊操作'
    }
  },

  // 14. 啞鈴上斜臥推
  dumbbell_incline_bench_press: {
    baseId: 'dumbbell_incline_bench_press',
    baseName: '啞鈴上斜臥推',
    targetArea: '上胸肌、三角肌前束',
    standard: {
      id: 'dumbbell_incline_bench_press',
      name: '啞鈴上斜臥推',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '上斜 30–45 度，推起時擠壓上胸',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '上斜 30–45 度，推起時擠壓上胸'
    },
    regression: {
      id: 'feet_elevated_push_up',
      name: '健身椅推胸 / 平板啞鈴推',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '雙手手撐健身椅或改為平板推胸，減少上斜對肩膀前束的過大壓力',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '動作平順下放推起，手肘微內收'
    },
    progression: {
      id: 'alternating_incline_bench_press',
      name: '上斜單邊交替啞鈴推胸',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '一邊維持頂端鎖定，另一邊單獨下放推起，考驗核心抗扭轉與單側胸肌持續受力',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '單臂交替推舉，對側保持頂峰伸展，每側 8–12 下'
    }
  },

  // 15. 啞鈴划船（俯身雙手）
  dumbbell_bent_over_row: {
    baseId: 'dumbbell_bent_over_row',
    baseName: '啞鈴划船',
    targetArea: '背闊肌、斜方肌、菱形肌',
    standard: {
      id: 'dumbbell_bent_over_row',
      name: '啞鈴划船',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '俯身 45 度，手肘貼身後拉夾背',
      cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '俯身 45 度，手肘貼身後拉夾背'
    },
    regression: {
      id: 'single_arm_dumbbell_row',
      name: '單手膝蓋跪椅支撐划船',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '單膝單手跪椅支撐，腰部零壓力，精準拉動背部闊背肌',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '跪椅支撐，手肘後拉向髖部夾緊背部'
    },
    progression: {
      id: 'bent_over_row_pause',
      name: '俯身划船頂端停頓 2 秒',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '雙啞鈴拉至腰際強力夾背停頓 2 秒，徹底破壞背闊肌與上背纖維',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '頂端用力夾背 2 秒，抵抗重力勻速下放'
    }
  },

  // 16. 啞鈴阿諾肩推
  dumbbell_arnold_press: {
    baseId: 'dumbbell_arnold_press',
    baseName: '啞鈴阿諾肩推',
    targetArea: '全方位肩膀三角肌（前、中、後）',
    standard: {
      id: 'dumbbell_arnold_press',
      name: '啞鈴阿諾肩推',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '胸前旋轉推至頂端，鍛鍊全肩',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '胸前旋轉推至頂端，鍛鍊全肩'
    },
    regression: {
      id: 'dumbbell_shoulder_press',
      name: '標準坐姿肩推（不旋轉）',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '取消手腕旋轉，直上直下推舉，動作軌跡單純安全',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '直上直下垂直推頂，手肘微前收'
    },
    progression: {
      id: 'standing_arnold_press',
      name: '站姿阿諾肩推',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '站姿旋轉推舉，全身力量鏈與核心平衡全面參與',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '站姿核心繃緊，旋轉推至頭頂正上方'
    }
  },

  // 17. 反向飛鳥
  dumbbell_reverse_fly: {
    baseId: 'dumbbell_reverse_fly',
    baseName: '反向飛鳥',
    targetArea: '三角肌後束、菱形肌、斜方肌中下部',
    standard: {
      id: 'dumbbell_reverse_fly',
      name: '反向飛鳥',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '俯身飛鳥展翅，專注肩膀後束',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true,
      note: '俯身飛鳥展翅，專注肩膀後束'
    },
    regression: {
      id: 'chest_supported_reverse_fly',
      name: '上斜椅胸口支撐反向飛鳥',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '胸口趴在健身椅上，杜絕腰背借力與晃動，精準孤立肩膀後側',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 15, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true,
      note: '胸趴椅面，雙臂像大鵬展翅微屈外展，慢放 2 秒'
    },
    progression: {
      id: 'paused_reverse_fly',
      name: '反向飛鳥頂峰懸停 2 秒',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '展翅最高點用力擠壓肩膀後側懸停 2 秒，徹底強化肩膀後側線條',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 4, defaultWeightLbs: 9, isDumbbell: true,
      note: '最高點停頓 2 秒，專注肩膀後側燒灼感'
    }
  },

  // 18. 槌式彎舉
  dumbbell_hammer_curl: {
    baseId: 'dumbbell_hammer_curl',
    baseName: '槌式彎舉',
    targetArea: '手臂肱橈肌、肱肌（手臂厚度）',
    standard: {
      id: 'dumbbell_hammer_curl',
      name: '槌式彎舉',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '掌心相對垂直彎舉，加強手臂厚度',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '掌心相對垂直彎舉，加強手臂厚度'
    },
    regression: {
      id: 'seated_hammer_curl',
      name: '坐姿啞鈴槌式彎舉',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '坐姿挺胸操作，消除下肢擺盪，手腕舒適好發力',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 12, defaultWeightKg: 8, defaultWeightLbs: 15, isDumbbell: true,
      note: '坐姿掌心相對，大臂貼身，垂直彎舉'
    },
    progression: {
      id: 'cross_body_hammer_curl',
      name: '斜向十字交替槌式彎舉',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '啞鈴斜向胸口對角線提拉，極致孤立肱肌與前臂肌群',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '啞鈴朝對側鎖骨方向交替彎舉，頂端擠壓'
    }
  },

  // 19. 窄握伏地挺身
  close_grip_push_up: {
    baseId: 'close_grip_push_up',
    baseName: '窄握伏地挺身',
    targetArea: '手臂三頭肌、內側胸肌',
    standard: {
      id: 'close_grip_push_up',
      name: '窄握伏地挺身',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '窄握伏地挺身盡可能多次，充血三頭',
      cutSets: 3, bulkSets: 3, minReps: 5, maxReps: 30, asManyAsPossible: true, isDumbbell: false,
      note: '窄握伏地挺身盡可能多次，充血三頭'
    },
    regression: {
      id: 'knee_close_grip_push_up',
      name: '跪姿膝蓋著地窄握伏地挺身',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '雙膝著地減輕負載，手肘緊貼身體兩側後夾下壓，三頭肌安全充血',
      cutSets: 3, bulkSets: 3, minReps: 6, maxReps: 15, isDumbbell: false,
      note: '膝蓋跪地，手掌微窄於肩，手肘貼身下壓再推起'
    },
    progression: {
      id: 'decline_close_push_up',
      name: '雙腳墊高下斜窄握伏地挺身',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '雙腳墊在健身椅上，身體呈下斜角度，三頭肌承受極限體重壓力',
      cutSets: 3, bulkSets: 4, minReps: 6, maxReps: 15, isDumbbell: false,
      note: '腳踩健身椅，手撐地面窄握下壓推起'
    }
  },

  // 20. 啞鈴相撲深蹲
  dumbbell_sumo_squat: {
    baseId: 'dumbbell_sumo_squat',
    baseName: '啞鈴相撲深蹲',
    targetArea: '大腿內側內收肌、臀大肌',
    standard: {
      id: 'dumbbell_sumo_squat',
      name: '啞鈴相撲深蹲',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '寬站距相撲深蹲，加強大腿內側與臀肌',
      cutSets: 3, bulkSets: 4, minReps: 12, maxReps: 20, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true,
      note: '寬站距相撲深蹲，加強大腿內側與臀肌'
    },
    regression: {
      id: 'bodyweight_sumo_squat',
      name: '徒手寬距相撲深蹲',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '不持啞鈴徒手下蹲，減輕腰部壓力，專注大腿內側拉伸與臀大肌收縮',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, defaultWeightKg: 0, defaultWeightLbs: 0, isDumbbell: false,
      note: '徒手雙手胸前合十，膝蓋對準腳尖45度下蹲'
    },
    progression: {
      id: 'paused_sumo_squat',
      name: '相撲深蹲底部彈動加倍燃燒',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '蹲到底部做一次小幅半程彈動後再完全起立，深度燃燒臀腿肌群',
      cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 29, isDumbbell: true,
      note: '蹲到底部小彈一下再蹬起，頂端死命夾臀'
    }
  },

  // 21. 單腿羅馬尼亞硬舉
  single_leg_romanian_deadlift: {
    baseId: 'single_leg_romanian_deadlift',
    baseName: '單腿羅馬尼亞硬舉',
    targetArea: '單側大腿後側膕繩肌、臀中肌、平衡',
    standard: {
      id: 'single_leg_romanian_deadlift',
      name: '單腿羅馬尼亞硬舉',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '單腳支撐平衡，強化腿後側',
      cutSets: 3, bulkSets: 3, minReps: 10, maxReps: 15, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '單腳支撐平衡，強化腿後側'
    },
    regression: {
      id: 'b_stance_rdl',
      name: 'B-Stance 支撐式單腿硬舉',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '後腳腳尖輕點地形成三腳架輔助，徹底消除站不穩，80% 力量依然灌在大腿後側',
      cutSets: 3, bulkSets: 3, minReps: 8, maxReps: 12, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '後腳尖點地支撐，前腳髖部後推，每側 8–12 下'
    },
    progression: {
      id: 'single_leg_rdl_pause',
      name: '懸空單腿硬舉拉伸停頓 2 秒',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '前傾至身體與後腿呈水平線，深處拉伸停頓 2 秒，極致考驗臀腿與本體平衡',
      cutSets: 3, bulkSets: 4, minReps: 8, maxReps: 12, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 20, isDumbbell: true,
      note: '單腳水平懸停 2 秒，感受後腿深層拉滿後收臀站直'
    }
  },

  // 22. 啞鈴臀推
  dumbbell_hip_thrust: {
    baseId: 'dumbbell_hip_thrust',
    baseName: '啞鈴臀推',
    targetArea: '臀大肌、大腿後側',
    standard: {
      id: 'dumbbell_hip_thrust',
      name: '啞鈴臀推',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '背靠椅頂髖，頂峰夾緊臀肌 2 秒',
      cutSets: 3, bulkSets: 4, minReps: 12, maxReps: 20, defaultWeightKg: 8, defaultWeightLbs: 35, isDumbbell: true,
      note: '背靠椅頂髖，頂峰夾緊臀肌 2 秒'
    },
    regression: {
      id: 'double_leg_hip_thrust_bodyweight',
      name: '靠椅徒手雙腿臀推',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '背靠椅徒手頂髖，不放啞鈴，專注頂峰骨盆後傾夾臀感受度',
      cutSets: 3, bulkSets: 3, minReps: 12, maxReps: 20, isDumbbell: false,
      note: '雙腳踩地頂髖，頂端夾臀 2 秒'
    },
    progression: {
      id: 'paused_dumbbell_hip_thrust',
      name: '啞鈴臀推頂峰擠壓 3 秒',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '推至軀幹水平頂點死命夾緊臀大肌 3 秒，強制喚醒沉睡臀肌神經',
      cutSets: 3, bulkSets: 4, minReps: 10, maxReps: 15, defaultWeightKg: 8, defaultWeightLbs: 35, isDumbbell: true,
      note: '頂峰維持水平死命夾緊臀部 3 秒'
    }
  },

  // 23. 提踵
  calf_raise: {
    baseId: 'calf_raise',
    baseName: '提踵',
    targetArea: '小腿腓腸肌、比目魚肌',
    standard: {
      id: 'calf_raise',
      name: '提踵',
      level: 'standard',
      levelLabel: '標準',
      levelBadge: '🔵 標準',
      tagline: '腳尖最高點停頓 1 秒，鍛鍊小腿',
      cutSets: 3, bulkSets: 4, minReps: 15, maxReps: 25, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '腳尖最高點停頓 1 秒，鍛鍊小腿'
    },
    regression: {
      id: 'bodyweight_calf_raise',
      name: '徒手雙腳提踵',
      level: 'regression',
      levelLabel: '退階推薦',
      levelBadge: '🟢 退階推薦',
      tagline: '徒手雙腳平地提踵，手扶牆壁保持平衡，溫和刺激小腿肌群',
      cutSets: 3, bulkSets: 3, minReps: 15, maxReps: 25, defaultWeightKg: 0, defaultWeightLbs: 0, isDumbbell: false,
      note: '手扶牆，腳尖用力墊起至最高'
    },
    progression: {
      id: 'single_leg_calf_raise',
      name: '單腳負重提踵',
      level: 'progression',
      levelLabel: '進階挑戰',
      levelBadge: '🟣 進階挑戰',
      tagline: '單腳站立負重提踵，小腿承受雙倍體重與負載，爆發力十足',
      cutSets: 3, bulkSets: 4, minReps: 12, maxReps: 20, isPerSide: true, defaultWeightKg: 8, defaultWeightLbs: 26, isDumbbell: true,
      note: '單腳墊起最高點停頓 1 秒，每腿 12–20 下'
    }
  }
};

/**
 * 取得動作之難度變體配置
 */
function getExerciseVariation(baseId, targetLevel = 'standard') {
  const group = EXERCISE_VARIATIONS[baseId];
  if (!group) return null;
  if (targetLevel === 'regression' && group.regression) return group.regression;
  if (targetLevel === 'progression' && group.progression) return group.progression;
  return group.standard;
}

/**
 * 取得指定日期的課表，依當前時期 (cut 或 bulk) 與自訂配置動態生成組數與重量建議
 * 支援傳入 customExercises（全域動作自訂覆蓋）或當日特定的 overrides
 */
function getSplitForDate(date, phase = 'cut', customConfig = null) {
  const dayOfWeek = date.getDay(); // 0-6
  const splitKey = WEEKLY_SCHEDULE[dayOfWeek];
  const raw = WORKOUT_SPLITS[splitKey];
  if (!raw) return null;

  // 深拷貝，避免污染原物件
  const split = JSON.parse(JSON.stringify(raw));
  const isCut = phase === 'cut';
  const dumbbellType = customConfig?.dumbbellType || (isCut ? 'fixed' : 'adjustable_lbs');
  const targetSetsOverride = customConfig?.targetSetsDefault || customConfig?.targetSets;
  const customExercises = customConfig?.customExercises || {};
  const dayOverrides = customConfig?.dayOverrides || {};

  if (split.type === 'strength') {
    split.exercises = split.exercises.map(baseEx => {
      const baseId = baseEx.exerciseId;
      // 判定是否替換此動作：優先取當日覆蓋，其次取全域自訂替換
      const chosenLevelOrId = dayOverrides[baseId] || customExercises[baseId];
      let effectiveEx = { ...baseEx };
      let variationMeta = null;

      const group = EXERCISE_VARIATIONS[baseId];
      if (group) {
        if (chosenLevelOrId === 'regression' || (group.regression && group.regression.id === chosenLevelOrId)) {
          variationMeta = group.regression;
        } else if (chosenLevelOrId === 'progression' || (group.progression && group.progression.id === chosenLevelOrId)) {
          variationMeta = group.progression;
        } else {
          variationMeta = group.standard;
        }

        if (variationMeta) {
          effectiveEx = {
            ...effectiveEx,
            ...variationMeta,
            baseExerciseId: baseId,
            exerciseId: variationMeta.id,
            variationLevel: variationMeta.level,
            variationLevelLabel: variationMeta.levelLabel,
            variationBadge: variationMeta.levelBadge
          };
        }
      }

      const targetSets = targetSetsOverride || (isCut ? (effectiveEx.cutSets || 3) : (effectiveEx.bulkSets || 4));
      const isLbs = dumbbellType === 'adjustable_lbs';
      const defaultWeight = isCut
        ? (effectiveEx.defaultWeightKg !== undefined ? effectiveEx.defaultWeightKg : 8)
        : (isLbs ? (effectiveEx.defaultWeightLbs !== undefined ? effectiveEx.defaultWeightLbs : 20) : (effectiveEx.defaultWeightKg !== undefined ? effectiveEx.defaultWeightKg : 8));
      const weightUnit = (effectiveEx.isDumbbell && isLbs) ? 'lbs' : 'kg';

      return {
        ...effectiveEx,
        baseExerciseId: effectiveEx.baseExerciseId || baseId,
        targetSets,
        defaultWeight,
        weightUnit
      };
    });
  } else if (split.type === 'cardio' && split.cardioDetail) {
    split.cardioDetail.duration = isCut ? split.cardioDetail.cutDuration : split.cardioDetail.bulkDuration;
  }

  return split;
}

// 供向下相容的預設值（減脂期優先）
const PROGRESSION_LADDER = PHASE_CONFIGS.cut.progressionLadder;
const MEAL_TEMPLATES = PHASE_CONFIGS.cut.mealTemplates;
const NUTRITION_TARGETS = {
  dailyCalories: PHASE_CONFIGS.cut.dailyCalories,
  dailyProtein: PHASE_CONFIGS.cut.dailyProtein,
  water: PHASE_CONFIGS.cut.water,
  note: PHASE_CONFIGS.cut.nutritionNote
};

// 輔助函式
function getPhaseConfig(phase = 'cut') {
  return PHASE_CONFIGS[phase] || PHASE_CONFIGS.cut;
}

if (typeof window !== 'undefined') {
  window.ADJUSTABLE_DUMBBELL_LBS = ADJUSTABLE_DUMBBELL_LBS;
  window.PHASE_CONFIGS = PHASE_CONFIGS;
  window.WORKOUT_SPLITS = WORKOUT_SPLITS;
  window.WEEKLY_SCHEDULE = WEEKLY_SCHEDULE;
  window.EXERCISE_VARIATIONS = EXERCISE_VARIATIONS;
  window.getExerciseVariation = getExerciseVariation;
  window.getSplitForDate = getSplitForDate;
  window.getPhaseConfig = getPhaseConfig;
  window.PROGRESSION_LADDER = PROGRESSION_LADDER;
  window.MEAL_TEMPLATES = MEAL_TEMPLATES;
  window.NUTRITION_TARGETS = NUTRITION_TARGETS;
}

if (typeof global !== 'undefined') {
  global.ADJUSTABLE_DUMBBELL_LBS = ADJUSTABLE_DUMBBELL_LBS;
  global.PHASE_CONFIGS = PHASE_CONFIGS;
  global.WORKOUT_SPLITS = WORKOUT_SPLITS;
  global.WEEKLY_SCHEDULE = WEEKLY_SCHEDULE;
  global.EXERCISE_VARIATIONS = EXERCISE_VARIATIONS;
  global.getExerciseVariation = getExerciseVariation;
  global.getSplitForDate = getSplitForDate;
  global.getPhaseConfig = getPhaseConfig;
  global.PROGRESSION_LADDER = PROGRESSION_LADDER;
  global.MEAL_TEMPLATES = MEAL_TEMPLATES;
  global.NUTRITION_TARGETS = NUTRITION_TARGETS;
}
