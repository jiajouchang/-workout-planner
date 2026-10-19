(function() {
  // 1. Initial State & Data Store (localStorage)
  const STORAGE_KEY = 'workout_planner_data_v1';
  
  const defaultState = {
    version: 2,
    currentPhase: 'cut', // 'cut' (減脂期) 或 'bulk' (增肌期)
    phaseGoals: {
      cut: {
        startKg: 68.0,
        targetKg: 64.0,
        dailyCalories: '1,800 – 1,950 kcal',
        dailyProtein: '135 – 145 g',
        water: '2,500 – 3,000 ml',
        dumbbellType: 'fixed',
        targetSets: 3
      },
      bulk: {
        startKg: 64.0,
        targetKg: 75.0,
        dailyCalories: '2,400 – 2,600 kcal',
        dailyProtein: '125 – 135 g',
        water: '2,500 – 3,000 ml',
        dumbbellType: 'adjustable_lbs',
        targetSets: 4
      }
    },
    logs: {},
    progression: {},
    customExercises: {},
    bodyweight: [
      { date: '2026-09-01', kg: 68.0 }
    ],
    measurements: [
      { date: '2026-09-01', waist: 82.0, chest: 98.0, arm: 33.0, thigh: 54.0, kg: 68.0 }
    ]
  };

  let appState = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState;
      const parsed = JSON.parse(raw);
      if (!parsed.currentPhase) parsed.currentPhase = 'cut';
      if (!parsed.phaseGoals) {
        parsed.phaseGoals = JSON.parse(JSON.stringify(defaultState.phaseGoals));
      } else {
        if (!parsed.phaseGoals.cut) parsed.phaseGoals.cut = JSON.parse(JSON.stringify(defaultState.phaseGoals.cut));
        if (!parsed.phaseGoals.bulk) parsed.phaseGoals.bulk = JSON.parse(JSON.stringify(defaultState.phaseGoals.bulk));
      }
      if (!parsed.logs) parsed.logs = {};
      if (!parsed.progression) parsed.progression = {};
      if (!parsed.customExercises) parsed.customExercises = {};
      if (!parsed.bodyweight) parsed.bodyweight = [];
      if (!parsed.measurements) parsed.measurements = [];
      return parsed;
    } catch (e) {
      console.error('Failed to parse localStorage data:', e);
      return defaultState;
    }
  }

  function getActivePhaseConfig(phase = 'cut') {
    const base = getPhaseConfig(phase);
    const custom = (appState.phaseGoals && appState.phaseGoals[phase]) || {};
    const startKg = typeof custom.startKg === 'number' ? custom.startKg : base.startKg;
    const targetKg = typeof custom.targetKg === 'number' ? custom.targetKg : base.targetKg;
    const dailyCalories = custom.dailyCalories || base.dailyCalories;
    const dailyProtein = custom.dailyProtein || base.dailyProtein;
    const water = custom.water || base.water;
    const dumbbellType = custom.dumbbellType || base.dumbbellType;
    const targetSets = custom.targetSets || base.targetSetsDefault;

    const isLbs = dumbbellType === 'adjustable_lbs';
    const equipmentText = isLbs
      ? '升級器材：10 段可調式啞鈴 (9~55 LBS)、單槓、健身椅、滾輪'
      : '現有器材：8 kg 固定啞鈴 × 2、單槓、健身椅、滾輪';

    return {
      ...base,
      startKg,
      targetKg,
      targetRange: `${startKg.toFixed(1)} kg ➔ ${targetKg.toFixed(1)} kg`,
      dailyCalories,
      dailyProtein,
      water,
      dumbbellType,
      dumbbellUnit: isLbs ? 'lbs' : 'kg',
      targetSetsDefault: targetSets,
      equipmentText,
      nutritionSummary: `每日熱量：${dailyCalories} · 蛋白質 ${dailyProtein} · 飲水 ${water}`
    };
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  function showToast(msg) {
    const toast = document.getElementById('app-toast');
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 2200);
  }
  window.showToast = showToast;

  function startRestTimerFor(exId) {
    if (window.GymWork && window.GymWork.RestTimer) {
      const meta = (typeof EXERCISES_DATA !== 'undefined' && EXERCISES_DATA[exId]) ? EXERCISES_DATA[exId] : {};
      const restSec = window.GymWork.ExerciseIntelligence.getDefaultRestSeconds(exId);
      window.GymWork.RestTimer.start(restSec, meta.name || exId);
    }
  }

  function updateProfileBanner() {
    const curPhase = appState.currentPhase || 'cut';
    const cfg = getActivePhaseConfig(curPhase);
    const cutCfg = getActivePhaseConfig('cut');
    const bulkCfg = getActivePhaseConfig('bulk');

    const bannerBadge = document.getElementById('banner-phase-badge');
    const bannerEquipment = document.getElementById('banner-equipment');
    const bannerNutrition = document.getElementById('banner-nutrition-targets');

    if (bannerBadge) {
      bannerBadge.textContent = `${cfg.badge}：目標 ${cfg.targetKg.toFixed(1)} kg`;
      bannerBadge.className = `profile-tag ${curPhase === 'bulk' ? 'tag-bulk' : 'tag-cut'}`;
    }
    if (bannerEquipment) {
      bannerEquipment.textContent = cfg.equipmentText;
    }
    if (bannerNutrition) {
      bannerNutrition.textContent = cfg.nutritionSummary;
    }

    // Update Phase Selector Button Descriptions & Badges
    const descCut = document.getElementById('phase-desc-cut');
    if (descCut) {
      descCut.textContent = `目標：${cutCfg.targetRange} · ${cutCfg.dumbbellType === 'fixed' ? '8kg 啞鈴' : '可調啞鈴'} · ${cutCfg.targetSetsDefault}組 · ${cutCfg.dailyCalories} · 蛋白質 ${cutCfg.dailyProtein}`;
    }
    const descBulk = document.getElementById('phase-desc-bulk');
    if (descBulk) {
      descBulk.textContent = `目標：${bulkCfg.targetRange} · ${bulkCfg.dumbbellType === 'fixed' ? '8kg 啞鈴' : '可調啞鈴'} · ${bulkCfg.targetSetsDefault}組 · ${bulkCfg.dailyCalories} · 蛋白質 ${bulkCfg.dailyProtein}`;
    }

    // Update Phase Selector Buttons Active State
    document.querySelectorAll('.phase-btn').forEach(btn => {
      const p = btn.getAttribute('data-phase');
      btn.classList.toggle('active', p === curPhase);
    });

    // Check if latest weight unlocked bulk mode
    const weights = appState.bodyweight || [];
    let latestWeight = cfg.startKg;
    if (weights.length > 0) latestWeight = weights[weights.length - 1].kg;
    const bulkBadge = document.getElementById('bulk-unlocked-badge');
    if (bulkBadge) {
      bulkBadge.style.display = latestWeight <= cutCfg.targetKg ? 'inline-block' : 'none';
    }
  }

  // Bind Phase Switcher Buttons
  document.querySelectorAll('.phase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const phase = btn.getAttribute('data-phase');
      if (appState.currentPhase !== phase) {
        appState.currentPhase = phase;
        saveState();
        updateProfileBanner();
        renderCalendar();
        renderDailyView();
        renderProgressView();
        const targetConfig = getActivePhaseConfig(phase);
        showToast(phase === 'cut' ? `🔥 已切換為減脂期模式 (${targetConfig.targetRange})` : `💪 已切換為增肌期模式 (${targetConfig.targetRange})`);
      }
    });
  });

  // 2. Active Session View State
  let currentDate = new Date();
  let selectedDate = new Date(); // Currently selected date in check-in
  let calendarViewYear = currentDate.getFullYear();
  let calendarViewMonth = currentDate.getMonth(); // 0-11

  function formatDateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function parseDateKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  // 3. Tab Switching
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  function switchTab(tabId) {
    tabBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-tab') === tabId);
    });
    tabContents.forEach(c => {
      c.classList.toggle('active', c.id === `tab-${tabId}`);
    });

    if (tabId === 'calendar') {
      renderCalendar();
    } else if (tabId === 'daily') {
      renderDailyView();
    } else if (tabId === 'progress') {
      renderProgressView();
    }
  }

  // 4. Calendar Logic
  const calMonthYear = document.getElementById('calendar-month-year');
  const calDaysContainer = document.getElementById('calendar-days-container');

  document.getElementById('cal-prev-month').addEventListener('click', () => {
    calendarViewMonth--;
    if (calendarViewMonth < 0) {
      calendarViewMonth = 11;
      calendarViewYear--;
    }
    renderCalendar();
  });

  document.getElementById('cal-next-month').addEventListener('click', () => {
    calendarViewMonth++;
    if (calendarViewMonth > 11) {
      calendarViewMonth = 0;
      calendarViewYear++;
    }
    renderCalendar();
  });

  document.getElementById('cal-today-month').addEventListener('click', () => {
    const now = new Date();
    calendarViewYear = now.getFullYear();
    calendarViewMonth = now.getMonth();
    renderCalendar();
  });

  function getCompletionStatus(dateKey) {
    const curPhase = appState.currentPhase || 'cut';
    const activePhaseCfg = getActivePhaseConfig(curPhase);
    const dayLog = appState.logs[dateKey];
    const dateObj = parseDateKey(dateKey);
    const split = getSplitForDate(dateObj, curPhase, {
      ...activePhaseCfg,
      customExercises: appState.customExercises || {},
      dayOverrides: (dayLog && dayLog.exerciseOverrides) || {}
    });

    if (split.type === 'rest') {
      return 'completed';
    }

    if (split.type === 'cardio') {
      if (!dayLog || !dayLog.cardioDone) return 'not-started';
      return 'completed';
    }

    // Strength workout
    if (!dayLog || !dayLog.exercises) return 'not-started';
    const exKeys = Object.keys(dayLog.exercises);
    if (exKeys.length === 0) return 'not-started';

    let totalSets = 0;
    let doneSets = 0;
    split.exercises.forEach(targetEx => {
      totalSets += targetEx.targetSets;
      const exLog = dayLog.exercises[targetEx.exerciseId];
      if (exLog && exLog.sets) {
        exLog.sets.forEach(s => {
          if (s.done) doneSets++;
        });
      }
    });

    if (doneSets === 0) return 'not-started';
    if (doneSets >= totalSets) return 'completed';
    return 'partial';
  }

  function getSplitShortTitle(splitId, fullTitle) {
    if (splitId === 'upper_a') return '上A';
    if (splitId === 'lower_a') return '下A';
    if (splitId === 'upper_b') return '上B';
    if (splitId === 'lower_b') return '下B';
    if (splitId === 'cardio_rest') return '有氧';
    if (splitId === 'active_recovery') return '快走';
    if (splitId === 'full_rest') return '休息';
    if (fullTitle.includes('上半身 A')) return '上A';
    if (fullTitle.includes('下半身 A')) return '下A';
    if (fullTitle.includes('上半身 B')) return '上B';
    if (fullTitle.includes('下半身 B')) return '下B';
    if (fullTitle.includes('有氧')) return '有氧';
    if (fullTitle.includes('跑') || fullTitle.includes('走')) return '快走';
    if (fullTitle.includes('休')) return '休息';
    return fullTitle.slice(0, 2);
  }

  function renderCalendar() {
    const curPhase = appState.currentPhase || 'cut';
    const activePhaseCfg = getActivePhaseConfig(curPhase);
    calMonthYear.textContent = `${calendarViewYear} 年 ${calendarViewMonth + 1} 月`;
    calDaysContainer.innerHTML = '';

    const firstDayOfMonth = new Date(calendarViewYear, calendarViewMonth, 1);
    const lastDayOfMonth = new Date(calendarViewYear, calendarViewMonth + 1, 0);
    
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0-6 (Sun-Sat)
    const totalDays = lastDayOfMonth.getDate();

    // Previous Month Days (Padding)
    const prevMonthLastDay = new Date(calendarViewYear, calendarViewMonth, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const dayNum = prevMonthLastDay - i;
      const cell = document.createElement('div');
      cell.className = 'day-cell other-month';
      cell.innerHTML = `<div class="day-top-row"><span class="day-num">${dayNum}</span></div>`;
      calDaysContainer.appendChild(cell);
    }

    // Current Month Days
    const todayKey = formatDateKey(new Date());
    const selectedKey = formatDateKey(selectedDate);

    for (let day = 1; day <= totalDays; day++) {
      const thisDate = new Date(calendarViewYear, calendarViewMonth, day);
      const dateKey = formatDateKey(thisDate);
      const dayLog = appState.logs[dateKey];
      const split = getSplitForDate(thisDate, curPhase, {
        ...activePhaseCfg,
        customExercises: appState.customExercises || {},
        dayOverrides: (dayLog && dayLog.exerciseOverrides) || {}
      });
      const status = getCompletionStatus(dateKey);

      const cell = document.createElement('div');
      cell.className = 'day-cell';
      if (dateKey === todayKey) cell.classList.add('today');
      if (dateKey === selectedKey) cell.classList.add('selected');

      let statusLabel = '未開始';
      if (status === 'completed') statusLabel = '已完成';
      else if (status === 'partial') statusLabel = '部分完成';

      const shortTitle = getSplitShortTitle(split.id, split.title);

      cell.innerHTML = `
        <div class="day-top-row">
          <span class="day-num">${day}</span>
          ${dateKey === todayKey ? '<span class="day-today-tag">今日</span>' : ''}
        </div>
        <div class="day-content-badge" style="--split: ${split.color};">
          <span class="badge-text-full">${split.title}</span>
          <span class="badge-text-short">${shortTitle}</span>
        </div>
        <div class="status-dot-container">
          <span class="status-dot ${status}"></span>
          <span class="status-text">${statusLabel}</span>
        </div>
      `;

      cell.addEventListener('click', () => {
        selectedDate = thisDate;
        switchTab('daily');
      });

      calDaysContainer.appendChild(cell);
    }

    // Trailing padding to make grid complete (up to 35 or 42 cells)
    const cellsRendered = startingDayOfWeek + totalDays;
    const remainingCells = (7 - (cellsRendered % 7)) % 7;
    for (let i = 1; i <= remainingCells; i++) {
      const cell = document.createElement('div');
      cell.className = 'day-cell other-month';
      cell.innerHTML = `<div class="day-top-row"><span class="day-num">${i}</span></div>`;
      calDaysContainer.appendChild(cell);
    }
  }

  // 5. Daily View Logic
  const dailyDisplayDate = document.getElementById('daily-display-date');
  const dailySplitPill = document.getElementById('daily-split-pill');
  const dailySplitDesc = document.getElementById('daily-split-desc');
  const dailyWorkoutContainer = document.getElementById('daily-workout-container');

  document.getElementById('daily-prev-day').addEventListener('click', () => {
    selectedDate.setDate(selectedDate.getDate() - 1);
    renderDailyView();
  });

  document.getElementById('daily-next-day').addEventListener('click', () => {
    selectedDate.setDate(selectedDate.getDate() + 1);
    renderDailyView();
  });

  document.getElementById('daily-today-day').addEventListener('click', () => {
    selectedDate = new Date();
    renderDailyView();
  });

  document.getElementById('btn-jump-today').addEventListener('click', () => {
    selectedDate = new Date();
    switchTab('daily');
  });

  function checkProgressiveOverloadEligibility(exerciseId, targetMaxReps) {
    const targetKey = formatDateKey(selectedDate);
    const sortedDates = Object.keys(appState.logs).sort().reverse();
    for (const dKey of sortedDates) {
      if (dKey >= targetKey) continue;
      const exLog = appState.logs[dKey]?.exercises?.[exerciseId];
      if (exLog && exLog.sets && exLog.sets.length > 0) {
        const allReachedMax = exLog.sets.every(s => s.done && Number(s.reps) >= targetMaxReps);
        if (allReachedMax) return true;
        break;
      }
    }
    return false;
  }

  function renderDailyView() {
    const curPhase = appState.currentPhase || 'cut';
    const phaseCfg = getPhaseConfig(curPhase);
    const activePhaseCfg = getActivePhaseConfig(curPhase);
    const dateKey = formatDateKey(selectedDate);
    const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

    // Ensure state structure exists for this day
    if (!appState.logs[dateKey]) {
      appState.logs[dateKey] = {
        exercises: {},
        cardioDone: false,
        exerciseOverrides: {},
        meals: { breakfast: false, lunch: false, afternoon_snack: false, dinner: false, bedtime: false }
      };
    }
    const dayLog = appState.logs[dateKey];
    if (!dayLog.exerciseOverrides) dayLog.exerciseOverrides = {};

    const split = getSplitForDate(selectedDate, curPhase, {
      ...activePhaseCfg,
      customExercises: appState.customExercises || {},
      dayOverrides: dayLog.exerciseOverrides || {}
    });

    dailyDisplayDate.textContent = `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日 ${dayNames[selectedDate.getDay()]}`;
    dailySplitPill.textContent = split.title;
    dailySplitPill.style.setProperty('--split', split.color);
    dailySplitDesc.textContent = split.description;

    // Render Workout Section
    dailyWorkoutContainer.innerHTML = '';

    if (split.type === 'rest') {
      dailyWorkoutContainer.innerHTML = `
        <div class="cardio-card" style="border-color: #64748b;">
          <div style="font-size: 3rem; margin-bottom: 12px;">😴</div>
          <h3 style="font-size: 1.35rem; color: var(--text); margin-bottom: 8px;">今日完全休息日</h3>
          <p style="color: var(--text-muted); max-width: 520px; margin: 0 auto; line-height: 1.6;">
            肌肉在訓練中受到微細刺激，但在休息中才能修復並生長茁壯！
            今天請睡飽 7–8 小時、多喝水、正常攝取足量蛋白質，給身體充份恢復。
          </p>
        </div>
      `;
    } else if (split.type === 'cardio') {
      const isDone = !!dayLog.cardioDone;
      dailyWorkoutContainer.innerHTML = `
        <div class="cardio-card" style="border-color: ${split.color};">
          <div style="font-size: 3rem; margin-bottom: 8px;">🏃‍♂️</div>
          <h3 style="font-size: 1.35rem; color: var(--text); margin-bottom: 6px;">${split.title}</h3>
          <p style="color: var(--accent-cyan); font-weight: 600; margin-bottom: 10px;">${split.cardioDetail.intensity}</p>
          <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 480px; margin: 0 auto 8px;">
            建議運動項目：${split.cardioDetail.options.join(' · ')}
          </p>
          <p style="color: var(--text-2); font-size: 0.9rem; margin-bottom: 16px;">
            建議時長：<strong>${split.cardioDetail.duration}</strong>（${curPhase === 'cut' ? '減脂期加強有氧熱量赤字' : '增肌期維持心肺與恢復'}）
          </p>
          <button class="cardio-done-btn ${isDone ? 'active' : ''}" id="btn-toggle-cardio">
            ${isDone ? '✅ 今日有氧已完成！' : '打勾標記完成有氧'}
          </button>
        </div>
      `;

      document.getElementById('btn-toggle-cardio').addEventListener('click', () => {
        dayLog.cardioDone = !dayLog.cardioDone;
        saveState();
        renderDailyView();
        renderCalendar();
        showToast(dayLog.cardioDone ? '🎉 有氧打卡完成！' : '已取消有氧完成標記');
      });
    } else if (split.type === 'strength') {
      // Render Exercise Cards
      split.exercises.forEach(targetEx => {
        const baseExId = targetEx.baseExerciseId || targetEx.exerciseId;
        const exId = targetEx.exerciseId;
        const exMeta = (typeof EXERCISES_DATA !== 'undefined' && EXERCISES_DATA[exId]) ? EXERCISES_DATA[exId] : {
          name: exId,
          target_area: '全身肌群',
          tip: '依照動作要領平穩施力。',
          gif: `gifs/${exId}.gif`,
          steps: ['依自身節奏平穩操作。']
        };

        // 變體群組與階層資訊
        const varGroup = (typeof EXERCISE_VARIATIONS !== 'undefined' && EXERCISE_VARIATIONS[baseExId]) ? EXERCISE_VARIATIONS[baseExId] : null;
        const curLevel = targetEx.variationLevel || 'standard';
        const isGloballySet = (appState.customExercises && appState.customExercises[baseExId] === curLevel) || (!appState.customExercises?.[baseExId] && curLevel === 'standard');

        // 難度選擇膠囊與範圍勾選
        let tierHtml = '';
        if (varGroup) {
          tierHtml = `
            <div class="variation-tier-container">
              <div class="variation-tier-pills">
                <button type="button" class="tier-pill tier-regression ${curLevel === 'regression' ? 'active' : ''}" data-base="${baseExId}" data-level="regression" title="退階動作：${varGroup.regression?.name || '退階推薦'}">🟢 退階</button>
                <button type="button" class="tier-pill tier-standard ${curLevel === 'standard' ? 'active' : ''}" data-base="${baseExId}" data-level="standard" title="標準原課表：${varGroup.standard?.name || '標準動作'}">🔵 標準</button>
                <button type="button" class="tier-pill tier-progression ${curLevel === 'progression' ? 'active' : ''}" data-base="${baseExId}" data-level="progression" title="進階挑戰：${varGroup.progression?.name || '進階挑戰'}">🟣 進階</button>
              </div>
              <div class="variation-apply-scope">
                <label class="scope-checkbox-label" title="若勾選，日後所有此課表日期均套用此難度動作">
                  <input type="checkbox" class="cb-persist-scope" data-base="${baseExId}" ${isGloballySet ? 'checked' : ''}>
                  <span>設為課表預設</span>
                </label>
              </div>
            </div>
          `;
        }

        // Get or initialize progression stage
        if (!appState.progression[exId]) {
          appState.progression[exId] = { stageIndex: 0 };
        }
        const curStageIndex = appState.progression[exId].stageIndex;
        const progressionLadder = phaseCfg.progressionLadder || PROGRESSION_LADDER;
        const curProgression = progressionLadder[curStageIndex] || progressionLadder[0];

        // Check if overload upgrade is recommended
        const isUpgradeEligible = !targetEx.asManyAsPossible && checkProgressiveOverloadEligibility(exId, targetEx.maxReps);

        // Initialize exercise log sets if not present
        if (!dayLog.exercises[exId]) {
          dayLog.exercises[exId] = { sets: [] };
          for (let i = 0; i < targetEx.targetSets; i++) {
            dayLog.exercises[exId].sets.push({
              weight: targetEx.defaultWeight !== undefined ? targetEx.defaultWeight : (curPhase === 'cut' ? 8 : 20),
              reps: targetEx.minReps,
              rpe: null,
              done: false
            });
          }
        }
        const setsData = dayLog.exercises[exId].sets;
        const weightUnit = targetEx.weightUnit || (curPhase === 'bulk' && targetEx.isDumbbell ? 'lbs' : 'kg');

        // GymWork: Smart AI Recommendation
        let smartRecHtml = '';
        if (window.GymWork && window.GymWork.ExerciseIntelligence) {
          const rec = window.GymWork.ExerciseIntelligence.getSmartRecommendation(appState, exId, targetEx, curPhase, dateKey);
          if (rec) {
            smartRecHtml = `
              <div class="smart-recommendation-card">
                <div class="smart-rec-content">
                  <div class="smart-rec-badge">${rec.badge}</div>
                  <div class="smart-rec-text">${rec.advice}</div>
                </div>
                <button type="button" class="btn-apply-rec" data-ex="${exId}" data-weight="${rec.suggestedWeight}" data-reps="${rec.suggestedReps}">
                  ⚡ 套用推薦 (${rec.suggestedWeight} ${rec.unit} / ${rec.suggestedReps}下)
                </button>
              </div>
            `;
          }
        }

        // Build Overload Alert HTML
        let alertHtml = '';
        if (isUpgradeEligible) {
          if (curPhase === 'bulk' && targetEx.isDumbbell) {
            const curW = setsData[0]?.weight || 20;
            const idx = ADJUSTABLE_DUMBBELL_LBS.indexOf(curW);
            const nextLbs = idx >= 0 && idx < ADJUSTABLE_DUMBBELL_LBS.length - 1 ? ADJUSTABLE_DUMBBELL_LBS[idx + 1] : null;
            alertHtml = `
              <div class="progression-alert">
                <div class="progression-alert-text">
                  🔥 <strong>達成增肌超負荷標準！</strong> 上次訓練中所有組數均達到 ${targetEx.maxReps} 下上限。<br>
                  建議啞鈴升重至下一段：<strong>${nextLbs ? nextLbs + ' LBS' : '更高重量'}</strong>（目前使用 ${curW} LBS），或進階至下一超負荷階梯！
                </div>
                ${curStageIndex < progressionLadder.length - 1 ? `<button class="btn btn-sm btn-success" data-action="upgrade" data-ex="${exId}">採納升級</button>` : ''}
              </div>
            `;
          } else if (curStageIndex < progressionLadder.length - 1) {
            alertHtml = `
              <div class="progression-alert">
                <div class="progression-alert-text">
                  🔥 <strong>達成升級標準！</strong> 上次訓練中所有組數均達到 ${targetEx.maxReps} 下上限。<br>
                  建議進階至下一階：<strong>${progressionLadder[curStageIndex + 1].name}</strong> — ${progressionLadder[curStageIndex + 1].instruction}
                </div>
                <button class="btn btn-sm btn-success" data-action="upgrade" data-ex="${exId}">採納升級</button>
              </div>
            `;
          }
        }

        // Dumbbell Quick Select Bar
        let dumbbellBarHtml = '';
        if (targetEx.isDumbbell) {
          if (curPhase === 'bulk') {
            dumbbellBarHtml = `
              <div class="dumbbell-quick-bar">
                <span class="dumbbell-quick-label">🎛️ 10段可調啞鈴快速選重 (LBS)：</span>
                <div class="dumbbell-quick-pills">
                  ${ADJUSTABLE_DUMBBELL_LBS.map(lbs => `
                    <button type="button" class="btn-dumbbell-pill" data-lbs="${lbs}" data-ex="${exId}">${lbs}</button>
                  `).join('')}
                </div>
              </div>
            `;
          } else {
            dumbbellBarHtml = `
              <div class="dumbbell-quick-bar cut-badge-bar">
                <span class="dumbbell-quick-label" style="color: var(--cut-ink);">🏋️ 現用器材：8 kg 固定啞鈴 × 2（減脂期專注標準軌跡與慢速離心）</span>
              </div>
            `;
          }
        }

        const card = document.createElement('div');
        card.className = 'exercise-card';

        card.innerHTML = `
          <div class="exercise-card-header">
            <div class="exercise-name-area">
              <h3>
                <span>${exMeta.name}</span>
                <span class="badge-diff-level badge-diff-${curLevel}">${targetEx.variationLevelLabel || '標準'}</span>
                <span class="muscle-badge">${exMeta.target_area}</span>
              </h3>
              <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">
                ${exMeta.tip}
              </div>
            </div>
            <div style="display: flex; gap: 10px; align-items: flex-start; flex-wrap: wrap;">
              ${tierHtml}
              <span class="exercise-stage-badge" style="margin-top: 4px;">階梯：${curProgression.name}</span>
            </div>
          </div>

          ${targetEx.tagline ? `
            <div class="variation-info-banner ${curLevel}">
              <span style="font-size: 1.1rem; flex-shrink: 0;">${curLevel === 'regression' ? '🟢' : (curLevel === 'progression' ? '🟣' : '🔵')}</span>
              <div>
                <strong style="color: var(--text);">${targetEx.variationLevelLabel || '動作難度'}特色：</strong>
                ${targetEx.tagline}
              </div>
            </div>
          ` : ''}

          ${alertHtml}
          ${smartRecHtml}

          <div class="exercise-body-grid">
            <div class="gif-container">
              <img src="${exMeta.gif}" alt="${exMeta.name}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'180\\' height=\\'180\\' viewBox=\\'0 0 180 180\\'><rect fill=\\'%23eef2f7\\' width=\\'180\\' height=\\'180\\'/><text fill=\\'%235b6b82\\' font-size=\\'14\\' x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\'>${exMeta.name}</text></svg>'">
            </div>

            <div class="exercise-details">
              <div class="exercise-target-line">
                <span>🎯 目標：${targetEx.targetSets} 組 × ${targetEx.asManyAsPossible ? '盡可能多次' : `${targetEx.minReps}–${targetEx.maxReps} 下`}</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">（${targetEx.note || 'RIR 1–2，留餘力不力竭'}）</span>
              </div>

              <div class="steps-box">
                <strong style="color: var(--text); display: block; margin-bottom: 4px;">動作步驟：</strong>
                <ol>
                  ${exMeta.steps.map(s => `<li>${s}</li>`).join('')}
                </ol>
              </div>

              ${dumbbellBarHtml}

              <!-- Sets Table -->
              <div class="sets-table-wrapper">
                <table class="sets-table">
                  <thead>
                    <tr>
                      <th>組別</th>
                      <th>重量 (${weightUnit})</th>
                      <th>次數</th>
                      <th>自覺強度 (RPE)</th>
                      <th>預估 1RM</th>
                      <th>打卡狀態</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${setsData.map((s, idx) => {
                      const est1RM = window.GymWork ? window.GymWork.ExerciseIntelligence.estimate1RM(s.weight, s.reps) : 0;
                      const curRpe = (s.rpe !== undefined && s.rpe !== null) ? s.rpe : '';
                      return `
                      <tr>
                        <td>第 ${idx + 1} 組</td>
                        <td>
                          <input type="number" class="set-input set-weight" data-ex="${exId}" data-set="${idx}" value="${s.weight || 0}" step="0.5">
                        </td>
                        <td>
                          <input type="number" class="set-input set-reps" data-ex="${exId}" data-set="${idx}" value="${s.reps || 0}">
                        </td>
                        <td>
                          <select class="rpe-select set-rpe" data-ex="${exId}" data-set="${idx}" title="自覺運動強度（RPE 8 = 還能做2下；RPE 9 = 還能做1下；RPE 10 = 完全力竭）">
                            <option value="" ${curRpe === '' ? 'selected' : ''}>請選擇 RPE</option>
                            <option value="6.0" ${curRpe == 6 ? 'selected' : ''}>6 (非常輕鬆)</option>
                            <option value="7.0" ${curRpe == 7 ? 'selected' : ''}>7 (餘3下以上)</option>
                            <option value="7.5" ${curRpe == 7.5 ? 'selected' : ''}>7.5 (餘2~3下)</option>
                            <option value="8.0" ${curRpe == 8 ? 'selected' : ''}>8 (黃金區 餘2下)</option>
                            <option value="8.5" ${curRpe == 8.5 ? 'selected' : ''}>8.5 (餘1~2下)</option>
                            <option value="9.0" ${curRpe == 9 ? 'selected' : ''}>9 (極度挑戰 餘1下)</option>
                            <option value="9.5" ${curRpe == 9.5 ? 'selected' : ''}>9.5 (極限邊緣)</option>
                            <option value="10.0" ${curRpe == 10 ? 'selected' : ''}>10 (完全力竭)</option>
                          </select>
                        </td>
                        <td>
                          <span class="est-1rm-badge" data-unit="${weightUnit}">${est1RM > 0 ? `${est1RM} ${weightUnit}` : '-'}</span>
                        </td>
                        <td>
                          <button class="set-check-btn ${s.done ? 'done' : ''}" data-action="toggle-set" data-ex="${exId}" data-set="${idx}">
                            ${s.done ? '✓ 已完成' : '標記完成'}
                          </button>
                        </td>
                      </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>

              <div class="sets-actions">
                <button class="btn btn-sm" data-action="add-set" data-ex="${exId}">+ 增加 1 組</button>
                ${setsData.length > 1 ? `<button class="btn btn-sm" data-action="remove-set" data-ex="${exId}">- 減少 1 組</button>` : ''}
                <button class="btn btn-sm btn-primary" data-action="complete-all-sets" data-ex="${exId}">全組標記完成</button>
              </div>
            </div>
          </div>
        `;

        dailyWorkoutContainer.appendChild(card);
      });

      // Bind Difficulty Tier Pill Click Events
      dailyWorkoutContainer.querySelectorAll('.tier-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          const baseEx = btn.getAttribute('data-base');
          const targetLevel = btn.getAttribute('data-level');
          const cb = dailyWorkoutContainer.querySelector(`.cb-persist-scope[data-base="${baseEx}"]`);
          const persistScope = cb ? cb.checked : false;

          if (persistScope) {
            if (!appState.customExercises) appState.customExercises = {};
            appState.customExercises[baseEx] = targetLevel;
            if (dayLog.exerciseOverrides) delete dayLog.exerciseOverrides[baseEx];
          } else {
            if (!dayLog.exerciseOverrides) dayLog.exerciseOverrides = {};
            dayLog.exerciseOverrides[baseEx] = targetLevel;
          }

          saveState();
          renderDailyView();
          renderCalendar();

          const varGroup = (typeof EXERCISE_VARIATIONS !== 'undefined' && EXERCISE_VARIATIONS[baseEx]) ? EXERCISE_VARIATIONS[baseEx] : null;
          const actObj = varGroup ? (varGroup[targetLevel] || varGroup.standard) : null;
          const actName = actObj ? actObj.name : targetLevel;
          showToast(`已切換為【${actName}】${persistScope ? '（已設為日後固定課表預設）' : '（僅套用今日打卡）'}`);
        });
      });

      // Bind Scope Checkbox Direct Change Events
      dailyWorkoutContainer.querySelectorAll('.cb-persist-scope').forEach(cb => {
        cb.addEventListener('change', () => {
          const baseEx = cb.getAttribute('data-base');
          const card = cb.closest('.exercise-card');
          const activePill = card.querySelector('.tier-pill.active');
          const curLevel = activePill ? activePill.getAttribute('data-level') : 'standard';

          if (cb.checked) {
            if (!appState.customExercises) appState.customExercises = {};
            appState.customExercises[baseEx] = curLevel;
            if (dayLog.exerciseOverrides) delete dayLog.exerciseOverrides[baseEx];
            showToast(`已將此動作設定為日後固定課表預設！`);
          } else {
            if (appState.customExercises && appState.customExercises[baseEx]) {
              delete appState.customExercises[baseEx];
            }
            if (!dayLog.exerciseOverrides) dayLog.exerciseOverrides = {};
            dayLog.exerciseOverrides[baseEx] = curLevel;
            showToast(`已改為僅在此日打卡套用`);
          }
          saveState();
        });
      });

      // Bind Dumbbell Quick Pill Click Events
      dailyWorkoutContainer.querySelectorAll('.btn-dumbbell-pill').forEach(pill => {
        pill.addEventListener('click', () => {
          const exId = pill.getAttribute('data-ex');
          const lbs = parseFloat(pill.getAttribute('data-lbs'));
          if (dayLog.exercises[exId] && dayLog.exercises[exId].sets) {
            dayLog.exercises[exId].sets.forEach(s => {
              s.weight = lbs;
            });
            saveState();
            renderDailyView();
            showToast(`已套用啞鈴重量：${lbs} LBS`);
          }
        });
      });

      // Helper to update 1RM badge dynamically without full re-render
      const updateRow1RMLive = (inputEl) => {
        const row = inputEl.closest('tr');
        if (!row) return;
        const badge = row.querySelector('.est-1rm-badge');
        if (!badge) return;
        const w = parseFloat(row.querySelector('.set-weight')?.value) || 0;
        const r = parseInt(row.querySelector('.set-reps')?.value, 10) || 0;
        const est = window.GymWork ? window.GymWork.ExerciseIntelligence.estimate1RM(w, r) : 0;
        const unit = badge.getAttribute('data-unit') || 'kg';
        badge.textContent = est > 0 ? `${est} ${unit}` : '-';
      };

      // Bind Exercise Card Interactive Events
      dailyWorkoutContainer.querySelectorAll('.set-weight').forEach(input => {
        input.addEventListener('input', (e) => updateRow1RMLive(e.target));
        input.addEventListener('change', (e) => {
          const exId = e.target.getAttribute('data-ex');
          const setIdx = Number(e.target.getAttribute('data-set'));
          dayLog.exercises[exId].sets[setIdx].weight = parseFloat(e.target.value) || 0;
          updateRow1RMLive(e.target);
          saveState();
        });
      });

      dailyWorkoutContainer.querySelectorAll('.set-reps').forEach(input => {
        input.addEventListener('input', (e) => updateRow1RMLive(e.target));
        input.addEventListener('change', (e) => {
          const exId = e.target.getAttribute('data-ex');
          const setIdx = Number(e.target.getAttribute('data-set'));
          dayLog.exercises[exId].sets[setIdx].reps = parseInt(e.target.value, 10) || 0;
          updateRow1RMLive(e.target);
          saveState();
        });
      });

      // Bind RPE select change events
      dailyWorkoutContainer.querySelectorAll('.set-rpe').forEach(select => {
        select.addEventListener('change', (e) => {
          const exId = e.target.getAttribute('data-ex');
          const setIdx = Number(e.target.getAttribute('data-set'));
          const val = e.target.value;
          dayLog.exercises[exId].sets[setIdx].rpe = val ? parseFloat(val) : null;
          saveState();
        });
      });

      // Bind Apply Recommendation click events (only apply to non-completed sets)
      dailyWorkoutContainer.querySelectorAll('.btn-apply-rec').forEach(btn => {
        btn.addEventListener('click', () => {
          const exId = btn.getAttribute('data-ex');
          const recW = parseFloat(btn.getAttribute('data-weight')) || 0;
          const recR = parseInt(btn.getAttribute('data-reps'), 10) || 0;

          if (dayLog.exercises[exId] && dayLog.exercises[exId].sets) {
            let appliedCount = 0;
            dayLog.exercises[exId].sets.forEach(s => {
              if (!s.done) {
                s.weight = recW;
                s.reps = recR;
                appliedCount++;
              }
            });
            if (appliedCount > 0) {
              saveState();
              renderDailyView();
              showToast(`已套用推薦 (${recW} / ${recR}下) 至未完成的 ${appliedCount} 組！`);
            } else {
              showToast(`該動作今日所有組數皆已完成打卡，未進行覆蓋。`);
            }
          }
        });
      });

      dailyWorkoutContainer.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = btn.getAttribute('data-action');
          const exId = btn.getAttribute('data-ex');

          if (action === 'toggle-set') {
            const setIdx = Number(btn.getAttribute('data-set'));
            const cur = dayLog.exercises[exId].sets[setIdx];
            cur.done = !cur.done;
            saveState();
            renderDailyView();
            renderCalendar();

            // GymWork: Auto-start Rest Timer on completion
            if (cur.done) {
              startRestTimerFor(exId);
            }
          } else if (action === 'add-set') {
            const prev = dayLog.exercises[exId].sets[dayLog.exercises[exId].sets.length - 1] || { weight: curPhase === 'cut' ? 8 : 20, reps: 10, rpe: null };
            dayLog.exercises[exId].sets.push({ weight: prev.weight, reps: prev.reps, rpe: null, done: false });
            saveState();
            renderDailyView();
          } else if (action === 'remove-set') {
            dayLog.exercises[exId].sets.pop();
            saveState();
            renderDailyView();
            renderCalendar();
          } else if (action === 'complete-all-sets') {
            dayLog.exercises[exId].sets.forEach(s => s.done = true);
            saveState();
            renderDailyView();
            renderCalendar();
            showToast('已完成該動作所有組數！');

            // GymWork: Auto-start Rest Timer on completing all sets
            startRestTimerFor(exId);
          } else if (action === 'upgrade') {
            appState.progression[exId].stageIndex++;
            saveState();
            renderDailyView();
            const ladder = phaseCfg.progressionLadder || PROGRESSION_LADDER;
            showToast(`🚀 已成功晉升至：${ladder[appState.progression[exId].stageIndex]?.name || '下一階'}`);
          }
        });
      });
    }

    // Render Meals Checkboxes
    renderMeals(dayLog);
  }

  function renderMeals(dayLog) {
    const curPhase = appState.currentPhase || 'cut';
    const phaseCfg = getPhaseConfig(curPhase);
    const mealsList = document.getElementById('meals-list');
    const counter = document.getElementById('meals-completed-counter');
    const goalDesc = document.getElementById('meals-goal-desc');
    if (goalDesc) {
      goalDesc.textContent = `${phaseCfg.nutritionSummary} · ${phaseCfg.nutritionNote}`;
    }
    mealsList.innerHTML = '';

    if (!dayLog.meals) {
      dayLog.meals = { breakfast: false, lunch: false, afternoon_snack: false, dinner: false, bedtime: false };
    }

    let completedMeals = 0;
    const templates = phaseCfg.mealTemplates || MEAL_TEMPLATES;

    templates.forEach(meal => {
      const isChecked = !!dayLog.meals[meal.id];
      if (isChecked) completedMeals++;

      const row = document.createElement('div');
      row.className = `meal-row ${isChecked ? 'checked' : ''}`;
      row.innerHTML = `
        <div class="meal-info">
          <input type="checkbox" class="meal-checkbox" ${isChecked ? 'checked' : ''}>
          <div>
            <strong style="color: var(--text); font-size: 1rem;">${meal.icon} ${meal.name}</strong>
            <span class="muscle-badge" style="margin-left: 6px;">蛋白質 ${meal.proteinEst}</span>
            <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 3px;">
              ${meal.desc}
            </div>
          </div>
        </div>
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; color: ${isChecked ? '#059669' : '#5b6b82'};">
            ${isChecked ? '✓ 已攝取' : '未打卡'}
          </span>
        </div>
      `;

      row.addEventListener('click', (e) => {
        if (e.target.tagName !== 'INPUT') {
          const cb = row.querySelector('.meal-checkbox');
          cb.checked = !cb.checked;
        }
        dayLog.meals[meal.id] = row.querySelector('.meal-checkbox').checked;
        saveState();
        renderMeals(dayLog);
      });

      mealsList.appendChild(row);
    });

    counter.textContent = `今日已打卡 ${completedMeals} / ${templates.length} 餐`;
  }

  // 6. Progress View Logic
  function renderProgressView() {
    const curPhase = appState.currentPhase || 'cut';
    const cfg = getActivePhaseConfig(curPhase);
    const isCut = cfg.targetKg < cfg.startKg;

    const weights = appState.bodyweight || [];
    let latestWeight = cfg.startKg;
    if (weights.length > 0) {
      latestWeight = weights[weights.length - 1].kg;
    }
    document.getElementById('banner-curr-weight').textContent = `${latestWeight.toFixed(1)} kg`;

    // Calculate 7-day Weekly Average
    const now = new Date();
    const past7Days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      past7Days.push(formatDateKey(d));
    }
    const recentWeights = weights.filter(w => past7Days.includes(w.date)).map(w => w.kg);
    let weekAvg = latestWeight;
    if (recentWeights.length > 0) {
      weekAvg = recentWeights.reduce((a, b) => a + b, 0) / recentWeights.length;
    }
    document.getElementById('stat-week-avg').textContent = `${weekAvg.toFixed(1)} kg`;

    // Milestone Title and Description
    const milestoneTitle = document.getElementById('milestone-title');
    if (milestoneTitle) {
      milestoneTitle.textContent = `🎯 ${cfg.name}階段里程碑（${cfg.startKg.toFixed(1)} kg ➔ ${cfg.targetKg.toFixed(1)} kg）`;
    }
    const milestoneDesc = document.getElementById('milestone-desc');
    if (milestoneDesc) {
      milestoneDesc.textContent = `起點 ${cfg.startKg.toFixed(1)} kg → 目標 ${cfg.targetKg.toFixed(1)} kg（${isCut ? '維持充足蛋白質抗流失，達標後可開啟增肌期或自訂新目標' : '熱量盈餘超負荷，達標後可開啟精實減脂或自訂新目標'}）`;
    }

    // Dynamic 5 Milestone Markers
    const markersContainer = document.getElementById('milestone-markers-container');
    if (markersContainer) {
      markersContainer.innerHTML = '';
      for (let i = 0; i <= 4; i++) {
        const stepVal = cfg.startKg + (cfg.targetKg - cfg.startKg) * (i / 4);
        const span = document.createElement('span');
        if (i === 0) span.textContent = `${stepVal.toFixed(1)} kg (起點)`;
        else if (i === 4) span.textContent = `${stepVal.toFixed(1)} kg (目標)`;
        else span.textContent = `${stepVal.toFixed(1)} kg`;
        markersContainer.appendChild(span);
      }
    }

    // Progress Bar Percentage & Diff calculation
    const totalSpan = Math.abs(cfg.targetKg - cfg.startKg);
    let percent = 0;
    let diffFromStart = 0;
    let isTargetReached = false;

    const diffLabel = document.getElementById('stat-total-diff-label');
    if (isCut) {
      diffFromStart = weekAvg - cfg.startKg;
      const progressLost = cfg.startKg - weekAvg;
      percent = totalSpan > 0 ? Math.min(100, Math.max(0, (progressLost / totalSpan) * 100)) : 0;
      isTargetReached = (weekAvg <= cfg.targetKg) || (latestWeight <= cfg.targetKg);

      if (diffLabel) diffLabel.textContent = '減脂進度：';

      const diffText = diffFromStart <= 0 ? `已減 ${Math.abs(diffFromStart).toFixed(1)} kg` : `+${diffFromStart.toFixed(1)} kg`;
      const remText = isTargetReached ? '（已達標！🎉）' : `（距目標差 ${Math.max(0, weekAvg - cfg.targetKg).toFixed(1)} kg）`;
      document.getElementById('stat-total-diff').textContent = `${diffText} ${remText}`;
    } else {
      diffFromStart = weekAvg - cfg.startKg;
      const progressGained = weekAvg - cfg.startKg;
      percent = totalSpan > 0 ? Math.min(100, Math.max(0, (progressGained / totalSpan) * 100)) : 0;
      isTargetReached = (weekAvg >= cfg.targetKg) || (latestWeight >= cfg.targetKg);

      if (diffLabel) diffLabel.textContent = '增肌進度：';

      const diffText = diffFromStart >= 0 ? `已增 +${diffFromStart.toFixed(1)} kg` : `${diffFromStart.toFixed(1)} kg`;
      const remText = isTargetReached ? '（已達標！🎉）' : `（距目標差 ${Math.max(0, cfg.targetKg - weekAvg).toFixed(1)} kg）`;
      document.getElementById('stat-total-diff').textContent = `${diffText} ${remText}`;
    }

    const barFill = document.getElementById('milestone-progress-fill');
    if (barFill) barFill.style.width = `${percent.toFixed(1)}%`;

    // Milestone Congratulations Banner
    const congratsCard = document.getElementById('milestone-congrats-card');
    if (congratsCard) {
      if (isTargetReached) {
        congratsCard.style.display = 'block';
        if (isCut) {
          congratsCard.innerHTML = `
            🎉 <strong>恭喜達成 ${cfg.targetKg.toFixed(1)} kg 減脂目標！</strong> 體脂肪精實到位，線條分明！<br>
            隨時可切換至【💪 增肌期】或點擊「⚙️ 調整目標」開啟下一輪循環！
          `;
        } else {
          congratsCard.innerHTML = `
            🎉 <strong>恭喜達成 ${cfg.targetKg.toFixed(1)} kg 增肌目標！</strong> 力量與維度顯著成長！<br>
            隨時可切換至【🔥 減脂期】進行精實雕塑，或點擊「⚙️ 調整目標」挑戰更高里程碑！
          `;
        }
      } else {
        congratsCard.style.display = 'none';
      }
    }

    // Caloric Tuning Advice Logic
    renderCaloricAdvice(weights, isCut, cfg);

    // Render SVG Line Chart
    renderWeightChart(weights);

    // Render Measurements Table
    renderMeasurementsTable();

    // Render Strength Records
    renderStrengthRecords();

    // Render GymWork Weekly Volume Dashboard
    const volContainer = document.getElementById('weekly-volume-dashboard-container');
    if (volContainer && window.GymWork && window.GymWork.MuscleVolumeAnalytics) {
      volContainer.innerHTML = window.GymWork.MuscleVolumeAnalytics.renderVolumeDashboard(appState, selectedDate);
    }
  }

  function renderCaloricAdvice(weights, isCut, cfg) {
    const adviceBox = document.getElementById('caloric-advice-box');
    if (!weights || weights.length < 3) {
      adviceBox.innerHTML = `
        💡 <strong>熱量微調提醒：</strong> 剛開始記錄中。建議每週記錄 3–4 次晨起空腹體重，系統將在累計滿 2 週後自動給予熱量微調建議。
      `;
      adviceBox.style.borderLeftColor = 'var(--border-color)';
      return;
    }

    // Group weights by 7-day intervals
    const sorted = [...weights].sort((a, b) => a.date.localeCompare(b.date));
    const firstDate = new Date(sorted[0].date);
    const lastDate = new Date(sorted[sorted.length - 1].date);
    const daySpan = Math.max(1, Math.round((lastDate - firstDate) / (1000 * 3600 * 24)));

    if (daySpan < 14) {
      adviceBox.innerHTML = `
        ✅ <strong>體重追蹤中：</strong> 目前記錄累計 ${daySpan} 天，體重穩定追蹤中。請持續落實每日 ${cfg.dailyCalories} 與蛋白質 ${cfg.dailyProtein} 目標！
      `;
      adviceBox.style.borderLeftColor = 'var(--border-color)';
      return;
    }

    // Calculate rate of gain/loss
    const totalGain = sorted[sorted.length - 1].kg - sorted[0].kg;
    const weeks = daySpan / 7;
    const ratePerWeek = totalGain / weeks;

    if (isCut) {
      if (ratePerWeek >= -0.05) {
        adviceBox.innerHTML = `
          ⚠️ <strong>減脂熱量微調提醒：</strong> 近期體重下降停滯（每週變化 ${ratePerWeek >= 0 ? '+' : ''}${ratePerWeek.toFixed(2)} kg）。<br>
          <strong>建議方案：</strong> 每日熱量<strong>微幅減少 150–200 kcal</strong>（例如晚餐澱粉減 1/3 碗或減少烹調用油），或將 Zone 2 有氧增加 10–15 分鐘以擴大赤字。
        `;
        adviceBox.style.borderLeftColor = '#ea580c';
      } else if (ratePerWeek < -0.8) {
        adviceBox.innerHTML = `
          ⚠️ <strong>減脂熱量微調提醒：</strong> 近期每週減重達 <strong>${Math.abs(ratePerWeek).toFixed(2)} kg</strong>（下降過快 >0.8 kg/週），可能有肌肉流失風險。<br>
          <strong>建議方案：</strong> 每日熱量<strong>增加約 100–150 kcal</strong> 優質碳水或蛋白質，減緩掉重速度以保全肌肉。
        `;
        adviceBox.style.borderLeftColor = '#ef4444';
      } else {
        adviceBox.innerHTML = `
          🎉 <strong>減脂進展極佳：</strong> 目前平均每週減重約 <strong>${Math.abs(ratePerWeek).toFixed(2)} kg</strong>，完全符合精實減脂且最大限度保留肌肉的黃金速度！請繼續保持。
        `;
        adviceBox.style.borderLeftColor = '#10b981';
      }
    } else {
      if (ratePerWeek <= 0.05) {
        adviceBox.innerHTML = `
          ⚠️ <strong>增肌熱量微調提醒：</strong> 近期體重增加停滯（每週變化 ${ratePerWeek >= 0 ? '+' : ''}${ratePerWeek.toFixed(2)} kg）。<br>
          <strong>建議方案：</strong> 每日熱量<strong>增加 150–200 kcal</strong>（例如下午點心多加半碗飯、1 根香蕉或 1 杯無糖豆漿）以維持微幅熱量盈餘。
        `;
        adviceBox.style.borderLeftColor = '#ea580c';
      } else if (ratePerWeek > 0.4) {
        adviceBox.innerHTML = `
          ⚠️ <strong>增肌熱量微調提醒：</strong> 近期每週增加達 <strong>${ratePerWeek.toFixed(2)} kg</strong>（超出理想範圍 >0.4 kg/週），可能有較多脂肪堆積。<br>
          <strong>建議方案：</strong> 每日熱量<strong>減少 150–200 kcal</strong>，維持每月約 +0.5 kg 的精實增肌節奏。
        `;
        adviceBox.style.borderLeftColor = '#ef4444';
      } else {
        adviceBox.innerHTML = `
          🎉 <strong>增肌進展極佳：</strong> 目前平均每週增加約 <strong>${ratePerWeek.toFixed(2)} kg</strong>，契合精實增肌的黃金重組速度！請繼續保持訓練與營養節奏。
        `;
        adviceBox.style.borderLeftColor = '#10b981';
      }
    }
  }

  function renderWeightChart(weights) {
    const svg = document.getElementById('weight-svg');
    svg.innerHTML = '';
    if (!weights || weights.length === 0) return;

    const sorted = [...weights].sort((a, b) => a.date.localeCompare(b.date)).slice(-15);
    if (sorted.length < 2) {
      svg.innerHTML = `<text x="50%" y="50%" fill="#5b6b82" font-size="12" text-anchor="middle">需至少 2 筆體重記錄以繪製趨勢圖</text>`;
      return;
    }

    const width = svg.clientWidth || 500;
    const height = svg.clientHeight || 200;
    const padX = 40;
    const padY = 30;

    const minKg = Math.min(...sorted.map(w => w.kg)) - 0.5;
    const maxKg = Math.max(...sorted.map(w => w.kg)) + 0.5;

    const points = sorted.map((w, idx) => {
      const x = padX + (idx / (sorted.length - 1)) * (width - padX * 2);
      const y = height - padY - ((w.kg - minKg) / (maxKg - minKg)) * (height - padY * 2);
      return { x, y, kg: w.kg, date: w.date };
    });

    // Path d
    let d = `M ${points[0].x} ${points[0].y}`;
    points.slice(1).forEach(p => {
      d += ` L ${p.x} ${p.y}`;
    });

    // Draw grid lines
    const gridLines = `<line x1="${padX}" y1="${height - padY}" x2="${width - padX}" y2="${height - padY}" stroke="#e3e8ef" stroke-width="1"/>`;
    
    // Draw polyline
    const pathLine = `<path d="${d}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>`;

    // Draw points and labels
    const dots = points.map(p => `
      <circle cx="${p.x}" cy="${p.y}" r="4" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
      <text x="${p.x}" y="${p.y - 8}" fill="#334155" font-size="10" text-anchor="middle">${p.kg.toFixed(1)}</text>
      <text x="${p.x}" y="${height - 10}" fill="#5b6b82" font-size="9" text-anchor="middle">${p.date.slice(5)}</text>
    `).join('');

    svg.innerHTML = gridLines + pathLine + dots;
  }

  function renderMeasurementsTable() {
    const tbody = document.getElementById('measure-tbody');
    tbody.innerHTML = '';
    const list = (appState.measurements || []).sort((a, b) => b.date.localeCompare(a.date));
    
    list.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.date}</td>
        <td>${item.waist || '-'} cm</td>
        <td>${item.chest || '-'} cm</td>
        <td>${item.arm || '-'} cm</td>
        <td>${item.thigh || '-'} cm</td>
      `;
      tbody.appendChild(tr);
    });
  }

  function renderStrengthRecords() {
    const container = document.getElementById('strength-records-list');
    container.innerHTML = '';

    // Extract maximum pull-up reps and dumbbell weight/reps from all logs
    let maxPullUp = 0;
    let maxBenchWeight = 0;
    let maxSquatWeight = 0;
    let maxRDLWeight = 0;

    Object.values(appState.logs).forEach(day => {
      if (!day.exercises) return;
      if (day.exercises.pull_up?.sets) {
        day.exercises.pull_up.sets.forEach(s => {
          if (s.done && Number(s.reps) > maxPullUp) maxPullUp = Number(s.reps);
        });
      }
      if (day.exercises.dumbbell_bench_press?.sets) {
        day.exercises.dumbbell_bench_press.sets.forEach(s => {
          if (s.done && Number(s.weight) > maxBenchWeight) maxBenchWeight = Number(s.weight);
        });
      }
      if (day.exercises.goblet_squat?.sets) {
        day.exercises.goblet_squat.sets.forEach(s => {
          if (s.done && Number(s.weight) > maxSquatWeight) maxSquatWeight = Number(s.weight);
        });
      }
      if (day.exercises.dumbbell_romanian_deadlift?.sets) {
        day.exercises.dumbbell_romanian_deadlift.sets.forEach(s => {
          if (s.done && Number(s.weight) > maxRDLWeight) maxRDLWeight = Number(s.weight);
        });
      }
    });

    const records = [
      { name: '單槓引體向上', value: maxPullUp > 0 ? `單組最佳 ${maxPullUp} 下` : '尚未記錄（目標：1-3 → 5 → 8 → 10下）' },
      { name: '啞鈴臥推', value: maxBenchWeight > 0 ? `最高使用 ${maxBenchWeight} kg` : '8 kg 啞鈴' },
      { name: '高腳杯深蹲', value: maxSquatWeight > 0 ? `最高使用 ${maxSquatWeight} kg` : '8 kg 啞鈴' },
      { name: '啞鈴羅馬尼亞硬舉', value: maxRDLWeight > 0 ? `最高使用 ${maxRDLWeight} kg` : '8 kg 啞鈴' }
    ];

    records.forEach(r => {
      const div = document.createElement('div');
      div.style.cssText = 'display: flex; justify-content: space-between; padding: 8px 12px; background: var(--bg-input); border-radius: var(--radius-sm); border: 1px solid var(--border-color);';
      div.innerHTML = `<span>${r.name}</span><strong style="color: var(--primary);">${r.value}</strong>`;
      container.appendChild(div);
    });
  }

  // Weight & Measurement Save Buttons
  document.getElementById('btn-save-weight').addEventListener('click', () => {
    const dateInput = document.getElementById('weight-input-date');
    const kgInput = document.getElementById('weight-input-kg');
    const dateVal = dateInput.value || formatDateKey(new Date());
    const kgVal = parseFloat(kgInput.value);

    if (!kgVal || isNaN(kgVal)) {
      alert('請輸入有效的體重數值！');
      return;
    }

    // Upsert by date
    const existingIdx = appState.bodyweight.findIndex(w => w.date === dateVal);
    if (existingIdx >= 0) {
      appState.bodyweight[existingIdx].kg = kgVal;
    } else {
      appState.bodyweight.push({ date: dateVal, kg: kgVal });
    }
    appState.bodyweight.sort((a, b) => a.date.localeCompare(b.date));

    saveState();
    renderProgressView();
    showToast(`已儲存 ${dateVal} 體重：${kgVal.toFixed(1)} kg`);
    kgInput.value = '';
  });

  document.getElementById('btn-save-measure').addEventListener('click', () => {
    const date = document.getElementById('measure-date').value || formatDateKey(new Date());
    const waist = parseFloat(document.getElementById('measure-waist').value) || null;
    const chest = parseFloat(document.getElementById('measure-chest').value) || null;
    const arm = parseFloat(document.getElementById('measure-arm').value) || null;
    const thigh = parseFloat(document.getElementById('measure-thigh').value) || null;

    if (!waist && !chest && !arm && !thigh) {
      alert('請至少填寫一項圍度數值');
      return;
    }

    appState.measurements.push({ date, waist, chest, arm, thigh });
    saveState();
    renderMeasurementsTable();
    showToast(`已新增 ${date} 圍度記錄！`);
    document.getElementById('measure-waist').value = '';
    document.getElementById('measure-chest').value = '';
    document.getElementById('measure-arm').value = '';
    document.getElementById('measure-thigh').value = '';
  });

  // 7. Backup & Restore (JSON Export & Import)
  document.getElementById('btn-export').addEventListener('click', () => {
    const jsonStr = JSON.stringify(appState, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workout-planner-backup-${formatDateKey(new Date())}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('已匯出備份檔案！');
  });

  const fileInput = document.getElementById('file-import-input');
  document.getElementById('btn-import').addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!imported.logs || !imported.bodyweight) {
          alert('檔案格式不相符！');
          return;
        }
        appState = imported;
        if (!appState.customExercises) appState.customExercises = {};
        saveState();
        updateProfileBanner();
        renderCalendar();
        renderDailyView();
        renderProgressView();
        showToast('備份資料匯入成功！');
      } catch (err) {
        alert('匯入失敗：無效的 JSON 檔案');
      }
    };
    reader.readAsText(file);
  });

  // 8. Goal Settings Modal Logic
  const modalOverlay = document.getElementById('goal-modal-overlay');
  const modalForm = document.getElementById('goal-settings-form');
  let modalActivePhase = 'cut';

  function openGoalModal(phaseToEdit) {
    modalActivePhase = phaseToEdit || appState.currentPhase || 'cut';
    const cfg = getActivePhaseConfig(modalActivePhase);

    // Set radio buttons
    const radioCut = document.getElementById('modal-phase-cut');
    const radioBulk = document.getElementById('modal-phase-bulk');
    if (modalActivePhase === 'bulk') {
      radioBulk.checked = true;
    } else {
      radioCut.checked = true;
    }

    // Populate fields
    document.getElementById('modal-start-kg').value = cfg.startKg;
    document.getElementById('modal-target-kg').value = cfg.targetKg;
    document.getElementById('modal-daily-calories').value = cfg.dailyCalories;
    document.getElementById('modal-daily-protein').value = cfg.dailyProtein;
    document.getElementById('modal-dumbbell-type').value = cfg.dumbbellType;
    document.getElementById('modal-target-sets').value = String(cfg.targetSetsDefault || 3);

    // Update latest weight helper button label
    const weights = appState.bodyweight || [];
    const latestW = weights.length > 0 ? weights[weights.length - 1].kg : cfg.startKg;
    document.getElementById('modal-latest-weight-val').textContent = latestW.toFixed(1);

    modalOverlay.classList.add('active');
  }

  function closeGoalModal() {
    modalOverlay.classList.remove('active');
  }

  // Switch phase radio inside modal
  document.querySelectorAll('input[name="modal-phase"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      modalActivePhase = e.target.value;
      const cfg = getActivePhaseConfig(modalActivePhase);
      document.getElementById('modal-start-kg').value = cfg.startKg;
      document.getElementById('modal-target-kg').value = cfg.targetKg;
      document.getElementById('modal-daily-calories').value = cfg.dailyCalories;
      document.getElementById('modal-daily-protein').value = cfg.dailyProtein;
      document.getElementById('modal-dumbbell-type').value = cfg.dumbbellType;
      document.getElementById('modal-target-sets').value = String(cfg.targetSetsDefault || 3);
    });
  });

  // Fill latest weight button
  document.getElementById('btn-fill-latest-weight').addEventListener('click', () => {
    const weights = appState.bodyweight || [];
    if (weights.length > 0) {
      const latest = weights[weights.length - 1].kg;
      document.getElementById('modal-start-kg').value = latest.toFixed(1);
      showToast(`已填入最新體重：${latest.toFixed(1)} kg 作為新起點`);
    } else {
      showToast('目前尚無記錄體重');
    }
  });

  // Reset phase to defaults
  document.getElementById('btn-reset-modal-phase').addEventListener('click', () => {
    const base = getPhaseConfig(modalActivePhase);
    document.getElementById('modal-start-kg').value = base.startKg;
    document.getElementById('modal-target-kg').value = base.targetKg;
    document.getElementById('modal-daily-calories').value = base.dailyCalories;
    document.getElementById('modal-daily-protein').value = base.dailyProtein;
    document.getElementById('modal-dumbbell-type').value = base.dumbbellType;
    document.getElementById('modal-target-sets').value = String(base.targetSetsDefault || 3);
    showToast(`已還原${base.name}預設值`);
  });

  // Save form
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const startKg = parseFloat(document.getElementById('modal-start-kg').value);
    const targetKg = parseFloat(document.getElementById('modal-target-kg').value);
    const dailyCalories = document.getElementById('modal-daily-calories').value.trim() || (modalActivePhase === 'cut' ? '1,800 – 1,950 kcal' : '2,400 – 2,600 kcal');
    const dailyProtein = document.getElementById('modal-daily-protein').value.trim() || (modalActivePhase === 'cut' ? '135 – 145 g' : '125 – 135 g');
    const dumbbellType = document.getElementById('modal-dumbbell-type').value;
    const targetSets = parseInt(document.getElementById('modal-target-sets').value, 10) || 3;

    if (isNaN(startKg) || isNaN(targetKg) || startKg <= 0 || targetKg <= 0) {
      alert('請填寫有效的起點與目標體重！');
      return;
    }

    if (!appState.phaseGoals) appState.phaseGoals = {};
    appState.phaseGoals[modalActivePhase] = {
      startKg,
      targetKg,
      dailyCalories,
      dailyProtein,
      water: '2,500 – 3,000 ml',
      dumbbellType,
      targetSets
    };

    // Switch to selected phase
    appState.currentPhase = modalActivePhase;
    saveState();

    closeGoalModal();
    updateProfileBanner();
    renderCalendar();
    renderDailyView();
    renderProgressView();
    showToast(`🎯 已儲存並套用【${modalActivePhase === 'cut' ? '減脂期' : '增肌期'}】自訂目標！`);
  });

  // Close modal events
  document.getElementById('btn-close-modal').addEventListener('click', closeGoalModal);
  document.getElementById('btn-cancel-modal').addEventListener('click', closeGoalModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeGoalModal();
  });

  // Open modal trigger buttons
  const btnHeaderGoals = document.getElementById('btn-header-goals');
  if (btnHeaderGoals) btnHeaderGoals.addEventListener('click', () => openGoalModal());
  const btnOpenPhaseSettings = document.getElementById('btn-open-phase-settings');
  if (btnOpenPhaseSettings) btnOpenPhaseSettings.addEventListener('click', () => openGoalModal());
  const btnEditProgressGoal = document.getElementById('btn-edit-progress-goal');
  if (btnEditProgressGoal) btnEditProgressGoal.addEventListener('click', () => openGoalModal());

  // 9. Exercise Difficulty Customizer Modal Logic
  const customizerModalOverlay = document.getElementById('exercise-customizer-modal-overlay');
  const customizerContainer = document.getElementById('customizer-split-groups-container');
  let tempCustomExercises = {};

  function openExerciseCustomizerModal() {
    tempCustomExercises = JSON.parse(JSON.stringify(appState.customExercises || {}));
    renderCustomizerContent();
    customizerModalOverlay.classList.add('active');
  }

  function closeExerciseCustomizerModal() {
    customizerModalOverlay.classList.remove('active');
  }

  function renderCustomizerContent() {
    if (!customizerContainer) return;
    customizerContainer.innerHTML = '';

    const splitKeys = [
      { key: 'upper_a', name: '上半身 A', desc: '胸肌推力、背部引體與手臂肩部輔助' },
      { key: 'lower_a', name: '下半身 A + 核心', desc: '高腳杯深蹲、保加利亞分腿蹲、硬舉與核心' },
      { key: 'upper_b', name: '上半身 B', desc: '引體向上量累積、上胸厚度與背部後側立體感' },
      { key: 'lower_b', name: '下半身 B + 核心', desc: '保加利亞分腿蹲、相撲深蹲、單腿硬舉與臀推' }
    ];

    splitKeys.forEach(splitInfo => {
      const rawSplit = WORKOUT_SPLITS[splitInfo.key];
      if (!rawSplit || rawSplit.type !== 'strength') return;

      const box = document.createElement('div');
      box.className = 'customizer-split-box';

      let rowsHtml = '';
      rawSplit.exercises.forEach(exObj => {
        const baseId = exObj.exerciseId;
        const group = EXERCISE_VARIATIONS[baseId];
        if (!group) return;

        const currentChosen = tempCustomExercises[baseId] || 'standard';
        const activeVariant = group[currentChosen] || group.standard;

        rowsHtml += `
          <div class="customizer-row" data-base-id="${baseId}">
            <div class="customizer-row-info">
              <div class="customizer-row-title">
                <span>${group.baseName}</span>
                <span class="muscle-badge">${group.targetArea}</span>
              </div>
              <div class="customizer-row-desc" id="custom-desc-${baseId}">
                目前選用：<strong>${activeVariant.name}</strong>（${activeVariant.levelLabel}）— ${activeVariant.tagline}
              </div>
            </div>
            <div class="variation-tier-pills">
              <button type="button" class="tier-pill tier-regression ${currentChosen === 'regression' ? 'active' : ''}" data-custom-base="${baseId}" data-custom-level="regression" title="退階：${group.regression?.name || '無'}">🟢 退階</button>
              <button type="button" class="tier-pill tier-standard ${currentChosen === 'standard' ? 'active' : ''}" data-custom-base="${baseId}" data-custom-level="standard" title="標準：${group.standard?.name || '標準'}">🔵 標準</button>
              <button type="button" class="tier-pill tier-progression ${currentChosen === 'progression' ? 'active' : ''}" data-custom-base="${baseId}" data-custom-level="progression" title="進階：${group.progression?.name || '無'}">🟣 進階</button>
            </div>
          </div>
        `;
      });

      box.innerHTML = `
        <div class="customizer-split-title" style="--split: ${rawSplit.color};">
          <span>🏋️ ${splitInfo.name}</span>
          <span style="font-size: 0.76rem; color: var(--text-muted); font-weight: normal;">— ${splitInfo.desc}</span>
        </div>
        <div class="customizer-rows-wrapper">
          ${rowsHtml}
        </div>
      `;

      customizerContainer.appendChild(box);
    });

    // 綁定自訂面板內的按鈕切換
    customizerContainer.querySelectorAll('button[data-custom-base]').forEach(btn => {
      btn.addEventListener('click', () => {
        const baseId = btn.getAttribute('data-custom-base');
        const level = btn.getAttribute('data-custom-level');
        tempCustomExercises[baseId] = level;

        // 更新所有同一動作的按鈕 active 狀態
        customizerContainer.querySelectorAll(`button[data-custom-base="${baseId}"]`).forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-custom-level') === level);
        });

        // 更新該行的說明文字
        const group = EXERCISE_VARIATIONS[baseId];
        if (group) {
          const activeVariant = group[level] || group.standard;
          customizerContainer.querySelectorAll(`#custom-desc-${baseId}`).forEach(descEl => {
            descEl.innerHTML = `目前選用：<strong>${activeVariant.name}</strong>（${activeVariant.levelLabel}）— ${activeVariant.tagline}`;
          });
        }
      });
    });
  }

  // 保存課表自訂動作難度
  document.getElementById('btn-save-exercise-customizer').addEventListener('click', () => {
    appState.customExercises = JSON.parse(JSON.stringify(tempCustomExercises));
    saveState();
    closeExerciseCustomizerModal();
    renderDailyView();
    renderCalendar();
    showToast('🎉 自訂課表動作難度已成功儲存並套用！');
  });

  // 全部還原為原課表標準
  document.getElementById('btn-reset-all-exercises').addEventListener('click', () => {
    tempCustomExercises = {};
    renderCustomizerContent();
    showToast('已重置為原課表標準動作，請點擊「儲存」確認套用。');
  });

  // 關閉自訂彈窗
  document.getElementById('btn-close-customizer-modal').addEventListener('click', closeExerciseCustomizerModal);
  document.getElementById('btn-cancel-customizer-modal').addEventListener('click', closeExerciseCustomizerModal);
  customizerModalOverlay.addEventListener('click', (e) => {
    if (e.target === customizerModalOverlay) closeExerciseCustomizerModal();
  });

  // 打開自訂彈窗觸發按鈕
  const btnOpenCustomizer = document.getElementById('btn-open-exercise-customizer');
  if (btnOpenCustomizer) {
    btnOpenCustomizer.addEventListener('click', openExerciseCustomizerModal);
  }

  // Set default date input values
  document.getElementById('weight-input-date').value = formatDateKey(new Date());
  document.getElementById('measure-date').value = formatDateKey(new Date());

  // Initialize GymWork Features
  if (window.GymWork && window.GymWork.RestTimer) {
    window.GymWork.RestTimer.init();
  }

  // Boot application
  updateProfileBanner();
  renderCalendar();
  renderDailyView();
  renderProgressView();
})();
