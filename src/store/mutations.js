const mutations = {

  /*****************电子书模块******************/
  //电子书目录
  setCatalogue:(state,list)=>{
      state.catalogue = list ;
      console.log(list);
  },

  /**
   * 设置 底部菜单当前选中的菜单ID
   * @param state
   * @param menuId （ -1 菜单未弹出状态  0 菜单弹出但未选择，1 选择目录 2 选择进度 3 选择主题 4 选择字体 ）
   */
  setMenusStatus:(state,menuId)=>{
    state.menusStatus = menuId;
  },

  /**
   * 设置当前跳转章节的百分比
   * @param state
   * @param percent
   */
  setCurrentProgress:(state,percent)=>{
    state.currentJumpProgress = percent;
  }
}

export default mutations;

