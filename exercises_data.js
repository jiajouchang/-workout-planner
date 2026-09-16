const EXERCISES_DATA = {
  "pull_up": {
    "id": "pull_up",
    "dataset_id": "0652",
    "name": "單槓引體向上",
    "english_name": "pull-up",
    "target_area": "背部（闊背肌）、二頭肌",
    "tip": "向上拉到下巴過槓，慢慢下放，別晃動借力。",
    "gif": "gifs/pull_up.gif",
    "steps": [
      "雙手握槓略寬於肩膀，手臂自然伸直懸掛，核心繃緊不晃動。",
      "背部闊背肌發力，手肘向下向後拉，將胸口引向單槓直至下巴過槓。",
      "在頂端稍作停頓夾緊背肌，然後有控制地慢速下放回到起始位置。"
    ]
  },
  "dumbbell_bench_press": {
    "id": "dumbbell_bench_press",
    "dataset_id": "0289",
    "name": "啞鈴臥推",
    "english_name": "dumbbell bench press",
    "target_area": "胸大肌、手臂三頭肌",
    "tip": "躺在臥推椅上，雙腳踩實，啞鈴推到胸口正上方，手肘微內收約45度。",
    "gif": "gifs/dumbbell_bench_press.gif",
    "steps": [
      "仰臥在健身椅上，雙腳踩實地面，手持啞鈴推至胸部正上方。",
      "吸氣，手肘與軀幹夾約45度，慢速將啞鈴下放至胸口兩側，感受胸肌拉伸。",
      "吐氣，胸肌發力將啞鈴推回正上方，手肘微曲不鎖死。"
    ]
  },
  "single_arm_dumbbell_row": {
    "id": "single_arm_dumbbell_row",
    "dataset_id": "0292",
    "name": "單手啞鈴划船",
    "english_name": "dumbbell one arm bent-over row",
    "target_area": "背部闊背肌、肩胛穩定肌群",
    "tip": "一手一膝跪在椅子上支撐，另一手持鈴垂直拉向髖部，感受背肌夾緊。",
    "gif": "gifs/single_arm_dumbbell_row.gif",
    "steps": [
      "單手與同側膝蓋跪在健身椅上支撐，背部打平，另一手持啞鈴自然下垂。",
      "啟動背部肌群，手肘順勢向後上方拉動，將啞鈴提至髖部側邊並夾緊背肌。",
      "頂端停頓1秒，隨後順著重力有控制地慢速放回起始點，換邊重複。"
    ]
  },
  "dumbbell_shoulder_press": {
    "id": "dumbbell_shoulder_press",
    "dataset_id": "0405",
    "name": "啞鈴肩推",
    "english_name": "dumbbell seated shoulder press",
    "target_area": "肩部（三角肌前中束）",
    "tip": "坐在椅子上背打直，核心收緊，啞鈴垂直向上推舉至頂端微曲不鎖死。",
    "gif": "gifs/dumbbell_shoulder_press.gif",
    "steps": [
      "端坐在健身椅上，背部緊貼椅背，雙手持鈴舉於耳朵兩旁，手肘約呈90度。",
      "吐氣，肩膀發力垂直向上推起啞鈴至頭頂上方，手肘微屈不硬鎖。",
      "吸氣，沿著原本推舉軌跡穩定慢速下放回到耳朵旁。"
    ]
  },
  "dumbbell_lateral_raise": {
    "id": "dumbbell_lateral_raise",
    "dataset_id": "0334",
    "name": "啞鈴側平舉",
    "english_name": "dumbbell lateral raise",
    "target_area": "肩膀兩側（三角肌中束）",
    "tip": "手肘微屈固定，由肩膀發力往兩側平舉至與肩同高，下放保持控制。",
    "gif": "gifs/dumbbell_lateral_raise.gif",
    "steps": [
      "身體微前傾，雙手自然垂持啞鈴於身體兩側，手肘保持微屈固定。",
      "肩膀中束發力，雙臂由兩側平順抬起到與肩平行（像倒水微傾）。",
      "在最高點停留半秒，抵抗重力慢放約2-3秒回到身側。"
    ]
  },
  "dumbbell_bicep_curl": {
    "id": "dumbbell_bicep_curl",
    "dataset_id": "0294",
    "name": "二頭彎舉",
    "english_name": "dumbbell biceps curl",
    "target_area": "手臂前側（二頭肌）",
    "tip": "雙手肘緊貼身體兩側不晃動，只靠前臂上下帶動重量，頂端感受二頭緊縮。",
    "gif": "gifs/dumbbell_bicep_curl.gif",
    "steps": [
      "挺胸站立或端坐，雙手掌心朝前握鈴，手肘緊貼身體兩側軀幹。",
      "大臂保持完全不動，二頭肌發力將啞鈴向上彎舉至胸前最高點擠壓二頭。",
      "緩慢下放至手臂接近伸直，感受肌肉持續受張力。"
    ]
  },
  "dumbbell_tricep_extension": {
    "id": "dumbbell_tricep_extension",
    "dataset_id": "0430",
    "name": "三頭肌伸展",
    "english_name": "dumbbell standing triceps extension",
    "target_area": "手臂後側（三頭肌）",
    "tip": "托住啞鈴舉過頭頂，大臂垂直不動，彎曲手肘將啞鈴下放至腦後再伸直。",
    "gif": "gifs/dumbbell_tricep_extension.gif",
    "steps": [
      "雙手掌心托住啞鈴內側啞鈴片，舉至頭頂正上方，大臂垂直貼近耳朵。",
      "保持大臂角度不變，彎曲手肘將啞鈴慢速下放至後腦勺下方。",
      "手臂後側三頭肌發力，垂直伸直手肘將啞鈴推回頭頂。"
    ]
  },
  "goblet_squat": {
    "id": "goblet_squat",
    "dataset_id": "1760",
    "name": "高腳杯深蹲",
    "english_name": "dumbbell goblet squat",
    "target_area": "大腿前側（股四頭肌）、臀肌",
    "tip": "雙手抱緊啞鈴垂直立於胸前，重心放腳跟，順暢下蹲至大腿水平後站起。",
    "gif": "gifs/goblet_squat.gif",
    "steps": [
      "雙手捧住單隻啞鈴緊貼胸口，雙腳站距略寬於肩，腳尖微朝外30度。",
      "臀部主動向後坐並順勢屈膝下蹲，手肘自然落在大腿內側之間，下蹲至大腿平行地面。",
      "腳掌中心與腳跟扎實蹬地，臀腿發力順暢站起並夾緊臀部。"
    ]
  },
  "bulgarian_split_squat": {
    "id": "bulgarian_split_squat",
    "dataset_id": "0410",
    "name": "保加利亞分腿蹲",
    "english_name": "dumbbell single leg split squat",
    "target_area": "單腿臀大肌、股四頭肌",
    "tip": "後腳背搭在後方椅子上，前腳向前跨步，垂直下蹲至前腿約90度再發力站起。",
    "gif": "gifs/bulgarian_split_squat.gif",
    "steps": [
      "背對健身椅，單腳向後將腳背搭在椅面上，前腳向前跨大步站穩。",
      "軀幹微前傾，前腳垂直下蹲至大腿與地面平行（膝蓋不內夾）。",
      "前腳腳後跟發力蹬起回到站姿，完成目標次數後換腳。"
    ]
  },
  "dumbbell_romanian_deadlift": {
    "id": "dumbbell_romanian_deadlift",
    "dataset_id": "1459",
    "name": "啞鈴羅馬尼亞硬舉",
    "english_name": "dumbbell romanian deadlift",
    "target_area": "大腿後側（腿後肌）、臀肌、下背",
    "tip": "膝蓋微屈保持角度，屁股主動向後推，背打直，啞鈴順著大腿前側貼身下放。",
    "gif": "gifs/dumbbell_romanian_deadlift.gif",
    "steps": [
      "雙腳與髖同寬站立，雙手持啞鈴垂於大腿前，膝蓋微彎並保持角度鎖定。",
      "屁股主動向後推、上半身前傾背部打直，啞鈴沿大腿前側順勢滑至膝蓋下方。",
      "感受大腿後側強烈緊繃拉伸後，臀肌發力向前推髖站直夾臀。"
    ]
  },
  "single_leg_hip_thrust": {
    "id": "single_leg_hip_thrust",
    "dataset_id": "3645",
    "name": "單腿臀推",
    "english_name": "single leg bridge with outstretched leg",
    "target_area": "臀大肌、單側核心穩定",
    "tip": "仰臥曲膝，單腳抬高，靠支撐腳的腳後跟發力將臀部推向天花板，頂端夾緊臀部。",
    "gif": "gifs/single_leg_hip_thrust.gif",
    "steps": [
      "仰臥在瑜珈墊上雙腿曲膝，抬起一條腿並在空中打直或微屈。",
      "支撐腿的腳後跟向地面施力，發力將臀部垂直推高至骨盆與大腿呈一直線。",
      "在頂端強力夾緊臀肌1秒，隨後控制節奏將臀部輕輕放回地面。"
    ]
  },
  "ab_wheel_rollout": {
    "id": "ab_wheel_rollout",
    "dataset_id": "0857",
    "name": "滾輪",
    "english_name": "wheel rollerout",
    "target_area": "核心腹肌、深層腹橫肌",
    "tip": "雙膝跪地收緊肚子骨盆微後傾，滾輪慢速向前滑行，用腹肌發力將滾輪拉回。",
    "gif": "gifs/ab_wheel_rollout.gif",
    "steps": [
      "雙膝跪地，雙手握緊滾輪把手置於肩膀正下方，腹部用力微收骨盆。",
      "維持背部微拱不塌腰，緩慢將滾輪往前推滾至身體延伸（量力而為）。",
      "核心腹肌用力向內收縮，將滾輪拉回起始位置。"
    ]
  },
  "side_plank": {
    "id": "side_plank",
    "dataset_id": "0705",
    "name": "側棒式",
    "english_name": "side bridge v. 2",
    "target_area": "側腹肌（腹斜肌）、核心軀幹穩定",
    "tip": "前臂撐地側躺，骨盆推高使身體從頭部、髖部到腳踝成一直線，保持正常呼吸。",
    "gif": "gifs/side_plank.gif",
    "steps": [
      "側躺於墊上，單側手肘撐在肩膀正下方，雙腿併攏伸直。",
      "腹斜肌與核心發力將骨盆推離地面，使頭、肩、髖、踝成一直線。",
      "維持均勻呼吸保持姿勢達到目標秒數，然後換側訓練。"
    ]
  },
  "dumbbell_incline_bench_press": {
    "id": "dumbbell_incline_bench_press",
    "dataset_id": "0314",
    "name": "啞鈴上斜臥推",
    "english_name": "dumbbell incline bench press",
    "target_area": "上胸大肌、肩膀前束",
    "tip": "椅背調整至約30-45度，雙腳踩穩，啞鈴由胸口鎖骨下方垂直推向正上方。",
    "gif": "gifs/dumbbell_incline_bench_press.gif",
    "steps": [
      "臥推椅調整至30至45度上斜角度，躺好後雙手持啞鈴推至上胸上方。",
      "吸氣，手肘外開約45度，慢速將啞鈴下放至鎖骨兩側，感受上胸拉開。",
      "吐氣，上胸肌發力垂直推回原位，在頂端意念集中擠壓上胸。"
    ]
  },
  "dumbbell_bent_over_row": {
    "id": "dumbbell_bent_over_row",
    "dataset_id": "0293",
    "name": "啞鈴划船",
    "english_name": "dumbbell bent over row",
    "target_area": "上背部、中背夾背肌群",
    "tip": "雙腳微屈俯身約45度，背打直，雙手持鈴順勢向後上方拉向肋骨兩側。",
    "gif": "gifs/dumbbell_bent_over_row.gif",
    "steps": [
      "雙膝微曲，上半身前傾約45度背部挺直，雙手持啞鈴自然下垂。",
      "肩胛骨向後收攏，雙手手肘貼近軀幹順勢往後上方拉至肋骨兩側。",
      "在最高點擠壓背肌停頓1秒，隨後吸氣慢速下放回原位。"
    ]
  },
  "dumbbell_arnold_press": {
    "id": "dumbbell_arnold_press",
    "dataset_id": "2137",
    "name": "啞鈴阿諾肩推",
    "english_name": "dumbbell arnold press",
    "target_area": "肩膀三角肌前中束",
    "tip": "起步時手掌朝向自己胸前，推舉時順勢向外旋轉手腕，推到頂端手掌朝前。",
    "gif": "gifs/dumbbell_arnold_press.gif",
    "steps": [
      "端坐椅上，啞鈴舉在胸前，掌心朝向自己（像二頭彎舉頂端）。",
      "向上推舉的同時向外旋轉手腕，推至頭頂正上方時掌心剛好朝向前。",
      "沿原路徑旋轉手腕慢速下放，回至胸前起始位置。"
    ]
  },
  "dumbbell_reverse_fly": {
    "id": "dumbbell_reverse_fly",
    "dataset_id": "0378",
    "name": "反向飛鳥",
    "english_name": "dumbbell rear fly",
    "target_area": "肩膀後側（三角肌後束）、上背",
    "tip": "俯身前傾背部挺直，手臂微屈像抱樹一樣向兩側展開，專注肩後發力夾背。",
    "gif": "gifs/dumbbell_reverse_fly.gif",
    "steps": [
      "坐在椅子邊緣俯身前傾，胸部貼近大腿，雙手於腿下方輕握啞鈴。",
      "手肘微彎固定角度，肩膀後束發力將雙臂向身體兩側水平展開如飛鳥展翅。",
      "頂端短暫停頓感受後肩與上背收縮，抵抗重量慢速下放。"
    ]
  },
  "dumbbell_hammer_curl": {
    "id": "dumbbell_hammer_curl",
    "dataset_id": "0313",
    "name": "槌式彎舉",
    "english_name": "dumbbell hammer curl",
    "target_area": "二頭肌外側、前臂肌群",
    "tip": "雙手掌心相對握鈴（如持鎚），手肘貼緊身體軀幹，上下平穩彎舉。",
    "gif": "gifs/dumbbell_hammer_curl.gif",
    "steps": [
      "雙腳自然站立挺胸收腹，雙手持啞鈴掌心相對（虎口朝前）。",
      "手肘固定在身體兩側，保持掌心相對將啞鈴向上彎舉至胸口兩側。",
      "頂端擠壓手臂前臂與外側二頭，再穩定均勻地慢放回原位。"
    ]
  },
  "close_grip_push_up": {
    "id": "close_grip_push_up",
    "dataset_id": "0259",
    "name": "窄握伏地挺身",
    "english_name": "close-grip push-up",
    "target_area": "手臂三頭肌、內側胸肌",
    "tip": "雙手置於胸口下方距離略窄於肩寬，手肘向後收緊貼身，核心繃緊下壓再推起。",
    "gif": "gifs/close_grip_push_up.gif",
    "steps": [
      "雙手手掌撐地距離略窄於肩寬（大拇指與食指可微靠近成心形），全身緊繃成一直線。",
      "手肘往後方貼緊身體下壓，胸口接近地面停頓1秒。",
      "三頭肌與內胸發力，將身體垂直推回起始位置。"
    ]
  },
  "dumbbell_sumo_squat": {
    "id": "dumbbell_sumo_squat",
    "dataset_id": "0413",
    "name": "啞鈴相撲深蹲",
    "english_name": "dumbbell squat",
    "target_area": "大腿內側（內收肌）、臀大肌",
    "tip": "雙腳寬站距、腳尖朝外45度，持啞鈴垂於中央，垂直下蹲感受大腿內側與臀肌受力。",
    "gif": "gifs/dumbbell_sumo_squat.gif",
    "steps": [
      "雙腳寬站距約1.5倍肩寬，腳尖向外打開約45度，雙手於兩腿中間垂直握住啞鈴。",
      "膝蓋沿著腳尖方向打開並垂直下蹲，直到大腿與地面平行，感受大腿內側拉伸。",
      "大腿內側與臀肌同時發力蹬地站直，頂端用力夾緊臀部。"
    ]
  },
  "single_leg_romanian_deadlift": {
    "id": "single_leg_romanian_deadlift",
    "dataset_id": "1757",
    "name": "單腿羅馬尼亞硬舉",
    "english_name": "dumbbell single leg deadlift",
    "target_area": "單側腿後肌、臀部肌群與平衡穩定",
    "tip": "支撐腳微屈，另一腿順勢向後抬平，身體前傾脊椎延伸，感受單腳支撐與腿後拉伸。",
    "gif": "gifs/single_leg_romanian_deadlift.gif",
    "steps": [
      "單腳站立支撐，膝蓋保持微曲，雙手持啞鈴垂於支撐腳前方。",
      "支撐腿髖部往後推，另一腿向後方延伸抬起，軀幹平穩前傾如同天平。",
      "感受支撐側大腿後側拉滿後，靠臀大肌發力將身體拉回直立站姿。"
    ]
  },
  "dumbbell_hip_thrust": {
    "id": "dumbbell_hip_thrust",
    "dataset_id": "3523",
    "name": "啞鈴臀推",
    "english_name": "glute bridge two legs on bench (male)",
    "target_area": "臀大肌、大腿後側",
    "tip": "上背平貼在健身椅邊緣，啞鈴置於髖部，臀部下沉後發力推頂至大腿與軀幹水平。",
    "gif": "gifs/dumbbell_hip_thrust.gif",
    "steps": [
      "上背肩胛骨平靠在健身椅邊緣，雙腳踩地曲膝90度，啞鈴放置於骨盆髖部上方。",
      "臀部向下沉降至接近地面，隨後腳後跟蹬地、臀肌強力發力推高骨盆。",
      "推至大腿與軀幹呈水平直線，頂端死命夾緊臀大肌2秒，再慢速下沉。"
    ]
  },
  "calf_raise": {
    "id": "calf_raise",
    "dataset_id": "0417",
    "name": "提踵",
    "english_name": "dumbbell standing calf raise",
    "target_area": "小腿肌群（腓腸肌、比目魚肌）",
    "tip": "雙手持鈴站立，腳尖全力墊起到最高點停頓1-2秒擠壓小腿，緩慢下放。",
    "gif": "gifs/calf_raise.gif",
    "steps": [
      "雙手持啞鈴站立於平地或階梯邊緣，核心收緊保持身體挺拔平衡。",
      "腳尖用力向下壓地，盡可能將腳後跟墊到最高點，使小腿肌群強烈收縮頂峰。",
      "在最高點保持停頓1-2秒，隨後緩慢下放腳後跟。"
    ]
  },

  // ── 退階與進階變體動作資料 ──────────────────────────────────────────
  "split_squat": {
    "id": "split_squat",
    "name": "雙腳著地靜態分腿蹲",
    "english_name": "static split squat",
    "target_area": "股四頭肌、臀大肌（初階/退階推薦）",
    "tip": "雙腳前後踩穩地面不架高，消除晃動與後胯拉扯，上身直立直下直上，專注雙腿發力。",
    "gif": "gifs/bulgarian_split_squat.gif",
    "steps": [
      "雙腳前後大步站立（前後距離約兩步，雙腳均踩實地面，後腳跟自然離地）。",
      "軀幹微前傾挺胸，核心收緊，垂直向下蹲至前大腿與地面平行，後膝接近地面但不碰地。",
      "前腳全腳掌與後腳尖同時蹬地發力站起回到起始位置，換腿重複。"
    ]
  },
  "deficit_bulgarian_split_squat": {
    "id": "deficit_bulgarian_split_squat",
    "name": "前腳墊高保加利亞分腿蹲",
    "english_name": "deficit bulgarian split squat",
    "target_area": "臀大肌深層、股四頭肌（高階挑戰）",
    "tip": "前腳墊高 5–8cm，突破常規下蹲深度，臀肌下緣拉伸更徹底，對平衡與單腿力量極具挑戰。",
    "gif": "gifs/bulgarian_split_squat.gif",
    "steps": [
      "前腳踩在穩固踏板或槓片上，後腳背平放於身後健身椅上。",
      "雙手持啞鈴自然下垂，核心緊繃，前膝向前彎曲並深沉下蹲至大腿低於水平。",
      "在最深處感受臀大肌極限拉伸，前腳跟強力蹬地將身體推回頂端並夾緊臀部。"
    ]
  },
  "eccentric_pull_up": {
    "id": "eccentric_pull_up",
    "name": "離心慢放引體向上",
    "english_name": "negative / eccentric pull-up",
    "target_area": "闊背肌、二頭肌（引體打底神技）",
    "tip": "腳踩箱子或跳起使下巴過槓，頂端用力夾背，隨後以 3–5 秒極慢速度下放到底。",
    "gif": "gifs/pull_up.gif",
    "steps": [
      "雙手握槓略寬於肩，利用雙腳踩箱或輕跳使下巴輕鬆越過單槓。",
      "在頂峰瞬間胸口貼近單槓，主動夾緊肩胛骨與闊背肌 1 秒鎖定。",
      "用意志力對抗重力，有控制地以 3–5 秒極慢勻速將身體下沉至手臂伸直。"
    ]
  },
  "paused_pull_up": {
    "id": "paused_pull_up",
    "name": "頂端停頓引體向上",
    "english_name": "paused pull-up",
    "target_area": "背闊肌、菱形肌、核心（高階強化）",
    "tip": "拉到頂端時胸口碰槓完全靜態停頓 2 秒，徹底排除甩盪慣性，背肌張力爆炸。",
    "gif": "gifs/pull_up.gif",
    "steps": [
      "標準握槓懸掛，闊背肌主動下壓發力將胸部引向單槓上方。",
      "下巴過槓、胸骨觸槓瞬間保持絕對靜止 2 秒，背肌全力擠壓。",
      "維持背部張力，平順下放回到起始位置。"
    ]
  },
  "incline_push_up": {
    "id": "incline_push_up",
    "name": "健身椅上斜伏地挺身",
    "english_name": "incline push-up on bench",
    "target_area": "胸大肌下緣、三頭肌（退階推薦）",
    "tip": "雙手撐在健身椅邊緣，身體呈斜線，大幅減輕上肢負擔，適合胸肩力量初階者。",
    "gif": "gifs/close_grip_push_up.gif",
    "steps": [
      "雙手手掌撐在健身椅邊緣，手距略寬於肩，雙腳向後伸直踩地，軀幹成一直線。",
      "手肘微內收45度，慢速屈肘將胸口下沉至貼近椅沿。",
      "胸肌發力將身體向上推回起始位置，手肘微屈不鎖死。"
    ]
  },
  "paused_dumbbell_bench_press": {
    "id": "paused_dumbbell_bench_press",
    "name": "底部拉伸停頓啞鈴臥推",
    "english_name": "paused dumbbell bench press",
    "target_area": "胸大肌本體、肩關節穩定（高階）",
    "tip": "下放到最深拉伸點時完全停頓 2 秒，消除肌腱回彈，逼出胸肌主動收縮力量。",
    "gif": "gifs/dumbbell_bench_press.gif",
    "steps": [
      "仰臥健身椅，雙腳踩實地面，啞鈴推起至胸口上方。",
      "慢速 3 秒下放啞鈴至胸肌充分拉伸的最低點，完全靜止停頓 2 秒。",
      "胸肌爆發發力將啞鈴推回正上方。"
    ]
  },
  "incline_chest_supported_row": {
    "id": "incline_chest_supported_row",
    "name": "上斜椅胸口支撐雙手划船",
    "english_name": "chest-supported dumbbell row",
    "target_area": "背闊肌、上背菱形肌（護腰首選）",
    "tip": "胸口趴在45度上斜椅面上，完全卸除腰部剪力，孤立背部肌肉，安全有感。",
    "gif": "gifs/dumbbell_bent_over_row.gif",
    "steps": [
      "將健身椅調整為 30–45 度斜角，胸腹部平穩貼靠在椅背上，雙手自然垂持啞鈴。",
      "啟動肩胛骨後收，手肘向後上方拉動啞鈴，夾緊中背肌群。",
      "在頂端擠壓背肌 1 秒，緩慢放回起始懸垂位置。"
    ]
  },
  "dumbbell_row_pause": {
    "id": "dumbbell_row_pause",
    "name": "頂峰夾背停頓划船",
    "english_name": "paused one-arm dumbbell row",
    "target_area": "闊背肌、肩胛後收肌（高階深層刺激）",
    "tip": "手肘拉到髖部最高點時用力夾緊背部停留 2 秒，徹底破壞深層肌纖維。",
    "gif": "gifs/single_arm_dumbbell_row.gif",
    "steps": [
      "單手單膝跪椅支撐，另一手持鈴垂直下垂。",
      "手肘貼身向後上方拉至髖部旁，頂點用力向脊椎擠壓背肌停留 2 秒。",
      "勻速抗重力下放。"
    ]
  },
  "incline_shoulder_press": {
    "id": "incline_shoulder_press",
    "name": "75度高斜椅肩推",
    "english_name": "75 degree high incline dumbbell press",
    "target_area": "三角肌前中束、上胸（友善肩關節）",
    "tip": "椅背調成75度微後仰，降低肩峰下夾擊風險，推舉軌跡流暢舒適。",
    "gif": "gifs/dumbbell_shoulder_press.gif",
    "steps": [
      "椅背調節至約 75 度，上背自然靠穩椅背，雙手持鈴舉於耳旁。",
      "肩膀向上推起啞鈴至頭頂正上方微前側，手肘不鎖死。",
      "順著推舉軌跡穩定慢放回耳旁。"
    ]
  },
  "standing_dumbbell_shoulder_press": {
    "id": "standing_dumbbell_shoulder_press",
    "name": "站姿啞鈴肩推",
    "english_name": "standing dumbbell shoulder press",
    "target_area": "三角肌、核心抗晃動（全身動力鏈）",
    "tip": "站姿推舉需臀部腹肌全力夾緊，杜絕骨盆前傾，調動全身力量抗晃動。",
    "gif": "gifs/dumbbell_shoulder_press.gif",
    "steps": [
      "雙腳與肩同寬站立，臀肌夾緊、腹肌收緊，雙手持鈴置於雙肩兩側。",
      "軀幹挺拔垂直向上推舉啞鈴至頭頂正上方。",
      "控制速度慢速下放至肩膀高度。"
    ]
  },
  "bent_arm_lateral_raise": {
    "id": "bent_arm_lateral_raise",
    "name": "屈肘 90 度側平舉",
    "english_name": "bent-arm lateral raise",
    "target_area": "三角肌中束（初階友好/減輕槓桿）",
    "tip": "手肘固定彎曲 90 度向兩側平舉，大幅縮短力臂，避免斜方肌聳肩代償。",
    "gif": "gifs/dumbbell_lateral_raise.gif",
    "steps": [
      "手肘保持彎曲 90 度端平，啞鈴掌心相對。",
      "由手肘向上向外帶動手臂平舉至與肩同高，沉肩不聳肩。",
      "在頂端停留半秒，控制放回身體兩側。"
    ]
  },
  "leaning_lateral_raise": {
    "id": "leaning_lateral_raise",
    "name": "單手側傾側平舉",
    "english_name": "leaning dumbbell lateral raise",
    "target_area": "三角肌中束（全行程高張力）",
    "tip": "一手抓牢健身椅身側傾 15 度，讓肩膀中束在底部起點就受力，頂峰刺激更集中。",
    "gif": "gifs/dumbbell_lateral_raise.gif",
    "steps": [
      "一手抓穩固定椅背，雙腳並攏靠近椅子，軀幹向外側傾斜約 15 度。",
      "外側手臂手持啞鈴，專注中束發力向外側劃弧平舉至肩高。",
      "在最高點懸停 1 秒，慢放 3 秒回到側邊，換邊重複。"
    ]
  },
  "seated_dumbbell_bicep_curl": {
    "id": "seated_dumbbell_bicep_curl",
    "name": "端坐啞鈴二頭彎舉",
    "english_name": "seated dumbbell bicep curl",
    "target_area": "手臂二頭肌（孤立防借力）",
    "tip": "端坐在健身椅上進行，排除腿部與軀幹搖晃，二頭肌純粹發力。",
    "gif": "gifs/dumbbell_bicep_curl.gif",
    "steps": [
      "端坐在健身椅上，雙腳踩實，挺胸收腹，雙臂垂於身體兩側持鈴。",
      "大臂緊貼身側不動，二頭肌發力將啞鈴垂直彎舉至胸前最高點。",
      "均勻慢速下放至手臂近乎伸直。"
    ]
  },
  "incline_dumbbell_bicep_curl": {
    "id": "incline_dumbbell_bicep_curl",
    "name": "上斜板啞鈴二頭彎舉",
    "english_name": "incline bench dumbbell curl",
    "target_area": "二頭肌長頭、外側頭（打造手臂峰度）",
    "tip": "斜靠在60度椅背上，手臂自然垂於身體後方，極大化二頭肌長頭拉伸。",
    "gif": "gifs/dumbbell_bicep_curl.gif",
    "steps": [
      "斜躺在 45–60 度的健身椅上，雙臂自然垂直向下向後懸垂，二頭肌拉滿。",
      "大臂固定，二頭肌主動收縮彎舉啞鈴至頂端擠壓 1 秒。",
      "極度慢速抵抗重力下放手臂回到後下方伸展位置。"
    ]
  },
  "bench_dips": {
    "id": "bench_dips",
    "name": "健身椅屈臂支撐伸展",
    "english_name": "bench dips",
    "target_area": "三頭肌、肩膀前側（自重好上手）",
    "tip": "雙手後撐健身椅邊緣，雙膝彎曲，自重下壓再推起，不需啞鈴高舉過頭。",
    "gif": "gifs/dumbbell_tricep_extension.gif",
    "steps": [
      "背對健身椅，雙手手掌撐在椅邊，手指向前，雙膝彎曲雙腳踩地。",
      "慢速彎曲手肘將臀部直下沉降，手肘約彎至 90 度。",
      "三頭肌發力將手臂伸直推起身體回到原位。"
    ]
  },
  "overhead_tricep_pause": {
    "id": "overhead_tricep_pause",
    "name": "深層拉伸停頓過頭伸展",
    "english_name": "paused overhead triceps extension",
    "target_area": "手臂三頭肌長頭（深層爆發）",
    "tip": "啞鈴下放至後頸深處極限拉伸三頭長頭，停留 2 秒再推起，撕裂感極強。",
    "gif": "gifs/dumbbell_tricep_extension.gif",
    "steps": [
      "雙手托住啞鈴舉至頭頂上方，大臂垂直貼耳固定。",
      "彎曲手肘將啞鈴慢放至後頸深處，在拉伸最深點完全停頓 2 秒。",
      "三頭肌強力伸展垂直推回頭頂。"
    ]
  },
  "box_squat": {
    "id": "box_squat",
    "name": "箱式深蹲 / 坐椅深蹲",
    "english_name": "box squat / bench squat",
    "target_area": "臀大肌、股四頭肌（新手護膝必練）",
    "tip": "身後放健身椅，屁股後推坐上椅面 1 秒再起立，安全掌握髖關節後推要領。",
    "gif": "gifs/goblet_squat.gif",
    "steps": [
      "雙腳與肩同寬站立於健身椅前方，雙手抱胸或持輕鈴。",
      "髖部先向後推，屈膝慢速下蹲，直至臀部輕巧坐實椅面停頓 1 秒。",
      "腳後跟蹬地、核心收緊，發力站起頂髖夾臀。"
    ]
  },
  "paused_goblet_squat": {
    "id": "paused_goblet_squat",
    "name": "底部停頓 3 秒高腳杯深蹲",
    "english_name": "paused goblet squat",
    "target_area": "大腿肌群、臀部爆發力（進階強化）",
    "tip": "蹲到底部完全靜態停頓 3 秒，徹底消除回彈力，腿部與臀部承受高張力考驗。",
    "gif": "gifs/goblet_squat.gif",
    "steps": [
      "雙手持啞鈴於胸前，雙腳略寬於肩，挺胸收腹下蹲。",
      "下蹲至大腿與地面平行或略低，在最低點靜態維持 3 秒（不鬆懈核心）。",
      "全腳掌蹬地爆發站直起立。"
    ]
  },
  "wall_hip_hinge": {
    "id": "wall_hip_hinge",
    "name": "靠牆髖鉸鏈硬舉練習",
    "english_name": "wall-assisted hip hinge",
    "target_area": "大腿後側膕繩肌、臀肌（姿勢矯正）",
    "tip": "背對牆站立一步，專注將屁股往後找牆壁碰觸，避免彎腰駝背下背代償。",
    "gif": "gifs/dumbbell_romanian_deadlift.gif",
    "steps": [
      "背對牆壁站立約一腳距離，雙腳微寬於肩，膝蓋微曲保持彈性。",
      "脊椎打直，將髖部向後推送，直至屁股輕觸牆壁，感受大腿後側拉滿。",
      "臀部發力向前頂髖，身體回正站立。"
    ]
  },
  "b_stance_dumbbell_rdl": {
    "id": "b_stance_dumbbell_rdl",
    "name": "B-Stance 交錯腳硬舉",
    "english_name": "b-stance dumbbell rdl",
    "target_area": "單側腿後肌群、臀大肌（兼顧平衡與刺激）",
    "tip": "後腳腳尖輕點地作為支撐腳架，重心 80% 在前腿，刺激度遠超雙腳硬舉。",
    "gif": "gifs/dumbbell_romanian_deadlift.gif",
    "steps": [
      "前腳踩實地面承重，後腳退半步腳尖輕點地輔助平衡。",
      "雙手持啞鈴沿著前腿下沉，前側髖部向後推，脊椎全程保持延伸挺直。",
      "前腿後側拉滿後，靠前腳臀腿發力將身體拉直站立，換邊操作。"
    ]
  },
  "glute_bridge_double": {
    "id": "glute_bridge_double",
    "name": "平躺雙腳臀橋",
    "english_name": "glute bridge on floor",
    "target_area": "臀大肌、下背穩定（安全基礎）",
    "tip": "仰臥地面雙腳踩地頂髖，消除單腿晃動，專注頂峰夾緊臀部 2 秒。",
    "gif": "gifs/single_leg_hip_thrust.gif",
    "steps": [
      "仰臥在瑜珈墊上，雙腿屈膝踩地，雙腳與肩同寬，手臂自然平放身側。",
      "腳後跟蹬地發力，將骨盆頂起直至大腿與軀幹呈水平線。",
      "在頂端全力夾緊臀部 2 秒，緩慢有控制地下放至臀部輕觸地面。"
    ]
  },
  "weighted_single_leg_thrust": {
    "id": "weighted_single_leg_thrust",
    "name": "負重單腿臀推",
    "english_name": "weighted single leg hip thrust",
    "target_area": "單側臀大肌（頂級單側孤立）",
    "tip": "在骨盆單側放置啞鈴負重推頂，極限孤立單側臀大肌，打造強壯臀部曲線。",
    "gif": "gifs/single_leg_hip_thrust.gif",
    "steps": [
      "上背平靠健身椅，單腳踩地屈膝 90 度，另一腳抬起懸空，啞鈴置於支撐腿骨盆上方。",
      "臀部下沉接近地面後，支撐腳後跟強力蹬地將髖部推起至水平。",
      "頂點用力擠壓臀部 2 秒，平緩下沉換邊重複。"
    ]
  },
  "wall_stop_rollout": {
    "id": "wall_stop_rollout",
    "name": "靠牆半程滾輪 / 棒式支撐",
    "english_name": "wall-blocked ab wheel rollout",
    "target_area": "腹直肌、核心深層（防塌腰退階）",
    "tip": "跪在距牆 60cm 處，滾輪滾至碰牆即停並拉回，防止力竭塌腰受傷。",
    "gif": "gifs/ab_wheel_rollout.gif",
    "steps": [
      "跪在距離牆壁約 60 公分處，雙手握住滾輪手把，骨盆微微後傾收腹。",
      "向前滾動滾輪直至輪子輕觸牆壁停止，維持核心緊繃不塌腰。",
      "腹肌主動收縮，將滾輪平穩拉回膝蓋前方。"
    ]
  },
  "paused_rollout": {
    "id": "paused_rollout",
    "name": "末端停頓 2 秒腹肌滾輪",
    "english_name": "paused ab wheel rollout",
    "target_area": "腹直肌、前側核心鏈（極限挑戰）",
    "tip": "滾到身體貼近地面的最遠端停頓 2 秒，對抗重力拉力，核心抗伸展挑戰爆表。",
    "gif": "gifs/ab_wheel_rollout.gif",
    "steps": [
      "跪姿標準向前慢速滾動滾輪至身體近乎水平貼地的極限位置。",
      "在最長力臂伸展處保持停頓懸空 2 秒，腹肌死命收緊抵抗下塌。",
      "發力將滾輪收回膝蓋處。"
    ]
  },
  "knee_side_plank": {
    "id": "knee_side_plank",
    "name": "屈膝側棒式",
    "english_name": "knee side plank",
    "target_area": "腹斜肌、腰方肌（減輕肩腰負擔）",
    "tip": "雙膝彎曲90度貼地支撐，力矩縮短一半，減輕腰部不適，更易維持脊椎中立。",
    "gif": "gifs/side_plank.gif",
    "steps": [
      "側臥在墊上，手肘位於肩膀正下方支撐地面，雙膝彎曲 90 度並攏疊放貼地。",
      "側腹部與臀中肌發力將髖部推高，使軀幹與大腿呈一直線。",
      "保持均勻呼吸，維持 20–40 秒後換邊。"
    ]
  },
  "side_plank_leg_lift": {
    "id": "side_plank_leg_lift",
    "name": "側棒式加動態抬腿",
    "english_name": "side plank with leg raise",
    "target_area": "側腹腹斜肌、臀中肌（動態高階）",
    "tip": "側棒式支撐時上方腿動態開合抬起，同時轟炸側腹與臀中肌。",
    "gif": "gifs/side_plank.gif",
    "steps": [
      "手肘撐地、雙腿伸直，推起身體完成標準直腿側棒式。",
      "保持骨盆不掉落，上方腿勻速向上抬起 30–45 度再緩慢放回。",
      "連續進行 10–15 下動態抬腿後換邊。"
    ]
  },
  "feet_elevated_push_up": {
    "id": "feet_elevated_push_up",
    "name": "健身椅推胸 / 平板啞鈴推",
    "english_name": "incline bench press / bench push-up",
    "target_area": "胸大肌整體（平緩肩部壓力）",
    "tip": "改採平板角度或手撐健身椅推胸，平緩上胸對肩膀前束的壓迫感。",
    "gif": "gifs/dumbbell_bench_press.gif",
    "steps": [
      "雙手持鈴平躺於健身椅上，手肘內收45度平穩下放至胸口兩側。",
      "胸肌發力垂直推回胸口上方，手肘微屈保持張力。"
    ]
  },
  "alternating_incline_bench_press": {
    "id": "alternating_incline_bench_press",
    "name": "上斜單邊交替啞鈴推胸",
    "english_name": "alternating incline dumbbell press",
    "target_area": "上胸肌、核心抗扭轉（高階單側協調）",
    "tip": "一邊推起保持頂端鎖定，另一邊單獨下放推起，強迫核心抗扭轉發力。",
    "gif": "gifs/dumbbell_incline_bench_press.gif",
    "steps": [
      "斜躺在上斜椅上，雙臂將啞鈴推至頭頂上方雙手鎖定。",
      "保持左臂伸直鎖定，右臂慢速下沉拉滿胸肌後推起回到頂端。",
      "換左臂下沉推起，左右交替進行。"
    ]
  },
  "bent_over_row_pause": {
    "id": "bent_over_row_pause",
    "name": "俯身划船頂端停頓 2 秒",
    "english_name": "paused bent-over dumbbell row",
    "target_area": "闊背肌、中斜方肌（背肌充血極限）",
    "tip": "雙鈴拉至腰間停頓 2 秒擠壓肩胛骨，背部張力最大化。",
    "gif": "gifs/dumbbell_bent_over_row.gif",
    "steps": [
      "雙腳與肩同寬，屈膝俯身 45 度，背部筆直挺胸。",
      "手肘貼身向後拉至髖骨，在頂端死命夾緊肩胛骨停頓 2 秒。",
      "抗重力均勻放回起始位置。"
    ]
  },
  "standing_arnold_press": {
    "id": "standing_arnold_press",
    "name": "站姿阿諾肩推",
    "english_name": "standing arnold press",
    "target_area": "全肩三角肌、核心抗晃動",
    "tip": "站姿旋轉推舉，全身核心收緊、臀肌夾緊，調動全身力量鏈。",
    "gif": "gifs/dumbbell_arnold_press.gif",
    "steps": [
      "挺拔站立，臀腹夾緊，啞鈴舉在胸前掌心朝向自己。",
      "向上推舉時手腕外旋，推至頂點掌心朝前，核心繃緊不後仰。",
      "旋轉收回胸前原位。"
    ]
  },
  "chest_supported_reverse_fly": {
    "id": "chest_supported_reverse_fly",
    "name": "上斜椅胸口支撐反向飛鳥",
    "english_name": "chest-supported reverse fly",
    "target_area": "三角肌後束、菱形肌（腰背零壓力）",
    "tip": "胸趴在健身椅上，杜絕腰背借力與晃動，精準孤立肩膀後側。",
    "gif": "gifs/dumbbell_reverse_fly.gif",
    "steps": [
      "將椅背調為 30–45 度，胸部趴貼椅背，雙手持輕鈴下垂。",
      "手肘保持微屈，專注肩膀後束發力像大鵬展翅平展至身側最高點。",
      "慢放 2 秒回身前。"
    ]
  },
  "paused_reverse_fly": {
    "id": "paused_reverse_fly",
    "name": "反向飛鳥頂峰懸停 2 秒",
    "english_name": "paused dumbbell reverse fly",
    "target_area": "三角肌後束（雕塑肩後側）",
    "tip": "展翅最高點用力擠壓肩膀後側懸停 2 秒，徹底強化肩膀後側線條。",
    "gif": "gifs/dumbbell_reverse_fly.gif",
    "steps": [
      "俯身背平，雙臂向兩側展翅平舉至水平線。",
      "在最高點用力夾緊後束維持 2 秒停頓。",
      "有控制地緩慢放下。"
    ]
  },
  "seated_hammer_curl": {
    "id": "seated_hammer_curl",
    "name": "坐姿啞鈴槌式彎舉",
    "english_name": "seated hammer curl",
    "target_area": "手臂肱橈肌、肱肌（穩定無甩晃）",
    "tip": "坐姿挺胸操作，消除下肢擺盪，手腕舒適好發力。",
    "gif": "gifs/dumbbell_hammer_curl.gif",
    "steps": [
      "端坐在椅子上，雙手持鈴掌心相對，大臂貼身。",
      "大臂不動，前臂向上彎舉至胸口兩側最高點擠壓前臂外側。",
      "勻速下放回原位。"
    ]
  },
  "cross_body_hammer_curl": {
    "id": "cross_body_hammer_curl",
    "name": "斜向十字交替槌式彎舉",
    "english_name": "cross-body hammer curl",
    "target_area": "肱肌、前臂外側（立體手臂厚度）",
    "tip": "啞鈴斜向胸口對角線提拉，極致孤立肱肌與前臂肌群。",
    "gif": "gifs/dumbbell_hammer_curl.gif",
    "steps": [
      "自然站立，右手持鈴沿著胸口對角線斜向左胸肩部提拉彎舉。",
      "頂點擠壓手臂外側 1 秒，慢放下放。",
      "換左手向右肩方向提拉，左右交替進行。"
    ]
  },
  "knee_close_grip_push_up": {
    "id": "knee_close_grip_push_up",
    "name": "跪姿膝蓋著地窄握伏地挺身",
    "english_name": "kneeling close-grip push-up",
    "target_area": "手臂三頭肌、內胸（退階安全）",
    "tip": "雙膝著地減輕負載，手肘緊貼身體兩側後夾下壓，三頭肌安全充血。",
    "gif": "gifs/close_grip_push_up.gif",
    "steps": [
      "雙膝跪地，雙手置於胸口下方距離窄於肩寬，手肘朝向後方。",
      "全身軀幹打直下壓，胸口貼近地面停頓 1 秒。",
      "三頭肌主動發力推起身體。"
    ]
  },
  "decline_close_push_up": {
    "id": "decline_close_push_up",
    "name": "雙腳墊高下斜窄握伏地挺身",
    "english_name": "decline close-grip push-up",
    "target_area": "三頭肌、上胸內側（高階自重殺手）",
    "tip": "雙腳墊在健身椅上，身體呈下斜角度，三頭肌承受極限體重壓力。",
    "gif": "gifs/close_grip_push_up.gif",
    "steps": [
      "雙腳腳尖踩在健身椅上，雙手撐在地面窄握貼身。",
      "手肘貼身慢速屈肘下沉胸口至地面邊緣。",
      "三頭肌爆發發力推直手臂回起始位置。"
    ]
  },
  "bodyweight_sumo_squat": {
    "id": "bodyweight_sumo_squat",
    "name": "徒手寬距相撲深蹲",
    "english_name": "bodyweight sumo squat",
    "target_area": "大腿內側、臀大肌（徒手放鬆）",
    "tip": "不持啞鈴徒手下蹲，減輕腰部壓力，專注大腿內側拉伸與臀大肌收縮。",
    "gif": "gifs/dumbbell_sumo_squat.gif",
    "steps": [
      "雙腳 1.5 倍肩寬站立，腳尖朝外 45 度，雙手於胸前合掌。",
      "膝蓋朝腳尖方向打開垂直下蹲至大腿平行地面，感受大腿內側充分伸展。",
      "臀肌與內側肌群發力蹬地站直並夾臀。"
    ]
  },
  "paused_sumo_squat": {
    "id": "paused_sumo_squat",
    "name": "相撲深蹲底部彈動加倍燃燒",
    "english_name": "pulse sumo squat",
    "target_area": "大腿內側、臀部持續受張力",
    "tip": "蹲到底部做一次小幅半程彈動後再完全起立，深度燃燒臀腿肌群。",
    "gif": "gifs/dumbbell_sumo_squat.gif",
    "steps": [
      "手持啞鈴寬站距下蹲至大腿平行地面。",
      "在底部向上微抬 5 公分再下沉一次（脈衝彈動一拍）。",
      "全腳掌發力完全站直並死命夾緊臀大肌。"
    ]
  },
  "b_stance_rdl": {
    "id": "b_stance_rdl",
    "name": "B-Stance 支撐式單腿硬舉",
    "english_name": "b-stance rdl",
    "target_area": "單側腿後肌群、臀肌（消除晃動失衡）",
    "tip": "後腳腳尖輕點地形成三腳架輔助，徹底消除站不穩，80% 力量依然灌在大腿後側。",
    "gif": "gifs/single_leg_romanian_deadlift.gif",
    "steps": [
      "前腳踩實承重，後腳退半步腳尖輕點地輔助穩定平衡。",
      "前側髖部向後推，啞鈴沿前腿下垂，脊椎延伸打直。",
      "前腿後側拉滿後，前腳臀部收縮站直，換邊操作。"
    ]
  },
  "single_leg_rdl_pause": {
    "id": "single_leg_rdl_pause",
    "name": "懸空單腿硬舉拉伸停頓 2 秒",
    "english_name": "paused single leg deadlift",
    "target_area": "單腿平衡、深層臀腿（極限穩定）",
    "tip": "前傾至身體與後腿呈水平線，深處拉伸停頓 2 秒，極致考驗臀腿與本體平衡。",
    "gif": "gifs/single_leg_romanian_deadlift.gif",
    "steps": [
      "單腳站立膝微屈，另一腳向後懸空延伸，軀幹前傾如天平。",
      "在身體與後腿水平的最深拉伸處停頓懸空 2 秒。",
      "支撐側臀腿強力拉回站立。"
    ]
  },
  "double_leg_hip_thrust_bodyweight": {
    "id": "double_leg_hip_thrust_bodyweight",
    "name": "靠椅徒手雙腿臀推",
    "english_name": "bodyweight hip thrust on bench",
    "target_area": "臀大肌、腿後側（無負重專注感受）",
    "tip": "背靠椅徒手頂髖，不放啞鈴，專注頂峰骨盆後傾夾臀感受度。",
    "gif": "gifs/dumbbell_hip_thrust.gif",
    "steps": [
      "上背肩胛骨平靠健身椅沿，雙手抱胸，雙腳踩地曲膝 90 度。",
      "臀部下沉後，腳後跟蹬地將髖骨推至大腿與軀幹呈水平線。",
      "頂端死命夾緊臀部 2 秒再勻速下沉。"
    ]
  },
  "paused_dumbbell_hip_thrust": {
    "id": "paused_dumbbell_hip_thrust",
    "name": "啞鈴臀推頂峰擠壓 3 秒",
    "english_name": "paused dumbbell hip thrust",
    "target_area": "臀大肌本體（深度孤立）",
    "tip": "推至軀幹水平頂點死命夾緊臀大肌 3 秒，強制喚醒沉睡臀肌神經。",
    "gif": "gifs/dumbbell_hip_thrust.gif",
    "steps": [
      "上背靠椅，啞鈴置於髖部，雙腳踩實地面。",
      "臀部發力頂髖至水平直線，頂峰使出全力夾臀擠壓維持整整 3 秒。",
      "控制速度下沉臀部。"
    ]
  },
  "bodyweight_calf_raise": {
    "id": "bodyweight_calf_raise",
    "name": "徒手雙腳提踵",
    "english_name": "bodyweight standing calf raise",
    "target_area": "小腿肌群（溫和入門）",
    "tip": "徒手雙腳平地提踵，手扶牆壁保持平衡，溫和刺激小腿肌群。",
    "gif": "gifs/calf_raise.gif",
    "steps": [
      "雙腳自然站立，雙手輕扶牆壁維持身體平衡。",
      "腳尖用力向下壓地，腳後跟墊到最高點，小腿頂峰收縮 1 秒。",
      "緩慢放低腳後跟回到平地。"
    ]
  },
  "single_leg_calf_raise": {
    "id": "single_leg_calf_raise",
    "name": "單腳負重提踵",
    "english_name": "single leg dumbbell calf raise",
    "target_area": "單側小腿肌群（雙倍負荷）",
    "tip": "單腳站立負重提踵，小腿承受雙倍體重與負載，爆發力十足。",
    "gif": "gifs/calf_raise.gif",
    "steps": [
      "單腳站立支撐，同側手持啞鈴，另一手輕扶牆壁維持平衡。",
      "支撐腳腳尖下壓，腳後跟竭盡全力墊高至頂點停頓 1 秒。",
      "抵抗重力慢放腳後跟，換腳操作。"
    ]
  }
};

if (typeof window !== 'undefined') { window.EXERCISES_DATA = EXERCISES_DATA; }
if (typeof global !== 'undefined') { global.EXERCISES_DATA = EXERCISES_DATA; }

