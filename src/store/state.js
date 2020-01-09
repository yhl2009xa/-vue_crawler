

const mainState = {
  /*****************电子书模块******************/
  //电子书目录
  catalogue:[],
  //当前选择的菜单Id
  //-1 菜单未弹出状态  0 菜单弹出但未选择，1 选择目录 2 选择进度 3 选择主题 4 选择字体
  menusStatus:-1,
  //当前的选择的跳转的章节百分比
  currentJumpProgress:0,

}
export  default mainState
