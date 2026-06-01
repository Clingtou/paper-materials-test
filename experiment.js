/* =========================
   Online deployment configuration
   =========================
   1) Replace DATAPIPE_EXPERIMENT_ID with the experiment_id from DataPipe.
   2) Replace PROLIFIC_COMPLETION_CODE with the completion code from Prolific.
   3) For local testing, you can leave these placeholders unchanged; the file will run,
      but it will show a warning and will NOT save to OSF until DATAPIPE_EXPERIMENT_ID is set.
*/
const DATAPIPE_EXPERIMENT_ID = "2RInaGI34Bnq";
const PROLIFIC_COMPLETION_CODE = "PASTE_PROLIFIC_COMPLETION_CODE_HERE";
const PROLIFIC_COMPLETION_URL = PROLIFIC_COMPLETION_CODE.indexOf("PASTE_") === -1
  ? "https://app.prolific.com/submissions/complete?cc=" + encodeURIComponent(PROLIFIC_COMPLETION_CODE)
  : "";

function hasConfiguredDataPipe() {
  return DATAPIPE_EXPERIMENT_ID && DATAPIPE_EXPERIMENT_ID.indexOf("PASTE_") === -1;
}

function safeFilePart(value) {
  return String(value || "missing")
    .replace(/[^a-zA-Z0-9_-]/g, "_")
    .slice(0, 80);
}

/* initialize jsPsych */
var jsPsych = initJsPsych({
  use_webaudio: false,
  on_finish: function () {
    window.gamble1_data_json = jsPsych.data.get().json();
    window.gamble1_data_csv = jsPsych.data.get().csv();
    console.log('gamble1 data JSON:', window.gamble1_data_json);
    console.log('gamble1 data CSV:', window.gamble1_data_csv);
  }
});

  /* create timeline */
  var timeline = [];

  var bkRgb = 'rgb(128, 128, 128)';
  var fontRgb = 'rgb(0, 0, 0)';
  var stimRgb = 'rgb(255, 255, 255)';

  var acceptKey = 1;
  var formalTrialCount = 98;
  var experimentStarted = false;
  var experimentCompleted = false;
  var experimentAborted = false;
  var payoffInfo = null;

  /* Prolific IDs.
   Prolific normally appends these URL parameters automatically:
   PROLIFIC_PID, STUDY_ID, SESSION_ID.
*/
var prolific_pid = jsPsych.data.getURLVariable('PROLIFIC_PID') || 'missing';
var study_id = jsPsych.data.getURLVariable('STUDY_ID') || 'missing';
var session_id = jsPsych.data.getURLVariable('SESSION_ID') || jsPsych.randomization.randomID(12);

/* Keep compatibility with your old local / Credamo-style test links.
   If PROLIFIC_PID is present, Subject will be the Prolific ID.
*/
var participantId = prolific_pid !== 'missing'
  ? prolific_pid
  : (
      jsPsych.data.getURLVariable('participant') ||
      jsPsych.data.getURLVariable('participant_id') ||
      jsPsych.data.getURLVariable('subject') ||
      jsPsych.data.getURLVariable('subject_id') ||
      jsPsych.data.getURLVariable('pid') ||
      jsPsych.data.getURLVariable('uid') ||
      jsPsych.randomization.randomID(12)
    );

var dataFilename = safeFilePart(participantId) + '_' + safeFilePart(session_id) + '_' + Date.now() + '_data.csv';

