# paper-materials-test


This repository contains data files and analysis code related to the manuscript “Losses Loom Less When They Look Smaller” by Zhiyuan Fei, Simone D’Ambrogio, Michael L. Platt, Feng Sheng .

Overview
Exp1-4.rmd: figure generation code for Experiments 1–4.  
Exp5.rmd: figure generation code for Experiment 5.
Folders: 
Exp1 – Exp5: data, and figures for each experiment. The “results” folder of Exp5 contains intermediate files from the mediation analyses to facilitate figure reproduction.
Model: code, output files and figures for the Valuation Stroop Model (VSM) and attentional Drift Diffusion Model (aDDM).
Task: original MATLAB task scripts used to run Experiments 1–5.  

Scripts
Exp1 – Exp5 folder
Matrix figures for Experiments 1–5 were generated using the following MATLAB scripts: Fig_matrix_exp1.m, Fig_matrix_exp2.m, Fig_matrix_exp3.m, Fig_matrix_exp4.m and Fig_matrix_exp5.m
Model folder
vsm1-4.rmd and vsm5.rmd contain the code used to run VSM for Experiments 1–5. addm.rmd contains the code used to run the aDDM  
Task folder
gamble1.m: gamble task script for Experiment 1  
gamble2.m: gamble task script for Experiment 2  
gamble3.m: gamble task script for Experiment 3 
numerical3.m: numerical-comparison task script for Experiment 3
gamble_joint4.m: joint-presentation gamble task script for Experiment 4  gamble_separate4.m: separate-presentation gamble task script for Experiment 4  gamble5.m: eye-tracking gamble task script for Experiment 5  
numerical5.m: eye-tracking numerical-comparison task script for Experiment 5  

Variable descriptions
--------------------------------------------
Exp 1 
Subject: subject index.  
rial: trial number.  
Gain: the magnitude of gain.  
Loss: the magnitude of loss.  
Fontsize: 0 = Loss-Font-Larger, 1 = Gain-Font-Larger.  
GainOnLeft: 0 = loss displayed on the left, 1 = gain displayed on the left. 
EV: expected value of the gamble.   
Choice: 1 = accept, 0 = reject. 
RT: response time in seconds.  
AcceptKey: 1 = up arrow, 0 = down arrow.  
--------------------------------------------
Exp 2 
The gamble task in Experiment 2 uses the same variables as Experiment 1, except for the following additional condition-coding variables:
Fontsize: -1 = Loss-Font-Larger, 0 = Baseline, 1 = Gain-Font-Larger.  
GainFontLarger: 0 = Baseline or Loss-Font-Larger, 1 = Gain-Font-Larger.  
LossFontLarger: 0 = Baseline or Gain-Font-Larger, 1 = Loss-Font-Larger.  
--------------------------------------------
Exp 3
The gamble task in Experiment 3 uses the same variables as Experiment 1.  
Only variables unique to the numerical-comparison task are listed below.
 FontLarger: the magnitude of larger font.  
 FontSmaller: the magnitude of smaller font.  
 Left: the magnitude of number on the left.
 Right: the magnitude of number on the right.  
 LargerOnLeft: 0 = smaller font number displayed on the left, 1 = larger font number displayed on the left. 
 Congruency: 0 = incongruent, 1 = congruent.  
 RT: response time in seconds. 
 Correct: 1 = correct judgment, 0 = incorrect judgment.  
 Order: 1 = gamble task first, 2 = numerical-comparison task first.  
--------------------------------------------
Exp 4
The joint-presentation task uses the same gamble-task variables as in Experiments 1.  
Only the variables specific to the separate-presentation task are listed below.
 Task: 0 = joint-presentation task, 1 = separate-presentation task.  
 FirstIsLeft: whether the left page was inspected first.  
 LastIsLeft: whether the left page was inspected last. 
 Congruency: 0 = incongruent, 1 = congruent. 
 LeftTime: total time spent on the left page.  
 RightTime: total time spent on the right page.  
 CheckTimesLeft: number of times the left page was inspected.  
 CheckTimesRight: number of times the right page was inspected.  
 Interrupt: 0 = no reminder message appeared, 1 = reminder message appeared  
--------------------------------------------
Exp 5
The behavioral data in Experiment 5 follow the same task structure as in Experiment 3.  
Only eye-tracking files and variables specific to Experiment 5 are described below. In paired variable names, gain/loss in the gamble task corresponds to font-larger/font-smaller number in the numerical-comparison task.
StimulusName: during fixation, values 1–98 index trials. During stimulus presentation, four-digit codes in the gamble task encode Gain, Loss, font-size condition (1 = Gain-Font-Larger, 2 = Loss-Font-Larger), and GainOnLeft; three-digit codes in the numerical-comparison task encode FontLarge, FontSmall, and LargerOnLeft.
TimeSignal: time from run onset (ms).
GazeX, GazeY: gaze coordinates. AOIs were defined as left x = 230–730, right x = 1190–1690, and y = 290–790 on a 1920 × 1080 display; out-of-screen values were treated as missing.
PupilRight: right pupil diameter (mm).
FirstFixationFromOnSet: latency to the first fixation from stimulus onset.
FirstIsGain / FirstIsFontLarge: whether the first fixation was on gain / larger-font number (1) rather than loss / smaller-font number (0).
LastIsGain / LastIsFontLarge: whether the last fixation was on gain / larger-font number (1) rather than loss / smaller-font number (0).
GazeNumGain / GazeNumFontLarge: number of fixations on gain / larger-font number.  
GazeNumLoss / GazeNumFontSmall: number of fixations on loss / smaller-font number.  
GazeNum: total number of AOI fixations.
GazeDurationGain / GazeDurationFontLarge: total fixation duration on gain / larger-font number.  
GazeDurationLoss / GazeDurationFontSmall: total fixation duration on loss / smaller-font number.  
GazeDuration: total fixation duration within the AOIs.
GazeDurationGainRatio / GazeDurationFontLargeRatio: proportion of AOI fixation time on gain / larger-font number.  
GazeDurationLossRatio / GazeDurationFontSmallRatio: proportion of AOI fixation time on loss / smaller-font number.
GazeTime: duration of each gaze.
QualityGamble: percentage of valid eye samples during gamble stimulus presentation.  
QualityNum: percentage of valid eye samples during numerical-comparison stimulus presentation.
ValidData: trial validity flag (1 = valid, 0 = invalid).  
ValidSub: participant validity flag (1 = valid, 0 = invalid).
Ncum_time, Gcum_time, Lcum_time: cumulative gaze duration within a trial on neither AOI, on gain, and on loss, respectively.
Ncum_prop, Gcum_prop, Lcum_prop: cumulative proportions of trial time spent on neither AOI, on gain, and on loss, respectively.
--------------------------------------------
Questionnaire and demographic variables in Exp.1 - Exp.5
self_report: self-reported magnitude-illusion rating .
self_report_joint: magnitude-illusion rating in the joint-presentation task in Exp. 4.
self_report_separate: magnitude-illusion rating in the separate-presentation task in Exp.4.
self_report_diff: perceived difference in subjective magnitude-illusion between the joint- and separate-presentation tasks in Exp.4 (7 = joint-presentation clearly stronger, 1 = separate-presentation clearly stronger).
Gender: gender (1 = male, 2 = female).
Age: age in years.
eduYear: years of education.
major: academic major (recorded in Chinese).
CRT: score on the Cognitive Reflection Test.
SES: subjective socioeconomic status.
income: monthly income.
mathclass: number of mathematics courses taken (1 = 0, 2 = 1–3, 3 = 3–5, 4 = more than 5).
