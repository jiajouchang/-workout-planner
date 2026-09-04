/**
 * 訓練計劃行事曆 App - 靜態課表與飲食設定 (plan.js)
 * 專案設定：54 歲，173 cm，68 kg → 目標 75 kg、體脂 15–18%
 * 現有器材：8 kg 啞鈴 × 2、滾輪、單槓、健身椅
 */

const PROGRESSION_LADDER = [
  { stage: 0, name: '基礎次數累積', instruction: '在目標次數範圍內訓練，每組完成時保留 1–3 下餘力（RIR 1–3）。' },
  { stage: 1, name: '提升組數 (+1組)', instruction: '該動作增加 1 組（例如 3 組變 4 組），提高總訓練容量。' },
  { stage: 2, name: '放慢離心節奏 (3-4秒)', instruction: '下放重量時放慢節奏約 3–4 秒，維持肌肉張力，頂端停頓 1 秒。' },
  { stage: 3, name: '增加動作幅度 (ROM)', instruction: '在關節舒適範圍內做到全幅度動作（如深蹲更深、臥推貼胸下沉）。' },
  { stage: 4, name: '單側/弱側強化', instruction: '若為雙側動作可改為單側或專注弱側，先練弱邊並匹配次數。' },
  { stage: 5, name: '縮短組間休息', instruction: '將組間休息縮短 15–30 秒，提高訓練強度與代謝壓力。' }
];

const MEAL_TEMPLATES = [
  {
    id: 'breakfast',
    name: '早餐',
    icon: '🍳',
    proteinEst: '~30g',
    desc: '雞蛋 2–3 顆、無糖豆漿 400ml、燕麥片 50g、香蕉 1 根'
  },
  {
    id: 'lunch',
    name: '午餐',
    icon: '🍱',
    proteinEst: '~35g',
    desc: '白飯 1–1.5 碗、雞胸肉 / 鮮魚 / 瘦牛肉 150g、深綠色蔬菜 2 份'
  },
  {
    id: 'afternoon_snack',
    name: '下午點心',
    icon: '🍌',
    proteinEst: '~20g',
    desc: '無糖豆漿 350ml、香蕉 1 根、綜合堅果 1 小把（約 15-20g）'
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
    desc: '若當日蛋白質不足：無糖豆漿 300ml 或無糖希臘優格 150g'
  }
];

const NUTRITION_TARGETS = {
  dailyCalories: '2,400 – 2,600 kcal',
  dailyProtein: '~130 g',
  water: '2,500 – 3,000 ml',
  note: '體態重組階段，熱量維持小幅盈餘 (+200-300 kcal)，蛋白質吃足體重 1.8–2.0 倍。'
};