jsPsych.data.addProperties({
  Subject: participantId,
  prolific_pid: prolific_pid,
  study_id: study_id,
  session_id: session_id,
  data_filename: dataFilename,
  AcceptKey: acceptKey,
  platform: 'github_pages_datapipe_osf',
  experiment_name: 'gamble1_desktop_jspsych_datapipe',
  response_mapping: 'ArrowUp_accept_ArrowDown_reject',
  formal_trial_count: formalTrialCount,
  screen_width: window.screen.width,
  screen_height: window.screen.height,
  window_inner_width: window.innerWidth,
  window_inner_height: window.innerHeight,
  user_agent: navigator.userAgent,
  timezone_offset_minutes: new Date().getTimezoneOffset()
});

  var titleText = '赌局游戏\n\n\n请按“空格键”进入';
  var remindText = '请注意:\n\n实验中赢钱和输钱的面额值在字体大小上可能有所不同\n\n但这与游戏规则没有任何关系\n\n并不会影响你最终的收益\n\n如你已明白，请按“空格键”继续';
  var keyText = '请按“↑”键表示接受\n\n请按“↓”键表示拒绝\n\n\n按“空格键”继续';
  var practiceText = '接下来有三个轮次的练习\n\n\n\n练习轮次不会被抽取执行\n\n如有疑问，可以在练习期间举手询问实验人员\n\n\n准备好后，请按“空格键”进入练习';
  var startText = '练习结束！游戏即将正式开始\n\n你的决策时间会被记录，\n因此游戏开始后，请不要走神或讲话，\n保持专注，直到你完成游戏。\n\n如你已准备好\n按“空格键”立刻开始';
  var endText = '赌局游戏结束！\n\n\n请按任意键保存数据并完成实验';

  function generateProbe() {
    var base = [];
    var pairIndex = 0;

    for (var gain = 3; gain <= 9; gain++) {
      for (var loss = 3; loss <= 9; loss++) {
        pairIndex += 1;
        var gainOnLeft = Math.random() < 0.5 ? 0 : 1;

        base.push({
          pair_index: pairIndex,
          unique_gamble_id: 'G' + gain + '_L' + loss,
          gain: gain,
          loss: loss,
          GainOnLeft: gainOnLeft
        });
      }
    }

    var data = [];

    for (var i = 0; i < base.length; i++) {
      data.push({
        pair_index: base[i].pair_index,
        unique_gamble_id: base[i].unique_gamble_id,
        gain: base[i].gain,
        loss: base[i].loss,
        GainOnLeft: base[i].GainOnLeft,
        Fontsize: 1
      });
    }

    for (var j = 0; j < base.length; j++) {
      data.push({
        pair_index: base[j].pair_index,
        unique_gamble_id: base[j].unique_gamble_id,
        gain: base[j].gain,
        loss: base[j].loss,
        GainOnLeft: base[j].GainOnLeft,
        Fontsize: 0
      });
    }

    var shuffled = jsPsych.randomization.shuffle(data);

    for (var k = 0; k < shuffled.length; k++) {
      shuffled[k].original_probe_index = k + 1;
    }

    return shuffled;
  }

  var probe = generateProbe();

  function randomFixationDuration() {
    return Math.random() * 1000 + 2000;
  }

  function instructionScreen(text, screenName) {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus:
        '<div class="matlab-screen" style="background:' + bkRgb + '; color:' + fontRgb + ';">' +
          '<div class="matlab-text">' + text + '</div>' +
        '</div>',
      choices: [' '],
      data: {
        phase: 'instruction',
        screen: screenName
      }
    };
  }

  function fixationTrial(phaseName, trialIndex) {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus:
        '<div class="fixation-screen" style="background:' + bkRgb + ';">' +
          '<div class="fixation-dot" style="background:' + stimRgb + ';"></div>' +
        '</div>',
      choices: 'NO_KEYS',
      trial_duration: randomFixationDuration,
      data: {
        phase: phaseName,
        trial_part: 'fixation',
        trial_index: trialIndex
      }
    };
  }

  function renderStimulus(row) {
    var gainClass = row.Fontsize === 1 ? 'font-large' : 'font-small';
    var lossClass = row.Fontsize === 0 ? 'font-large' : 'font-small';

    var gainHtml = '<div class="gamble-amount ' + gainClass + '" style="color:' + stimRgb + ';">+' + row.gain + '</div>';
    var lossHtml = '<div class="gamble-amount ' + lossClass + '" style="color:' + stimRgb + ';">-' + row.loss + '</div>';

    var leftHtml = row.GainOnLeft === 1 ? gainHtml : lossHtml;
    var rightHtml = row.GainOnLeft === 1 ? lossHtml : gainHtml;

    return '<div class="gamble-screen" style="background:' + bkRgb + ';">' +
      '<div class="stim-frame stim-left">' + leftHtml + '</div>' +
      '<div class="stim-frame stim-right">' + rightHtml + '</div>' +
      '</div>';
  }

  function makeGambleChoiceTrial(row, phaseName, trialIndex) {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: renderStimulus(row),
      choices: ['ArrowUp', 'ArrowDown'],
      data: {
        phase: phaseName,
        trial_part: 'choice',
        trial_index: trialIndex,
        pair_index: row.pair_index,
        unique_gamble_id: row.unique_gamble_id,
        Gain: row.gain,
        Loss: row.loss,
        GainOnLeft: row.GainOnLeft,
        Fontsize: row.Fontsize
      }
    };
  }

  function collectFormData(form) {
    var formData = new FormData(form);
    var response = {};

    formData.forEach(function (value, key) {
      response[key] = value;
    });

    return response;
  }

  function makeFormTrial(innerHtml, phaseName, buttonLabel) {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus:
        '<div class="survey-screen">' +
          '<form id="survey-form">' +
            innerHtml +
            '<div class="survey-next-wrap">' +
              '<button type="submit" class="survey-next-btn">' + buttonLabel + '</button>' +
            '</div>' +
          '</form>' +
        '</div>',
      choices: 'NO_KEYS',
      data: {
        phase: phaseName
      },
      on_load: function () {
        var form = document.getElementById('survey-form');
        form.addEventListener('submit', function (event) {
          event.preventDefault();

          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }

          jsPsych.finishTrial({
            response: collectFormData(form)
          });
        });
      }
    };
  }

  function taskQuestionnaireIntroAndIllusionTrial() {
    var html =
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p>恭喜你完成了赌局任务！接下来请填写后测问卷。</p>' +
        '<p>问卷包括两个部分：赌局任务问题、个人信息问题。总共包括6道题目，需要<span class="survey-red">2分钟</span>左右完成。</p>' +
      '</div>' +
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p>第一部分是<b>赌局任务相关</b>问卷。</p>' +
        '<p>共2个问题，没有对错之分，请根据你的主观感受和实际选择回答即可。</p>' +
      '</div>' +
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p class="survey-question-title">1. 在赌局任务中，当潜在收益和潜在损失两者的字体大小不同时，即两者一个字体大一个字体小时，你是否会不由自主地觉得，字体大的那个金额比字体小的那个金额，数额也更大？</p>' +
        '<p class="survey-subtitle">请使用1-7的评分标准来评估你的错觉，其中1表示你“完全没有这种感觉”，7表示你“有非常强烈的感觉”。</p>' +
        '<div class="scale-label-row"><span>完全没有感觉</span><span>非常强烈的感觉</span></div>' +
        '<div class="scale-row">' +
          '<label><input type="radio" name="fontsize_illusion" value="1" required><span>1</span></label>' +
          '<label><input type="radio" name="fontsize_illusion" value="2"><span>2</span></label>' +
          '<label><input type="radio" name="fontsize_illusion" value="3"><span>3</span></label>' +
          '<label><input type="radio" name="fontsize_illusion" value="4"><span>4</span></label>' +
          '<label><input type="radio" name="fontsize_illusion" value="5"><span>5</span></label>' +
          '<label><input type="radio" name="fontsize_illusion" value="6"><span>6</span></label>' +
          '<label><input type="radio" name="fontsize_illusion" value="7"><span>7</span></label>' +
        '</div>' +
      '</div>';

    return makeFormTrial(html, 'post_survey_task_illusion', '下一页');
  }

  function taskQuestionnaireStrategyTrial() {
    var html =
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p class="survey-question-title">2. 在赌局任务当中，你做出选择的<span class="survey-red">主要策略</span>或依据是？（不少于100字）</p>' +
        '<textarea name="strategy" required minlength="100" placeholder="请至少输入100字"></textarea>' +
      '</div>';

    return makeFormTrial(html, 'post_survey_task_strategy', '下一页');
  }

  function personalQuestionnaireBasicTrial() {
    var html =
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p>以下是个人信息问题。</p>' +
        '<p>回答将仅用于研究目的，不会用于商业目的。你的个人信息将被严格保密。</p>' +
      '</div>' +
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p class="survey-question-title">1、你的受教育年限（单位：年；从小学一年级开始计算，例如：现在科大四年级 = 小学6年 + 初中高中6年 + 本科3年 = 15）</p>' +
        '<input type="number" name="education_years" min="0" step="1" required>' +
      '</div>' +
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p class="survey-question-title">2、你所攻读的最高学历的专业</p>' +
        '<select name="major" required>' +
          '<option value="" disabled selected>请选择</option>' +
          '<option value="哲学">哲学</option>' +
          '<option value="经济学">经济学</option>' +
          '<option value="法学">法学</option>' +
          '<option value="教育学">教育学</option>' +
          '<option value="文学">文学</option>' +
          '<option value="历史学">历史学</option>' +
          '<option value="理学">理学</option>' +
          '<option value="工学">工学</option>' +
          '<option value="农学">农学</option>' +
          '<option value="医学">医学</option>' +
          '<option value="管理学">管理学</option>' +
          '<option value="艺术学">艺术学</option>' +
        '</select>' +
      '</div>';

    return makeFormTrial(html, 'post_survey_personal_basic', '下一页');
  }

  function personalQuestionnaireLadderTrial() {
    var html =
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p class="survey-question-title">3、请想象下面这个梯子代表社会上人群的纵向分布。最上面的梯级（10）代表那些拥有最多财富、接受了最好的教育、拥有最好的工作、得到最多尊重的人；最下面的梯级（1）代表那些拥有最少财富、接受了最少的教育或没接受教育、做着最差的工作或没工作、得到了最少的尊重的人。</p>' +
        '<p class="survey-question-title">综合来看，你认为你的家庭属于哪一梯级？</p>' +
        '<img src="ladder.png" class="ladder-image" alt="社会阶梯图">' +
        '<div class="scale-row">' +
          '<label><input type="radio" name="ses_ladder" value="1" required><span>1</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="2"><span>2</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="3"><span>3</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="4"><span>4</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="5"><span>5</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="6"><span>6</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="7"><span>7</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="8"><span>8</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="9"><span>9</span></label>' +
          '<label><input type="radio" name="ses_ladder" value="10"><span>10</span></label>' +
        '</div>' +
      '</div>';

    return makeFormTrial(html, 'post_survey_personal_ladder', '下一页');
  }

  function personalQuestionnaireIncomeTrial() {
    var html =
      '<div class="survey-card">' +
        '<span class="survey-required">*</span>' +
        '<p class="survey-question-title">4、你每个月的可支配收入大约是：（单位：元）</p>' +
        '<input type="number" name="monthly_disposable_income" min="0" step="1" required>' +
      '</div>';

    return makeFormTrial(html, 'post_survey_personal_income', '下一页');
  }

  function drawResultButtonTrial() {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus:
        '<div class="draw-screen">' +
          '<div>最后，请按“空格键”抽取你的赌局实验结果</div>' +
        '</div>',
      choices: [' '],
      data: {
        phase: 'draw_result_button'
      }
    };
  }

  function calculatePayoff() {
    if (payoffInfo !== null) {
      return payoffInfo;
    }

    var formalChoices = jsPsych.data.get().filter({
      phase: 'formal',
      trial_part: 'choice'
    }).values();

    var selectedArrayIndex = Math.floor(Math.random() * formalChoices.length);
    var selected = formalChoices[selectedArrayIndex];
    var response = String(selected.response || '').toLowerCase();
    var accepted = response === 'arrowup';
    var gambleOutcome = null;
    var finalIncome = 30;
    var conditionText = '';

    if (!accepted) {
      conditionText = '你的选择是“拒绝”，你不会赢钱也不会输钱，你的最终收入是 30元。';
    } else {
      gambleOutcome = Math.random() < 0.5 ? 0 : 1;

      if (gambleOutcome === 1) {
        finalIncome = 30 + selected.Gain;
        conditionText = '你的选择是“接受”，且你赢得了赌局，你的最终收入是 30 + ' + selected.Gain + ' = ' + finalIncome + '元。';
      } else {
        finalIncome = 30 - selected.Loss;
        conditionText = '你的选择是“接受”，且你输掉了赌局，你的最终收入是 30 - ' + selected.Loss + ' = ' + finalIncome + '元。';
      }
    }

    payoffInfo = {
      selected_formal_trial_index: selected.trial_index,
      selected_Gain: selected.Gain,
      selected_Loss: selected.Loss,
      selected_response: selected.response,
      selected_accepted: accepted ? 1 : 0,
      payoff_random_outcome: gambleOutcome,
      final_income: finalIncome,
      payoff_text: conditionText
    };

    return payoffInfo;
  }

  function payoffTrial() {
    return {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: function () {
        var p = calculatePayoff();

        return '<div class="payoff-screen">' +
          '<div class="payoff-text">' +
            '你的第' + p.selected_formal_trial_index + '个试次被抽中。赢钱的金额是' + p.selected_Gain + '元，输钱的金额是' + p.selected_Loss + '元。\n\n' +
            p.payoff_text +
            '\n\n按空格键继续' +
          '</div>' +
        '</div>';
      },
      choices: [' '],
      data: function () {
        var p = calculatePayoff();

        return {
          phase: 'payoff',
          selected_formal_trial_index: p.selected_formal_trial_index,
          selected_Gain: p.selected_Gain,
          selected_Loss: p.selected_Loss,
          selected_response: p.selected_response,
          selected_accepted: p.selected_accepted,
          payoff_random_outcome: p.payoff_random_outcome,
          final_income: p.final_income
        };
      }
    };
  }

  function abortExperimentBecauseFullscreenExit() {
    if (experimentAborted || experimentCompleted) {
      return;
    }

    experimentAborted = true;

    jsPsych.data.addProperties({
      fullscreen_exit_abort: 1
    });

    jsPsych.endExperiment(
      '<div class="abort-screen">你已退出全屏！实验被迫中断，不得再次作答</div>'
    );
  }

  document.addEventListener('fullscreenchange', function () {
    if (experimentStarted && !experimentCompleted && !document.fullscreenElement) {
      abortExperimentBecauseFullscreenExit();
    }
  });

  document.addEventListener('webkitfullscreenchange', function () {
    if (experimentStarted && !experimentCompleted && !document.webkitFullscreenElement) {
      abortExperimentBecauseFullscreenExit();
    }
  });

  /* add timeline trials */
  const preload_trial = {
    type: jsPsychPreload,
    images: ['ladder.png'],
    continue_after_error: true,
    data: {
      phase: 'preload'
    }
  };
  timeline.push(preload_trial);

  const enter_fullscreen_trial = {
    type: jsPsychFullscreen,
    fullscreen_mode: true,
    message: '<div class="fullscreen-start-screen">' +
      '<div>请点击按钮进入全屏，开始赌局游戏。<br><br>进入全屏后，请不要退出全屏或切换页面。</div>' +
    '</div>',
    button_label: '进入全屏',
    data: {
      phase: 'fullscreen_start'
    },
    on_finish: function () {
      experimentStarted = true;
    }
  };
  timeline.push(enter_fullscreen_trial);

  timeline.push(instructionScreen(titleText, 'title'));
  timeline.push(instructionScreen(remindText, 'reminder'));
  timeline.push(instructionScreen(keyText, 'response_key'));
  timeline.push(instructionScreen(practiceText, 'practice_instruction'));

  /* MATLAB: for i = 56:58 */
  for (var p = 55; p <= 57; p++) {
    timeline.push(fixationTrial('practice', p + 1));
    timeline.push(makeGambleChoiceTrial(probe[p], 'practice', p + 1));
  }

  timeline.push(instructionScreen(startText, 'formal_start'));

  /* MATLAB: for i = 1:length(probe) */
  for (var q = 0; q < probe.length; q++) {
    timeline.push(fixationTrial('formal', q + 1));
    timeline.push(makeGambleChoiceTrial(probe[q], 'formal', q + 1));
  }

  timeline.push(taskQuestionnaireIntroAndIllusionTrial());
  timeline.push(taskQuestionnaireStrategyTrial());
  timeline.push(personalQuestionnaireBasicTrial());
  timeline.push(personalQuestionnaireLadderTrial());
  timeline.push(personalQuestionnaireIncomeTrial());
  timeline.push(drawResultButtonTrial());
  timeline.push(payoffTrial());

  /* add end trial */
