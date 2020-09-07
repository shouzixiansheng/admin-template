export default {
  methods: {
    validator_phone(rule, value, callback) {
      const reg = /^((1[3,5,7,8,9][0-9])|(14[5,7])|)\d{8}$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入手机号'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    },
    validator_email(rule, value, callback) {
      const reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入电子邮箱'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的电子邮箱'))
      } else {
        callback()
      }
    },
    validate_name(rule, value, callback) {
      const reg = /^[\u4e00-\u9fa5]{2,8}$/
      if (value === null || value === '') {
        callback(new Error('名称不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入2-8个中文字符'))
      } else {
        callback()
      }
    },
    validator_newPass(rule, value, callback) {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入6～16位由数字和字母组成的密码'))
      } else {
        if (this.ruleForm.checkPass) {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    },
    validator_checkPass(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    validator_price(rule, value, callback) {
      const reg = /^[0-9]*$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请填写价格'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        callback()
      }
    },
    validator_amount(rule, value, callback) {
      const reg = /^([0-9]*)+(.[0-9]{1,2})?$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入金额'))
      } else if (value < 1 || value > 1000000) {
        callback(new Error('请输入1～100万的数值'))
      } else if (!reg.test(value)) {
        callback(new Error('数据不符合规范，（保留两位小数）'))
      } else {
        callback()
      }
    },
    validator_score(rule, value, callback) {
      const reg = /^[0-9]*$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入通过分'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        callback()
      }
    },
    validator_percent(rule, value, callback) {
      const reg = /^([0-9]*)+(.[0-9]{1,2})?$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入百分比占比'))
      } else if (value >= 100 || value <= 0) {
        callback(new Error('百分比占比(0,100)'))
      } else if (!reg.test(value)) {
        callback(new Error('数据不符合规范，（保留两位小数）'))
      } else {
        callback()
      }
    },
    validator_number(rule, value, callback) {
      const reg = /^\d{3}$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请填写编号'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入三位数字'))
      } else {
        callback()
      }
    },
    validator_bankCard(rule, value, callback) {
      const reg = /^([1-9]{1})(\d{15}|\d{18})$/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请填写银行账号'))
      } else if (!reg.test(value)) {
        callback(new Error('银行账号16或19位，且首位不能为0'))
      } else {
        callback()
      }
    },
    validator_time(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请选择时间'))
      } else {
        callback()
      }
    },
    validator_imgUrl(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    },
    validator_fileUrl(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请上传文件'))
      } else {
        callback()
      }
    },
    validator_url(rule, value, callback) {
      // eslint-disable-next-line no-useless-escape
      const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请输入url地址'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的url地址'))
      } else {
        callback()
      }
    }
  }
}