const WORKOUT_SPLITS = {
  upper_a: {
    id: 'upper_a',
    title: '上半身 A',
    type: 'strength',
    color: '#3b82f6',
    description: '重點：胸肌推力、背部引體與手臂肩部輔助',
    exercises: [
      { exerciseId: 'pull_up', targetSets: 4, minReps: 1, maxReps: 10, asManyAsPossible: true, note: '盡可能多次（進步階梯 1-3→5→8→10下）' },
      { exerciseId: 'dumbbell_bench_press', targetSets: 4, minReps: 8, maxReps: 15, defaultWeight: 8, note: '推至胸口正上方，手肘微內收45度' },
      { exerciseId: 'single_arm_dumbbell_row', targetSets: 4, minReps: 10, maxReps: 15, isPerSide: true, defaultWeight: 8, note: '每側 10–15 下，手肘順勢拉向髖部' },
      { exerciseId: 'dumbbell_shoulder_press', targetSets: 3, minReps: 8, maxReps: 15, defaultWeight: 8, note: '坐姿軀幹挺直，垂直向上推舉' },
      { exerciseId: 'dumbbell_lateral_raise', targetSets: 3, minReps: 12, maxReps: 20, defaultWeight: 4, note: '微屈手肘，平舉至與肩同高' },
      { exerciseId: 'dumbbell_bicep_curl', targetSets: 3, minReps: 10, maxReps: 15, defaultWeight: 8, note: '手肘貼緊身體，頂端擠壓二頭肌' },
      { exerciseId: 'dumbbell_tricep_extension', targetSets: 3, minReps: 10, maxReps: 15, defaultWeight: 8, note: '舉過頭頂彎肘下放再伸直' }
    ]
  },
  lower_a: {
    id: 'lower_a',
    title: '下半身 A + 核心',
    type: 'strength',
    color: '#10b981',
    description: '重點：腿部推力（深蹲）、單腿穩定度與核心抗伸展',
    exercises: [
      { exerciseId: 'goblet_squat', targetSets: 4, minReps: 12, maxReps: 20, defaultWeight: 8, note: '雙手持單鈴於胸前，下蹲至大腿平行' },
      { exerciseId: 'bulgarian_split_squat', targetSets: 4, minReps: 8, maxReps: 15, isPerSide: true, defaultWeight: 8, note: '後腳搭椅，前腳蹲深，每腿 8–15 下' },
      { exerciseId: 'dumbbell_romanian_deadlift', targetSets: 4, minReps: 10, maxReps: 15, defaultWeight: 8, note: '屁股後推背打直，大腿後側拉伸' },
      { exerciseId: 'single_leg_hip_thrust', targetSets: 3, minReps: 12, maxReps: 20, isPerSide: true, note: '單腳後跟踩地頂髖，頂端夾臀' },
      { exerciseId: 'ab_wheel_rollout', targetSets: 3, minReps: 6, maxReps: 15, note: '跪姿慢速向前滾動，腹肌收緊拉回' },
      { exerciseId: 'side_plank', targetSets: 3, minReps: 30, maxReps: 60, unit: '秒', isPerSide: true, note: '每側撐 30–60 秒，身體成一直線' }
    ]
  },
  cardio_rest: {
    id: 'cardio_rest',
    title: '有氧 / 休息',
    type: 'cardio',
    color: '#06b6d4',
    description: 'Zone 2 有氧 30–45 分鐘（快走、超慢跑或腳踏車，能對話但不能唱歌）',
    cardioDetail: {
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
      { exerciseId: 'pull_up', targetSets: 5, minReps: 1, maxReps: 12, asManyAsPossible: true, note: '5 組總量累積，不必每組力竭（如 8/7/6/5/5）' },
      { exerciseId: 'dumbbell_incline_bench_press', targetSets: 4, minReps: 8, maxReps: 15, defaultWeight: 8, note: '上斜 30–45 度，推起時擠壓上胸' },
      { exerciseId: 'dumbbell_bent_over_row', targetSets: 4, minReps: 10, maxReps: 15, defaultWeight: 8, note: '俯身 45 度，手肘貼身後拉夾背' },
      { exerciseId: 'dumbbell_arnold_press', targetSets: 3, minReps: 8, maxReps: 15, defaultWeight: 8, note: '胸前旋轉推至頂端，鍛鍊全肩' },
      { exerciseId: 'dumbbell_reverse_fly', targetSets: 3, minReps: 12, maxReps: 20, defaultWeight: 4, note: '俯身飛鳥展翅，專注肩膀後束' },
      { exerciseId: 'dumbbell_hammer_curl', targetSets: 3, minReps: 10, maxReps: 15, defaultWeight: 8, note: '掌心相對垂直彎舉，加強手臂厚度' },
      { exerciseId: 'close_grip_push_up', targetSets: 3, minReps: 5, maxReps: 30, asManyAsPossible: true, note: '窄握伏地挺身盡可能多次，充血三頭' }
    ]
  },
  lower_b: {
    id: 'lower_b',
    title: '下半身 B + 核心',
    type: 'strength',
    color: '#ec4899',
    description: '重點：分腿蹲強化、大腿內收與臀推爆發力',
    exercises: [
      { exerciseId: 'bulgarian_split_squat', targetSets: 4, minReps: 10, maxReps: 15, isPerSide: true, defaultWeight: 8, note: '每腿 10–15 下，專注臀腿主動發力' },
      { exerciseId: 'dumbbell_sumo_squat', targetSets: 4, minReps: 12, maxReps: 20, defaultWeight: 8, note: '寬站距相撲深蹲，加強大腿內側與臀肌' },
      { exerciseId: 'single_leg_romanian_deadlift', targetSets: 3, minReps: 10, maxReps: 15, isPerSide: true, defaultWeight: 8, note: '單腳支撐平衡，強化腿後側' },
      { exerciseId: 'dumbbell_hip_thrust', targetSets: 4, minReps: 12, maxReps: 20, defaultWeight: 8, note: '背靠椅頂髖，頂峰夾緊臀肌 2 秒' },
      { exerciseId: 'calf_raise', targetSets: 4, minReps: 15, maxReps: 25, defaultWeight: 8, note: '腳尖最高點停頓 1 秒，鍛鍊小腿' },
      { exerciseId: 'ab_wheel_rollout', targetSets: 3, minReps: 6, maxReps: 15, note: '腹肌持續發力，穩定控制往返' }
    ]
  },
  cardio_easy: {
    id: 'cardio_easy',
    title: '輕鬆跑 / 快走',
    type: 'cardio',
    color: '#f59e0b',
    description: '週末主動恢復：Zone 2 輕鬆快走或慢跑 30–45 分鐘',
    cardioDetail: {
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
 * 根據 Date 物件取得該日課表
 */
function getSplitForDate(date) {
  const dayOfWeek = date.getDay(); // 0-6
  const splitKey = WEEKLY_SCHEDULE[dayOfWeek];
  return WORKOUT_SPLITS[splitKey];
}

if (typeof window !== 'undefined') {
  window.PROGRESSION_LADDER = PROGRESSION_LADDER;
  window.MEAL_TEMPLATES = MEAL_TEMPLATES;
  window.NUTRITION_TARGETS = NUTRITION_TARGETS;
  window.WORKOUT_SPLITS = WORKOUT_SPLITS;
  window.WEEKLY_SCHEDULE = WEEKLY_SCHEDULE;
  window.getSplitForDate = getSplitForDate;
}
if (typeof global !== 'undefined') {
  global.PROGRESSION_LADDER = PROGRESSION_LADDER;
  global.MEAL_TEMPLATES = MEAL_TEMPLATES;
  global.NUTRITION_TARGETS = NUTRITION_TARGETS;
  global.WORKOUT_SPLITS = WORKOUT_SPLITS;
  global.WEEKLY_SCHEDULE = WEEKLY_SCHEDULE;
  global.getSplitForDate = getSplitForDate;
}