const end_trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<div class="credamo-end-screen">' + endText + '</div>',
  choices: 'ALL_KEYS',
  on_start: function () {
    experimentCompleted = true;
  },
  data: {
    phase: 'end_before_save'
  }
};
timeline.push(end_trial);

/* save data to DataPipe / OSF.
   This trial must happen BEFORE redirecting the participant back to Prolific.
*/
if (hasConfiguredDataPipe()) {
  const save_data = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: DATAPIPE_EXPERIMENT_ID,
    filename: dataFilename,
    data_string: function () {
      return jsPsych.data.get().csv();
    },
    wait_message: '<div class="credamo-end-screen"><div>正在保存数据，请不要关闭页面。</div></div>',
    data: {
      phase: 'datapipe_save'
    }
  };
  timeline.push(save_data);
} else {
  const datapipe_not_configured_trial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus:
      '<div class="credamo-end-screen">' +
        '<div style="max-width: 86vw; line-height: 1.6;">' +
          '<p><b>测试模式：DataPipe experiment_id 尚未设置。</b></p>' +
          '<p>实验可以继续运行，但数据不会保存到 OSF。</p>' +
          '<p>正式上线前，请在代码顶部把 DATAPIPE_EXPERIMENT_ID 替换为 DataPipe 提供的 experiment_id。</p>' +
          '<p>按任意键继续。</p>' +
        '</div>' +
      '</div>',
    choices: 'ALL_KEYS',
    data: {
      phase: 'datapipe_not_configured'
    }
  };
  timeline.push(datapipe_not_configured_trial);
}

/* Finish page and optional redirect to Prolific. */
const prolific_finish_trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    if (PROLIFIC_COMPLETION_URL) {
      return '<div class="credamo-end-screen"><div>数据已经保存。<br><br>请按任意键返回 Prolific。</div></div>';
    }
    return '<div class="credamo-end-screen">' +
      '<div style="max-width: 86vw; line-height: 1.6;">' +
        '<p>实验已经结束。</p>' +
        '<p><b>注意：</b>当前没有设置 PROLIFIC_COMPLETION_CODE，因此不会自动跳转回 Prolific。</p>' +
        '<p>正式上线前，请在代码顶部填入 Prolific completion code。</p>' +
      '</div>' +
    '</div>';
  },
  choices: 'ALL_KEYS',
  data: {
    phase: 'finish_or_redirect'
  },
  on_finish: function () {
    if (PROLIFIC_COMPLETION_URL) {
      window.location.href = PROLIFIC_COMPLETION_URL;
    }
  }
};
timeline.push(prolific_finish_trial);

/* start the experiment */
  jsPsych.run(timeline);
