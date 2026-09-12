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
 * 取得指定日期的課表，依當前時期 (cut 或 bulk) 與自訂配置動態生成組數與重量建議
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

  if (split.type === 'strength') {
    split.exercises = split.exercises.map(ex => {
      const targetSets = targetSetsOverride || (isCut ? (ex.cutSets || 3) : (ex.bulkSets || 4));
      const isLbs = dumbbellType === 'adjustable_lbs';
      const defaultWeight = isCut
        ? (ex.defaultWeightKg || 8)
        : (isLbs ? (ex.defaultWeightLbs || 20) : (ex.defaultWeightKg || 8));
      const weightUnit = (ex.isDumbbell && isLbs) ? 'lbs' : 'kg';

      return {
        ...ex,
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
  global.getSplitForDate = getSplitForDate;
  global.getPhaseConfig = getPhaseConfig;
  global.PROGRESSION_LADDER = PROGRESSION_LADDER;
  global.MEAL_TEMPLATES = MEAL_TEMPLATES;
  global.NUTRITION_TARGETS = NUTRITION_TARGETS;
}
