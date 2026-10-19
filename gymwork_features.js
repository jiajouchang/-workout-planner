/**
 * GymWork 核心功能引擎 (gymwork_features.js)
 * 經過嚴格 Code Review 與架構強化：
 * 1. Web Audio + Vibration + VisibilityChange 組間休息倒數計時器 (RestTimer)
 * 2. RPE 與 1RM 雙重漸進智慧重量推薦演算法 (ExerciseIntelligence)
 * 3. 精確肌群訓練容量與組數分配分析 (MuscleVolumeAnalytics)
 */

(function (window) {
  'use strict';

  // =========================================================================
  // 1. Web Audio & Vibration 組間休息計時器 (RestTimer)
  // =========================================================================
  const RestTimer = {
    audioCtx: null,
    timerId: null,
    finishTimeoutId: null,
    endTime: null,
    totalSeconds: 90,
    remainingSeconds: 0,
    lastBeepSecond: null,
    currentExerciseName: '',
    isMuted: false,
    originalTitle: document.title || '訓練計劃行事曆 App | Workout Planner',

    init() {
      // 讀取靜音偏好
      try {
        this.isMuted = localStorage.getItem('gymwork_timer_muted') === 'true';
      } catch (e) {}

      this.createWidget();
      this.bindEvents();
      this.bindVisibility();
    },

    getAudioContext() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          this.audioCtx = new AudioContext();
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      return this.audioCtx;
    },

    playBeep(freq = 600, duration = 0.1, type = 'sine') {
      if (this.isMuted) return;
      try {
        const ctx = this.getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch (e) {
        // Audio API may fail gracefully
      }
    },

    playFinishBeep() {
      if (this.isMuted) return;
      this.playBeep(880, 0.15, 'triangle');
      setTimeout(() => this.playBeep(1174, 0.35, 'triangle'), 160);
    },

    createWidget() {
      if (document.getElementById('gymwork-rest-timer-widget')) return;

      const widget = document.createElement('div');
      widget.id = 'gymwork-rest-timer-widget';
      widget.className = 'rest-timer-widget hidden';
      widget.setAttribute('role', 'timer');
      widget.setAttribute('aria-live', 'polite');
      widget.innerHTML = `
        <div class="rest-timer-card">
          <div class="rest-timer-header">
            <div class="rest-timer-title-group">
              <span class="rest-timer-icon" aria-hidden="true">⏱️</span>
              <div>
                <strong class="rest-timer-title">組間休息中</strong>
                <span class="rest-timer-ex-name" id="timer-ex-name">動作名稱</span>
              </div>
            </div>
            <div class="rest-timer-tools">
              <button type="button" class="timer-btn-tool" id="btn-timer-mute" aria-label="切換靜音" title="靜音切換">${this.isMuted ? '🔇' : '🔊'}</button>
              <button type="button" class="timer-btn-tool" id="btn-timer-close" aria-label="關閉計時器" title="關閉計時">✕</button>
            </div>
          </div>

          <div class="rest-timer-display">
            <div class="rest-timer-digits" id="timer-display-digits">01:30</div>
            <div class="rest-progress-bar-bg" aria-hidden="true">
              <div class="rest-progress-bar-fill" id="timer-progress-fill" style="width: 100%;"></div>
            </div>
          </div>

          <div class="rest-timer-actions">
            <button type="button" class="timer-action-btn" id="btn-timer-minus15" aria-label="減少15秒">-15秒</button>
            <button type="button" class="timer-action-btn" id="btn-timer-plus30" aria-label="增加30秒">+30秒</button>
            <button type="button" class="timer-action-btn timer-btn-skip" id="btn-timer-skip" aria-label="跳過休息">跳過休息 ▶</button>
          </div>
        </div>
      `;
      document.body.appendChild(widget);
    },

    bindEvents() {
      const widget = document.getElementById('gymwork-rest-timer-widget');
      if (!widget) return;

      widget.querySelector('#btn-timer-close').addEventListener('click', () => this.stop(false));
      widget.querySelector('#btn-timer-skip').addEventListener('click', () => this.stop(true));
      
      widget.querySelector('#btn-timer-minus15').addEventListener('click', () => {
        this.adjustTime(-15);
      });

      widget.querySelector('#btn-timer-plus30').addEventListener('click', () => {
        this.adjustTime(30);
      });

      const muteBtn = widget.querySelector('#btn-timer-mute');
      muteBtn.addEventListener('click', () => {
        this.isMuted = !this.isMuted;
        muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
        try {
          localStorage.setItem('gymwork_timer_muted', String(this.isMuted));
        } catch (e) {}
      });
    },

    bindVisibility() {
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && this.endTime) {
          const now = Date.now();
          if (now >= this.endTime) {
            this.onFinish();
          } else {
            this.updateDisplay();
          }
        }
      });
    },

    start(seconds = 90, exerciseName = '') {
      if (this.finishTimeoutId) {
        clearTimeout(this.finishTimeoutId);
        this.finishTimeoutId = null;
      }

      this.getAudioContext();
      this.currentExerciseName = exerciseName || '訓練動作';
      this.totalSeconds = Math.max(10, seconds);
      this.remainingSeconds = this.totalSeconds;
      this.lastBeepSecond = null;
      this.endTime = Date.now() + this.totalSeconds * 1000;

      const widget = document.getElementById('gymwork-rest-timer-widget');
      if (widget) {
        widget.classList.remove('hidden');
        widget.classList.remove('finished');
        document.getElementById('timer-ex-name').textContent = this.currentExerciseName;
      }

      this.updateDisplay();
      if (this.timerId) clearInterval(this.timerId);

      this.timerId = setInterval(() => {
        const now = Date.now();
        const diff = Math.ceil((this.endTime - now) / 1000);
        this.remainingSeconds = Math.max(0, diff);

        this.updateDisplay();

        // 倒數提示音 (最後 3 秒，每整數秒只響一次)
        if (this.remainingSeconds <= 3 && this.remainingSeconds > 0) {
          if (this.lastBeepSecond !== this.remainingSeconds) {
            this.lastBeepSecond = this.remainingSeconds;
            this.playBeep(560, 0.08);
          }
        }

        if (this.remainingSeconds <= 0) {
          this.onFinish();
        }
      }, 300);
    },

    adjustTime(delta) {
      if (!this.endTime || this.remainingSeconds <= 0) {
        // 如果已經結束或未計時，直接重新開始
        this.start(Math.max(15, delta > 0 ? delta : 30), this.currentExerciseName);
        return;
      }

      this.endTime += delta * 1000;
      const now = Date.now();
      this.totalSeconds = Math.max(this.totalSeconds, Math.ceil((this.endTime - now) / 1000));
      this.remainingSeconds = Math.max(0, Math.ceil((this.endTime - now) / 1000));
      this.updateDisplay();
    },

    updateDisplay() {
      const widget = document.getElementById('gymwork-rest-timer-widget');
      if (!widget) return;

      const m = Math.floor(this.remainingSeconds / 60);
      const s = this.remainingSeconds % 60;
      const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

      const digitsEl = document.getElementById('timer-display-digits');
      if (digitsEl) digitsEl.textContent = formatted;

      const fillEl = document.getElementById('timer-progress-fill');
      if (fillEl && this.totalSeconds > 0) {
        const pct = Math.max(0, Math.min(100, (this.remainingSeconds / this.totalSeconds) * 100));
        fillEl.style.width = `${pct}%`;
      }

      if (this.remainingSeconds > 0) {
        document.title = `(${formatted}) 休息中 · ${this.currentExerciseName}`;
      }
    },

    onFinish() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }

      const widget = document.getElementById('gymwork-rest-timer-widget');
      if (widget) {
        widget.classList.add('finished');
        const digitsEl = document.getElementById('timer-display-digits');
        if (digitsEl) digitsEl.textContent = '開始下一組！';
      }

      document.title = `💪 休息結束！開始下一組！`;
      this.playFinishBeep();

      if (navigator.vibrate) {
        try { navigator.vibrate([250, 100, 250]); } catch (e) {}
      }

      // 儲存延遲定時器 ID，避免提早幹掉下一輪
      this.finishTimeoutId = setTimeout(() => {
        this.stop(false);
      }, 3500);
    },

    stop(isManualSkip = false) {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      if (this.finishTimeoutId) {
        clearTimeout(this.finishTimeoutId);
        this.finishTimeoutId = null;
      }
      this.endTime = null;
      this.remainingSeconds = 0;

      const widget = document.getElementById('gymwork-rest-timer-widget');
      if (widget) {
        widget.classList.add('hidden');
        widget.classList.remove('finished');
      }
      document.title = this.originalTitle || '訓練計劃行事曆 App | Workout Planner';

      if (isManualSkip) {
        if (typeof window.showToast === 'function') {
          window.showToast('已跳過組間休息');
        }
      }
    }
  };

  // =========================================================================
  // 2. 運動科學與智慧推薦演算法 (ExerciseIntelligence)
  // =========================================================================
  const ExerciseIntelligence = {
    // 預估 1RM：Epley 公式 + RPE (RIR) 修正
    estimate1RM(weight, reps, rpe) {
      const w = parseFloat(weight) || 0;
      const r = parseInt(reps, 10) || 0;
      if (w <= 0 || r <= 0) return 0;
      if (r === 1 && (!rpe || rpe >= 10)) return Math.round(w * 10) / 10;

      // 若有提供有效 RPE，折算理論極限力竭次數 (repsToFailure = reps + (10 - RPE))
      let effectiveReps = r;
      if (rpe !== undefined && rpe !== null && rpe !== '' && !isNaN(rpe)) {
        const rpeNum = parseFloat(rpe);
        if (rpeNum >= 6 && rpeNum <= 10) {
          effectiveReps = Math.max(1, r + (10 - rpeNum));
        }
      }

      // Epley 公式
      const est = w * (1 + effectiveReps / 30);
      return Math.round(est * 10) / 10;
    },

    // 判斷是否為複合關節大肌群動作
    isCompoundExercise(exId) {
      const id = (exId || '').toLowerCase();
      // 精確關鍵字與完整動作庫 ID 比對
      if (id.includes('squat') || id.includes('deadlift') || id.includes('pull_up') || 
          id.includes('bench_press') || id.includes('row') || id.includes('overhead_press')) {
        return true;
      }
      return false;
    },

    // 取得動作預設建議休息秒數 (複合動作 90s，孤立動作 60s)
    getDefaultRestSeconds(exId) {
      return this.isCompoundExercise(exId) ? 90 : 60;
    },

    // 尋找此動作歷史紀錄中「最重且有效完成」的一組表現
    getLastExercisePerformance(appState, exId, beforeDateStr) {
      if (!appState || !appState.logs) return null;
      const dates = Object.keys(appState.logs)
        .filter(d => (!beforeDateStr || d < beforeDateStr) && appState.logs[d]?.exercises?.[exId])
        .sort((a, b) => b.localeCompare(a)); // 最新的排在前面

      for (const d of dates) {
        const exLog = appState.logs[d].exercises[exId];
        if (exLog && exLog.sets && exLog.sets.length > 0) {
          const doneSets = exLog.sets.filter(s => s.done);
          if (doneSets.length > 0) {
            // 找出最重且完成的代表組
            let bestSet = doneSets[0];
            let maxW = 0;
            let totalRpe = 0;
            let rpeCount = 0;

            doneSets.forEach(s => {
              const w = s.weight || 0;
              if (w > maxW || (w === maxW && (s.reps || 0) > (bestSet.reps || 0))) {
                maxW = w;
                bestSet = s;
              }
              if (s.rpe !== undefined && s.rpe !== null && s.rpe !== '') {
                totalRpe += parseFloat(s.rpe);
                rpeCount++;
              }
            });

            return {
              date: d,
              setsCompleted: doneSets.length,
              targetSets: exLog.sets.length,
              weight: bestSet.weight || 0,
              reps: bestSet.reps || 0,
              rpe: (bestSet.rpe !== undefined && bestSet.rpe !== null) ? parseFloat(bestSet.rpe) : null,
              avgRpe: rpeCount > 0 ? Math.round((totalRpe / rpeCount) * 10) / 10 : null,
              hasRpe: rpeCount > 0,
              best1RM: this.estimate1RM(bestSet.weight, bestSet.reps, bestSet.rpe)
            };
          }
        }
      }
      return null;
    },

    // 雙重漸進 (Double Progression) 與科學智慧推薦
    getSmartRecommendation(appState, exId, targetEx, curPhase, currentDateStr) {
      const lastPerf = this.getLastExercisePerformance(appState, exId, currentDateStr);
      const isBulk = curPhase === 'bulk';
      const isDumbbell = !!targetEx.isDumbbell;
      const unit = targetEx.weightUnit || (isBulk && isDumbbell ? 'lbs' : 'kg');
      const minR = targetEx.minReps || 8;
      const maxR = targetEx.maxReps || 12;

      // 若尚無歷史紀錄
      if (!lastPerf) {
        const baseW = targetEx.defaultWeight !== undefined ? targetEx.defaultWeight : (curPhase === 'cut' ? 8 : 20);
        return {
          type: 'initial',
          suggestedWeight: baseW,
          suggestedReps: minR,
          unit,
          badge: '🌱 新手基準推薦',
          advice: `首次訓練建議以 <strong>${baseW} ${unit} × ${minR} 下</strong> 為基準，專注控制動作行程與標準發力。`
        };
      }

      const { weight, reps, avgRpe, hasRpe, date } = lastPerf;
      let recW = weight;
      let recR = reps;

      const dumbbellLbs = (typeof window.ADJUSTABLE_DUMBBELL_LBS !== 'undefined') 
        ? window.ADJUSTABLE_DUMBBELL_LBS 
        : [9, 15, 20, 26, 29, 35, 40, 44, 48, 55];

      // 情境 A：若使用者有填寫 RPE
      if (hasRpe && avgRpe !== null) {
        // A1. 輕鬆 (RPE <= 7.5)：尚有 2~3 下以上餘力 -> 強力推進超負荷
        if (avgRpe <= 7.5) {
          if (isBulk && isDumbbell && unit === 'lbs') {
            const curIdx = dumbbellLbs.indexOf(weight);
            if (curIdx >= 0 && curIdx < dumbbellLbs.length - 1) {
              recW = dumbbellLbs[curIdx + 1];
              recR = minR;
            } else {
              recR = Math.min(maxR + 2, reps + 1);
            }
          } else {
            // 固定 8kg 啞鈴或自重
            recR = Math.min(maxR + 2, reps + 2);
          }
          return {
            type: 'overload',
            suggestedWeight: recW,
            suggestedReps: recR,
            unit,
            badge: '🚀 建議超負荷升級',
            advice: `上次 (${date}) 表現輕鬆（平均 RPE ${avgRpe}）。建議挑戰 <strong>${recW} ${unit} × ${recR} 下</strong>，持續觸發肌肥大！`
          };
        }

        // A2. 黃金刺激區間 (7.5 < RPE <= 8.5)
        if (avgRpe <= 8.5) {
          if (reps < maxR) {
            recR = reps + 1;
            return {
              type: 'maintain_rep_up',
              suggestedWeight: recW,
              suggestedReps: recR,
              unit,
              badge: '✨ 黃金高效刺激區',
              advice: `強度正處於最佳增肌區（RPE ${avgRpe}）。建議維持 <strong>${recW} ${unit}</strong>，目標推進至 <strong>${recR} 下</strong>。`
            };
          } else {
            // 已達上限次數，嘗試升重或維持高標準頂峰收縮
            if (isBulk && isDumbbell && unit === 'lbs') {
              const curIdx = dumbbellLbs.indexOf(weight);
              if (curIdx >= 0 && curIdx < dumbbellLbs.length - 1) {
                recW = dumbbellLbs[curIdx + 1];
                recR = minR;
              }
            }
            return {
              type: 'maintain_peak',
              suggestedWeight: recW,
              suggestedReps: recR,
              unit,
              badge: '✨ 目標次數已達標',
              advice: `上次已達成 ${reps} 下滿組（RPE ${avgRpe}）。今日建議挑戰 <strong>${recW} ${unit} × ${recR} 下</strong>！`
            };
          }
        }

        // A3. 高強度挑戰區 (8.5 < RPE < 9.5)
        if (avgRpe < 9.5) {
          return {
            type: 'standard_effort',
            suggestedWeight: recW,
            suggestedReps: Math.max(minR, reps),
            unit,
            badge: '⚡ 高強度專注期',
            advice: `上次挑戰強度充份（RPE ${avgRpe}）。建議維持 <strong>${recW} ${unit} × ${reps} 下</strong>，專注動作控制。`
          };
        }

        // A4. 極限力竭防護 (RPE >= 9.5)
        return {
          type: 'deload_caution',
          suggestedWeight: recW,
          suggestedReps: Math.max(minR, reps - 1),
          unit,
          badge: '🛡️ 疲勞防護提醒',
          advice: `上次已達極限力竭（RPE ${avgRpe}）。今日建議以 <strong>${recW} ${unit} × ${Math.max(minR, reps - 1)} 下</strong> 穩健操作，避免疲勞累積。`
        };
      }

      // 情境 B：使用者未填 RPE，採用經典「雙重漸進 (Double Progression)」法則
      if (reps >= maxR) {
        // 次數已封頂，升重！
        if (isBulk && isDumbbell && unit === 'lbs') {
          const curIdx = dumbbellLbs.indexOf(weight);
          if (curIdx >= 0 && curIdx < dumbbellLbs.length - 1) {
            recW = dumbbellLbs[curIdx + 1];
            recR = minR;
            return {
              type: 'overload',
              suggestedWeight: recW,
              suggestedReps: recR,
              unit,
              badge: '🚀 雙重漸進：升重',
              advice: `上次已達成 ${maxR} 下上限！依據雙重漸進法則，建議升重至 <strong>${recW} ${unit} × ${recR} 下</strong>。`
            };
          }
        }
        // 固定 8kg 啞鈴或自重，加 1 下或增加控制度
        recR = maxR + 1;
        return {
          type: 'overload',
          suggestedWeight: recW,
          suggestedReps: recR,
          unit,
          badge: '🚀 次數超負荷推進',
          advice: `上次已達標！建議今日挑戰 <strong>${recW} ${unit} × ${recR} 下</strong> 或加強離心慢速下放。`
        };
      }

      // 次數未達上限，加 1 下
      recR = Math.min(maxR, reps + 1);
      return {
        type: 'standard',
        suggestedWeight: recW,
        suggestedReps: recR,
        unit,
        badge: '🎯 雙重漸進：加次數',
        advice: `上次完成 ${reps} 下。今日建議維持 <strong>${recW} ${unit}</strong>，目標前進至 <strong>${recR} 下</strong>。`
      };
    }
  };

  // =========================================================================
  // 3. 每週肌群訓練容量與組數分配圖表 (MuscleVolumeAnalytics)
  // =========================================================================
  const MuscleVolumeAnalytics = {
    // 6 大肌群定義與目標刺激區間 (Schoenfeld 2017 & Pelland 2024 文獻)
    MUSCLE_GROUPS: {
      chest: { name: '胸大肌', color: '#3b82f6', optimalMin: 10, optimalMax: 18 },
      back: { name: '背部肌群', color: '#10b981', optimalMin: 12, optimalMax: 20 },
      legs: { name: '下肢腿臀', color: '#f59e0b', optimalMin: 10, optimalMax: 18 },
      shoulders: { name: '三角肩部', color: '#8b5cf6', optimalMin: 10, optimalMax: 16 },
      arms: { name: '手臂二/三頭', color: '#ec4899', optimalMin: 8, optimalMax: 14 },
      core: { name: '核心腹肌', color: '#06b6d4', optimalMin: 8, optimalMax: 14 }
    },

    // 動作 ID 精確對照表（徹底解決字串模糊比對錯誤）
    EXERCISE_CATEGORY_MAP: {
      // 腿部 / 臀部
      goblet_squat: 'legs',
      paused_goblet_squat: 'legs',
      box_squat: 'legs',
      bulgarian_split_squat: 'legs',
      assisted_split_squat: 'legs',
      elevated_split_squat: 'legs',
      dumbbell_romanian_deadlift: 'legs',
      b_stance_rdl: 'legs',
      single_leg_rdl: 'legs',
      glute_bridge: 'legs',
      glute_bridge_double: 'legs',
      single_leg_glute_bridge: 'legs',
      calf_raise: 'legs',
      step_up: 'legs',

      // 背部
      pull_up: 'back',
      negative_pull_up: 'back',
      band_pull_up: 'back',
      weighted_pull_up: 'back',
      chin_up: 'back',
      single_arm_dumbbell_row: 'back',
      chest_supported_dumbbell_row: 'back',
      inverted_row: 'back',

      // 胸部
      dumbbell_bench_press: 'chest',
      dumbbell_incline_bench_press: 'chest',
      push_up: 'chest',
      incline_push_up: 'chest',
      decline_push_up: 'chest',

      // 肩部 (前/中/後三角)
      incline_shoulder_press: 'shoulders',
      seated_dumbbell_shoulder_press: 'shoulders',
      standing_dumbbell_shoulder_press: 'shoulders',
      dumbbell_lateral_raise: 'shoulders',
      leaning_lateral_raise: 'shoulders',
      seated_lateral_raise: 'shoulders',
      dumbbell_reverse_fly: 'shoulders',
      chest_supported_reverse_fly: 'shoulders',
      face_pull: 'shoulders',

      // 手臂 (二頭 / 三頭)
      bench_dips: 'arms',
      close_grip_push_up: 'arms',
      diamond_push_up: 'arms',
      biceps_curl: 'arms',
      hammer_curl: 'arms',
      triceps_overhead_extension: 'arms',

      // 核心
      ab_wheel_kneeling: 'core',
      plank: 'core',
      side_plank: 'core',
      knee_side_plank: 'core',
      side_plank_leg_lift: 'core',
      hollow_body: 'core',
      deadbug: 'core'
    },

    // 動作肌群分類引擎
    getMuscleCategory(exId, targetArea) {
      const id = (exId || '').toLowerCase();
      if (this.EXERCISE_CATEGORY_MAP[id]) {
        return this.EXERCISE_CATEGORY_MAP[id];
      }

      // 若未在精確映射表，以關鍵字輔助
      const area = (targetArea || '').toLowerCase();
      if (id.includes('squat') || id.includes('deadlift') || id.includes('lunge') || id.includes('glute')) return 'legs';
      if (id.includes('fly') || id.includes('raise') || id.includes('shoulder')) return 'shoulders';
      if (id.includes('dip') || id.includes('curl') || id.includes('tricep')) return 'arms';
      if (id.includes('pull_up') || id.includes('row')) return 'back';
      if (id.includes('bench') || id.includes('press') || id.includes('push_up')) return 'chest';
      if (id.includes('plank') || id.includes('ab') || id.includes('core')) return 'core';

      if (area.includes('胸')) return 'chest';
      if (area.includes('闊背') || area.includes('背')) return 'back';
      if (area.includes('腿') || area.includes('臀') || area.includes('股四頭')) return 'legs';
      if (area.includes('肩') || area.includes('三角')) return 'shoulders';
      if (area.includes('二頭') || area.includes('三頭') || area.includes('手')) return 'arms';

      return 'core';
    },

    // 統計近 7 天容量與組數
    calculateWeeklyVolume(appState, referenceDate) {
      const ref = referenceDate ? new Date(referenceDate) : new Date();
      const result = {
        totalSets: 0,
        totalVolumeKg: 0,
        groups: {}
      };

      Object.keys(this.MUSCLE_GROUPS).forEach(k => {
        result.groups[k] = { sets: 0, volumeKg: 0, exercises: new Set() };
      });

      if (!appState || !appState.logs) return result;

      for (let i = 0; i < 7; i++) {
        const d = new Date(ref);
        d.setDate(ref.getDate() - i);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateKey = `${y}-${m}-${day}`;

        const dayLog = appState.logs[dateKey];
        if (dayLog && dayLog.exercises) {
          Object.keys(dayLog.exercises).forEach(exId => {
            const exData = dayLog.exercises[exId];
            const meta = (typeof window.EXERCISES_DATA !== 'undefined' && window.EXERCISES_DATA[exId]) ? window.EXERCISES_DATA[exId] : {};
            const cat = this.getMuscleCategory(exId, meta.target_area);

            if (exData.sets && Array.isArray(exData.sets)) {
              exData.sets.forEach(s => {
                if (s.done) {
                  result.totalSets++;
                  result.groups[cat].sets++;
                  result.groups[cat].exercises.add(meta.name || exId);

                  const rawW = parseFloat(s.weight) || 0;
                  const reps = parseInt(s.reps, 10) || 0;
                  
                  // 若有重量，計算真實容量（若單位為 lbs，自動折算成 kg）
                  if (rawW > 0 && reps > 0) {
                    const isLbs = (appState.currentPhase === 'bulk' && rawW >= 9);
                    const weightInKg = isLbs ? (rawW * 0.4536) : rawW;
                    const setVol = Math.round(weightInKg * reps);
                    result.totalVolumeKg += setVol;
                    result.groups[cat].volumeKg += setVol;
                  }
                }
              });
            }
          });
        }
      }

      return result;
    },

    // 渲染肌群看板 HTML
    renderVolumeDashboard(appState, referenceDate) {
      const volData = this.calculateWeeklyVolume(appState, referenceDate);
      const groupKeys = Object.keys(this.MUSCLE_GROUPS);

      let cardsHtml = '';
      groupKeys.forEach(k => {
        const conf = this.MUSCLE_GROUPS[k];
        const gData = volData.groups[k];
        const sets = gData.sets;
        const vol = gData.volumeKg;
        const pct = Math.min(100, Math.round((sets / conf.optimalMax) * 100));

        let statusBadge = '';
        if (sets === 0) {
          statusBadge = '<span class="muscle-vol-status status-empty">尚未訓練</span>';
        } else if (sets < conf.optimalMin) {
          statusBadge = `<span class="muscle-vol-status status-low">維持期 (${sets}/${conf.optimalMin}組)</span>`;
        } else if (sets <= conf.optimalMax) {
          statusBadge = `<span class="muscle-vol-status status-optimal">✨ 最佳增肌區 (${sets}組)</span>`;
        } else {
          statusBadge = `<span class="muscle-vol-status status-high">⚡ 高容量刺激 (${sets}組)</span>`;
        }

        cardsHtml += `
          <div class="muscle-volume-card" style="border-left-color: ${conf.color};">
            <div class="muscle-vol-head">
              <div class="muscle-vol-name" style="color: ${conf.color};">
                <strong>${conf.name}</strong>
              </div>
              ${statusBadge}
            </div>
            <div class="muscle-vol-numbers">
              <div>
                <span class="vol-num-label">近7天完成組數</span>
                <span class="vol-num-val"><strong>${sets}</strong> <small>組</small></span>
              </div>
              <div>
                <span class="vol-num-label">訓練容量 (Volume)</span>
                <span class="vol-num-val"><strong>${vol.toLocaleString()}</strong> <small>kg·reps</small></span>
              </div>
            </div>
            <div class="muscle-vol-bar-bg" aria-hidden="true">
              <div class="muscle-vol-bar-fill" style="width: ${pct}%; background-color: ${conf.color};"></div>
            </div>
            <div class="muscle-vol-footer">
              <span>目標刺激：${conf.optimalMin}–${conf.optimalMax} 組 / 週</span>
              <span>${gData.exercises.size > 0 ? Array.from(gData.exercises).slice(0, 2).join('、') : '無'}</span>
            </div>
          </div>
        `;
      });

      return `
        <div class="stat-box" id="gymwork-weekly-volume-section">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 6px; flex-wrap: wrap;">
            <div>
              <h3 class="section-title" style="margin-bottom: 2px;">📊 近 7 天肌群訓練容量與組數分佈</h3>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
                運動科學理論（Schoenfeld 等）：單週單一肌群 10–20 組為最佳肌肥大生長刺激區間。
              </p>
            </div>
            <div class="weekly-vol-summary-pill">
              <span>近 7 天總組數：<strong>${volData.totalSets}</strong> 組</span>
              <span>總負荷：<strong>${volData.totalVolumeKg.toLocaleString()}</strong> kg·reps</span>
            </div>
          </div>

          <div class="muscle-volume-grid">
            ${cardsHtml}
          </div>
        </div>
      `;
    }
  };

  // 暴露全域 API
  window.GymWork = {
    RestTimer,
    ExerciseIntelligence,
    MuscleVolumeAnalytics
  };

})(window);
