import Vue from 'vue'
import * as ls from '@/utils/localStorage'
const remove = (el) => el.parentNode.removeChild(el)

Vue.directive('auth', {
  inserted: (el, binding, vNode) => {
    // const { $root: vm } = vNode.context
    // 获取当前用户拥有的权限列表（根据自身业务获取）
    const access = ls.get('permissionCodes') || []
    // 获取传入的权限码value（string or array）和修饰符modifiers
    let { value, modifiers } = binding
    // 判断条件：当传入的值不是数组或者字符串时，直接隐藏元素
    if (
      !(
        typeof value === 'string' ||
        value instanceof Array
      ) ||
      !value
    ) {
      remove(el)
      return console.error('please set the value to a string or array.')
    }

    // 判断条件：如果传入的权限码是string则转化成数组
    if (typeof value === 'string') {
      value = [value]
    }

    /**
     * 判断条件
     *  -修饰符为 every时 value数组只要有一个元素不存在access权限集内，隐藏元素
     *  -修饰符为 some或者没有时，value数组所有元素都不存在access权限集内，隐藏元素
     */
    if (
      (
        modifiers.every &&
        value.some(v => !access.includes(v))
      ) ||
      (
        !modifiers.every &&
        value.every(v => !access.includes(v))
      )
    ) {
      remove(el)
    }
  }
})
