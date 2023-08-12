# AutoCompleteYxlearning
自动完成专技人员专业课培训平台的答题学习（Tampermonkey）

## 使用方法
- 安装此脚本到篡改猴（Tampermonkey）
- 前往视频学习页面（如图）：
  ![QQ截图20230812192454](https://github.com/Gingmzmzx/AutoCompleteYxlearning/assets/49107602/b815f3e6-89f1-44f6-8ff0-ddf67a469e68)
- 点击左下角菜单的`开始自动学习`

## 实现逻辑
由于本项目是临时起意，尝试编写的第一个油猴脚本，故逻辑及代码有所缺陷，敬请PR
- 检测是否出现答题弹窗
- 随机选个之前没选过的选项，并保存到`answerList`（因为每次选项会打乱，所以正则提取出选项内容后再保存）
- 重复该步骤，直到选出正确答案后清空`answerList`

## 鸣谢
- 感谢[wjx_autofill](https://greasyfork.org/scripts/444243-wjx-autofill/code/wjx_autofill.user.js)提供左下角的菜单样式

## 开源协议
本项目使用`Apache License 2.0`作为开源协议，请您自觉遵守。
